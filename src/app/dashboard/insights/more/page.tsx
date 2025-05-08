"use client";

import { ArrowLeft, TrendingUp, TrendingDown, ArrowRight, Sparkles, Target, Zap, PiggyBank, Shield } from "lucide-react";
import Link from "next/link";

const categories = [
  {
    title: "비용 절감",
    description: "구독 비용을 줄일 수 있는 방법",
    icon: PiggyBank,
    insights: [
      {
        title: "연간 구독으로 전환하기",
        description: "월간에서 연간 결제로 전환 시 최대 25% 할인",
        saving: 45600,
        tag: "추천"
      },
      {
        title: "패밀리 플랜 활용하기",
        description: "개인 계정을 패밀리 플랜으로 전환하여 비용 절감",
        saving: 28800
      }
    ]
  },
  {
    title: "사용 최적화",
    description: "구독 서비스 활용도 높이기",
    icon: Target,
    insights: [
      {
        title: "미사용 서비스 발견",
        description: "3개월 이상 사용하지 않은 서비스 확인",
        saving: 32000,
        tag: "주의"
      },
      {
        title: "중복 기능 통합",
        description: "비슷한 기능의 서비스 통합으로 비용 절감",
        saving: 15000
      }
    ]
  },
  {
    title: "새로운 혜택",
    description: "알아두면 좋은 구독 혜택",
    icon: Sparkles,
    insights: [
      {
        title: "신규 할인 프로모션",
        description: "이번 달 새롭게 등장한 할인 혜택 모음",
        tag: "새로움"
      },
      {
        title: "결합 할인 찾기",
        description: "여러 서비스 동시 구독 시 추가 할인",
        saving: 12000
      }
    ]
  }
];

export default function MoreInsightsPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <div className="max-w-[640px] mx-auto px-5 py-10">
        {/* 헤더 */}
        <div className="mb-8">
          <Link 
            href="/dashboard/insights" 
            className="inline-flex items-center gap-1 text-gray-500 hover:text-gray-700 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-[13px]">인사이트</span>
          </Link>
          <h1 className="text-[26px] font-bold text-gray-900 tracking-tight">
            모든 인사이트
          </h1>
          <p className="text-[15px] text-gray-600 mt-2">
            카테고리별 상세 인사이트를 확인해보세요
          </p>
        </div>

        {/* 카테고리별 인사이트 */}
        <div className="space-y-8">
          {categories.map((category, index) => (
            <div key={index} className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#EEF6FF] rounded-lg flex items-center justify-center">
                  <category.icon className="w-4 h-4 text-[#3182F6]" />
                </div>
                <div>
                  <h2 className="text-[17px] font-bold text-gray-900">{category.title}</h2>
                  <p className="text-[13px] text-gray-500">{category.description}</p>
                </div>
              </div>

              <div className="space-y-2">
                {category.insights.map((insight, insightIndex) => (
                  <div 
                    key={insightIndex}
                    className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="text-[15px] font-bold text-gray-900">
                            {insight.title}
                          </h3>
                          {insight.tag && (
                            <span className="px-2 py-1 bg-blue-50 text-[#3182F6] text-[13px] font-medium rounded-full">
                              {insight.tag}
                            </span>
                          )}
                        </div>
                        <p className="text-[13px] text-gray-600">
                          {insight.description}
                        </p>
                        {insight.saving && (
                          <div className="inline-flex items-center gap-1 px-2 py-1 bg-[#E8FFF3] rounded-full">
                            <TrendingDown className="w-3.5 h-3.5 text-[#00C773]" />
                            <span className="text-[13px] font-medium text-[#00C773]">
                              월 {insight.saving.toLocaleString()}원 절감
                            </span>
                          </div>
                        )}
                      </div>
                      <button className="flex items-center text-[#3182F6] hover:text-blue-700 group">
                        <span className="text-[13px] font-medium">자세히</span>
                        <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 프로모션 배너 */}
        <div className="mt-8 bg-gradient-to-r from-[#3182F6] to-[#408CFF] rounded-2xl p-6 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#4C98FF] rounded-full blur-3xl opacity-50 -translate-y-24 translate-x-24"></div>
          <div className="relative z-10 space-y-3">
            <h3 className="text-[17px] font-bold tracking-tight">
              맞춤 인사이트 받기
            </h3>
            <p className="text-[13px] text-blue-100 tracking-tight">
              AI가 분석한 맞춤형 구독 관리 인사이트를 받아보세요
            </p>
            <button className="inline-flex items-center gap-1.5 px-4 py-2 bg-white text-[#3182F6] rounded-xl font-medium hover:bg-blue-50 transition-colors text-[13px]">
              설정하기
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 