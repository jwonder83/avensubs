"use client";

import { useState, useEffect } from "react";
import { 
  Search, 
  Filter, 
  Plus, 
  Calendar, 
  AlertTriangle,
  CreditCard,
  Trash2,
  Loader2,
  ChevronRight,
  Circle,
  AlertCircle,
  ArrowRight,
  BarChart2,
  ArrowUpRight,
  TrendingDown,
  Tv,
  Music,
  Wrench,
  GraduationCap,
  ShoppingBag,
  Heart,
  Ban,
  MoreVertical,
  X
} from "lucide-react";
import { useSubscriptions } from "@/hooks/useSubscriptions";
import SubscriptionModal from "@/components/SubscriptionModal";
import ConfirmationModal from "@/components/ConfirmationModal";
import type { Subscription } from "@/hooks/useSubscriptions";
import Link from "next/link";
import Image from "next/image";

// 서비스 도메인 매핑 (새로 추가)
const serviceDomains: Record<string, string> = {
  "넷플릭스": "netflix.com",
  "유튜브 프리미엄": "youtube.com",
  "스포티파이": "spotify.com",
  "왓챠": "watcha.com",
  "웨이브": "wavve.com",
  "디즈니플러스": "disneyplus.com",
  "멜론": "melon.com",
  "지니뮤직": "genie.co.kr",
  "밀리의 서재": "millie.co.kr",
  "리디북스": "ridibooks.com",
  "쿠팡플레이": "coupangplay.com",
  "티빙": "tving.com",
  "애플 뮤직": "apple.com/apple-music",
  "애플 TV+": "apple.com/apple-tv-plus",
  "구글 원": "one.google.com",
  "네이버 플러스": "naver.com",
  "배달의민족": "baemin.com",
  "요기요": "yogiyo.co.kr",
  "당근": "daangn.com",
  "빙고": "bingo.com",
  "아마존 프라임": "amazon.com",
  "클래스101": "class101.net",
  "인프런": "inflearn.com",
  "노션": "notion.so",
  "에버노트": "evernote.com",
  "슬랙": "slack.com",
  "트렐로": "trello.com",
  "어도비": "adobe.com",
};

// Favicon URL 생성 함수 (새로 추가)
const getFaviconUrl = (serviceName: string): string | null => {
  const domain = serviceDomains[serviceName];
  
  if (domain) {
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
  }
  
  // 도메인을 찾을 수 없는 경우 서비스 이름에서 도메인 추측
  const guessedDomain = serviceName.toLowerCase().replace(/\s+/g, '');
  const possibleDomains = [
    `${guessedDomain}.com`,
    `${guessedDomain}.co.kr`,
    `${guessedDomain}.net`,
    `${guessedDomain}.io`
  ];
  
  return `https://www.google.com/s2/favicons?domain=${possibleDomains[0]}&sz=64`;
};

// 카테고리 데이터
const categories = [
  { id: "all", name: "전체", color: "bg-gray-100" },
  { id: "entertainment", name: "엔터테인먼트", color: "bg-red-100" },
  { id: "music", name: "음악", color: "bg-blue-100" },
  { id: "utility", name: "유틸리티", color: "bg-green-100" },
  { id: "education", name: "교육", color: "bg-yellow-100" },
  { id: "food", name: "식품/생활", color: "bg-purple-100" },
  { id: "donation", name: "기부", color: "bg-pink-100" }
];

