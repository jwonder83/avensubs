"use client";

import { useState } from "react";
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line,
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  Clock,
  BadgeInfo,
  Users,
  Zap,
  PiggyBank,
  Target,
  ArrowRight,
  ChevronRight,
  ChevronDown,
  Info,
  Star,
  Shield,
  ArrowUpRight,
  BarChart2,
  Sparkles,
  Bell,
  ArrowLeft
} from 'lucide-react';
import Link from "next/link";

const monthlyData = [
  { month: "1월", 지출: 92000, 예상: 90000 },
  { month: "2월", 지출: 98500, 예상: 92000 },
  { month: "3월", 지출: 113000, 예상: 100000 },
  { month: "4월", 지출: 136500, 예상: 110000 },
  { month: "5월", 지출: 124500, 예상: 125000 },
  { month: "6월", 지출: null, 예상: 122000 },
  { month: "7월", 지출: null, 예상: 120000 }
];

const categoryData = [
  { name: "엔터", value: 46800, color: "#FF6A6A", bgClass: "bg-red-400" },
  { name: "음악", value: 26700, color: "#4F98FF", bgClass: "bg-blue-400" },
  { name: "유틸리티", value: 22000, color: "#3BD8A7", bgClass: "bg-green-400" },
  { name: "교육", value: 19000, color: "#FFB72B", bgClass: "bg-amber-400" },
  { name: "식품", value: 6900, color: "#9D7BFD", bgClass: "bg-purple-400" },
  { name: "기부", value: 10000, color: "#F670C7", bgClass: "bg-pink-400" }
];

const userComparisonData = [
  { name: '총 지출', 당신: 124500, 유사그룹: 142000 },
  { name: '구독 수', 당신: 8, 유사그룹: 7 },
  { name: '평균 금액', 당신: 15560, 유사그룹: 20285 }
];

const optimizationSuggestions = [
  {
    title: "음악 서비스 통합",
    description: "멜론과 지니뮤직 통합",
    icon: TrendingDown,
    iconColor: "text-[#00C773]",
    bgColor: "bg-[#E8FFF3]",
    saving: 7900,
    difficulty: "쉬움",
    badge: "추천"
  },
  {
    title: "넷플릭스 요금제",
    description: "스탠다드로 변경",
    icon: TrendingDown,
    iconColor: "text-[#3182F6]",
    bgColor: "bg-[#EEF6FF]",
    saving: 4000,
    difficulty: "쉬움"
  },
  {
    title: "노션 연간 구독",
    description: "연간 결제로 변경",
    icon: Clock,
    iconColor: "text-green-500",
    bgColor: "bg-[#EEF6FF]",
    saving: 22000,
    difficulty: "중간"
  }
];

const insights = [
  {
    title: "구독 최적화",
    description: "중복 및 미사용 서비스 확인",
    icon: Sparkles,
    color: "text-[#3182F6]",
    bgColor: "bg-[#EEF6FF]",
    link: "/dashboard/insights/apply",
    tag: "추천"
  },
  {
    title: "소비 패턴",
    description: "서비스 사용 현황 분석",
    icon: Target,
    color: "text-[#7048E8]",
    bgColor: "bg-[#F3F0FF]",
    link: "/dashboard/insights/details"
  },
  {
    title: "구독 트렌드",
    description: "새로운 서비스 추천",
    icon: Zap,
    color: "text-[#00C773]",
    bgColor: "bg-[#E8FFF3]",
    link: "/dashboard/insights/more"
  }
];

