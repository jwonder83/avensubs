"use client";

import { ArrowLeft, Bell, CircleDot, Settings } from "lucide-react";
import Link from "next/link";

const notifications = [
  {
    id: 1,
    title: "구독 결제 예정 안내",
    description: "내일(12월 1일) 넷플릭스 프리미엄 요금제가 결제될 예정이에요.",
    time: "방금 전",
    isNew: true,
    type: "payment"
  },
  {
    id: 2,
    title: "구독 최적화 추천",
    description: "중복되는 음악 스트리밍 서비스를 하나로 통합하면 월 7,900원을 절약할 수 있어요.",
    time: "1시간 전",
    isNew: true,
    type: "recommendation"
  },
  {
    id: 3,
    title: "가격 인상 안내",
    description: "디즈니플러스 스트리밍 서비스 요금이 12월부터 인상될 예정이에요.",
    time: "어제",
    isNew: false,
    type: "notice"
  },
  {
    id: 4,
    title: "연간 구독 전환 혜택",
    description: "노션 구독을 연간 결제로 전환하면 22,000원을 절약할 수 있어요.",
    time: "3일 전",
    isNew: false,
    type: "recommendation"
  }
];

export default function NotificationsPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <div className="max-w-[640px] mx-auto px-5 py-10">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/dashboard/insights" className="hover:opacity-70">
              <ArrowLeft className="w-6 h-6 text-gray-800" />
            </Link>
            <div>
              <h1 className="text-[26px] font-bold text-gray-900 tracking-tight">
                알림
              </h1>
              <p className="text-[15px] text-gray-600 mt-1">
                중요한 구독 소식을 놓치지 마세요
              </p>
            </div>
          </div>
          <Link
            href="/dashboard/settings"
            className="flex items-center justify-center w-10 h-10 rounded-xl hover:bg-gray-100"
          >
            <Settings className="w-5 h-5 text-gray-600" />
          </Link>
        </div>

        {/* 알림 목록 */}
        <div className="space-y-2">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="bg-white rounded-2xl border border-gray-100 p-5 hover:border-gray-300 transition-all cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  {notification.isNew && (
                    <CircleDot className="w-2 h-2 text-[#3182F6]" />
                  )}
                </div>
                <div className="flex-1 space-y-1.5">
                  <h3 className="text-[15px] font-bold text-gray-900">
                    {notification.title}
                  </h3>
                  <p className="text-[13px] text-gray-600">
                    {notification.description}
                  </p>
                  <p className="text-[13px] text-gray-400">
                    {notification.time}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 설정 안내 */}
        <div className="mt-8 text-center">
          <p className="text-[13px] text-gray-500">
            알림 설정을 변경하고 싶으신가요?
          </p>
          <Link
            href="/dashboard/settings"
            className="inline-flex items-center gap-1 text-[13px] text-[#3182F6] font-medium mt-2 hover:underline"
          >
            알림 설정하기
            <Settings className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
} 