import type { Metadata } from "next";
// 修改字体导入方式，使用本地字体而不是Google字体
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

// 使用CSS变量替代字体导入
const geistSans = {
  variable: "--font-geist-sans",
};

const geistMono = {
  variable: "--font-geist-mono",
};

export const metadata: Metadata = {
  title: "进球洞察 - 专业足球比赛AI预测平台",
  description:
    "基于xG、xGA模型和蒙特卡洛模拟的专业足球比赛预测平台，提供精准的足球比赛结果分析和预测服务。涵盖五大联赛及俄超，AI驱动，数据精准。",
  keywords: [
    "足球预测",
    "xG",
    "xGA",
    "蒙特卡洛模拟",
    "AI预测",
    "进球洞察",
    "足球分析",
    "比赛预测",
    "五大联赛",
    "俄超",
  ],
  authors: [{ name: "进球洞察团队" }],
  creator: "进球洞察",
  publisher: "进球洞察",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  metadataBase: new URL("https://xaigoal.com"),
  openGraph: {
    title: "进球洞察 - 专业足球比赛AI预测平台",
    description:
      "基于xG、xGA模型和蒙特卡洛模拟的专业足球比赛预测平台，提供精准的足球比赛结果分析和预测服务。",
    url: "https://xaigoal.com",
    siteName: "进球洞察",
    type: "website",
    locale: "zh_CN",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "进球洞察 - 专业足球比赛AI预测平台",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "进球洞察 - 专业足球比赛AI预测平台",
    description: "基于xG、xGA模型和蒙特卡洛模拟的专业足球比赛预测平台",
    images: ["/og-image.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
