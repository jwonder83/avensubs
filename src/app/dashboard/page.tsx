"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { createSupabaseClient } from '@/app/auth/auth-utils';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { 
  Activity, 
  CreditCard,
  Calendar, 
  Bell, 
  ChevronRight, 
  Clock, 
  DollarSign,
  User,
  BarChart2, 
  ArrowUpRight,
  ArrowDownRight,
  Check,
  X,
  Zap,
  Plus,
  AlertCircle,
  TrendingDown,
  ChevronDown
} from 'lucide-react';

type Profile = {
  id: string;
  email: string;
  username: string | null;
  avatar_url: string | null;
};

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

const mockSubscriptions: Subscription[] = [
  {
    id: '1',
    name: '넷플릭스',
    price: 17000,
    billingCycle: 'monthly',
    nextBillingDate: '2024-04-15',
    category: '비디오',
    color: 'bg-red-500',
    logo: '🎬',
    active: true
  },
  {
    id: '2',
    name: '멜론',
    price: 10900,
    billingCycle: 'monthly',
    nextBillingDate: '2024-04-12',
    category: '음악',
    color: 'bg-green-500',
    logo: '🎵',
    active: true
  },
  {
    id: '3',
    name: '쿠팡 로켓와우',
    price: 4990,
    billingCycle: 'monthly',
    nextBillingDate: '2024-04-20',
    category: '쇼핑',
    color: 'bg-blue-500',
    logo: '🚀',
    active: true
  },
  {
    id: '4',
    name: '지니뮤직',
    price: 8900,
    billingCycle: 'monthly',
    nextBillingDate: '2024-04-18',
    category: '음악',
    color: 'bg-pink-500',
    logo: '🎧',
    active: false
  },
  {
    id: '5',
    name: '디즈니 플러스',
    price: 9900,
    billingCycle: 'monthly',
    nextBillingDate: '2024-04-25',
    category: '비디오',
    color: 'bg-indigo-500',
    logo: '📺',
    active: true
  },
  {
    id: '6',
    name: '밀리의 서재',
    price: 9900,
    billingCycle: 'monthly',
    nextBillingDate: '2024-04-22',
    category: '도서',
    color: 'bg-yellow-500',
    logo: '📚',
    active: true
  },
  {
    id: '7',
    name: '닌텐도 온라인',
    price: 4900,
    billingCycle: 'monthly',
    nextBillingDate: '2024-04-28',
    category: '게임',
    color: 'bg-red-400',
    logo: '🎮',
    active: true
  }
];

const categoryColors = {
  '비디오': 'bg-red-50 text-red-700',
  '음악': 'bg-green-50 text-green-700',
  '게임': 'bg-blue-50 text-blue-700',
  '쇼핑': 'bg-orange-50 text-orange-700',
  '도서': 'bg-yellow-50 text-yellow-700',
  '기타': 'bg-gray-50 text-gray-700'
};

// 서비스 도메인 매핑
const serviceDomains: Record<string, string> = {
  "넷플릭스": "netflix.com",
  "유튜브 프리미엄": "youtube.com",
  "스포티파이": "spotify.com",
  "왓챠": "watcha.com",
  "웨이브": "wavve.com",
  "디즈니 플러스": "disneyplus.com",
  "디즈니플러스": "disneyplus.com",
  "멜론": "melon.com",
  "지니뮤직": "genie.co.kr",
  "밀리의 서재": "millie.co.kr",
  "리디북스": "ridibooks.com",
  "쿠팡 로켓와우": "coupang.com",
  "쿠팡플레이": "coupangplay.com",
  "쿠팡 와우": "coupang.com",
  "티빙": "tving.com",
  "애플 뮤직": "apple.com/apple-music",
  "애플 TV+": "apple.com/apple-tv-plus",
  "구글 원": "one.google.com",
  "네이버 플러스": "naver.com",
  "배달의민족": "baemin.com",
  "요기요": "yogiyo.co.kr",
  "당근": "daangn.com",
  "닌텐도 온라인": "nintendo.com",
  "아마존 프라임": "amazon.com",
  "클래스101": "class101.net",
  "인프런": "inflearn.com",
  "노션": "notion.so",
  "에버노트": "evernote.com",
  "슬랙": "slack.com",
  "트렐로": "trello.com",
  "어도비": "adobe.com",
};

