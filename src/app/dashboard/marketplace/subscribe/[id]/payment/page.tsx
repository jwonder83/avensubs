"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft,
  CreditCard,
  Lock,
  ChevronRight,
  AlertCircle,
  Check,
  Shield
} from "lucide-react";
import Link from "next/link";

interface Props {
  params: {
    id: string;
  };
}

export default function PaymentSetup({ params }: Props) {
  const router = useRouter();
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleBack = () => {
    router.push(`/dashboard/marketplace/subscribe/${params.id}`);
  };

  const cards = [
    { id: '1', name: '현대카드', last4: '1234', color: 'bg-red-500' },
    { id: '2', name: '삼성카드', last4: '5678', color: 'bg-blue-500' },
    { id: '3', name: '신한카드', last4: '9012', color: 'bg-green-500' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCard) {
      setError("결제 카드를 선택해주세요.");
      return;
    }
    
    try {
      // TODO: API 연동
      router.push("/dashboard");
    } catch (error) {
      setError("카드 등록 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="min-h-screen bg-white">
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
          <span className="text-base font-medium text-gray-900">결제 카드 연결</span>
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
            <span className="text-sm font-medium">구독 신청으로 돌아가기</span>
          </button>
        </div>

        {/* 에러 메시지 */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 rounded-2xl flex items-start">
            <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <div className="space-y-8">
          {/* 안내 메시지 */}
          <div className="text-center py-4">
            <h1 className="text-xl font-semibold text-gray-900 mb-2">
              결제 카드를 선택해주세요
            </h1>
            <p className="text-sm text-gray-600">
              안전한 결제를 위해 카드를 등록해주세요
            </p>
          </div>

          {/* 보안 배지 */}
          <div className="bg-blue-50 rounded-2xl p-4 flex items-center">
            <Shield className="w-5 h-5 text-blue-500 mr-3" />
            <div>
              <h3 className="text-sm font-medium text-gray-900">안전한 결제 시스템</h3>
              <p className="text-xs text-gray-600 mt-0.5">
                은행급 보안 시스템으로 안전하게 보호됩니다
              </p>
            </div>
          </div>

          {/* 카드 목록 */}
          <div className="space-y-3">
            {cards.map((card) => (
              <button
                key={card.id}
                onClick={() => setSelectedCard(card.id)}
                className={`w-full p-4 rounded-2xl border-2 transition-all ${
                  selectedCard === card.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-100 hover:border-gray-200"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-10 h-10 ${card.color} rounded-lg flex items-center justify-center`}>
                      <CreditCard className="w-5 h-5 text-white" />
                    </div>
                    <div className="ml-3 text-left">
                      <div className="text-sm font-medium text-gray-900">{card.name}</div>
                      <div className="text-xs text-gray-500 mt-0.5">**** {card.last4}</div>
                    </div>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedCard === card.id
                      ? "border-blue-500 bg-blue-500"
                      : "border-gray-200"
                  }`}>
                    {selectedCard === card.id && (
                      <Check className="w-4 h-4 text-white" />
                    )}
                  </div>
                </div>
              </button>
            ))}

            {/* 새 카드 추가 버튼 */}
            <Link
              href="/cards/add"
              className="w-full p-4 rounded-2xl border-2 border-dashed border-gray-200 flex items-center justify-center text-blue-600 hover:bg-blue-50 transition-colors"
            >
              <CreditCard className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">새로운 카드 추가</span>
            </Link>
          </div>

          {/* 보안 정보 */}
          <div className="bg-gray-50 rounded-2xl p-4">
            <div className="flex items-center mb-3">
              <Lock className="w-5 h-5 text-gray-400 mr-2" />
              <h3 className="text-sm font-medium text-gray-900">보안 정보</h3>
            </div>
            <ul className="space-y-2 text-xs text-gray-600">
              <li className="flex items-start">
                <Check className="w-4 h-4 text-gray-400 mr-2 mt-0.5" />
                카드 정보는 암호화되어 안전하게 보관됩니다
              </li>
              <li className="flex items-start">
                <Check className="w-4 h-4 text-gray-400 mr-2 mt-0.5" />
                모든 결제는 실시간 모니터링됩니다
              </li>
              <li className="flex items-start">
                <Check className="w-4 h-4 text-gray-400 mr-2 mt-0.5" />
                이상거래 탐지 시 즉시 알림을 보내드립니다
              </li>
            </ul>
          </div>
        </div>

        {/* 하단 버튼 */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 pb-20 z-10">
          <div className="max-w-2xl mx-auto">
            <button
              onClick={handleSubmit}
              disabled={!selectedCard}
              className={`w-full py-3.5 rounded-2xl font-medium transition-colors ${
                selectedCard
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
            >
              결제 카드 연결하기
            </button>
          </div>
        </div>
      </main>
    </div>
  );
} 