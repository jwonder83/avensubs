"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft,
  ChevronRight,
  CreditCard,
  Calendar,
  Bell
} from "lucide-react";

interface Props {
  id: string;
}

export default function SubscribeDetailClient({ id }: Props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleBack = () => {
    router.push("/dashboard/marketplace");
  };

  return (
    <>
      {/* 헤더 */}
      <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-100 z-20">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <button
            onClick={handleBack}
            className="p-2.5 text-gray-800 hover:text-blue-600 flex items-center bg-gray-100 hover:bg-blue-50 rounded-lg transition-colors"
            aria-label="뒤로 가기"
            type="button"
          >
            <ArrowLeft className="w-5 h-5 mr-1" />
            <span className="text-sm font-medium">이전</span>
          </button>
          <span className="text-base font-medium text-gray-900">구독 신청</span>
          <div className="w-20"></div>
        </div>
      </header>

      <main className="pt-20 pb-24 max-w-2xl mx-auto px-4">
        {/* 상단 백버튼 */}
        <div className="mb-4">
          <button
            onClick={handleBack}
            className="p-2.5 text-gray-800 hover:text-blue-600 flex items-center bg-gray-100 hover:bg-blue-50 rounded-lg transition-colors"
            aria-label="이전으로 돌아가기"
            type="button"
          >
            <ArrowLeft className="w-5 h-5 mr-1" />
            <span className="text-sm font-medium">마켓플레이스로 돌아가기</span>
          </button>
        </div>

        <div className="space-y-6">
          {/* 구독 정보 */}
          <div className="bg-white rounded-2xl p-6 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">넷플릭스 프리미엄</h1>
                <p className="text-sm text-gray-600">월 17,000원</p>
              </div>
            </div>
            
            <div className="pt-4 space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                  <span className="text-sm text-gray-600">다음 결제일</span>
                </div>
                <span className="text-sm font-medium text-gray-900">2024년 4월 1일</span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center">
                  <Bell className="w-5 h-5 text-gray-400 mr-3" />
                  <span className="text-sm text-gray-600">결제 알림</span>
                </div>
                <span className="text-sm font-medium text-gray-900">결제 3일 전</span>
              </div>
            </div>
          </div>

          {/* 결제 수단 선택 */}
          <Link 
            href={`/dashboard/marketplace/subscribe/${id}/payment`}
            className="block w-full p-4 bg-white rounded-2xl border border-gray-200 hover:border-gray-300 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <CreditCard className="w-5 h-5 text-gray-400 mr-3" />
                <span className="text-sm text-gray-900">결제 카드 선택</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </Link>

          {/* 약관 동의 */}
          <div className="bg-gray-50 rounded-2xl p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-3">약관 동의</h3>
            <ul className="space-y-2 text-xs text-gray-600">
              <li className="flex items-start">
                <input 
                  type="checkbox" 
                  id="terms" 
                  className="mt-1 mr-2"
                  title="서비스 이용약관 동의" 
                />
                <label htmlFor="terms">서비스 이용약관 동의 (필수)</label>
              </li>
              <li className="flex items-start">
                <input 
                  type="checkbox" 
                  id="privacy" 
                  className="mt-1 mr-2"
                  title="개인정보 수집 및 이용 동의" 
                />
                <label htmlFor="privacy">개인정보 수집 및 이용 동의 (필수)</label>
              </li>
              <li className="flex items-start">
                <input 
                  type="checkbox" 
                  id="marketing" 
                  className="mt-1 mr-2"
                  title="마케팅 정보 수신 동의" 
                />
                <label htmlFor="marketing">마케팅 정보 수신 동의 (선택)</label>
              </li>
            </ul>
          </div>
        </div>

        {/* 하단 버튼 */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 pb-20 z-10">
          <div className="max-w-2xl mx-auto">
            <button
              disabled={isLoading}
              className={`w-full py-3.5 rounded-2xl font-medium transition-colors ${
                isLoading 
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {isLoading ? "처리 중..." : "구독 신청하기"}
            </button>
          </div>
        </div>
      </main>
    </>
  );
} 