// Favicon URL 생성 함수
const getFaviconUrl = (serviceName: string): string => {
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

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(mockSubscriptions);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const router = useRouter();

  useEffect(() => {
    // 로그인하지 않은 사용자는 즉시 리디렉션
    if (!user) {
      router.replace('/login');
      return;
    }
    
    // 기본 프로필 생성
    const createBasicProfile = () => {
      setProfile({
        id: user.id,
        email: user.email || '',
        username: user.email?.split('@')[0] || '사용자',
        avatar_url: null
      });
    };

    async function loadProfile() {
      try {
        const supabase = createSupabaseClient();
        setLoading(true);
        
        // 프로필 조회 시도
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (error) {
          // 오류 발생 시 기본 프로필 사용
          createBasicProfile();
          return;
        }
        
        setProfile(data);
      } catch (error: any) {
        // 오류 발생 시 기본 프로필 사용
        createBasicProfile();
      } finally {
        setLoading(false);
      }
    }
    
    loadProfile();
  }, [user, router]);

  // 활성 구독 필터링 및 계산
  const activeSubscriptions = subscriptions.filter(sub => sub.active);
  const totalMonthlySpending = activeSubscriptions.reduce((total, sub) => total + sub.price, 0);
  const upcomingPayment = [...activeSubscriptions].sort((a, b) => 
    new Date(a.nextBillingDate).getTime() - new Date(b.nextBillingDate).getTime()
  )[0];

  // 다음 결제일까지 남은 날짜 계산
  const getDaysUntil = (dateString: string) => {
    const today = new Date();
    const nextDate = new Date(dateString);
    const diffTime = nextDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // 날짜 포맷팅 함수
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
        <div className="bg-red-50 text-red-700 p-5 rounded-xl mb-4 max-w-md w-full border border-red-100">
          <h2 className="text-sm font-semibold mb-1 flex items-center">
            <AlertCircle className="w-4 h-4 mr-1.5" /> 오류가 발생했습니다
          </h2>
          <p className="text-xs text-red-600">{error}</p>
        </div>
        <button
          onClick={() => router.reload()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          다시 시도하기
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* 헤더 */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">{profile?.username || '사용자'}님의 구독</h1>
          <p className="text-sm text-gray-600 mt-1.5">모든 구독 서비스를 한눈에 관리하세요</p>
        </div>

        {/* 요약 정보 및 알림 */}
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
                    {formatDate(upcomingPayment.nextBillingDate)}
                    <span className="mx-1.5">•</span>
                    {getDaysUntil(upcomingPayment.nextBillingDate)}일 후
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* 탭 메뉴 */}
        <div className="mb-6 border-b border-gray-200">
          <div className="flex space-x-8">
            {[
              { id: 'overview', label: '전체 구독' },
              { id: 'upcoming', label: '결제 예정' },
              { id: 'insights', label: '인사이트' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3 px-1 relative font-medium text-sm transition-colors ${
                  activeTab === tab.id 
                    ? 'text-blue-600 border-b-2 border-blue-600' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 구독 목록 - 카드형 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {/* 구독 추가 카드 */}
          <Link
            href="/subscription/add"
            className="bg-white rounded-2xl border border-gray-200 border-dashed p-6 flex flex-col items-center justify-center text-center hover:border-blue-500 hover:bg-blue-50 transition-all group"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-3 group-hover:bg-blue-200 transition-colors">
              <Plus className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-medium text-gray-900 mb-1">구독 추가하기</h3>
            <p className="text-xs text-gray-500">새로운 구독 서비스를 등록하세요</p>
          </Link>

          {activeSubscriptions.map((subscription) => (
            <div 
              key={subscription.id} 
              className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all p-5"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start">
                  <div className={`flex-shrink-0 w-12 h-12 ${subscription.color} rounded-xl flex items-center justify-center text-white shadow-sm`}>
                    <span className="text-xl">{subscription.logo}</span>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-base font-semibold text-gray-900">{subscription.name}</h3>
                    <div className="mt-1 flex items-center">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        categoryColors[subscription.category as keyof typeof categoryColors]
                      }`}>
                        {subscription.category}
                      </span>
                      <span className="mx-2 text-gray-300">•</span>
                      <span className="text-xs text-gray-500">
                        {subscription.billingCycle === 'monthly' ? '월간' : 
                         subscription.billingCycle === 'yearly' ? '연간' : '주간'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-base font-bold text-gray-900">
                    {subscription.price.toLocaleString()}원
                  </div>
                  <div className="text-xs text-gray-500 mt-1">매월</div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center text-xs text-gray-500">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>다음 결제: {formatDate(subscription.nextBillingDate)}</span>
                </div>
                <Link
                  href={`/subscription/manage/${subscription.id}`}
                  className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  관리하기
                  <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* 구독 분석 섹션 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <h2 className="text-base font-semibold text-gray-900 mb-4">카테고리별 지출</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                    <span className="text-sm font-medium text-gray-700">비디오</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">41,800원</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full w-[70%]"></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-sm font-medium text-gray-700">음악</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">10,900원</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full w-[20%]"></div>
                </div>
              </div>
            </div>
            
            <Link 
              href="/dashboard/insights" 
              className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 mt-4"
            >
              상세 분석
              <ChevronRight className="w-4 h-4 ml-0.5" />
            </Link>
          </div>
          
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <h2 className="text-base font-semibold text-gray-900 mb-4">다가오는 결제</h2>
            <div className="space-y-4">
              {activeSubscriptions
                .sort((a, b) => new Date(a.nextBillingDate).getTime() - new Date(b.nextBillingDate).getTime())
                .slice(0, 3)
                .map(subscription => (
                  <div key={subscription.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`flex-shrink-0 w-10 h-10 ${subscription.color} rounded-xl flex items-center justify-center text-white shadow-sm`}>
                        <span className="text-lg">{subscription.logo}</span>
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{subscription.name}</div>
                        <div className="text-xs text-gray-500 mt-0.5 flex items-center">
                          <Calendar className="w-3.5 h-3.5 mr-1" />
                          {formatDate(subscription.nextBillingDate)}
                          <span className="mx-1.5">•</span>
                          <span>{getDaysUntil(subscription.nextBillingDate)}일 후</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-sm font-semibold text-gray-900">
                      {subscription.price.toLocaleString()}원
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* 구독 목록 */}
        <div className="flex-1 space-y-4">
          {/* 구독 목록 */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">내 구독 목록</h2>
              <Link
                href="/dashboard/subscriptions"
                className="text-sm text-blue-600 font-medium inline-flex items-center hover:text-blue-700"
              >
                전체보기 <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            
            <div className="space-y-5">
              {activeSubscriptions.slice(0, 4).map((subscription) => (
                <div key={subscription.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 ${subscription.color} rounded-xl flex items-center justify-center`}>
                      {subscription.logo.startsWith('http') ? (
                        <img 
                          src={subscription.logo} 
                          alt={subscription.name} 
                          className="w-6 h-6 object-contain"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                            (e.target as HTMLImageElement).parentElement!.innerHTML = subscription.logo;
                          }}
                        />
                      ) : (
                        <img 
                          src={getFaviconUrl(subscription.name)} 
                          alt={subscription.name} 
                          className="w-6 h-6 object-contain"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                            (e.target as HTMLImageElement).parentElement!.innerHTML = subscription.logo;
                          }}
                        />
                      )}
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">{subscription.name}</h3>
                      <span className="text-xs text-gray-500">{formatDate(subscription.nextBillingDate)}</span>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">{subscription.price.toLocaleString()}원</span>
                </div>
              ))}
            </div>
            
            {activeSubscriptions.length > 4 && (
              <div className="mt-4 text-center">
                <Link
                  href="/dashboard/subscriptions"
                  className="text-sm text-gray-600 hover:text-gray-900 inline-flex items-center"
                >
                  {activeSubscriptions.length - 4}개 더보기 <ChevronDown className="w-4 h-4 ml-1" />
                </Link>
              </div>
            )}
            
            {activeSubscriptions.length === 0 && (
              <div className="text-center py-8">
                <CreditCard className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                <p className="text-sm text-gray-500">등록된 구독이 없습니다</p>
                <Link
                  href="/dashboard/subscriptions"
                  className="mt-3 inline-block text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  구독 추가하기
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 