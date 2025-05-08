"use client";

import { ArrowLeft, ArrowRight, CheckCircle2, MessageCircle, PhoneCall, Shield } from "lucide-react";
import Link from "next/link";

const benefits = [
  {
    title: "맞춤형 구독 설계",
    description: "전문가가 분석한 최적의 구독 포트폴리오를 제안받으세요",
    icon: CheckCircle2
  },
  {
    title: "실시간 상담",
    description: "궁금한 점이 있다면 언제든 물어보세요",
    icon: MessageCircle
  },
  {
    title: "안전한 상담",
    description: "검증된 전문가와 비밀이 보장된 상담을 진행하세요",
    icon: Shield
  }
];

const consultingSteps = [
  {
    step: 1,
    title: "기본 정보 입력",
    description: "간단한 설문으로 구독 현황을 파악해요"
  },
  {
    step: 2,
    title: "전문가 매칭",
    description: "최적의 전문가를 배정해드려요"
  },
  {
    step: 3,
    title: "맞춤 상담",
    description: "전문가의 분석과 조언을 받아보세요"
  }
];

export default function ConsultingPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <div className="max-w-[640px] mx-auto px-5 py-10">
        {/* 헤더 */}
        <div className="mb-8">
          <Link href="/dashboard/insights" className="inline-block hover:opacity-70 mb-6">
            <ArrowLeft className="w-6 h-6 text-gray-800" />
          </Link>
          <h1 className="text-[26px] font-bold text-gray-900 tracking-tight">
            구독 컨설팅
          </h1>
          <p className="text-[15px] text-gray-600 mt-2">
            전문가와 함께 최적의 구독 라이프를 설계해보세요
          </p>
        </div>

        {/* 혜택 섹션 */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
          <h2 className="text-[17px] font-bold text-gray-900 mb-4">
            컨설팅 혜택
          </h2>
          <div className="space-y-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-8 h-8 bg-[#EEF6FF] rounded-lg flex items-center justify-center flex-shrink-0">
                  <benefit.icon className="w-4 h-4 text-[#3182F6]" />
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-gray-900">
                    {benefit.title}
                  </h3>
                  <p className="text-[13px] text-gray-600 mt-0.5">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 진행 과정 */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
          <h2 className="text-[17px] font-bold text-gray-900 mb-4">
            진행 과정
          </h2>
          <div className="space-y-4">
            {consultingSteps.map((step, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="w-6 h-6 bg-[#EEF6FF] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-[13px] font-bold text-[#3182F6]">
                    {step.step}
                  </span>
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-gray-900">
                    {step.title}
                  </h3>
                  <p className="text-[13px] text-gray-600 mt-0.5">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 상담 신청 버튼 */}
        <div className="bg-gradient-to-r from-[#3182F6] to-[#408CFF] rounded-2xl p-6 text-white">
          <div className="space-y-4">
            <div>
              <h2 className="text-[17px] font-bold">
                지금 바로 시작하세요
              </h2>
              <p className="text-[13px] text-blue-100 mt-1">
                첫 상담은 무료로 진행됩니다
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex-1 inline-flex items-center justify-center gap-2 bg-white text-[#3182F6] rounded-xl py-3 font-medium hover:bg-blue-50 transition-colors text-[15px]">
                <PhoneCall className="w-4 h-4" />
                전화 상담
              </button>
              <button className="flex-1 inline-flex items-center justify-center gap-2 bg-white text-[#3182F6] rounded-xl py-3 font-medium hover:bg-blue-50 transition-colors text-[15px]">
                <MessageCircle className="w-4 h-4" />
                채팅 상담
              </button>
            </div>
          </div>
        </div>

        {/* 안내 문구 */}
        <p className="text-[13px] text-gray-500 text-center mt-6">
          상담 가능 시간: 평일 오전 9시 ~ 오후 6시
        </p>
      </div>
    </div>
  );
} 