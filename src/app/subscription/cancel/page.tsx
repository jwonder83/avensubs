"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ChevronRight,
  Calendar,
  CreditCard
} from 'lucide-react';

const reasons = [
  { id: 'price', label: '구독료가 부담됩니다' },
  { id: 'usage', label: '자주 사용하지 않습니다' },
  { id: 'content', label: '원하는 콘텐츠가 부족합니다' },
  { id: 'alternative', label: '다른 서비스를 이용하려고 합니다' },
  { id: 'temporary', label: '일시적으로 해지 후 재구독 예정입니다' },
  { id: 'other', label: '기타' }
];

export default function CancelSubscription() {
  const router = useRouter();
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleCancel = () => {
    setIsConfirmOpen(true);
  };

  const handleConfirmCancel = () => {
    // 실제 구현 시에는 API를 통해 구독 해지 처리
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* 헤더 */}
        <div className="flex items-center mb-6">
          <Link
            href="/subscription/manage/1"
            className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-gray-900">구독 해지</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              구독 해지 전 아래 내용을 확인해주세요
            </p>
          </div>
        </div>

        {/* 현재 구독 정보 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center text-white shadow-sm">
                <span className="text-2xl">🎬</span>
              </div>
              <div className="ml-3">
                <h2 className="text-lg font-bold text-gray-900">넷플릭스</h2>
                <p className="text-sm text-gray-500">프리미엄 요금제</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-gray-900">17,000원</div>
              <div className="text-sm text-gray-500">매월</div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-gray-500 mr-2" />
                <span className="text-sm text-gray-600">다음 결제일</span>
              </div>
              <span className="text-sm font-medium text-gray-900">2024년 4월 15일</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <div className="flex items-center">
                <CreditCard className="w-5 h-5 text-gray-500 mr-2" />
                <span className="text-sm text-gray-600">현재 결제 수단</span>
              </div>
              <span className="text-sm font-medium text-gray-900">신한카드 1234</span>
            </div>
          </div>
        </div>

        {/* 해지 전 안내사항 */}
        <div className="bg-yellow-50 rounded-2xl p-4 mb-6">
          <div className="flex items-start">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mr-3 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium text-gray-900">해지 시 유의사항</h3>
              <ul className="mt-2 space-y-1">
                <li className="text-sm text-gray-600 flex items-center">
                  <span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
                  현재 결제 주기 종료일까지 서비스 이용이 가능합니다
                </li>
                <li className="text-sm text-gray-600 flex items-center">
                  <span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
                  해지 후에도 언제든 재구독이 가능합니다
                </li>
                <li className="text-sm text-gray-600 flex items-center">
                  <span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
                  이용 중인 프로모션 혜택은 소멸될 수 있습니다
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 해지 사유 선택 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">해지 사유 선택</h3>
          <div className="space-y-2">
            {reasons.map((reason) => (
              <button
                key={reason.id}
                onClick={() => setSelectedReason(reason.id)}
                className={`w-full p-4 rounded-xl border ${
                  selectedReason === reason.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-200'
                } transition-all`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">{reason.label}</span>
                  {selectedReason === reason.id && (
                    <CheckCircle2 className="w-5 h-5 text-blue-500" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 해지 버튼 */}
        <button
          onClick={handleCancel}
          disabled={!selectedReason}
          className={`w-full p-4 rounded-xl font-medium transition-colors ${
            selectedReason
              ? 'bg-red-500 text-white hover:bg-red-600'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          구독 해지하기
        </button>

        {/* 해지 확인 모달 */}
        {isConfirmOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
              <h3 className="text-lg font-bold text-gray-900 mb-2">구독 해지 확인</h3>
              <p className="text-sm text-gray-600 mb-6">
                정말로 넷플릭스 구독을 해지하시겠습니까?
                현재 결제 주기 종료일인 2024년 4월 15일까지 서비스를 이용하실 수 있습니다.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setIsConfirmOpen(false)}
                  className="flex-1 p-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                >
                  취소
                </button>
                <button
                  onClick={handleConfirmCancel}
                  className="flex-1 p-3 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-colors"
                >
                  해지 확인
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 