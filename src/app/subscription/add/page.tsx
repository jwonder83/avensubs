"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search, ArrowLeft, ChevronRight, Plus, Zap } from 'lucide-react';

// 인기 구독 서비스 목록
const popularServices = [
  { id: 'netflix', name: '넷플릭스', logo: '🎬', color: 'bg-red-500', category: '비디오', price: 17000 },
  { id: 'spotify', name: '스포티파이', logo: '🎵', color: 'bg-green-500', category: '음악', price: 10900 },
  { id: 'youtube', name: '유튜브 프리미엄', logo: '📱', color: 'bg-red-400', category: '비디오', price: 14900 },
  { id: 'disney', name: '디즈니 플러스', logo: '📺', color: 'bg-blue-500', category: '비디오', price: 9900 },
  { id: 'apple-music', name: '애플 뮤직', logo: '🎧', color: 'bg-pink-500', category: '음악', price: 8900 },
  { id: 'apple-tv', name: '애플 TV+', logo: '📱', color: 'bg-gray-500', category: '비디오', price: 6500 },
];

// 카테고리 목록
const categories = [
  { id: 'video', name: '비디오', icon: '🎬' },
  { id: 'music', name: '음악', icon: '🎵' },
  { id: 'game', name: '게임', icon: '🎮' },
  { id: 'book', name: '도서', icon: '📚' },
  { id: 'cloud', name: '클라우드', icon: '☁️' },
  { id: 'other', name: '기타', icon: '✨' },
];

export default function AddSubscription() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  // 검색어에 따른 필터링된 서비스 목록
  const filteredServices = popularServices.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-6 pb-24">
        {/* 헤더 */}
        <div className="flex items-center mb-6">
          <Link
            href="/dashboard"
            className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-gray-900">구독 추가</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              새로운 구독 서비스를 등록하고 관리하세요
            </p>
          </div>
        </div>

        {/* 검색 섹션 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="구독 서비스 검색"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* 인기 구독 서비스 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">인기 구독 서비스</h2>
          <div className="grid grid-cols-1 gap-3">
            {filteredServices.map((service) => (
              <button
                key={service.id}
                onClick={() => router.push(`/subscription/add/${service.id}`)}
                className="w-full text-left p-3 hover:bg-gray-50 rounded-xl transition-all border border-gray-100 hover:border-gray-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-10 h-10 ${service.color} rounded-xl flex items-center justify-center text-white shadow-sm`}>
                      <span className="text-lg">{service.logo}</span>
                    </div>
                    <div className="ml-3">
                      <div className="font-medium text-gray-900">{service.name}</div>
                      <div className="text-sm text-gray-500 mt-0.5">
                        {service.category} · {service.price.toLocaleString()}원부터
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 카테고리별 탐색 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">카테고리별 탐색</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => router.push(`/subscription/category/${category.id}`)}
                className="p-4 text-center hover:bg-gray-50 rounded-xl transition-all border border-gray-100 hover:border-gray-200"
              >
                <div className="text-2xl mb-2">{category.icon}</div>
                <div className="text-sm font-medium text-gray-900">{category.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* 직접 추가 버튼 */}
        <button
          onClick={() => router.push('/subscription/add/custom')}
          className="w-full bg-blue-50 text-blue-600 rounded-xl p-4 flex items-center justify-center hover:bg-blue-100 transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          <span className="font-medium">직접 구독 정보 입력하기</span>
        </button>

        {/* 프로 팁 */}
        <div className="mt-6 bg-yellow-50 rounded-xl p-4 flex items-start">
          <Zap className="w-5 h-5 text-yellow-600 mr-3 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-medium text-gray-900">프로 팁</h3>
            <p className="text-sm text-gray-600 mt-1">
              구독 서비스를 등록하면 결제일 알림을 받을 수 있어요. 
              결제 내역도 자동으로 분석되어 더 똑똑하게 관리할 수 있습니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 