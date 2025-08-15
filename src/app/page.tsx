'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'

export default function Home() {
  const [homeXG, setHomeXG] = useState('')
  const [awayXG, setAwayXG] = useState('')
  const [homeXGA, setHomeXGA] = useState('')
  const [awayXGA, setAwayXGA] = useState('')
  const [prediction, setPrediction] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  // 优化后的粒子系统：更自然的数量、尺寸、速度和分布
  const particles = [
    // 小粒子层（细腻背景）
    { left: '15%', top: '8%', delay: '0.1s', duration: '4.2s', size: '1px', opacity: 0.6 },
    { left: '73%', top: '19%', delay: '1.8s', duration: '3.7s', size: '1px', opacity: 0.5 },
    { left: '42%', top: '31%', delay: '0.9s', duration: '5.1s', size: '1px', opacity: 0.7 },
    { left: '88%', top: '47%', delay: '2.3s', duration: '3.9s', size: '1px', opacity: 0.4 },
    { left: '21%', top: '63%', delay: '0.4s', duration: '4.8s', size: '1px', opacity: 0.6 },
    { left: '67%', top: '74%', delay: '1.5s', duration: '3.4s', size: '1px', opacity: 0.5 },
    { left: '8%', top: '85%', delay: '0.7s', duration: '4.5s', size: '1px', opacity: 0.8 },
    { left: '54%', top: '12%', delay: '2.1s', duration: '3.8s', size: '1px', opacity: 0.3 },
    
    // 中等粒子层（主要视觉效果）
    { left: '29%', top: '16%', delay: '0.3s', duration: '3.6s', size: '2px', opacity: 0.8 },
    { left: '81%', top: '28%', delay: '1.7s', duration: '2.9s', size: '2px', opacity: 0.9 },
    { left: '46%', top: '41%', delay: '0.8s', duration: '4.2s', size: '2px', opacity: 0.7 },
    { left: '12%', top: '54%', delay: '2.4s', duration: '3.1s', size: '2px', opacity: 0.6 },
    { left: '78%', top: '67%', delay: '0.6s', duration: '3.8s', size: '2px', opacity: 0.8 },
    { left: '35%', top: '79%', delay: '1.3s', duration: '2.7s', size: '2px', opacity: 0.9 },
    { left: '92%', top: '23%', delay: '0.2s', duration: '4.5s', size: '2px', opacity: 0.5 },
    { left: '58%', top: '36%', delay: '1.9s', duration: '3.3s', size: '2px', opacity: 0.7 },
    
    // 大粒子层（重点突出）
    { left: '24%', top: '24%', delay: '1.2s', duration: '3.0s', size: '3px', opacity: 1.0 },
    { left: '76%', top: '52%', delay: '0.5s', duration: '4.1s', size: '3px', opacity: 0.9 },
    { left: '41%', top: '68%', delay: '2.0s', duration: '2.8s', size: '3px', opacity: 0.8 },
    { left: '17%', top: '45%', delay: '0.9s', duration: '3.7s', size: '3px', opacity: 0.7 },
    { left: '63%', top: '15%', delay: '1.6s', duration: '3.4s', size: '3px', opacity: 1.0 },
    { left: '85%', top: '71%', delay: '0.3s', duration: '4.3s', size: '3px', opacity: 0.6 },
    
    // 超亮粒子层（星点效果）
    { left: '39%', top: '22%', delay: '1.4s', duration: '2.5s', size: '4px', opacity: 1.0 },
    { left: '71%', top: '38%', delay: '0.7s', duration: '3.2s', size: '4px', opacity: 0.9 },
    { left: '26%', top: '76%', delay: '2.2s', duration: '2.6s', size: '4px', opacity: 0.8 },
    { left: '82%', top: '59%', delay: '0.1s', duration: '4.0s', size: '4px', opacity: 1.0 },
    
    // 边缘细节粒子
    { left: '5%', top: '12%', delay: '1.8s', duration: '3.9s', size: '1px', opacity: 0.4 },
    { left: '95%', top: '34%', delay: '0.4s', duration: '4.7s', size: '1px', opacity: 0.5 },
    { left: '3%', top: '67%', delay: '2.5s', duration: '3.1s', size: '1px', opacity: 0.6 },
    { left: '97%', top: '81%', delay: '1.1s', duration: '3.6s', size: '1px', opacity: 0.3 },
    { left: '48%', top: '4%', delay: '0.8s', duration: '4.4s', size: '2px', opacity: 0.7 },
    { left: '52%', top: '96%', delay: '1.9s', duration: '2.9s', size: '2px', opacity: 0.8 }
  ]

  const handlePredict = async () => {
    if (!homeXG || !awayXG || !homeXGA || !awayXGA) {
      alert('请填写所有数据')
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          homeXG: parseFloat(homeXG),
          awayXG: parseFloat(awayXG),
          homeXGA: parseFloat(homeXGA),
          awayXGA: parseFloat(awayXGA),
        }),
      })

      const data = await response.json()
      setPrediction(data)
    } catch (error) {
      console.error('预测失败:', error)
      alert('预测失败，请重试')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white smooth-scroll">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container-max py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">⚽</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">进球洞察</h1>
                <p className="text-sm text-gray-500">xaigoal.com</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#models" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">模型介绍</a>
              <a href="#cases" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">成功案例</a>
              <a href="#trial" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">免费试用</a>
              <a href="#membership" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">会员服务</a>
            </nav>
            {/* Mobile menu button */}
            <button className="md:hidden p-2 rounded-lg hover:bg-gray-100">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <main className="container-max py-8 space-y-16">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900"></div>
          
          {/* Tech pattern overlay */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)`,
              backgroundSize: '50px 50px'
            }}></div>
          </div>

          {/* Enhanced floating particles with multi-layer effects */}
          <div className="absolute inset-0">
            {particles.map((p, i) => (
              <div
                key={i}
                className="absolute bg-blue-400 rounded-full animate-pulse"
                style={{
                  left: p.left,
                  top: p.top,
                  width: p.size,
                  height: p.size,
                  opacity: p.opacity,
                  animationDelay: p.delay,
                  animationDuration: p.duration,
                  animation: `pulse ${p.duration} ease-in-out ${p.delay} infinite alternate, float${i % 3} ${(parseFloat(p.duration) * 1.5).toFixed(1)}s ease-in-out ${p.delay} infinite alternate`,
                }}
              ></div>
            ))}
          </div>

          {/* Add custom keyframes for floating animation */}
          <style jsx>{`
            @keyframes float0 {
              0% { transform: translateY(0px) translateX(0px); }
              100% { transform: translateY(-20px) translateX(5px); }
            }
            @keyframes float1 {
              0% { transform: translateY(0px) translateX(0px); }
              100% { transform: translateY(-15px) translateX(-8px); }
            }
            @keyframes float2 {
              0% { transform: translateY(0px) translateX(0px); }
              100% { transform: translateY(-25px) translateX(3px); }
            }
          `}</style>

          <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
            <div className="mb-8">
              <div className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 font-medium text-sm">AI 预测系统在线</span>
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                进球洞察
              </span>
              <br />
              <span className="text-3xl md:text-4xl font-normal text-gray-300 mt-4 block">
                数据驱动的足球预测科学
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              基于<span className="text-blue-400 font-semibold">xG数据</span>、
              <span className="text-green-400 font-semibold">泊松分布</span>和
              <span className="text-purple-400 font-semibold">蒙特卡洛模拟</span>的
              <br />
              三层架构预测系统，准确率高达<span className="text-orange-400 font-bold">78.5%</span>
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/20">
                <div className="text-3xl font-bold text-blue-400 mb-1">500K+</div>
                <div className="text-sm text-gray-300">数据样本</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/20">
                <div className="text-3xl font-bold text-green-400 mb-1">10,000</div>
                <div className="text-sm text-gray-300">模拟次数</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/20">
                <div className="text-3xl font-bold text-purple-400 mb-1">95%</div>
                <div className="text-sm text-gray-300">置信度</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/20">
                <div className="text-3xl font-bold text-orange-400 mb-1">&lt;3s</div>
                <div className="text-sm text-gray-300">计算时间</div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              <span className="px-6 py-3 bg-blue-500/20 border border-blue-400/30 rounded-full text-blue-300 text-sm font-medium backdrop-blur-sm">
                📊 xG数据建模
              </span>
              <span className="px-6 py-3 bg-green-500/20 border border-green-400/30 rounded-full text-green-300 text-sm font-medium backdrop-blur-sm">
                🔢 泊松分布
              </span>
              <span className="px-6 py-3 bg-purple-500/20 border border-purple-400/30 rounded-full text-purple-300 text-sm font-medium backdrop-blur-sm">
                🎲 蒙特卡洛模拟
              </span>
              <span className="px-6 py-3 bg-orange-500/20 border border-orange-400/30 rounded-full text-orange-300 text-sm font-medium backdrop-blur-sm">
                🤖 AI预测引擎
              </span>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
              <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Models Introduction */}
        <section id="models" className="relative bg-gradient-to-br from-slate-50 to-blue-50 py-12">
          {/* Background tech pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, #3b82f6 2px, transparent 2px),
                               radial-gradient(circle at 75% 75%, #8b5cf6 2px, transparent 2px)`,
              backgroundSize: '50px 50px'
            }}></div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">📊</span>
                </div>
                <span className="text-blue-600 font-semibold text-sm uppercase tracking-wide">数据科学驱动</span>
              </div>
              <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                核心预测模型架构
              </h3>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                基于xG数据、泊松分布和蒙特卡洛模拟的三层架构，构建业界领先的足球预测系统
              </p>
            </div>

            {/* Model Architecture Visualization */}
            <div className="mb-16">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
                <h4 className="text-2xl font-bold text-gray-900 mb-8 text-center">模型技术架构</h4>
                <div className="grid md:grid-cols-3 gap-8">
                  {/* Data Layer */}
                  <div className="text-center">
                    <div className="relative">
                      <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <div className="text-white text-center">
                          <div className="text-3xl mb-2">📈</div>
                          <div className="text-sm font-semibold">数据层</div>
                        </div>
                      </div>
                      <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    </div>
                    <h5 className="text-lg font-bold text-gray-900 mt-8 mb-3">xG/xGA 数据采集</h5>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center justify-center space-x-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        <span>射门质量分析</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        <span>防守组织评估</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        <span>历史数据建模</span>
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">500K+</div>
                      <div className="text-xs text-blue-600">数据样本</div>
                    </div>
                  </div>

                  {/* Algorithm Layer */}
                  <div className="text-center">
                    <div className="relative">
                      <div className="w-32 h-32 mx-auto bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <div className="text-white text-center">
                          <div className="text-3xl mb-2">🔢</div>
                          <div className="text-sm font-semibold">算法层</div>
                        </div>
                      </div>
                      <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    </div>
                    <h5 className="text-lg font-bold text-gray-900 mt-8 mb-3">泊松分布建模</h5>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center justify-center space-x-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        <span>概率密度函数</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        <span>参数优化</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        <span>置信区间计算</span>
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">λ = 1.8</div>
                      <div className="text-xs text-green-600">平均进球率</div>
                    </div>
                  </div>

                  {/* Simulation Layer */}
                  <div className="text-center">
                    <div className="relative">
                      <div className="w-32 h-32 mx-auto bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <div className="text-white text-center">
                          <div className="text-3xl mb-2">🎲</div>
                          <div className="text-sm font-semibold">模拟层</div>
                        </div>
                      </div>
                    </div>
                    <h5 className="text-lg font-bold text-gray-900 mt-8 mb-3">蒙特卡洛模拟</h5>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center justify-center space-x-2">
                        <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                        <span>10,000次迭代</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2">
                        <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                        <span>随机变量生成</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2">
                        <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                        <span>概率分布输出</span>
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">95%</div>
                      <div className="text-xs text-purple-600">预测置信度</div>
                    </div>
                  </div>
                </div>

                {/* Connection arrows */}
                <div className="relative mt-8">
                  <div className="absolute top-0 left-1/4 w-1/2 h-1 bg-gradient-to-r from-blue-500 via-green-500 to-purple-500"></div>
                  <div className="absolute top-0 left-1/4 w-4 h-4 bg-blue-500 rounded-full transform -translate-y-1.5"></div>
                  <div className="absolute top-0 left-1/2 w-4 h-4 bg-green-500 rounded-full transform -translate-y-1.5"></div>
                  <div className="absolute top-0 right-1/4 w-4 h-4 bg-purple-500 rounded-full transform -translate-y-1.5"></div>
                </div>
              </div>
            </div>

            {/* Detailed Model Cards */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <span className="text-white text-2xl">⚽</span>
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold text-white">xG 数据模型</h4>
                      <p className="text-blue-100">Expected Goals 预期进球值</p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-4">
                      <h5 className="font-semibold text-gray-900 flex items-center">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                        核心算法
                      </h5>
                      <div className="space-y-3">
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="text-xs text-gray-500 mb-1">泊松分布公式</div>
                          <div className="text-sm font-mono text-gray-800">P(X=k) = (λ^k × e^-λ) / k!</div>
                        </div>
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <div className="text-xs text-blue-600 mb-1">xG 计算参数</div>
                          <div className="text-sm text-blue-800">λ = Σ(射门质量 × 位置权重)</div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h5 className="font-semibold text-gray-900 flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        数据维度
                      </h5>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">射门位置</span>
                          <div className="flex space-x-1">
                            <div className="w-8 h-2 bg-blue-500 rounded"></div>
                            <div className="w-8 h-2 bg-blue-500 rounded"></div>
                            <div className="w-8 h-2 bg-blue-500 rounded"></div>
                            <div className="w-8 h-2 bg-blue-300 rounded"></div>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">射门角度</span>
                          <div className="flex space-x-1">
                            <div className="w-8 h-2 bg-green-500 rounded"></div>
                            <div className="w-8 h-2 bg-green-500 rounded"></div>
                            <div className="w-8 h-2 bg-green-400 rounded"></div>
                            <div className="w-8 h-2 bg-green-300 rounded"></div>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">防守压力</span>
                          <div className="flex space-x-1">
                            <div className="w-8 h-2 bg-purple-500 rounded"></div>
                            <div className="w-8 h-2 bg-purple-500 rounded"></div>
                            <div className="w-8 h-2 bg-purple-400 rounded"></div>
                            <div className="w-8 h-2 bg-purple-300 rounded"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-blue-600 font-medium">模型准确率</div>
                        <div className="text-2xl font-bold text-blue-800">78.5%</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-blue-600 font-medium">数据样本</div>
                        <div className="text-2xl font-bold text-blue-800">250K+</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-green-600 to-green-700 p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <span className="text-white text-2xl">🛡️</span>
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold text-white">xGA 数据模型</h4>
                      <p className="text-green-100">Expected Goals Against 预期失球值</p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-4">
                      <h5 className="font-semibold text-gray-900 flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        防守评估
                      </h5>
                      <div className="space-y-3">
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="text-xs text-gray-500 mb-1">防守效率指数</div>
                          <div className="text-sm font-mono text-gray-800">DEI = (抢断 + 拦截) / 对手射门次数</div>
                        </div>
                        <div className="bg-green-50 p-3 rounded-lg">
                          <div className="text-xs text-green-600 mb-1">xGA 计算参数</div>
                          <div className="text-sm text-green-800">λ = Σ(防守质量 × 位置权重)</div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h5 className="font-semibold text-gray-900 flex items-center">
                        <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                        评估维度
                      </h5>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">门将能力</span>
                          <div className="flex space-x-1">
                            <div className="w-8 h-2 bg-green-500 rounded"></div>
                            <div className="w-8 h-2 bg-green-500 rounded"></div>
                            <div className="w-8 h-2 bg-green-500 rounded"></div>
                            <div className="w-8 h-2 bg-green-400 rounded"></div>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">防线组织</span>
                          <div className="flex space-x-1">
                            <div className="w-8 h-2 bg-orange-500 rounded"></div>
                            <div className="w-8 h-2 bg-orange-500 rounded"></div>
                            <div className="w-8 h-2 bg-orange-400 rounded"></div>
                            <div className="w-8 h-2 bg-orange-300 rounded"></div>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">战术体系</span>
                          <div className="flex space-x-1">
                            <div className="w-8 h-2 bg-red-500 rounded"></div>
                            <div className="w-8 h-2 bg-red-500 rounded"></div>
                            <div className="w-8 h-2 bg-red-400 rounded"></div>
                            <div className="w-8 h-2 bg-red-300 rounded"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-green-600 font-medium">预测准确率</div>
                        <div className="text-2xl font-bold text-green-800">82.3%</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-green-600 font-medium">防守稳定性</div>
                        <div className="text-2xl font-bold text-green-800">89.1%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Monte Carlo Simulation Section */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <span className="text-white text-2xl">🎯</span>
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-white">蒙特卡洛模拟引擎</h4>
                    <p className="text-purple-100">Monte Carlo Simulation Engine</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="grid md:grid-cols-3 gap-8 mb-8">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto bg-purple-100 rounded-2xl flex items-center justify-center mb-4">
                      <span className="text-purple-600 text-3xl">🔄</span>
                    </div>
                    <h5 className="font-bold text-gray-900 mb-2">迭代计算</h5>
                    <div className="text-3xl font-bold text-purple-600 mb-1">10,000+</div>
                    <p className="text-sm text-gray-600">模拟次数</p>
                  </div>
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto bg-blue-100 rounded-2xl flex items-center justify-center mb-4">
                      <span className="text-blue-600 text-3xl">⚡</span>
                    </div>
                    <h5 className="font-bold text-gray-900 mb-2">计算性能</h5>
                    <div className="text-3xl font-bold text-blue-600 mb-1">&lt;3s</div>
                    <p className="text-sm text-gray-600">响应时间</p>
                  </div>
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto bg-green-100 rounded-2xl flex items-center justify-center mb-4">
                      <span className="text-green-600 text-3xl">📊</span>
                    </div>
                    <h5 className="font-bold text-gray-900 mb-2">置信度</h5>
                    <div className="text-3xl font-bold text-green-600 mb-1">95%</div>
                    <p className="text-sm text-gray-600">统计显著性</p>
                  </div>
                </div>

                {/* Simulation Process Visualization */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h5 className="font-bold text-gray-900 mb-4">模拟流程</h5>
                  <div className="grid md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-white font-bold">1</span>
                      </div>
                      <div className="text-sm font-medium text-gray-900">数据输入</div>
                      <div className="text-xs text-gray-600 mt-1">xG/xGA参数</div>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-white font-bold">2</span>
                      </div>
                      <div className="text-sm font-medium text-gray-900">泊松分布</div>
                      <div className="text-xs text-gray-600 mt-1">概率计算</div>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-white font-bold">3</span>
                      </div>
                      <div className="text-sm font-medium text-gray-900">随机模拟</div>
                      <div className="text-xs text-gray-600 mt-1">10,000次迭代</div>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-white font-bold">4</span>
                      </div>
                      <div className="text-sm font-medium text-gray-900">结果输出</div>
                      <div className="text-xs text-gray-600 mt-1">概率分布</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Separator className="my-8" />

        {/* Success Cases */}
        <section className="relative bg-gradient-to-br from-gray-50 to-slate-100 py-16">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 20% 80%, #10b981 2px, transparent 2px),
                               radial-gradient(circle at 80% 20%, #3b82f6 2px, transparent 2px)`,
              backgroundSize: '60px 60px'
            }}></div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">📈</span>
                </div>
                <span className="text-green-600 font-semibold text-sm uppercase tracking-wide">预测验证</span>
              </div>
              <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                真实案例验证
              </h3>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                基于历史数据的预测结果与实际比赛对比，验证我们模型的准确性和可靠性
              </p>
            </div>

            {/* Accuracy Overview */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 mb-12">
              <h4 className="text-2xl font-bold text-gray-900 mb-8 text-center">整体预测准确率</h4>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="relative w-24 h-24 mx-auto mb-4">
                    <svg className="w-24 h-24 transform -rotate-90">
                      <circle cx="48" cy="48" r="40" stroke="#e5e7eb" strokeWidth="8" fill="none"></circle>
                      <circle cx="48" cy="48" r="40" stroke="#3b82f6" strokeWidth="8" fill="none"
                        strokeDasharray="251.2" strokeDashoffset="54" strokeLinecap="round"></circle>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold text-blue-600">78.5%</span>
                    </div>
                  </div>
                  <h5 className="font-bold text-gray-900 mb-1">胜负预测</h5>
                  <p className="text-sm text-gray-600">准确率</p>
                </div>
                <div className="text-center">
                  <div className="relative w-24 h-24 mx-auto mb-4">
                    <svg className="w-24 h-24 transform -rotate-90">
                      <circle cx="48" cy="48" r="40" stroke="#e5e7eb" strokeWidth="8" fill="none"></circle>
                      <circle cx="48" cy="48" r="40" stroke="#10b981" strokeWidth="8" fill="none"
                        strokeDasharray="251.2" strokeDashoffset="37" strokeLinecap="round"></circle>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold text-green-600">85.2%</span>
                    </div>
                  </div>
                  <h5 className="font-bold text-gray-900 mb-1">进球数预测</h5>
                  <p className="text-sm text-gray-600">准确率</p>
                </div>
                <div className="text-center">
                  <div className="relative w-24 h-24 mx-auto mb-4">
                    <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-purple-600">1.25K</span>
                    </div>
                  </div>
                  <h5 className="font-bold text-gray-900 mb-1">成功预测</h5>
                  <p className="text-sm text-gray-600">比赛场次</p>
                </div>
                <div className="text-center">
                  <div className="relative w-24 h-24 mx-auto mb-4">
                    <svg className="w-24 h-24 transform -rotate-90">
                      <circle cx="48" cy="48" r="40" stroke="#e5e7eb" strokeWidth="8" fill="none"></circle>
                      <circle cx="48" cy="48" r="40" stroke="#f59e0b" strokeWidth="8" fill="none"
                        strokeDasharray="251.2" strokeDashoffset="20" strokeLinecap="round"></circle>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold text-orange-600">92%</span>
                    </div>
                  </div>
                  <h5 className="font-bold text-gray-900 mb-1">用户</h5>
                  <p className="text-sm text-gray-600">满意度</p>
                </div>
              </div>
            </div>

            {/* Case Studies */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xl font-bold text-white">英超</h4>
                      <p className="text-blue-100">曼城 vs 利物浦</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">2-1</div>
                      <div className="text-sm text-blue-100">实际比分</div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-3 text-sm">预测数据输入</h5>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <div className="text-xs text-blue-600 mb-1">曼城</div>
                          <div className="text-sm font-bold text-blue-800">xG: 2.1</div>
                          <div className="text-xs text-blue-600">xGA: 0.8</div>
                        </div>
                        <div className="bg-red-50 p-3 rounded-lg">
                          <div className="text-xs text-red-600 mb-1">利物浦</div>
                          <div className="text-sm font-bold text-red-800">xG: 1.8</div>
                          <div className="text-xs text-red-600">xGA: 1.1</div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-3 text-sm">蒙特卡洛模拟结果</h5>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">曼城胜率</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div className="bg-blue-500 h-2 rounded-full" style={{width: '58%'}}></div>
                            </div>
                            <span className="text-sm font-bold text-blue-600">58%</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">平局概率</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div className="bg-gray-500 h-2 rounded-full" style={{width: '25%'}}></div>
                            </div>
                            <span className="text-sm font-bold text-gray-600">25%</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">利物浦胜率</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div className="bg-red-500 h-2 rounded-full" style={{width: '17%'}}></div>
                            </div>
                            <span className="text-sm font-bold text-red-600">17%</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <div className="flex items-center space-x-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        <span className="text-sm font-medium text-green-800">预测准确</span>
                      </div>
                      <div className="text-xs text-green-600 mt-1">置信度: 87%</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xl font-bold text-white">欧冠</h4>
                      <p className="text-purple-100">皇马 vs 拜仁</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">2-2</div>
                      <div className="text-sm text-purple-100">实际比分</div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-3 text-sm">预测数据输入</h5>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-purple-50 p-3 rounded-lg">
                          <div className="text-xs text-purple-600 mb-1">皇马</div>
                          <div className="text-sm font-bold text-purple-800">xG: 1.9</div>
                          <div className="text-xs text-purple-600">xGA: 1.2</div>
                        </div>
                        <div className="bg-red-50 p-3 rounded-lg">
                          <div className="text-xs text-red-600 mb-1">拜仁</div>
                          <div className="text-sm font-bold text-red-800">xG: 2.2</div>
                          <div className="text-xs text-red-600">xGA: 1.4</div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-3 text-sm">蒙特卡洛模拟结果</h5>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">皇马胜率</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div className="bg-purple-500 h-2 rounded-full" style={{width: '32%'}}></div>
                            </div>
                            <span className="text-sm font-bold text-purple-600">32%</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">平局概率</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div className="bg-gray-500 h-2 rounded-full" style={{width: '35%'}}></div>
                            </div>
                            <span className="text-sm font-bold text-gray-600">35%</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">拜仁胜率</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div className="bg-red-500 h-2 rounded-full" style={{width: '33%'}}></div>
                            </div>
                            <span className="text-sm font-bold text-red-600">33%</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <div className="flex items-center space-x-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        <span className="text-sm font-medium text-green-800">预测准确</span>
                      </div>
                      <div className="text-xs text-green-600 mt-1">置信度: 78%</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-green-600 to-green-700 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xl font-bold text-white">西甲</h4>
                      <p className="text-green-100">巴萨 vs 马竞</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">3-0</div>
                      <div className="text-sm text-green-100">实际比分</div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-3 text-sm">预测数据输入</h5>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-green-50 p-3 rounded-lg">
                          <div className="text-xs text-green-600 mb-1">巴萨</div>
                          <div className="text-sm font-bold text-green-800">xG: 2.3</div>
                          <div className="text-xs text-green-600">xGA: 0.9</div>
                        </div>
                        <div className="bg-red-50 p-3 rounded-lg">
                          <div className="text-xs text-red-600 mb-1">马竞</div>
                          <div className="text-sm font-bold text-red-800">xG: 1.1</div>
                          <div className="text-xs text-red-600">xGA: 1.2</div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-3 text-sm">蒙特卡洛模拟结果</h5>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">巴萨胜率</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div className="bg-green-500 h-2 rounded-full" style={{width: '65%'}}></div>
                            </div>
                            <span className="text-sm font-bold text-green-600">65%</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">平局概率</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div className="bg-gray-500 h-2 rounded-full" style={{width: '22%'}}></div>
                            </div>
                            <span className="text-sm font-bold text-gray-600">22%</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">马竞胜率</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div className="bg-red-500 h-2 rounded-full" style={{width: '13%'}}></div>
                            </div>
                            <span className="text-sm font-bold text-red-600">13%</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <div className="flex items-center space-x-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        <span className="text-sm font-medium text-green-800">预测准确</span>
                      </div>
                      <div className="text-xs text-green-600 mt-1">置信度: 91%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Separator className="my-8" />

        {/* Free Trial */}
        <section className="relative bg-gradient-to-br from-slate-100 to-blue-100 py-16">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `linear-gradient(45deg, #3b82f6 25%, transparent 25%),
                               linear-gradient(-45deg, #3b82f6 25%, transparent 25%),
                               linear-gradient(45deg, transparent 75%, #3b82f6 75%),
                               linear-gradient(-45deg, transparent 75%, #3b82f6 75%)`,
              backgroundSize: '40px 40px',
              backgroundPosition: '0 0, 0 20px, 20px -20px, -20px 0px'
            }}></div>
          </div>
          
          <div className="relative max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">🧮</span>
                </div>
                <span className="text-purple-600 font-semibold text-sm uppercase tracking-wide">实时计算</span>
              </div>
              <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                AI 预测计算器
              </h3>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                输入对阵双方的xG和xGA数据，基于泊松分布和蒙特卡洛模拟实时计算比赛结果概率
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-8">
                <div className="text-center">
                  <h4 className="text-2xl font-bold text-white mb-2">蒙特卡洛模拟引擎</h4>
                  <p className="text-purple-100">基于10,000次迭代的概率计算</p>
                  <div className="flex justify-center space-x-8 mt-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white">λ₁</div>
                      <div className="text-sm text-purple-200">主队进球率</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white">λ₂</div>
                      <div className="text-sm text-purple-200">客队进球率</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white">N</div>
                      <div className="text-sm text-purple-200">模拟次数</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="inline-flex items-center space-x-2 bg-blue-100 rounded-full px-4 py-2 mb-4">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="text-blue-700 font-semibold">主队参数</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="relative">
                        <Label htmlFor="homeXG" className="text-gray-700 font-medium mb-2 block">
                          xG (预期进球值) 
                          <span className="text-xs text-gray-500 ml-2">λ = xG</span>
                        </Label>
                        <div className="relative">
                          <Input
                            id="homeXG"
                            type="number"
                            step="0.1"
                            placeholder="例如: 1.8"
                            value={homeXG}
                            onChange={(e) => setHomeXG(e.target.value)}
                            className="border-2 border-gray-300 focus:border-blue-500 rounded-xl px-4 py-3 text-lg font-mono"
                          />
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">
                            goals
                          </div>
                        </div>
                      </div>
                      <div className="relative">
                        <Label htmlFor="homeXGA" className="text-gray-700 font-medium mb-2 block">
                          xGA (预期失球值)
                          <span className="text-xs text-gray-500 ml-2">防守参数</span>
                        </Label>
                        <div className="relative">
                          <Input
                            id="homeXGA"
                            type="number"
                            step="0.1"
                            placeholder="例如: 1.2"
                            value={homeXGA}
                            onChange={(e) => setHomeXGA(e.target.value)}
                            className="border-2 border-gray-300 focus:border-blue-500 rounded-xl px-4 py-3 text-lg font-mono"
                          />
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">
                            defense
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="inline-flex items-center space-x-2 bg-green-100 rounded-full px-4 py-2 mb-4">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-green-700 font-semibold">客队参数</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="relative">
                        <Label htmlFor="awayXG" className="text-gray-700 font-medium mb-2 block">
                          xG (预期进球值)
                          <span className="text-xs text-gray-500 ml-2">λ = xG</span>
                        </Label>
                        <div className="relative">
                          <Input
                            id="awayXG"
                            type="number"
                            step="0.1"
                            placeholder="例如: 1.5"
                            value={awayXG}
                            onChange={(e) => setAwayXG(e.target.value)}
                            className="border-2 border-gray-300 focus:border-green-500 rounded-xl px-4 py-3 text-lg font-mono"
                          />
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">
                            goals
                          </div>
                        </div>
                      </div>
                      <div className="relative">
                        <Label htmlFor="awayXGA" className="text-gray-700 font-medium mb-2 block">
                          xGA (预期失球值)
                          <span className="text-xs text-gray-500 ml-2">防守参数</span>
                        </Label>
                        <div className="relative">
                          <Input
                            id="awayXGA"
                            type="number"
                            step="0.1"
                            placeholder="例如: 1.4"
                            value={awayXGA}
                            onChange={(e) => setAwayXGA(e.target.value)}
                            className="border-2 border-gray-300 focus:border-green-500 rounded-xl px-4 py-3 text-lg font-mono"
                          />
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">
                            defense
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="text-center">
                  <Button 
                    onClick={handlePredict}
                    disabled={isLoading}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 px-12 rounded-xl text-lg shadow-lg transform transition hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>蒙特卡洛模拟中...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <span>🎲</span>
                        <span>开始预测计算</span>
                      </div>
                    )}
                  </Button>
                  <p className="text-sm text-gray-500 mt-3">
                    基于10,000次蒙特卡洛模拟，计算时间约3秒
                  </p>
                </div>
              </div>

              {prediction && (
                <div className="border-t border-gray-200 bg-gray-50 p-8">
                  <div className="text-center mb-6">
                    <h5 className="text-2xl font-bold text-gray-900 mb-2">预测结果</h5>
                    <p className="text-gray-600">基于泊松分布的蒙特卡洛模拟输出</p>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-blue-200">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600 mb-2">{prediction.homeWin}%</div>
                        <div className="text-sm text-gray-600 font-medium">主队胜率</div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                          <div className="bg-blue-500 h-2 rounded-full transition-all duration-1000" style={{width: `${prediction.homeWin}%`}}></div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-gray-600 mb-2">{prediction.draw}%</div>
                        <div className="text-sm text-gray-600 font-medium">平局概率</div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                          <div className="bg-gray-500 h-2 rounded-full transition-all duration-1000" style={{width: `${prediction.draw}%`}}></div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-green-200">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-600 mb-2">{prediction.awayWin}%</div>
                        <div className="text-sm text-gray-600 font-medium">客队胜率</div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                          <div className="bg-green-500 h-2 rounded-full transition-all duration-1000" style={{width: `${prediction.awayWin}%`}}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-blue-50 rounded-xl p-4">
                      <h6 className="font-semibold text-blue-900 mb-3">概率分布</h6>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-blue-700">主队进球数期望</span>
                          <span className="font-mono text-blue-900">{typeof prediction.expectedHomeGoals === 'number' ? prediction.expectedHomeGoals.toFixed(2) : '-'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-blue-700">客队进球数期望</span>
                          <span className="font-mono text-blue-900">{typeof prediction.expectedAwayGoals === 'number' ? prediction.expectedAwayGoals.toFixed(2) : '-'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-blue-700">最可能比分</span>
                          <span className="font-mono text-blue-900">{prediction.mostLikelyScore}</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-purple-50 rounded-xl p-4">
                      <h6 className="font-semibold text-purple-900 mb-3">模拟统计</h6>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-purple-700">模拟次数</span>
                          <span className="font-mono text-purple-900">10,000</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-purple-700">置信区间</span>
                          <span className="font-mono text-purple-900">95%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-purple-700">计算时间</span>
                          <span className="font-mono text-purple-900">&lt; 3秒</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        <Separator className="my-8" />

        {/* Membership */}
        <section id="membership" className="space-y-8 py-8">
          <div className="text-center max-w-3xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">专业会员服务</h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              解锁专业级足球预测分析，获得五大联赛及俄超的详细预测报告
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* 服务介绍卡片 */}
              <Card className="lg:col-span-2 border-0 shadow-lg">
                <CardHeader className="pb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl font-bold text-gray-900">会员权益</CardTitle>
                      <CardDescription className="text-base mt-2">专业分析 · 精准预测 · 全程服务</CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-blue-600">¥198</div>
                      <div className="text-sm text-gray-500">每月</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                        核心服务
                      </h4>
                      <ul className="space-y-3 text-sm">
                        <li className="flex items-start space-x-2">
                          <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>
                          <span className="text-gray-700">五大联赛全部比赛预测分析</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>
                          <span className="text-gray-700">俄超联赛完整预测报告</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>
                          <span className="text-gray-700">实时数据更新与分析</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>
                          <span className="text-gray-700">详细赛前分析报告</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>
                          <span className="text-gray-700">风险评估与投注建议</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                        <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                        会员特权
                      </h4>
                      <ul className="space-y-3 text-sm">
                        <li className="flex items-start space-x-2">
                          <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>
                          <span className="text-gray-700">无需手动输入数据</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>
                          <span className="text-gray-700">优先获取最新预测</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>
                          <span className="text-gray-700">专属客服一对一服务</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>
                          <span className="text-gray-700">历史预测数据查询</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>
                          <span className="text-gray-700">月度准确率分析报告</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  {/* 服务流程 */}
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                      服务流程
                    </h4>
                    <div className="grid md:grid-cols-4 gap-4 text-center">
                      <div className="space-y-2">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                          <span className="text-blue-600 font-bold">1</span>
                        </div>
                        <p className="text-sm text-gray-600">添加微信</p>
                      </div>
                      <div className="space-y-2">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                          <span className="text-blue-600 font-bold">2</span>
                        </div>
                        <p className="text-sm text-gray-600">支付会费</p>
                      </div>
                      <div className="space-y-2">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                          <span className="text-blue-600 font-bold">3</span>
                        </div>
                        <p className="text-sm text-gray-600">确认开通</p>
                      </div>
                      <div className="space-y-2">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                          <span className="text-blue-600 font-bold">4</span>
                        </div>
                        <p className="text-sm text-gray-600">每周接收</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* 联系方式卡片 */}
              <Card className="border-0 shadow-lg">
                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-xl font-bold text-gray-900">立即加入</CardTitle>
                  <CardDescription>扫码添加客服微信</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <img 
                      src="/wechat-qr.png" 
                      alt="微信客服二维码" 
                      className="w-48 h-48 mx-auto"
                    />
                    <div className="mt-3 space-y-1">
                      <div className="text-sm font-medium text-gray-700">微信客服</div>
                      <div className="text-xs text-gray-500">Kwokchungsz</div>
                      <div className="text-xs text-blue-600 font-medium">扫码添加</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3 text-sm">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="font-medium text-blue-900 mb-1">服务说明</p>
                      <p className="text-blue-700 text-xs leading-relaxed">
                        添加微信后，客服将为您开通会员服务，每周通过文档形式发送详细预测分析报告
                      </p>
                    </div>
                    
                    <div className="space-y-2 text-gray-600">
                      <div className="flex items-center space-x-2">
                        <span className="text-green-500">•</span>
                        <span className="text-xs">无合约限制，随时可取消</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-green-500">•</span>
                        <span className="text-xs">服务时间：9:00-18:00</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-green-500">•</span>
                        <span className="text-xs">专业团队，精准分析</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container-max">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">⚽</span>
                </div>
                <h4 className="text-xl font-bold">进球洞察</h4>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                专业的足球比赛预测平台，基于AI技术和先进的数据分析模型，为您提供最准确的比赛预测服务。
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-6 text-blue-400">快速链接</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#models" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center space-x-2">
                    <span>→</span>
                    <span>模型介绍</span>
                  </a>
                </li>
                <li>
                  <a href="#cases" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center space-x-2">
                    <span>→</span>
                    <span>成功案例</span>
                  </a>
                </li>
                <li>
                  <a href="#trial" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center space-x-2">
                    <span>→</span>
                    <span>免费试用</span>
                  </a>
                </li>
                <li>
                  <a href="#membership" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center space-x-2">
                    <span>→</span>
                    <span>会员服务</span>
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-6 text-blue-400">联系我们</h4>
              <div className="space-y-3 text-gray-300">
                <div className="flex items-center space-x-3">
                  <span className="text-blue-400">📧</span>
                  <span className="text-sm">contact@xaigoal.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <img 
                    src="/wechat-qr.png" 
                    alt="微信二维码" 
                    className="w-8 h-8"
                  />
                  <span className="text-sm">客服微信: Kwokchungsz</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-blue-400">🕐</span>
                  <span className="text-sm">服务时间: 9:00-18:00</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-gray-400 text-sm">
                © 2024 进球洞察. All rights reserved. | xaigoal.com
              </p>
              <div className="flex space-x-6 text-xs text-gray-400">
                <span>隐私政策</span>
                <span>服务条款</span>
                <span>免责声明</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}