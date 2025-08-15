import { NextRequest, NextResponse } from 'next/server'

interface PredictionInput {
  homeXG: number
  awayXG: number
  homeXGA: number
  awayXGA: number
}

interface PredictionResult {
  homeWin: number
  draw: number
  awayWin: number
  expectedScore: {
    home: number
    away: number
  }
  // 新增：直接返回便于前端显示的字段
  expectedHomeGoals: number
  expectedAwayGoals: number
  mostLikelyScore: string
  confidence: number
}

// 泊松分布概率质量函数
function poissonProbability(lambda: number, k: number): number {
  return (Math.pow(lambda, k) * Math.exp(-lambda)) / factorial(k)
}

// 阶乘计算
function factorial(n: number): number {
  if (n <= 1) return 1
  return n * factorial(n - 1)
}

// 蒙特卡洛模拟
function monteCarloSimulation(
  homeXG: number, 
  awayXG: number, 
  homeXGA: number, 
  awayXGA: number,
  simulations: number = 10000
): PredictionResult {
  let homeWins = 0
  let draws = 0
  let awayWins = 0
  let totalHomeGoals = 0
  let totalAwayGoals = 0
  // 新增：记录每个比分的出现次数，用于求最可能比分
  const scoreCounts: Record<string, number> = {}

  // 调整xG和xGA，考虑对手的防守能力
  const adjustedHomeXG = homeXG * (1 + awayXGA / 10) // 对手防守越差，我方进球概率越高
  const adjustedAwayXG = awayXG * (1 + homeXGA / 10)
  
  // 添加随机性因子，使模拟更真实
  const homeVariability = 0.15 // 15%的随机波动
  const awayVariability = 0.15

  for (let i = 0; i < simulations; i++) {
    // 添加随机性
    const homeLambda = adjustedHomeXG * (1 + (Math.random() - 0.5) * homeVariability)
    const awayLambda = adjustedAwayXG * (1 + (Math.random() - 0.5) * awayVariability)
    
    // 使用改进的进球数生成方法
    const homeGoals = generateGoals(homeLambda)
    const awayGoals = generateGoals(awayLambda)
    
    totalHomeGoals += homeGoals
    totalAwayGoals += awayGoals
    
    // 记录比分频次
    const key = `${homeGoals}-${awayGoals}`
    scoreCounts[key] = (scoreCounts[key] || 0) + 1
    
    if (homeGoals > awayGoals) {
      homeWins++
    } else if (homeGoals < awayGoals) {
      awayWins++
    } else {
      draws++
    }
  }

  // 计算百分比
  const homeWinPercent = Math.round((homeWins / simulations) * 100)
  const drawPercent = Math.round((draws / simulations) * 100)
  const awayWinPercent = Math.round((awayWins / simulations) * 100)
  
  // 确保总和为100%
  const total = homeWinPercent + drawPercent + awayWinPercent
  const normalizedHomeWin = Math.round((homeWinPercent / total) * 100)
  const normalizedDraw = Math.round((drawPercent / total) * 100)
  const normalizedAwayWin = 100 - normalizedHomeWin - normalizedDraw

  // 计算预期比分
  const expectedHomeGoals = totalHomeGoals / simulations
  const expectedAwayGoals = totalAwayGoals / simulations

  // 新增：计算最可能比分（出现次数最多的比分）
  let mostLikelyScore = '0-0'
  let maxCount = -1
  for (const [score, count] of Object.entries(scoreCounts)) {
    if (count > maxCount) {
      maxCount = count
      mostLikelyScore = score
    }
  }

  // 计算置信度（基于xG和xGA的一致性）
  const teamStrengthConsistency = 1 - Math.abs(homeXG - awayXGA) / Math.max(homeXG, awayXGA, 1)
  const defensiveConsistency = 1 - Math.abs(awayXG - homeXGA) / Math.max(awayXG, homeXGA, 1)
  const confidence = Math.round(((teamStrengthConsistency + defensiveConsistency) / 2) * 100)

  return {
    homeWin: normalizedHomeWin,
    draw: normalizedDraw,
    awayWin: normalizedAwayWin,
    expectedScore: {
      home: Math.round(expectedHomeGoals * 10) / 10,
      away: Math.round(expectedAwayGoals * 10) / 10
    },
    // 新增：原始数值保留两位小数精度由前端控制
    expectedHomeGoals: expectedHomeGoals,
    expectedAwayGoals: expectedAwayGoals,
    mostLikelyScore,
    confidence
  }
}

