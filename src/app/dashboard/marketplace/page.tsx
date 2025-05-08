"use client";

import { useState } from "react";
import { 
  Search, 
  Filter, 
  Star, 
  ShoppingCart,
  Heart,
  ChevronDown,
  ArrowRight,
  Award,
  X,
  BarChart2,
  TrendingUp,
  CheckCircle2,
  ChevronRight,
  PlayCircle,
  Youtube,
  Truck,
  Sparkles,
  Music,
  BookOpen,
  Tv,
  GraduationCap
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// 서비스 도메인 매핑
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
  "밀리서재": "millie.co.kr",
  "리디북스": "ridibooks.com",
  "리디셀렉트": "select.ridibooks.com",
  "쿠팡 로켓와우": "coupang.com",
  "쿠팡플레이": "coupangplay.com",
  "티빙": "tving.com",
  "애플 뮤직": "apple.com/apple-music",
  "애플 TV+": "apple.com/apple-tv-plus",
  "구글 원": "one.google.com",
  "네이버 플러스": "naver.com",
  "배달의민족": "baemin.com",
  "배민구독": "baemin.com",
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
  "Adobe CC": "adobe.com",
  "퍼스트클럽": "firstclub.kr",
  "코드잇": "codeit.kr",
  "마켓컬리 컬리패스": "kurly.com",
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

// 카테고리 데이터
const categories = [
  { id: "all", name: "전체", color: "bg-gray-100" },
  { id: "entertainment", name: "엔터테인먼트", icon: "🎬", color: "bg-red-100" },
  { id: "music", name: "음악", icon: "🎵", color: "bg-blue-100" },
  { id: "education", name: "교육", icon: "📚", color: "bg-yellow-100" },
  { id: "food", name: "식품", icon: "🍔", color: "bg-green-100" },
  { id: "software", name: "소프트웨어", icon: "💻", color: "bg-purple-100" },
  { id: "books", name: "도서", icon: "📚", color: "bg-pink-100" }
];

// 구독 서비스 데이터
const subscriptions = [
  { 
    id: 1, 
    name: "밀리서재", 
    description: "월 9,900원 무제한 도서",
    icon: "📚", 
    category: "books",
    price: 9900,
    discount: 0,
    rating: 4.7,
    reviews: 1240,
    likes: 856,
    popular: true,
    recommended: true,
    features: ["무제한", "오디오북", "통계"]
  },
  { 
    id: 2, 
    name: "쿠팡플레이", 
    description: "와우 무료 드라마/예능",
    icon: "🎬", 
    category: "entertainment",
    price: 4990,
    discount: 0,
    rating: 4.1,
    reviews: 2380,
    likes: 1250,
    popular: true,
    recommended: true,
    features: ["와우무료", "오리지널", "스포츠"]
  },
  { 
    id: 3, 
    name: "클래스101", 
    description: "취미/커리어 클래스",
    icon: "🎨", 
    category: "education",
    price: 14900,
    discount: 20,
    rating: 4.6,
    reviews: 890,
    likes: 723,
    popular: false,
    recommended: true,
    features: ["20%할인", "무제한", "키트"]
  },
  { 
    id: 4, 
    name: "유튜브 프리미엄", 
    description: "광고없음, 백그라운드",
    icon: "📱", 
    category: "entertainment",
    price: 14900,
    discount: 0,
    rating: 4.8,
    reviews: 5430,
    likes: 4320,
    popular: true,
    recommended: false,
    features: ["광고없음", "백그라운드", "뮤직"]
  },
  { 
    id: 5, 
    name: "퍼스트클럽", 
    description: "음악/영화/책 통합",
    icon: "✨", 
    category: "entertainment",
    price: 14900,
    discount: 15,
    rating: 4.3,
    reviews: 420,
    likes: 310,
    popular: false,
    recommended: true,
    features: ["통합구독", "5기기", "오프라인"]
  },
  { 
    id: 6, 
    name: "코드잇", 
    description: "코딩/IT 교육 플랫폼",
    icon: "💻", 
    category: "education",
    price: 34000,
    discount: 30,
    rating: 4.9,
    reviews: 650,
    likes: 590,
    popular: false,
    recommended: true,
    features: ["30%할인", "프로젝트", "리뷰"]
  },
  { 
    id: 7, 
    name: "배민구독", 
    description: "쿠폰/무료배달팁",
    icon: "🍔", 
    category: "food",
    price: 6900,
    discount: 0,
    rating: 4.5,
    reviews: 3200,
    likes: 2800,
    popular: true,
    recommended: false,
    features: ["쿠폰", "무료배달", "픽업할인"]
  },
  { 
    id: 8, 
    name: "웨이브", 
    description: "드라마/영화/시리즈",
    icon: "🎬", 
    category: "entertainment",
    price: 7900,
    discount: 0,
    rating: 4.2,
    reviews: 1800,
    likes: 1500,
    popular: false,
    recommended: false,
    features: ["국내방송", "해외물", "2인시청"]
  },
  { 
    id: 9, 
    name: "Adobe CC", 
    description: "포토샵 등 Adobe 앱",
    icon: "🎨", 
    category: "software",
    price: 54000,
    discount: 40,
    rating: 4.7,
    reviews: 960,
    likes: 870,
    popular: false,
    recommended: true,
    features: ["40%할인", "전체앱", "100GB"]
  },
  { 
    id: 10, 
    name: "넷플릭스", 
    description: "영화/드라마 스트리밍",
    icon: "🎬", 
    category: "entertainment",
    price: 17000,
    discount: 0,
    rating: 4.9,
    reviews: 8760,
    likes: 7500,
    popular: true,
    recommended: true,
    features: ["4K화질", "4기기", "오프라인저장"]
  },
  { 
    id: 11, 
    name: "디즈니플러스", 
    description: "디즈니/마블/스타워즈",
    icon: "✨", 
    category: "entertainment",
    price: 9900,
    discount: 0,
    rating: 4.7,
    reviews: 3450,
    likes: 2900,
    popular: true,
    recommended: true,
    features: ["가족공유", "오리지널", "4K화질"]
  },
  { 
    id: 12, 
    name: "스포티파이", 
    description: "음악 스트리밍 서비스",
    icon: "🎵", 
    category: "music",
    price: 10900,
    discount: 15,
    rating: 4.8,
    reviews: 5200,
    likes: 4800,
    popular: true,
    recommended: true,
    features: ["무제한", "오프라인", "고음질"]
  },
  { 
    id: 13, 
    name: "리디셀렉트", 
    description: "웹소설/웹툰 무제한",
    icon: "📱", 
    category: "books",
    price: 4900,
    discount: 0,
    rating: 4.5,
    reviews: 2100,
    likes: 1700,
    popular: false,
    recommended: true,
    features: ["무제한", "최신작", "독점작품"]
  },
  { 
    id: 14, 
    name: "닌텐도 온라인", 
    description: "온라인 게임/클래식 게임",
    icon: "🎮", 
    category: "entertainment",
    price: 4900,
    discount: 0,
    rating: 4.3,
    reviews: 1890,
    likes: 1500,
    popular: false,
    recommended: false,
    features: ["온라인플레이", "클래식", "저장백업"]
  },
  { 
    id: 15, 
    name: "마켓컬리 컬리패스", 
    description: "무료배송/특가상품",
    icon: "🥗", 
    category: "food",
    price: 4900,
    discount: 0,
    rating: 4.4,
    reviews: 2500,
    likes: 2100,
    popular: false,
    recommended: true,
    features: ["무료배송", "특가", "조기배송"]
  }
];

// 가격 범위 옵션
const priceRanges = [
  { id: "all", label: "전체 가격" },
  { id: "under10k", label: "~1만원", min: 0, max: 10000 },
  { id: "10k-20k", label: "1~2만원", min: 10000, max: 20000 },
  { id: "20k-50k", label: "2~5만원", min: 20000, max: 50000 },
  { id: "over50k", label: "5만원↑", min: 50000, max: Infinity }
];

// 인기 서비스 목록 데이터
const popularServices = [
  {
    id: 1,
    name: "넷플릭스",
    category: "엔터테인먼트",
    rating: 4.8,
    users: "320만",
    monthlyPrice: 17000,
    description: "전 세계 인기 영화와 드라마, 애니메이션을 무제한으로",
    icon: PlayCircle
  },
  {
    id: 2,
    name: "유튜브 프리미엄",
    category: "엔터테인먼트",
    rating: 4.7,
    users: "250만",
    monthlyPrice: 14900,
    description: "광고 없는 유튜브와 유튜브 뮤직 프리미엄 포함",
    icon: Youtube
  },
  {
    id: 3,
    name: "쿠팡 로켓와우",
    category: "쇼핑",
    rating: 4.6,
    users: "450만",
    monthlyPrice: 4990,
    description: "로켓배송, 무료배송, 특가상품 혜택까지",
    icon: Truck
  },
  {
    id: 4,
    name: "디즈니플러스",
    category: "엔터테인먼트",
    rating: 4.7,
    users: "180만",
    monthlyPrice: 9900,
    description: "디즈니, 픽사, 마블, 스타워즈의 모든 콘텐츠",
    icon: Sparkles
  },
  {
    id: 5,
    name: "스포티파이",
    category: "음악",
    rating: 4.8,
    users: "280만",
    monthlyPrice: 10900,
    description: "전 세계 수백만 곡을 광고 없이 자유롭게",
    icon: Music
  },
  {
    id: 6,
    name: "밀리의 서재",
    category: "도서",
    rating: 4.5,
    users: "150만",
    monthlyPrice: 9900,
    description: "종이책부터 오디오북까지 무제한으로",
    icon: BookOpen
  },
  {
    id: 7,
    name: "지니뮤직",
    category: "음악",
    rating: 4.4,
    users: "120만",
    monthlyPrice: 7900,
    description: "국내 최대 음원 보유, 고음질 스트리밍",
    icon: Music
  },
  {
    id: 8,
    name: "웨이브",
    category: "엔터테인먼트",
    rating: 4.3,
    users: "160만",
    monthlyPrice: 13900,
    description: "국내 실시간 방송과 해외 인기 시리즈",
    icon: Tv
  },
  {
    id: 9,
    name: "클래스101",
    category: "교육",
    rating: 4.6,
    users: "90만",
    monthlyPrice: 19900,
    description: "취미부터 커리어까지 온라인 클래스",
    icon: GraduationCap
  }
];

export default function MarketplacePage() {
  // 필터 상태
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [activeTab, setActiveTab] = useState<'all' | 'popular' | 'recommended'>('all');
  
  // 더보기 상태
  const [showAllSubscriptions, setShowAllSubscriptions] = useState(false);
  const ITEMS_PER_PAGE = 9;
  
  // 필터링 로직
  const filteredSubscriptions = subscriptions.filter(sub => {
    // 카테고리 필터
    const matchesCategory = selectedCategory === "all" || sub.category === selectedCategory;
    
    // 가격 범위 필터
    const selectedPriceRange = priceRanges.find(range => range.id === priceRange);
    const matchesPrice = priceRange === "all" || 
      (sub.price >= (selectedPriceRange?.min || 0) && sub.price < (selectedPriceRange?.max || Infinity));
    
    // 검색어 필터
    const matchesSearch = sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         sub.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesPrice && matchesSearch;
  });
  
  // 정렬 로직
  const sortedSubscriptions = [...filteredSubscriptions].sort((a, b) => {
    switch (sortBy) {
      case "price_low":
        return a.price - b.price;
      case "price_high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "popular":
      default:
        return b.likes - a.likes;
    }
  });

  // 탭에 따른 구독 필터링
  const getDisplaySubscriptions = () => {
    let results;
    switch (activeTab) {
      case 'popular':
        results = sortedSubscriptions.filter(sub => sub.popular);
        break;
      case 'recommended':
        results = sortedSubscriptions.filter(sub => sub.recommended);
        break;
      case 'all':
      default:
        results = sortedSubscriptions;
    }
    
    if (!showAllSubscriptions) {
      return results.slice(0, ITEMS_PER_PAGE);
    }
    return results;
  };
  
  const displaySubscriptions = getDisplaySubscriptions();
  const totalCount = activeTab === 'all' 
    ? sortedSubscriptions.length 
    : activeTab === 'popular' 
      ? sortedSubscriptions.filter(sub => sub.popular).length
      : sortedSubscriptions.filter(sub => sub.recommended).length;
  
  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6">
        {/* 헤더 */}
        <div className="mb-8">
          <h1 className="text-[26px] font-bold text-gray-900">구독 마켓플레이스</h1>
          <p className="text-base text-gray-600 mt-1">
            다양한 구독 서비스를 한눈에 비교하고 가입하세요
          </p>
        </div>

        {/* 검색 및 필터 */}
        <div className="mb-8">
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="서비스 검색"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>

          <div className="flex overflow-x-auto pb-4 space-x-2 scrollbar-hide">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors
                  ${selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : `${category.color} text-gray-900 hover:bg-gray-200`
                  }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* 인기 서비스 */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">인기 구독 서비스</h2>
            <Link
              href="/dashboard/marketplace/recommendations"
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              전체 보기
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {popularServices.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-16 h-16 bg-gray-50 rounded-xl flex items-center justify-center">
                    <img
                      src={getFaviconUrl(service.name)}
                      alt={service.name}
                      className="w-8 h-8 object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        
                        // 아이콘 로드 실패 시 Lucide 아이콘 직접 보여주기
                        const iconContainer = target.parentElement;
                        if (iconContainer) {
                          // SVG 문자열 생성
                          const svgIcon = renderIconToSvg(service.icon);
                          iconContainer.innerHTML = svgIcon;
                        }
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{service.name}</h3>
                    <div className="flex items-center mt-1">
                      <span className="text-sm text-gray-500">{service.category}</span>
                      <span className="mx-2 text-gray-300">•</span>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="ml-1 text-sm text-gray-500">{service.rating}</span>
                      </div>
                      <span className="mx-2 text-gray-300">•</span>
                      <span className="text-sm text-gray-500">{service.users} 사용중</span>
                    </div>
                    <div className="mt-2 text-lg font-bold text-gray-900">
                      월 {service.monthlyPrice.toLocaleString()}원
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-4">{service.description}</p>

                <div className="flex justify-end space-x-3">
                  <Link
                    href={`/dashboard/marketplace/recommendations`}
                    className="inline-flex items-center px-4 py-2 rounded-xl text-blue-600 hover:bg-blue-50 transition-colors text-sm font-medium"
                  >
                    추천 보기
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                  <Link
                    href={`/dashboard/marketplace/subscribe/${service.id}`}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    가입하기
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 프로모션 배너 */}
        <div className="bg-blue-50 rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-blue-900">
                첫 구독 시 3개월 할인
              </h3>
              <p className="text-sm text-blue-700 mt-1">
                신규 가입 시 3개월간 구독료 50% 할인
              </p>
            </div>
            <TrendingUp className="w-6 h-6 text-blue-500" />
          </div>
        </div>
        
        {/* 전체 서비스 목록 */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">전체 구독 서비스</h2>
            
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg ${
                  activeTab === 'all' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                전체
              </button>
              <button
                onClick={() => setActiveTab('popular')}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg ${
                  activeTab === 'popular' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                인기
              </button>
              <button
                onClick={() => setActiveTab('recommended')}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg ${
                  activeTab === 'recommended' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                추천
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {displaySubscriptions.map(sub => (
              <div 
                key={sub.id}
                className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start mb-3">
                  <div className={`w-12 h-12 flex items-center justify-center rounded-xl text-2xl`}>
                    <img
                      src={getFaviconUrl(sub.name)}
                      alt={sub.name}
                      className="w-6 h-6 object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                        (e.target as HTMLImageElement).parentElement!.innerHTML = sub.icon;
                      }}
                    />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-semibold text-gray-900">{sub.name}</h3>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600 ml-1">{sub.rating}</span>
                      <span className="mx-1.5 text-gray-300">•</span>
                      <span className="text-sm text-gray-600">{sub.reviews.toLocaleString()}개 리뷰</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-3">{sub.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {sub.features.map((feature, i) => (
                    <span 
                      key={i}
                      className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-lg"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    {sub.discount > 0 ? (
                      <div className="flex items-center">
                        <span className="text-sm text-gray-500 line-through mr-1">
                          {Math.round(sub.price / (1 - sub.discount / 100)).toLocaleString()}원
                        </span>
                        <span className="text-xs font-medium text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded">
                          -{sub.discount}%
                        </span>
                      </div>
                    ) : null}
                    <div className="text-lg font-bold text-gray-900">
                      월 {sub.price.toLocaleString()}원
                    </div>
                  </div>
                  
                  <Link
                    href={`/dashboard/marketplace/subscribe/${sub.id}`}
                    className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl transition-colors"
                  >
                    구독하기
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          {totalCount > ITEMS_PER_PAGE && !showAllSubscriptions && (
            <div className="flex justify-center">
              <button
                onClick={() => setShowAllSubscriptions(true)}
                className="inline-flex items-center px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-blue-600 hover:bg-blue-50 hover:border-blue-100 transition-colors"
              >
                <span className="font-medium">더 보기</span>
                <ChevronDown className="w-4 h-4 ml-1" />
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function renderIconToSvg(Icon: any): string {
  switch(Icon) {
    case PlayCircle:
      return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 text-blue-600"><circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon></svg>';
    case Youtube:
      return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 text-blue-600"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path><path d="m10 15 5-3-5-3z"></path></svg>';
    case Truck:
      return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 text-blue-600"><path d="M10 17h4V5H2v12h3"></path><path d="M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L16 6h-4"></path><path d="M14 17h1"></path><circle cx="7.5" cy="17.5" r="2.5"></circle><circle cx="17.5" cy="17.5" r="2.5"></circle></svg>';
    case Sparkles:
      return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 text-blue-600"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path><path d="M5 3v4"></path><path d="M19 17v4"></path><path d="M3 5h4"></path><path d="M17 19h4"></path></svg>';
    case Music:
      return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 text-blue-600"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>';
    case BookOpen:
      return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 text-blue-600"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>';
    case Tv:
      return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 text-blue-600"><rect width="20" height="15" x="2" y="7" rx="2" ry="2"></rect><polyline points="17 2 12 7 7 2"></polyline></svg>';
    case GraduationCap:
      return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 text-blue-600"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"></path></svg>';
    default:
      return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 text-blue-600"><circle cx="12" cy="12" r="10"></circle></svg>';
  }
} 