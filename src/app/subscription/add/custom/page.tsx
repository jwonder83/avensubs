"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  Calendar,
  CreditCard,
  Bell,
  Check,
  ChevronRight,
  AlertCircle
} from "lucide-react";
import Link from "next/link";

export default function CustomSubscriptionAdd() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    billingCycle: "monthly",
    firstPaymentDate: "",
    category: "",
    notificationEnabled: true
  });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // TODO: API 연동
      router.push("/dashboard");
    } catch (error) {
      setError("구독 추가 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 헤더 */}
      <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-100 z-10">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="p-2 -ml-2 text-gray-600 hover:text-gray-900"
            aria-label="뒤로 가기"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="text-base font-medium text-gray-900">구독 추가</span>
          <div className="w-9"></div>
        </div>
      </header>

      <main className="pt-14 pb-24 max-w-2xl mx-auto px-4">
        {/* 에러 메시지 */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 rounded-2xl flex items-start">
            <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8 mt-6">
          {/* 기본 정보 */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">기본 정보</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  구독 이름
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="예) 넷플릭스, 멜론"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  결제 금액
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="0"
                    required
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">원</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  결제 주기
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {["monthly", "yearly", "weekly"].map((cycle) => (
                    <button
                      key={cycle}
                      type="button"
                      onClick={() => setFormData({ ...formData, billingCycle: cycle })}
                      className={`px-4 py-3 rounded-2xl text-sm font-medium ${
                        formData.billingCycle === cycle
                          ? "bg-blue-50 text-blue-600 border-2 border-blue-500"
                          : "bg-gray-50 text-gray-700 border border-gray-200"
                      }`}
                    >
                      {cycle === "monthly" ? "월간" : cycle === "yearly" ? "연간" : "주간"}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  첫 결제일
                </label>
                <input
                  type="date"
                  value={formData.firstPaymentDate}
                  onChange={(e) => setFormData({ ...formData, firstPaymentDate: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  required
                  placeholder="YYYY-MM-DD"
                  title="첫 결제일을 선택해주세요"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  카테고리
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: "video", name: "비디오", icon: "🎬" },
                    { id: "music", name: "음악", icon: "🎵" },
                    { id: "shopping", name: "쇼핑", icon: "🛍" },
                    { id: "book", name: "도서", icon: "📚" },
                    { id: "game", name: "게임", icon: "🎮" },
                    { id: "other", name: "기타", icon: "✨" }
                  ].map((category) => (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, category: category.id })}
                      className={`flex items-center px-4 py-3 rounded-2xl text-sm font-medium ${
                        formData.category === category.id
                          ? "bg-blue-50 text-blue-600 border-2 border-blue-500"
                          : "bg-gray-50 text-gray-700 border border-gray-200"
                      }`}
                    >
                      <span className="mr-2">{category.icon}</span>
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 알림 설정 */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">알림 설정</h2>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, notificationEnabled: !formData.notificationEnabled })}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl border ${
                formData.notificationEnabled
                  ? "bg-blue-50 border-blue-200"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <div className="flex items-center">
                <Bell className={`w-5 h-5 ${formData.notificationEnabled ? "text-blue-500" : "text-gray-400"}`} />
                <span className="ml-3 text-sm font-medium text-gray-900">결제일 알림 받기</span>
              </div>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                formData.notificationEnabled ? "bg-blue-500" : "bg-gray-300"
              }`}>
                <Check className="w-4 h-4 text-white" />
              </div>
            </button>
            <p className="mt-2 text-xs text-gray-500">결제일 3일 전에 알림을 보내드려요</p>
          </div>

          {/* 하단 버튼 */}
          <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-gray-100 p-4">
            <div className="max-w-2xl mx-auto">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3.5 rounded-2xl font-medium hover:bg-blue-700 transition-colors"
              >
                구독 추가하기
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
} 