// 改进的进球数生成方法
function generateGoals(lambda: number): number {
  if (lambda <= 0) return 0
  
  // 使用组合方法：泊松分布 + 二项分布调整
  const poissonGoals = poissonRandom(lambda)
  
  // 考虑进球的聚集性（某些球队更容易连续进球）
  const clusteringFactor = 0.1 // 10%的聚集效应
  const adjustment = Math.random() < clusteringFactor ? 1 : 0
  
  return Math.max(0, poissonGoals + adjustment)
}

// 泊松分布随机数生成
function poissonRandom(lambda: number): number {
  const L = Math.exp(-lambda)
  let k = 0
  let p = 1
  
  do {
    k++
    p *= Math.random()
  } while (p > L)
  
  return k - 1
}

export async function POST(request: NextRequest) {
  try {
    const body: PredictionInput = await request.json()
    
    const { homeXG, awayXG, homeXGA, awayXGA } = body
    
    // 验证输入数据
    if (typeof homeXG !== 'number' || typeof awayXG !== 'number' || 
        typeof homeXGA !== 'number' || typeof awayXGA !== 'number') {
      return NextResponse.json(
        { error: '所有参数必须是数字' },
        { status: 400 }
      )
    }
    
    if (homeXG < 0 || awayXG < 0 || homeXGA < 0 || awayXGA < 0) {
      return NextResponse.json(
        { error: '所有参数必须大于等于0' },
        { status: 400 }
      )
    }
    
    if (homeXG > 10 || awayXG > 10 || homeXGA > 10 || awayXGA > 10) {
      return NextResponse.json(
        { error: '参数值过大，请检查输入' },
        { status: 400 }
      )
    }
    
    // 执行蒙特卡洛模拟
    const result = monteCarloSimulation(homeXG, awayXG, homeXGA, awayXGA)
    
    // 添加额外分析信息
    const analysis = {
      teamComparison: {
        homeStrength: homeXG - homeXGA, // 主队净强度
        awayStrength: awayXG - awayXGA, // 客队净强度
        advantage: (homeXG - homeXGA) - (awayXG - awayXGA) // 主队相对优势
      },
      riskAssessment: {
        lowScoringProbability: Math.round((poissonProbability(homeXG + awayXG, 0) + 
                                          poissonProbability(homeXG + awayXG, 1) + 
                                          poissonProbability(homeXG + awayXG, 2)) * 100),
        highScoringProbability: Math.round((1 - poissonProbability(homeXG + awayXG, 0) - 
                                          poissonProbability(homeXG + awayXG, 1) - 
                                          poissonProbability(homeXG + awayXG, 2) - 
                                          poissonProbability(homeXG + awayXG, 3)) * 100)
      }
    }
    
    return NextResponse.json({
      ...result,
      analysis,
      timestamp: new Date().toISOString(),
      model: 'xG-xGA-MonteCarlo-v2.1'
    })
    
  } catch (error) {
    console.error('Prediction error:', error)
    return NextResponse.json(
      { error: '服务器内部错误' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: '足球比赛预测API',
    version: '2.1',
    endpoints: {
      predict: 'POST /api/predict',
      description: '基于xG和xGA数据进行比赛预测'
    },
    parameters: {
      homeXG: '主队预期进球值 (0-10)',
      awayXG: '客队预期进球值 (0-10)',
      homeXGA: '主队预期失球值 (0-10)',
      awayXGA: '客队预期失球值 (0-10)'
    }
  })
}