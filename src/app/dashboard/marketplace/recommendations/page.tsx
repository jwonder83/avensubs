"use client";

import { useState } from "react";
import { 
  ArrowLeft, 
  Star, 
  Users,
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
  GraduationCap,
  ShoppingBag,
  Coffee,
  Gamepad,
  Newspaper
} from "lucide-react";
import Link from "next/link";

// 추천 서비스 목록 데이터
const recommendedServices = [
  {
    id: 1,
    name: "넷플릭스",
    category: "엔터테인먼트",
    rating: 4.8,
    users: "320만",
    monthlyPrice: 17000,
    description: "전 세계 인기 영화와 드라마, 애니메이션을 무제한으로",
    benefits: [
      "모든 콘텐츠 무제한 시청",
      "최대 4개 디바이스 동시 시청",
      "HDR 화질 지원",
      "오프라인 저장 가능"
    ],
    icon: PlayCircle,
    color: "text-red-600",
    bgColor: "bg-red-50"
  },
  {
    id: 2,
    name: "유튜브 프리미엄",
    category: "엔터테인먼트",
    rating: 4.7,
    users: "250만",
    monthlyPrice: 14900,
    description: "광고 없는 유튜브와 유튜브 뮤직 프리미엄 포함",
    benefits: [
      "광고 없는 영상 시청",
      "백그라운드 재생",
      "유튜브 뮤직 프리미엄 포함",
      "오프라인 저장 가능"
    ],
    icon: Youtube,
    color: "text-red-600",
    bgColor: "bg-red-50"
  },
  {
    id: 3,
    name: "쿠팡 로켓와우",
    category: "쇼핑",
    rating: 4.6,
    users: "450만",
    monthlyPrice: 4990,
    description: "로켓배송, 무료배송, 특가상품 혜택까지",
    benefits: [
      "무료배송 혜택",
      "로켓배송 무제한",
      "와우 특가 상품",
      "쿠팡플레이 무료"
    ],
    icon: Truck,
    color: "text-green-600",
    bgColor: "bg-green-50"
  },
  {
    id: 4,
    name: "디즈니플러스",
    category: "엔터테인먼트",
    rating: 4.7,
    users: "180만",
    monthlyPrice: 9900,
    description: "디즈니, 픽사, 마블, 스타워즈의 모든 콘텐츠",
    benefits: [
      "디즈니+ 오리지널 시리즈",
      "4K UHD 및 HDR 지원",
      "최대 4대 동시 시청",
      "무제한 다운로드"
    ],
    icon: Sparkles,
    color: "text-blue-600",
    bgColor: "bg-blue-50"
  },
  {
    id: 5,
    name: "스포티파이",
    category: "음악",
    rating: 4.8,
    users: "280만",
    monthlyPrice: 10900,
    description: "전 세계 수백만 곡을 광고 없이 자유롭게",
    benefits: [
      "광고 없는 음악 감상",
      "오프라인 재생",
      "고음질 스트리밍",
      "무제한 건너뛰기"
    ],
    icon: Music,
    color: "text-green-600",
    bgColor: "bg-green-50"
  },
  {
    id: 6,
    name: "밀리의 서재",
    category: "도서",
    rating: 4.5,
    users: "150만",
    monthlyPrice: 9900,
    description: "종이책부터 오디오북까지 무제한으로",
    benefits: [
      "전자책 무제한 읽기",
      "오디오북 무제한 듣기",
      "독서 노트 기능",
      "독서 통계 리포트"
    ],
    icon: BookOpen,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50"
  },
  {
    id: 7,
    name: "스타벅스 구독",
    category: "음료",
    rating: 4.7,
    users: "120만",
    monthlyPrice: 25000,
    description: "매일 한 잔의 커피를 특별한 가격으로",
    benefits: [
      "매일 아메리카노 한 잔",
      "사이즈 업그레이드",
      "제휴 할인 혜택",
      "스타벅스 리워드"
    ],
    icon: Coffee,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50"
  },
  {
    id: 8,
    name: "닌텐도 온라인",
    category: "게임",
    rating: 4.6,
    users: "90만",
    monthlyPrice: 4900,
    description: "클래식 게임과 온라인 멀티플레이",
    benefits: [
      "온라인 멀티플레이",
      "클래식 게임 라이브러리",
      "게임 세이브 데이터 클라우드",
      "회원 전용 특전"
    ],
    icon: Gamepad,
    color: "text-red-600",
    bgColor: "bg-red-50"
  },
  {
    id: 9,
    name: "경제신문 구독",
    category: "뉴스",
    rating: 4.4,
    users: "80만",
    monthlyPrice: 15000,
    description: "프리미엄 경제 뉴스와 분석 리포트",
    benefits: [
      "프리미엄 기사 무제한",
      "경제 분석 리포트",
      "투자 인사이트",
      "모바일 앱 이용"
    ],
    icon: Newspaper,
    color: "text-gray-600",
    bgColor: "bg-gray-50"
  }
];

export default function RecommendationsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "전체", color: "bg-gray-100" },
    { id: "entertainment", name: "엔터테인먼트", color: "bg-red-100" },
    { id: "music", name: "음악", color: "bg-green-100" },
    { id: "shopping", name: "쇼핑", color: "bg-blue-100" },
    { id: "books", name: "도서", color: "bg-yellow-100" },
    { id: "food", name: "음료", color: "bg-emerald-100" },
    { id: "game", name: "게임", color: "bg-purple-100" },
    { id: "news", name: "뉴스", color: "bg-gray-100" }
  ];

  const filteredServices = selectedCategory === "all"
    ? recommendedServices
    : recommendedServices.filter(service => service.category.toLowerCase() === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8 pb-24 sm:px-6">
        {/* 헤더 */}
        <div className="mb-8">
          <Link 
            href="/dashboard/marketplace" 
            className="inline-flex items-center text-gray-500 hover:text-gray-700 mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-1" />
            마켓플레이스로 돌아가기
          </Link>
          <h1 className="text-[26px] font-bold text-gray-900">추천 구독 서비스</h1>
          <p className="text-base text-gray-600 mt-1">
            인기 있는 구독 서비스를 한눈에 비교해보세요
          </p>
        </div>

        {/* 카테고리 필터 */}
        <div className="flex overflow-x-auto pb-4 space-x-2 scrollbar-hide mb-8">
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

        {/* 서비스 목록 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div 
              key={service.id}
              className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start space-x-4 mb-4">
                <div className={`w-16 h-16 ${service.bgColor} rounded-xl flex items-center justify-center`}>
                  <service.icon className={`w-8 h-8 ${service.color}`} />
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
                    <div className="flex items-center">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="ml-1 text-sm text-gray-500">{service.users} 사용중</span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-gray-600 mb-4">{service.description}</p>

              <div className="space-y-2 mb-6">
                {service.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0" />
                    <span className="text-sm">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="text-lg font-bold text-gray-900">
                  월 {service.monthlyPrice.toLocaleString()}원
                </div>
                <div className="flex space-x-3">
                  <Link
                    href={`/dashboard/marketplace/subscribe/${service.id}`}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    가입하기
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 프로모션 배너 */}
        <div className="mt-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold">
                첫 구독 시 3개월 할인
              </h3>
              <p className="text-sm mt-1 text-blue-100">
                신규 가입 시 3개월간 구독료 50% 할인
              </p>
            </div>
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
} 