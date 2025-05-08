"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { use } from 'react';
import { 
  ArrowLeft, 
  Calendar,
  CreditCard,
  Bell,
  BarChart2,
  AlertTriangle,
  ChevronRight,
  Settings,
  Clock
} from 'lucide-react';

type Subscription = {
  id: string;
  name: string;
  price: number;
  billingCycle: 'monthly' | 'yearly' | 'weekly';
  nextBillingDate: string;
  category: string;
  color: string;
  logo: string;
  active: boolean;
};

export default function ManageSubscription({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const resolvedParams = use(params);

  useEffect(() => {
    // 실제 구현 시에는 API를 통해 구독 정보를 가져옵니다
    setSubscription({
      id: resolvedParams.id,
      name: '넷플릭스',
      price: 17000,
      billingCycle: 'monthly',
      nextBillingDate: '2024-04-15',
      category: '비디오',
      color: 'bg-red-500',
      logo: '🎬',
      active: true
    });
  }, [resolvedParams.id]);

  if (!subscription) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* 헤더 */}
        <div className="flex items-center mb-6">
          <Link
            href="/dashboard"
            className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-gray-900">구독 관리</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              구독 정보를 확인하고 관리하세요
            </p>
          </div>
        </div>

        {/* 구독 정보 카드 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className={`w-12 h-12 ${subscription.color} rounded-xl flex items-center justify-center text-white shadow-sm`}>
                <span className="text-2xl">{subscription.logo}</span>
              </div>
              <div className="ml-3">
                <h2 className="text-lg font-bold text-gray-900">{subscription.name}</h2>
                <p className="text-sm text-gray-500">
                  {subscription.category} · {subscription.billingCycle === 'monthly' ? '월간' : '연간'} 구독
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-gray-900">{subscription.price.toLocaleString()}원</div>
              <div className="text-sm text-gray-500">매월</div>
            </div>
          </div>
          
          <div className="h-px bg-gray-100 my-4"></div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center text-gray-600">
                <Calendar className="w-5 h-5 mr-2" />
                <span className="text-sm">다음 결제일</span>
              </div>
              <span className="text-sm font-medium text-gray-900">
                {formatDate(subscription.nextBillingDate)}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center text-gray-600">
                <CreditCard className="w-5 h-5 mr-2" />
                <span className="text-sm">결제 수단</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-900 mr-2">
                  신한카드 1234
                </span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center text-gray-600">
                <Bell className="w-5 h-5 mr-2" />
                <span className="text-sm">결제 알림</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-900 mr-2">
                  3일 전 알림
                </span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        {/* 구독 분석 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">구독 분석</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <div className="flex items-center">
                <BarChart2 className="w-5 h-5 text-blue-500 mr-2" />
                <div>
                  <div className="text-sm font-medium text-gray-900">월 평균 시청 시간</div>
                  <div className="text-sm text-gray-500">지난달 대비 5% 증가</div>
                </div>
              </div>
              <span className="text-lg font-bold text-gray-900">42시간</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-green-500 mr-2" />
                <div>
                  <div className="text-sm font-medium text-gray-900">이용 빈도</div>
                  <div className="text-sm text-gray-500">주 5회 이상</div>
                </div>
              </div>
              <span className="text-sm font-medium text-green-600">활발한 이용</span>
            </div>
          </div>
        </div>

        {/* 작업 버튼 */}
        <div className="space-y-3">
          <button
            onClick={() => router.push('/subscription/settings')}
            className="w-full p-4 bg-white rounded-xl border border-gray-200 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center">
              <Settings className="w-5 h-5 text-gray-500 mr-3" />
              <span className="font-medium text-gray-900">구독 설정 변경</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <Link
            href="/subscription/cancel"
            className="w-full p-4 bg-white rounded-xl border border-gray-200 flex items-center justify-between text-red-500 hover:bg-red-50 transition-colors"
          >
            <div className="flex items-center">
              <AlertTriangle className="w-5 h-5 mr-3" />
              <span className="font-medium">구독 해지</span>
            </div>
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
} 