"use client";

import { useState } from "react";
import { 
  ArrowLeft,
  CreditCard,
  Calendar,
  Shield,
  CheckCircle2,
  AlertCircle,
  ChevronRight
} from "lucide-react";
import Link from "next/link";

interface SubscribeFormProps {
  id: string;
}

export default function SubscribeForm({ id }: SubscribeFormProps) {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('monthly');
  const [isLoading, setIsLoading] = useState(false);

  // 실제 구현에서는 API로 데이터를 가져와야 합니다
  const serviceData = {
    id: id,
    name: "넷플릭스",
    description: "전 세계 인기 영화와 드라마, 애니메이션을 무제한으로",
    monthlyPrice: 17000,
    yearlyPrice: 170000, // 10% 할인
    features: [
      "모든 콘텐츠 무제한 시청",
      "최대 4개 디바이스 동시 시청",
      "HDR 화질 지원",
      "오프라인 저장 가능"
    ]
  };

  const handleSubscribe = async () => {
    setIsLoading(true);
    // 실제 구현에서는 여기에 구독 로직을 추가합니다
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    // 구독 완료 후 대시보드로 이동
    window.location.href = "/dashboard";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-8 sm:px-6">
        {/* 헤더 */}
        <div className="mb-8">
          <Link 
            href="/dashboard/marketplace" 
            className="inline-flex items-center text-gray-500 hover:text-gray-700 mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-1" />
            마켓플레이스로 돌아가기
          </Link>
          <h1 className="text-[26px] font-bold text-gray-900">{serviceData.name} 구독 신청</h1>
          <p className="text-base text-gray-600 mt-1">{serviceData.description}</p>
        </div>

        {/* 요금제 선택 */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">요금제 선택</h2>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setSelectedPlan('monthly')}
              className={`p-4 rounded-xl border-2 transition-all ${
                selectedPlan === 'monthly'
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-100 hover:border-gray-200'
              }`}
            >
              <div className="text-lg font-bold text-gray-900">
                월간 요금제
              </div>
              <div className="text-2xl font-bold text-blue-600 mt-2">
                {serviceData.monthlyPrice.toLocaleString()}원
              </div>
              <div className="text-sm text-gray-500 mt-1">매월</div>
            </button>

            <button
              onClick={() => setSelectedPlan('yearly')}
              className={`p-4 rounded-xl border-2 transition-all ${
                selectedPlan === 'yearly'
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-100 hover:border-gray-200'
              }`}
            >
              <div className="text-lg font-bold text-gray-900">
                연간 요금제
                <span className="ml-2 text-sm font-medium text-blue-600">
                  10% 할인
                </span>
              </div>
              <div className="text-2xl font-bold text-blue-600 mt-2">
                {serviceData.yearlyPrice.toLocaleString()}원
              </div>
              <div className="text-sm text-gray-500 mt-1">연간</div>
            </button>
          </div>
        </div>

        {/* 구독 혜택 */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">구독 혜택</h2>
          <div className="space-y-3">
            {serviceData.features.map((feature, index) => (
              <div key={index} className="flex items-center text-gray-700">
                <CheckCircle2 className="w-5 h-5 text-blue-500 mr-3" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 결제 정보 */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">결제 정보</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center">
                <CreditCard className="w-5 h-5 text-gray-400 mr-3" />
                <div>
                  <div className="font-medium text-gray-900">결제 수단</div>
                  <div className="text-sm text-gray-500">카드 선택</div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                <div>
                  <div className="font-medium text-gray-900">결제일</div>
                  <div className="text-sm text-gray-500">매월 1일</div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* 안내사항 */}
        <div className="bg-blue-50 rounded-2xl p-4 mb-8">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium text-blue-900">구독 시 유의사항</h3>
              <p className="text-sm text-blue-700 mt-1">
                구독은 매월 자동으로 갱신되며, 언제든 해지할 수 있습니다.
                해지 시에도 현재 결제 주기 종료일까지 서비스를 이용할 수 있습니다.
              </p>
            </div>
          </div>
        </div>

        {/* 결제 버튼 */}
        <div className="flex justify-between items-center bg-white fixed bottom-0 left-0 right-0 p-4 border-t border-gray-100 md:relative md:border-0 md:p-0 md:bg-transparent">
          <div className="text-right md:flex-1">
            <div className="text-sm text-gray-500">총 결제 금액</div>
            <div className="text-xl font-bold text-gray-900">
              {selectedPlan === 'monthly' 
                ? serviceData.monthlyPrice.toLocaleString() 
                : serviceData.yearlyPrice.toLocaleString()}원
            </div>
          </div>
          <button
            onClick={handleSubscribe}
            disabled={isLoading}
            className={`ml-4 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium md:text-lg
              ${isLoading ? 'opacity-75 cursor-not-allowed' : 'hover:bg-blue-700'} 
              transition-colors flex-shrink-0`}
          >
            {isLoading ? '처리중...' : '구독 신청하기'}
          </button>
        </div>
      </div>
    </div>
  );
} 