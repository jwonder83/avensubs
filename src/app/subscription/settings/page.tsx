"use client";

import { useState } from "react";
import { 
  Bell,
  CreditCard,
  Settings,
  ChevronRight,
  Shield,
  AlertCircle,
  Calendar,
  Clock,
  Wallet,
  BellRing
} from "lucide-react";
import Link from "next/link";

export default function SubscriptionSettingsPage() {
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-8 sm:px-6">
        {/* 헤더 */}
        <div className="mb-8">
          <h1 className="text-[26px] font-bold text-gray-900">구독 설정</h1>
          <p className="text-base text-gray-600 mt-1">구독 서비스 관련 설정을 관리하세요</p>
        </div>

        {/* 설정 섹션 */}
        <div className="space-y-6">
          {/* 결제 설정 */}
          <section className="bg-white rounded-2xl border border-gray-100">
            <div className="px-6 py-5 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">결제 설정</h2>
            </div>
            
            <div className="divide-y divide-gray-100">
              <Link href="/subscription/payment-methods" className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer group">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-base font-medium text-gray-900">결제 수단 관리</div>
                    <div className="text-sm text-gray-500 mt-0.5">등록된 결제 수단을 관리하세요</div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
              </Link>

              <Link href="/subscription/billing-history" className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer group">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center">
                    <Wallet className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-base font-medium text-gray-900">결제 내역</div>
                    <div className="text-sm text-gray-500 mt-0.5">지난 결제 내역을 확인하세요</div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
              </Link>
            </div>
          </section>

          {/* 알림 설정 */}
          <section className="bg-white rounded-2xl border border-gray-100">
            <div className="px-6 py-5 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">알림 설정</h2>
            </div>
            
            <div className="divide-y divide-gray-100">
              <div className="flex items-center justify-between px-6 py-4">
                <label htmlFor="payment-notification" className="flex items-center space-x-4 cursor-pointer">
                  <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center">
                    <BellRing className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-base font-medium text-gray-900">결제 예정 알림</div>
                    <div className="text-sm text-gray-500 mt-0.5">결제 3일 전에 알림을 받습니다</div>
                  </div>
                </label>
                <div className="relative inline-flex items-center">
                  <input 
                    id="payment-notification"
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={isNotificationsEnabled}
                    onChange={() => setIsNotificationsEnabled(!isNotificationsEnabled)}
                    aria-label="결제 예정 알림 설정"
                    title="결제 예정 알림 설정"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </div>
              </div>

              <div className="flex items-center justify-between px-6 py-4">
                <label htmlFor="trial-end-notification" className="flex items-center space-x-4 cursor-pointer">
                  <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center">
                    <Clock className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <div className="text-base font-medium text-gray-900">무료 체험 종료 알림</div>
                    <div className="text-sm text-gray-500 mt-0.5">무료 체험 종료 7일 전에 알림을 받습니다</div>
                  </div>
                </label>
                <div className="relative inline-flex items-center">
                  <input 
                    id="trial-end-notification"
                    type="checkbox" 
                    className="sr-only peer" 
                    defaultChecked 
                    aria-label="무료 체험 종료 알림 설정"
                    title="무료 체험 종료 알림 설정"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </div>
              </div>
            </div>
          </section>

          {/* 보안 설정 */}
          <section className="bg-white rounded-2xl border border-gray-100">
            <div className="px-6 py-5 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">보안 설정</h2>
            </div>
            
            <div className="divide-y divide-gray-100">
              <Link href="/subscription/security" className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer group">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center">
                    <Shield className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <div className="text-base font-medium text-gray-900">결제 비밀번호 설정</div>
                    <div className="text-sm text-gray-500 mt-0.5">결제 시 사용할 비밀번호를 설정하세요</div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
              </Link>

              <Link href="/subscription/auto-payment" className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer group">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-yellow-50 rounded-full flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <div className="text-base font-medium text-gray-900">자동 결제 관리</div>
                    <div className="text-sm text-gray-500 mt-0.5">자동 결제 설정을 관리하세요</div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
              </Link>
            </div>
          </section>

          {/* 도움말 */}
          <div className="bg-blue-50 rounded-2xl p-4 flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-sm font-medium text-blue-900">도움이 필요하신가요?</h3>
              <p className="text-sm text-blue-700 mt-1">
                구독 관련 문의사항은{" "}
                <Link href="/help" className="font-medium underline hover:text-blue-800">
                  고객센터
                </Link>
                를 통해 문의해주세요.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 