export default function InsightsPage() {
  const [timeFrame, setTimeFrame] = useState("monthly");

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <div className="max-w-[640px] mx-auto px-4 sm:px-5 py-8 sm:py-10">
        {/* 헤더 섹션 */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                구독 인사이트
              </h1>
              <p className="text-base sm:text-lg text-gray-600 mt-1.5 sm:mt-2">
                구독 서비스 분석 결과
              </p>
            </div>
            <Link
              href="/dashboard/notifications"
              className="flex items-center gap-1.5 px-3 py-2 bg-white rounded-xl border border-gray-200 hover:border-gray-300 transition-all shadow-sm"
            >
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="text-sm sm:text-base font-medium text-gray-800">알림</span>
            </Link>
          </div>
        </div>

        {/* 통계 섹션 */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 mb-4">
          <div className="grid grid-cols-3 gap-3 sm:gap-6">
            <div className="space-y-1 sm:space-y-1.5">
              <div className="text-sm sm:text-base text-gray-500">총 구독 비용</div>
              <div className="text-xl sm:text-2xl font-bold text-gray-900">89,700원</div>
              <div className="inline-flex items-center gap-1 px-2 py-1 bg-[#E8FFF3] rounded-full">
                <TrendingDown className="w-4 h-4 text-[#00C773]" />
                <span className="text-xs sm:text-sm font-medium text-[#00C773]">12% 감소</span>
              </div>
            </div>
            <div className="space-y-1 sm:space-y-1.5">
              <div className="text-sm sm:text-base text-gray-500">구독 서비스</div>
              <div className="text-xl sm:text-2xl font-bold text-gray-900">7개</div>
              <div className="inline-flex items-center gap-1 px-2 py-1 bg-[#FFF0F0] rounded-full">
                <TrendingUp className="w-4 h-4 text-[#FF4545]" />
                <span className="text-xs sm:text-sm font-medium text-[#FF4545]">2개 증가</span>
              </div>
            </div>
            <div className="space-y-1 sm:space-y-1.5">
              <div className="text-sm sm:text-base text-gray-500">절감 가능 금액</div>
              <div className="text-xl sm:text-2xl font-bold text-gray-900">27,300원</div>
              <div className="inline-flex items-center gap-1 px-2 py-1 bg-[#EEF6FF] rounded-full">
                <PiggyBank className="w-4 h-4 text-[#3182F6]" />
                <span className="text-xs sm:text-sm font-medium text-[#3182F6]">최적화 시</span>
              </div>
            </div>
          </div>
        </div>

        {/* 인사이트 카드 */}
        <div className="space-y-2 mb-4">
          {insights.map((insight, index) => (
            <Link 
              key={index}
              href={insight.link}
              className="group block bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 ${insight.bgColor} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <insight.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${insight.color}`} />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base sm:text-lg font-bold text-gray-900">{insight.title}</h3>
                      {insight.tag && (
                        <span className="px-2 py-1 bg-[#EEF6FF] text-[#3182F6] text-xs sm:text-sm font-medium rounded-full">
                          {insight.tag}
                        </span>
                      )}
                    </div>
                    <p className="text-sm sm:text-base text-gray-600 mt-1 pr-6">{insight.description}</p>
                  </div>
                </div>
                <div className="flex items-center text-[#3182F6] group-hover:translate-x-1 transition-transform duration-200">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* 추천 섹션 */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 mb-4">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-gray-900">맞춤 추천</h2>
              <p className="text-sm text-gray-500 mt-0.5">최적화 제안</p>
            </div>
            <Link 
              href="/dashboard/insights/more" 
              className="flex items-center gap-1 text-sm sm:text-base text-[#3182F6] hover:text-blue-700 font-medium group"
            >
              더보기
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>
          
          <div className="space-y-2">
            {optimizationSuggestions.map((suggestion, index) => (
              <div 
                key={index}
                className="p-4 sm:p-5 bg-[#F8F9FA] rounded-xl hover:bg-gray-100 transition-colors duration-200"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-start gap-3">
                      <div className={`w-9 h-9 sm:w-10 sm:h-10 ${suggestion.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <suggestion.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${suggestion.iconColor}`} />
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-base sm:text-lg font-bold text-gray-900">
                            {suggestion.title}
                          </h3>
                          {suggestion.badge && (
                            <span className="px-2 py-1 bg-[#EEF6FF] text-[#3182F6] text-xs sm:text-sm font-medium rounded-full">
                              {suggestion.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-sm sm:text-base text-gray-600 mt-1 pr-12">
                          {suggestion.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 ml-12">
                      <div className="px-2 py-1 bg-[#E8FFF3] rounded-full">
                        <span className="text-xs sm:text-sm font-medium text-[#00C773]">
                          {suggestion.saving.toLocaleString()}원 절감
                        </span>
                      </div>
                      <div className="px-2 py-1 bg-[#EEF6FF] rounded-full">
                        <span className="text-xs sm:text-sm font-medium text-[#3182F6]">
                          {suggestion.difficulty}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Link
                    href="/dashboard/insights/details"
                    className="flex items-center text-[#3182F6] hover:text-blue-700 group"
                  >
                    <span className="text-sm sm:text-base font-medium">자세히</span>
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 프로모션 배너 */}
        <div className="bg-gradient-to-r from-[#3182F6] to-[#408CFF] rounded-2xl p-5 sm:p-6 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#4C98FF] rounded-full blur-3xl opacity-50 -translate-y-24 translate-x-24"></div>
          <div className="relative z-10 space-y-3 sm:space-y-4">
            <h3 className="text-lg sm:text-xl font-bold tracking-tight">
              구독 컨설팅 받기
            </h3>
            <p className="text-sm sm:text-base text-blue-100 tracking-tight">
              전문가와 함께 최적의 구독 설계
            </p>
            <Link
              href="/dashboard/consulting"
              className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 bg-white text-[#3182F6] rounded-xl font-medium hover:bg-blue-50 transition-colors text-sm sm:text-base"
            >
              상담 신청
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 