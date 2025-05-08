"use client";

import { ArrowLeft, ArrowRight, BarChart2, ChevronRight, LineChart, PieChart, TrendingDown, TrendingUp, Users } from "lucide-react";
import Link from "next/link";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const monthlyData = [
  { month: "7월", amount: 89700 },
  { month: "8월", amount: 92000 },
  { month: "9월", amount: 98500 },
  { month: "10월", amount: 113000 },
  { month: "11월", amount: 124500 },
  { month: "12월", amount: 89700 }
];

const categoryData = [
  { name: "엔터테인먼트", amount: 46800, ratio: 38, trend: "증가", color: "text-[#FF6A6A]", bgColor: "bg-red-50" },
  { name: "음악", amount: 26700, ratio: 22, trend: "유지", color: "text-[#4F98FF]", bgColor: "bg-blue-50" },
  { name: "유틸리티", amount: 22000, ratio: 18, trend: "감소", color: "text-[#00C773]", bgColor: "bg-green-50" },
  { name: "교육", amount: 19000, ratio: 15, trend: "유지", color: "text-[#FFB72B]", bgColor: "bg-amber-50" },
  { name: "기타", amount: 8900, ratio: 7, trend: "유지", color: "text-[#9D7BFD]", bgColor: "bg-purple-50" }
];

const insights = [
  {
    title: "구독 지출 증가",
    description: "전월 대비 12% 증가",
    type: "warning",
    icon: TrendingUp,
    color: "text-[#FF4545]",
    bgColor: "bg-[#FFF0F0]"
  },
  {
    title: "엔터 비중 높음",
    description: "전체 구독의 38% 차지",
    type: "info",
    icon: PieChart,
    color: "text-[#3182F6]",
    bgColor: "bg-[#EEF6FF]"
  },
  {
    title: "또래 평균보다 높음",
    description: "또래보다 월 32,000원 더 지출",
    type: "warning",
    icon: Users,
    color: "text-[#FF4545]",
    bgColor: "bg-[#FFF0F0]"
  }
];

export default function DetailsPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <div className="max-w-[640px] mx-auto px-4 sm:px-5 py-8 sm:py-10">
        {/* 헤더 */}
        <div className="mb-6 sm:mb-8">
          <Link href="/dashboard/insights" className="inline-block hover:opacity-70 mb-4 sm:mb-6">
            <ArrowLeft className="w-5 sm:w-6 h-5 sm:h-6 text-gray-800" />
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            구독 분석
          </h1>
          <p className="text-base sm:text-lg text-gray-600 mt-1.5 sm:mt-2">
            구독 서비스 사용 패턴 분석
          </p>
        </div>

        {/* 주요 인사이트 */}
        <div className="space-y-2 mb-6 sm:mb-8">
          {insights.map((insight, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5"
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 ${insight.bgColor} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <insight.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${insight.color}`} />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-gray-900">
                    {insight.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 mt-1">
                    {insight.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 월별 추이 */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-6 mb-5 sm:mb-6">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                월별 구독 비용
              </h2>
              <p className="text-sm text-gray-500 mt-0.5">
                최근 6개월 지출 추이
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="px-2 py-1 bg-[#FFF0F0] rounded-full">
                <span className="text-xs sm:text-sm font-medium text-[#FF4545]">
                  평균 101,200원
                </span>
              </div>
            </div>
          </div>
          <div className="h-[180px] sm:h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3182F6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3182F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                  tickFormatter={(value) => `${(value/10000).toFixed(1)}만`}
                  dx={-10}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    fontSize: '13px'
                  }}
                  formatter={(value) => [`${value.toLocaleString()}원`, '구독 비용']}
                  labelStyle={{ fontSize: 12, color: '#6B7280' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="#3182F6" 
                  strokeWidth={2}
                  fill="url(#colorAmount)"
                  dot={{ fill: '#3182F6', strokeWidth: 2, r: 4, stroke: 'white' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 카테고리별 분석 */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                카테고리별 분석
              </h2>
              <p className="text-sm text-gray-500 mt-0.5">
                이번 달 기준
              </p>
            </div>
          </div>
          <div className="space-y-3 sm:space-y-4">
            {categoryData.map((category, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className={`w-9 h-9 sm:w-10 sm:h-10 ${category.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <span className={`text-sm sm:text-base font-bold ${category.color}`}>
                      {category.ratio}%
                    </span>
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-gray-900">
                      {category.name}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600">
                      {category.amount.toLocaleString()}원
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {category.trend === "증가" && (
                    <div className="px-2 py-1 bg-[#FFF0F0] rounded-full">
                      <span className="text-xs sm:text-sm font-medium text-[#FF4545]">
                        증가
                      </span>
                    </div>
                  )}
                  {category.trend === "감소" && (
                    <div className="px-2 py-1 bg-[#E8FFF3] rounded-full">
                      <span className="text-xs sm:text-sm font-medium text-[#00C773]">
                        감소
                      </span>
                    </div>
                  )}
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 최적화 추천 배너 */}
        <div className="mt-5 sm:mt-6 bg-gradient-to-r from-[#3182F6] to-[#408CFF] rounded-2xl p-5 sm:p-6 text-white">
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-lg sm:text-xl font-bold tracking-tight">
              구독 최적화하기
            </h3>
            <p className="text-sm sm:text-base text-blue-100 leading-relaxed">
              매월 41,400원 절약 가능
            </p>
            <Link
              href="/dashboard/insights/apply"
              className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 bg-white text-[#3182F6] rounded-xl font-medium hover:bg-blue-50 transition-colors text-sm sm:text-base"
            >
              최적화 시작하기
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 