export default function SubscriptionsPage() {
  const { 
    subscriptions, 
    isLoading, 
    error, 
    fetchSubscriptions, 
    addSubscription, 
    updateSubscription, 
    deleteSubscription 
  } = useSubscriptions();
  
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState<Subscription | null>(null);
  const [subscriptionToCancel, setSubscriptionToCancel] = useState<Subscription | null>(null);
  const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const filteredSubscriptions = subscriptions.filter(sub => {
    if (activeTab === "active" && sub.status !== "active") return false;
    if (activeTab === "inactive" && sub.status !== "inactive") return false;
    const matchesCategory = selectedCategory === "all" || sub.category === selectedCategory;
    const matchesSearch = sub.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}월 ${date.getDate()}일`;
  };

  const totalMonthlySpending = subscriptions
    .filter(s => s.status === 'active')
    .reduce((sum, sub) => sum + sub.price, 0);

  const upcomingPayment = subscriptions
    .filter(s => s.status === 'active')
    .sort((a, b) => new Date(a.next_payment).getTime() - new Date(b.next_payment).getTime())[0];

  // 구독 추가 핸들러
  const handleAddSubscription = async (data: Omit<Subscription, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    try {
      await addSubscription(data);
      setNotification({ type: 'success', message: '구독이 성공적으로 추가되었습니다.' });
      setIsAddModalOpen(false);
      fetchSubscriptions(); // 목록 새로고침
    } catch (error) {
      setNotification({ type: 'error', message: '구독 추가 중 오류가 발생했습니다.' });
      console.error('구독 추가 오류:', error);
    }
  };

  // 구독 수정 핸들러
  const handleEditSubscription = async (data: Omit<Subscription, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    if (!selectedSubscription) return;
    
    try {
      await updateSubscription(selectedSubscription.id, data);
      setNotification({ type: 'success', message: '구독이 성공적으로 수정되었습니다.' });
      setIsEditModalOpen(false);
      fetchSubscriptions(); // 목록 새로고침
    } catch (error) {
      setNotification({ type: 'error', message: '구독 수정 중 오류가 발생했습니다.' });
      console.error('구독 수정 오류:', error);
    }
  };

  // 구독 삭제 핸들러
  const handleDeleteSubscription = async () => {
    if (!selectedSubscription) return;
    
    try {
      await deleteSubscription(selectedSubscription.id);
      setNotification({ type: 'success', message: '구독이 성공적으로 삭제되었습니다.' });
      setIsDeleteModalOpen(false);
      setSelectedSubscription(null);
      fetchSubscriptions(); // 목록 새로고침
    } catch (error) {
      setNotification({ type: 'error', message: '구독 삭제 중 오류가 발생했습니다.' });
      console.error('구독 삭제 오류:', error);
    }
  };

  // 구독 해지 핸들러
  const handleCancelSubscription = async () => {
    if (!subscriptionToCancel) return;
    
    try {
      await updateSubscription(subscriptionToCancel.id, {
        ...subscriptionToCancel,
        status: 'inactive',
        canceled_at: new Date().toISOString()
      });
      setNotification({ type: 'success', message: '구독이 성공적으로 해지되었습니다.' });
      setIsCancelModalOpen(false);
      setSubscriptionToCancel(null);
      fetchSubscriptions(); // 목록 새로고침
    } catch (error) {
      setNotification({ type: 'error', message: '구독 해지 중 오류가 발생했습니다.' });
      console.error('구독 해지 오류:', error);
    }
  };

  // 구독 수정 모달 열기
  const openEditModal = (subscription: Subscription) => {
    setSelectedSubscription(subscription);
    setIsEditModalOpen(true);
  };

  // 구독 해지 모달 열기
  const openCancelModal = (e: React.MouseEvent, subscription: Subscription) => {
    e.stopPropagation(); // 카드 클릭 이벤트 전파 방지
    setSubscriptionToCancel(subscription);
    setIsCancelModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* 알림 메시지 */}
        {notification && (
          <div className={`fixed top-4 right-4 p-4 rounded-2xl shadow-lg z-50 animate-fade-in-out 
            ${notification.type === 'success' ? 'bg-green-50 text-green-800 border border-green-100' : 
            'bg-red-50 text-red-800 border border-red-100'}`}
          >
            <div className="flex items-center">
              {notification.type === 'success' ? (
                <Circle className="w-4 h-4 mr-2 text-green-500 fill-green-500" />
              ) : (
                <AlertCircle className="w-4 h-4 mr-2 text-red-500" />
              )}
              <span className="text-sm font-medium">{notification.message}</span>
            </div>
          </div>
        )}

        {/* 헤더 */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">구독 관리</h1>
          <p className="text-sm text-gray-600 mt-1.5">모든 구독 서비스를 한눈에 관리하세요</p>
        </div>

        {/* 요약 정보 카드 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="text-sm text-gray-600 mb-1">총 월간 구독 비용</div>
              <div className="text-3xl font-bold text-gray-900">{totalMonthlySpending.toLocaleString()}원</div>
              <div className="flex items-center mt-2 text-xs text-green-600 font-medium">
                <TrendingDown className="w-4 h-4 mr-1" />
                지난달 대비 5% 감소
              </div>
            </div>
            
            <div className="h-px md:h-16 md:w-px bg-gray-100 md:mx-6"></div>
            
            <div>
              <div className="text-sm text-gray-600 mb-1">다음 결제</div>
              {upcomingPayment && (
                <>
                  <div className="text-lg font-bold text-gray-900">
                    {upcomingPayment.price.toLocaleString()}원
                  </div>
                  <div className="flex items-center mt-1 text-xs text-gray-500">
                    <Calendar className="w-4 h-4 mr-1" />
                    {formatDate(upcomingPayment.next_payment)}
                    <span className="mx-1.5">•</span>
                    {new Date(upcomingPayment.next_payment).getDate() - new Date().getDate()}일 후
                  </div>
                </>
              )}
            </div>

            <div className="flex items-center gap-4">
              <Link
                href="/subscription/add"
                className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                구독 추가
              </Link>
            </div>
          </div>
        </div>

        {/* 카테고리 필터 */}
        <div className="flex overflow-x-auto pb-4 mb-6 -mx-4 px-4 space-x-2 scrollbar-hide">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : `${category.color} text-gray-900 hover:bg-gray-200`
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* 검색바 */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="구독 서비스 검색"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>

        {/* 구독 목록 */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
          </div>
        ) : error ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
            <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">오류가 발생했습니다</h3>
            <p className="text-sm text-gray-600 mb-4">{error}</p>
            <button
              onClick={fetchSubscriptions}
              className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              다시 시도
            </button>
          </div>
        ) : filteredSubscriptions.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
              <CreditCard className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {searchQuery || selectedCategory !== 'all'
                ? '검색 결과가 없습니다'
                : '등록된 구독이 없습니다'}
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              {searchQuery || selectedCategory !== 'all'
                ? '다른 검색어나 필터를 시도해보세요'
                : '새로운 구독을 추가하고 관리를 시작해보세요'}
            </p>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors text-sm font-medium inline-flex items-center"
            >
              <Plus className="w-4 h-4 mr-1.5" />
              구독 추가하기
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredSubscriptions.map((subscription) => (
              <div
                key={subscription.id}
                className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-lg transition-all relative group"
              >
                {/* 구독 상태 뱃지 */}
                {subscription.status === 'inactive' && (
                  <div className="absolute top-4 right-4 px-2.5 py-1 bg-gray-100 rounded-full text-xs text-gray-600 flex items-center">
                    <X className="w-3 h-3 mr-1" />
                    해지됨
                  </div>
                )}

                {/* 구독 정보 */}
                <div className="flex items-start space-x-4 mb-4" onClick={() => openEditModal(subscription)}>
                  <div className={`flex-shrink-0 w-12 h-12 ${
                    categories.find(c => c.id === subscription.category)?.color || 'bg-gray-100'
                  } rounded-xl flex items-center justify-center`}>
                    {subscription.icon ? (
                      <img
                        src={subscription.icon}
                        alt={subscription.name}
                        className="w-6 h-6 object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.style.display = 'none';
                          
                          // 서비스 favicon으로 대체 시도
                          const iconContainer = target.parentElement;
                          if (iconContainer) {
                            const faviconUrl = getFaviconUrl(subscription.name);
                            if (faviconUrl) {
                              const faviconImg = document.createElement('img');
                              faviconImg.src = faviconUrl;
                              faviconImg.alt = subscription.name;
                              faviconImg.className = 'w-6 h-6 object-contain';
                              faviconImg.onerror = () => {
                                // favicon도 로드 실패 시 카테고리 아이콘으로 폴백
                                faviconImg.style.display = 'none';
                                
                                const fallbackIcon = document.createElement('div');
                                fallbackIcon.innerHTML = getCategoryIconSvg(subscription.category);
                                iconContainer.appendChild(fallbackIcon.firstChild!);
                              };
                              iconContainer.appendChild(faviconImg);
                            } else {
                              // favicon URL을 생성할 수 없는 경우 카테고리 아이콘 표시
                              const categoryIconEl = document.createElement('div');
                              categoryIconEl.innerHTML = getCategoryIconSvg(subscription.category);
                              iconContainer.appendChild(categoryIconEl.firstChild!);
                            }
                          }
                        }}
                      />
                    ) : (
                      // favicon으로 시도
                      <img
                        src={getFaviconUrl(subscription.name) || ''}
                        alt={subscription.name}
                        className="w-6 h-6 object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.style.display = 'none';
                          
                          // favicon도 로드 실패 시 카테고리 아이콘으로 폴백
                          const iconContainer = target.parentElement;
                          if (iconContainer) {
                            const categoryIconEl = document.createElement('div');
                            categoryIconEl.innerHTML = getCategoryIconSvg(subscription.category);
                            iconContainer.appendChild(categoryIconEl.firstChild!);
                          }
                        }}
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-gray-900 truncate">{subscription.name}</h3>
                    <div className="mt-1 flex items-center">
                      <span className="text-xs text-gray-500">
                        {categories.find(c => c.id === subscription.category)?.name}
                      </span>
                      <span className="mx-2 text-gray-300">•</span>
                      <span className="text-xs text-gray-500">
                        {subscription.cycle === 'monthly' ? '월간' : 
                         subscription.cycle === 'yearly' ? '연간' : 
                         subscription.cycle === 'weekly' ? '주간' : subscription.cycle}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-base font-bold text-gray-900">
                      {subscription.price.toLocaleString()}원
                    </div>
                    <div className="text-xs text-gray-500 mt-1">매월</div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center text-xs text-gray-500">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>다음 결제: {formatDate(subscription.next_payment)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {subscription.status === 'active' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openCancelModal(e, subscription);
                        }}
                        className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium text-red-600 hover:bg-red-50 border border-red-200 transition-colors"
                      >
                        <Ban className="w-3.5 h-3.5 mr-1" />
                        구독 해지
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 모달들 */}
        <SubscriptionModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={handleAddSubscription}
          title="구독 추가"
        />
        
        <SubscriptionModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSubmit={handleEditSubscription}
          initialData={selectedSubscription || undefined}
          title="구독 수정"
        />
        
        <ConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDeleteSubscription}
          title="구독 삭제"
          message={`${selectedSubscription?.name} 구독을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.`}
          confirmText="삭제"
          cancelText="취소"
          variant="danger"
        />

        {/* 구독 해지 확인 모달 */}
        <ConfirmationModal
          isOpen={isCancelModalOpen}
          onClose={() => {
            setIsCancelModalOpen(false);
            setSubscriptionToCancel(null);
          }}
          onConfirm={handleCancelSubscription}
          title="구독 해지"
          message={
            <div className="space-y-4">
              <div className="text-gray-700">
                <span className="font-semibold">{subscriptionToCancel?.name}</span> 구독을 정말 해지하시겠습니까?
              </div>
              <div className="bg-amber-50 text-amber-700 p-4 rounded-xl text-sm">
                <div className="flex items-start">
                  <AlertTriangle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium mb-1">해지 시 주의사항</div>
                    <ul className="list-disc list-inside space-y-1">
                      <li>해지 후에도 현재 결제 주기 종료일까지는 서비스 이용이 가능합니다.</li>
                      <li>해지 후 재구독 시 혜택이 달라질 수 있습니다.</li>
                      <li>특별 할인 혜택은 해지 즉시 소멸됩니다.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          }
          confirmText="해지하기"
          cancelText="취소"
          variant="danger"
        />
      </div>
    </div>
  );
}

// SVG 카테고리 아이콘 생성 함수 (함수 맨 마지막에 추가)
function getCategoryIconSvg(category: string | undefined): string {
  switch(category) {
    case 'entertainment':
      return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 text-red-500"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m2 8h20"></path></svg>';
    case 'music':
      return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 text-blue-500"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>';
    case 'utility':
      return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 text-green-500"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>';
    case 'education':
      return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 text-yellow-500"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"></path></svg>';
    case 'food':
      return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 text-purple-500"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" x2="21" y1="6" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>';
    case 'donation':
      return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 text-pink-500"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>';
    default:
      return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 text-gray-500"><rect width="20" height="14" x="2" y="5" rx="2"></rect><line x1="2" x2="22" y1="10" y2="10"></line></svg>';
  }
} 