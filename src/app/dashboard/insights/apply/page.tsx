"use client";

import { ArrowLeft, ArrowRight, BadgeCheck, Clock, PiggyBank, Sparkles, TrendingDown } from "lucide-react";
import Link from "next/link";

const optimizationSteps = [
  {
    title: "중복 구독 정리",
    description: "중복 구독 확인 및 최적화",
    saving: 13900,
    difficulty: "쉬움",
    icon: TrendingDown,
    tips: [
      "멜론과 지니뮤직 중복 구독",
      "프리미엄 요금제 필요성 검토",
      "미사용 서비스 확인"
    ],
    iconColor: "text-[#00C773]",
    bgColor: "bg-[#E8FFF3]"
  },
  {
    title: "요금제 최적화",
    description: "사용량에 맞는 요금제 추천",
    saving: 5500,
    difficulty: "쉬움",
    icon: Sparkles,
    tips: [
      "넷플릭스 프리미엄 → 스탠다드",
      "애플 iCloud 50GB → 200GB 가족공유"
    ],
    iconColor: "text-[#3182F6]",
    bgColor: "bg-[#EEF6FF]"
  },
  {
    title: "연간 구독 전환",
    description: "연간 결제로 할인 받기",
    saving: 22000,
    difficulty: "중간",
    icon: Clock,
    tips: [
      "노션 연간 구독 시 20% 할인",
      "애플 뮤직 연간 구독 혜택"
    ],
    iconColor: "text-[#7048E8]",
    bgColor: "bg-[#F3F0FF]"
  }
];

export default function ApplyPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <div className="max-w-[640px] mx-auto px-4 sm:px-5 py-8 sm:py-10">
        {/* 헤더 */}
        <div className="mb-6 sm:mb-8">
          <Link href="/dashboard/insights" className="inline-block hover:opacity-70 mb-4 sm:mb-6">
            <ArrowLeft className="w-5 sm:w-6 h-5 sm:h-6 text-gray-800" />
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            구독 최적화 가이드
          </h1>
          <p className="text-base sm:text-lg text-gray-600 mt-1.5 sm:mt-2">
            매월 41,400원 절약 가능
          </p>
        </div>

        {/* 최적화 단계 */}
        <div className="space-y-3">
          {optimizationSteps.map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 hover:border-gray-300 transition-all"
            >
              <div className="space-y-3 sm:space-y-4">
                {/* 헤더 */}
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 ${step.bgColor} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <step.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${step.iconColor}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="text-base sm:text-lg font-bold text-gray-900">
                        {step.title}
                      </h3>
                      <div className={`px-2 py-1 ${step.bgColor} rounded-full`}>
                        <span className={`text-xs sm:text-sm font-medium ${step.iconColor}`}>
                          {step.difficulty}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm sm:text-base text-gray-600">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* 절감 금액 */}
                <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 rounded-xl">
                  <PiggyBank className="w-4 sm:w-5 h-4 sm:h-5 text-[#00C773]" />
                  <span className="text-sm sm:text-base font-medium text-gray-900">
                    매월 {step.saving.toLocaleString()}원 절감
                  </span>
                </div>

                {/* 최적화 팁 */}
                <div className="space-y-2 sm:space-y-3">
                  <h4 className="text-sm sm:text-base font-medium text-gray-900">
                    최적화 팁
                  </h4>
                  <div className="space-y-2">
                    {step.tips.map((tip, tipIndex) => (
                      <div key={tipIndex} className="flex items-center gap-2 sm:gap-3">
                        <BadgeCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#3182F6] flex-shrink-0" />
                        <span className="text-sm sm:text-base text-gray-600">{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 적용하기 버튼 */}
                <div className="flex justify-end">
                  <button className="inline-flex items-center gap-1.5 text-sm sm:text-base font-medium text-[#3182F6] hover:text-blue-700">
                    적용하기
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 프로모션 배너 */}
        <div className="mt-5 sm:mt-6 bg-gradient-to-r from-[#3182F6] to-[#408CFF] rounded-2xl p-5 sm:p-6 text-white">
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-lg sm:text-xl font-bold tracking-tight">
              전문가와 상담하기
            </h3>
            <p className="text-sm sm:text-base text-blue-100">
              더 자세한 구독 최적화 상담 필요?
            </p>
            <Link
              href="/dashboard/consulting"
              className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 bg-white text-[#3182F6] rounded-xl font-medium hover:bg-blue-50 transition-colors text-sm sm:text-base"
            >
              무료 상담 신청
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 