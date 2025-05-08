'use client';

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState('');
  const [subscriptionStatus, setSubscriptionStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleSubscribe = async () => {
    if (!email || !email.includes('@')) {
      setSubscriptionStatus('error');
      setStatusMessage('유효한 이메일 주소를 입력해주세요.');
      return;
    }

    try {
      setSubscriptionStatus('loading');
      // 실제 API 엔드포인트로 교체 필요
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('구독 신청 중 오류가 발생했습니다.');
      }

      setSubscriptionStatus('success');
      setStatusMessage('뉴스레터 구독이 완료되었습니다!');
      setEmail('');
    } catch (error) {
      setSubscriptionStatus('error');
      setStatusMessage('구독 신청 중 오류가 발생했습니다. 다시 시도해주세요.');
      console.error('구독 에러:', error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* 히어로 섹션 */}
      <section className="w-full py-32 md:py-40 px-5 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center mb-16">
            <h1 className="text-4xl md:text-7xl font-bold leading-tight tracking-tight text-gray-900 mb-6 max-w-4xl">
              내 모든 <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600">구독 서비스</span>를<br />
              한눈에 관리하세요
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mb-12">
              넷플릭스, 왓챠, 유튜브 프리미엄... 매달 빠져나가는 구독료,
              어벤Subs가 모두 찾아내고 최적화해 불필요한 지출을 줄여드립니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <Link href="/signup" className="px-8 py-4 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-all shadow-sm hover:shadow flex items-center justify-center text-lg">
                무료로 시작하기
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </Link>
              <Link href="/dashboard" className="px-8 py-4 bg-white text-gray-700 font-medium rounded-xl border border-gray-200 hover:bg-gray-50 transition-all flex items-center justify-center text-lg">
                대시보드 바로가기
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4, 5].map((num) => (
                  <div key={num} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-sm">
                    <img 
                      src={`https://i.pravatar.cc/100?img=${num}`} 
                      alt="사용자 프로필" 
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-1 text-gray-500 text-sm font-medium">
                <span className="text-blue-600 font-semibold text-lg">8,500+</span> 명이 이미 사용 중
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* 왼쪽: 핵심 기능 소개 */}
            <div className="space-y-8">
              <div className="bg-gray-50 rounded-2xl p-8 transition-all hover:shadow-md">
                <div className="flex items-start gap-5">
                  <div className="rounded-full bg-blue-100 p-3 flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 8V21H3V8M23 3H1V8H23V3Z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">자동 구독 탐지</h3>
                    <p className="text-gray-600">
                      은행 계좌, 문자, 이메일에서 구독 서비스를 자동으로 찾아내 한 곳에서 관리할 수 있어요.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-2xl p-8 transition-all hover:shadow-md">
                <div className="flex items-start gap-5">
                  <div className="rounded-full bg-green-100 p-3 flex-shrink-0">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">비용 최적화</h3>
                    <p className="text-gray-600">
                      사용하지 않는 구독은 추천 해지, 더 저렴한 요금제 추천으로 매달 비용을 절약할 수 있어요.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-2xl p-8 transition-all hover:shadow-md">
                <div className="flex items-start gap-5">
                  <div className="rounded-full bg-purple-100 p-3 flex-shrink-0">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">결제일 알림</h3>
                    <p className="text-gray-600">
                      다가오는 결제일을 미리 알려드려 불필요한 구독 연장을 방지하고 예산 관리를 도와드려요.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 오른쪽: 대시보드 미리보기 */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 md:p-10 relative group hover:shadow-lg transition-all">
              <Link href="/dashboard" className="absolute inset-0 z-10">
                <span className="sr-only">대시보드로 이동</span>
              </Link>
              
              <Link href="/dashboard">
                <div className="absolute top-0 right-0 bg-white text-blue-600 rounded-full px-4 py-2 text-sm font-medium m-6 shadow-sm hover:bg-blue-50 transition-all cursor-pointer z-20">
                  실시간 대시보드
                </div>
              </Link>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-6">나의 구독 현황</h3>
              
              <div className="space-y-4 mb-8">
                {[
                  { 
                    name: "넷플릭스", 
                    plan: "프리미엄", 
                    price: "17,000원", 
                    status: "active", 
                    nextPayment: "10일 후",
                    icon: (
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 2V22L12 18L19 22V2H5Z" fill="currentColor"/>
                      </svg>
                    )
                  },
                  { 
                    name: "유튜브 프리미엄", 
                    plan: "가족", 
                    price: "14,900원", 
                    status: "warning", 
                    nextPayment: "3일 후",
                    icon: (
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M23.5 6.19141C23.3 5.49141 22.97 4.85941 22.46 4.34941C21.96 3.83941 21.32 3.50141 20.62 3.30141C18.82 2.80141 11.5 2.80141 11.5 2.80141C11.5 2.80141 4.18 2.80141 2.38 3.30141C1.68 3.50141 1.05 3.83941 0.54 4.34941C0.0400001 4.85941 -0.29 5.49141 -0.5 6.19141C-1 8.00141 -1 12.7014 -1 12.7014C-1 12.7014 -1 17.4014 -0.5 19.2114C-0.29 19.9114 0.0400001 20.5434 0.54 21.0534C1.05 21.5634 1.68 21.9014 2.38 22.1014C4.18 22.6014 11.5 22.6014 11.5 22.6014C11.5 22.6014 18.82 22.6014 20.62 22.1014C21.32 21.9014 21.96 21.5634 22.46 21.0534C22.97 20.5434 23.3 19.9114 23.5 19.2114C24 17.4014 24 12.7014 24 12.7014C24 12.7014 24 8.00141 23.5 6.19141ZM9 16.8014V8.60141L15.5 12.7014L9 16.8014Z" fill="currentColor"/>
                      </svg>
                    )
                  },
                  { 
                    name: "애플 TV+", 
                    plan: "개인", 
                    price: "6,500원", 
                    status: "active", 
                    nextPayment: "15일 후",
                    icon: (
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.7143 13.9823C18.6842 11.3233 20.9581 10.0962 21.0601 10.0358C19.8229 8.17326 17.8198 7.95517 17.1249 7.93492C15.435 7.76466 13.8046 8.92507 12.9468 8.92507C12.0687 8.92507 10.7518 7.95434 9.35249 7.98478C7.53331 8.01464 5.83369 9.10566 4.89331 10.8C2.9339 14.2662 4.41446 19.317 6.29312 22.0165C7.22375 23.333 8.32447 24.8165 9.76502 24.7562C11.1657 24.6888 11.7 23.831 13.3899 23.831C15.06 23.831 15.5598 24.7562 17.0337 24.7158C18.5634 24.6888 19.5035 23.3866 20.4044 22.0533C21.4854 20.5172 21.9249 19.0221 21.9448 18.9459C21.9051 18.9322 18.7483 17.6645 18.7143 13.9823Z" fill="currentColor"/>
                        <path d="M15.8449 6.30269C16.596 5.35984 17.0962 4.0627 16.963 2.75977C15.8555 2.80921 14.4942 3.53269 13.7119 4.45386C13.0293 5.27639 12.4302 6.61995 12.5829 7.88248C13.8372 7.97118 15.0639 7.22565 15.8449 6.30269Z" fill="currentColor"/>
                      </svg>
                    )
                  },
                  { 
                    name: "멜론", 
                    plan: "스트리밍 클럽", 
                    price: "8,900원", 
                    status: "active", 
                    nextPayment: "21일 후",
                    icon: (
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 16.5V7.5L16 12L10 16.5Z" fill="currentColor"/>
                      </svg>
                    )
                  }
                ].map((sub, i) => (
                  <div key={i} className={`p-4 rounded-xl ${sub.status === 'warning' ? 'bg-red-50 border border-red-100' : 'bg-white'} shadow-sm transition-all hover:shadow-md`}>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl ${sub.status === 'warning' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'} flex items-center justify-center`}>
                          {sub.icon}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-900">{sub.name}</span>
                            <span className="text-xs text-gray-500 px-2 py-0.5 bg-gray-100 rounded-full">{sub.plan}</span>
                          </div>
                          <div className="text-sm text-gray-500">결제 예정: {sub.nextPayment}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-gray-900">{sub.price}</div>
                        <div className="text-xs text-gray-500">월간</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-gray-700 font-medium">총 구독 비용</span>
                  <span className="text-2xl font-bold text-gray-900">47,300<span className="text-sm text-gray-500 font-normal">원/월</span></span>
                </div>
                <div className="h-px bg-gray-100 mb-3"></div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">최적화 시 예상 절약액</span>
                  <span className="text-green-600 font-medium">-12,400원 <span className="text-xs bg-green-50 text-green-600 px-2 py-0.5 rounded-full">추천</span></span>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <Link 
                  href="/dashboard" 
                  className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-blue-100 text-blue-700 font-medium hover:bg-blue-200 transition-all"
                >
                  대시보드에서 관리하기
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 주요 기능 섹션 */}
      <section className="w-full py-32 px-5 md:px-8 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="inline-flex px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-4">
              어벤Subs의 핵심 기능
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-5">
              구독 관리의 <span className="text-blue-600">새로운 기준</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              구독을 스마트하게 관리하고, 불필요한 지출을 자동으로 찾아내 최적화합니다.
            </p>
          </div>
            
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "스마트 구독 탐지",
                description: "은행 내역, 문자, 이메일을 분석해 사용 중인 모든 구독 서비스를 자동으로 찾아냅니다.",
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-600">
                    <path d="M21 8V21H3V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M23 3H1V8H23V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M10 12H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ),
                color: "bg-blue-50"
              },
              {
                title: "최적화 추천 엔진",
                description: "AI가 사용 패턴을 분석하여 불필요한 구독 해지 및 더 저렴한 대체 서비스를 추천합니다.",
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-green-600">
                    <path d="M12 20V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M18 20V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M6 20V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ),
                color: "bg-green-50"
              },
              {
                title: "멤버십 공유 플랫폼",
                description: "가족, 친구들과 함께 멤버십을 공유하고 비용을 분담할 수 있는 안전한 시스템을 제공합니다.",
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-purple-600">
                    <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ),
                color: "bg-purple-50"
              }
            ].map((feature, index) => (
              <div key={index} className="group">
                <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-all h-full flex flex-col">
                  <div className={`rounded-xl ${feature.color} w-16 h-16 flex items-center justify-center mb-6 transition-all group-hover:scale-110`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-800">{feature.title}</h3>
                  <p className="text-gray-600 mb-6 flex-grow">{feature.description}</p>
                  <Link href={`/features/${index + 1}`} className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors">
                    자세히 보기
                    <svg className="ml-1 w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 시각적 요소 섹션 */}
      <section className="w-full py-24 px-5 md:px-8 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative">
            <div className="absolute inset-0 transform -translate-y-1/3">
              <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-transparent opacity-80"></div>
              <div className="absolute w-64 h-64 rounded-full bg-indigo-100 blur-3xl -top-10 -left-10 opacity-40"></div>
              <div className="absolute w-80 h-80 rounded-full bg-blue-100 blur-3xl top-20 right-10 opacity-40"></div>
            </div>
            
            <div className="relative flex justify-center">
              <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl p-2 overflow-hidden">
                <div className="rounded-2xl overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2400&auto=format&fit=crop"
                    alt="구독 관리 대시보드" 
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-20 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5">
              <span className="text-blue-600">한 눈에</span> 모든 구독을 파악하세요
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              복잡하게 여러 앱을 오가며 구독 서비스를 관리할 필요가 없어요.
              한 곳에서 모든 구독을 확인하고 관리하세요.
            </p>
            <Link href="/dashboard" className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-all shadow-sm">
              대시보드 체험하기
            </Link>
          </div>
        </div>
      </section>

      {/* 절약 효과 섹션 */}
      <section className="w-full py-24 px-5 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* 절약 정보 */}
              <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                <div className="max-w-lg">
                  <div className="inline-flex px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-6">
                    실제 사용자 데이터 기반
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                    연간 평균 <span className="text-blue-600">30만원</span> 이상의<br />
                    구독비를 절약하세요
                  </h2>
                  
                  <p className="text-lg text-gray-600 mb-8">
                    평균적으로 사용자들은 자신이 가입한 구독의 <span className="font-medium">30%를 활용하지 않습니다</span>. 
                    어벤Subs는 AI 기반으로 사용 패턴을 분석해 불필요한 구독을 찾아내고, 
                    최적의 요금제나 대체 서비스를 추천해 드립니다.
                  </p>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-10">
                    {[
                      { number: "93%", label: "사용자 만족도" },
                      { number: "20+", label: "제휴 서비스" },
                      { number: "5분", label: "초기 설정 시간" },
                      { number: "30만원+", label: "연간 절약액" }
                    ].map((stat, index) => (
                      <div key={index} className="flex flex-col">
                        <p className="text-2xl sm:text-3xl font-bold text-blue-600">{stat.number}</p>
                        <p className="text-sm text-gray-500">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                  
                  <Link 
                    href="/signup" 
                    className="inline-flex items-center px-6 py-3.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-all shadow-sm"
                  >
                    <span>무료로 시작하기</span>
                    <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </Link>
                </div>
              </div>
              
              {/* 절약 분석 */}
              <div className="p-8 md:p-12 lg:p-16 flex items-center bg-white">
                <div className="w-full space-y-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-bold text-gray-900">개인 맞춤 절약 분석</h3>
                    <div className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs font-medium">
                      절약 혜택
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-2xl p-6 space-y-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-gray-500">현재 월간 구독 비용</p>
                        <p className="text-2xl font-bold text-gray-900">65,350원</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">최적화 후 비용</p>
                        <p className="text-2xl font-bold text-green-600">44,500원</p>
                      </div>
                    </div>
                    
                    <div className="h-px bg-gray-200"></div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <p className="text-sm font-medium text-gray-700">절약 가능 금액</p>
                        <p className="text-sm font-medium text-green-600">월 20,850원</p>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 rounded-full w-[32%]"></div>
                      </div>
                      <p className="text-xs text-right text-gray-500 mt-1">총 구독 비용의 32% 절약</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {[
                      { 
                        title: "유튜브 프리미엄",
                        description: "개인 플랜으로 변경 시", 
                        currentCost: "14,900원",
                        newCost: "8,690원", 
                        savings: "6,210원 절약"
                      },
                      { 
                        title: "애플 서비스 번들",
                        description: "Apple One으로 통합 시", 
                        currentCost: "26,700원",
                        newCost: "16,500원", 
                        savings: "10,200원 절약" 
                      },
                      { 
                        title: "사용하지 않는 앱 구독",
                        description: "지난 3개월간 미사용", 
                        currentCost: "4,400원",
                        newCost: "0원", 
                        savings: "4,400원 절약" 
                      }
                    ].map((suggestion, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-sm transition-all">
                        <div>
                          <p className="font-medium text-gray-900">{suggestion.title}</p>
                          <p className="text-sm text-gray-500">{suggestion.description}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500 line-through">{suggestion.currentCost}</span>
                            <span className="text-sm font-medium text-gray-900">{suggestion.newCost}</span>
                          </div>
                          <p className="text-xs font-medium text-green-600">{suggestion.savings}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Link 
                    href="/dashboard/insights" 
                    className="block w-full py-3 bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium rounded-xl text-center transition-colors"
                  >
                    맞춤 절약 플랜 보기
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="w-full py-20 px-5 md:px-8 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-16">
            <div className="md:col-span-5">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center">
                  <img 
                    alt="AvenSubs 로고" 
                    loading="lazy" 
                    width="20" 
                    height="20" 
                    decoding="async" 
                    src="/logo-ocean.svg"
                  />
                </div>
                <span className="text-lg font-bold text-gray-900">
                  어벤Subs
                </span>
              </div>
              <p className="text-gray-600 text-base mb-6 max-w-sm">
                구독 서비스 통합 관리 플랫폼으로 모든 구독을 한 곳에서 스마트하게 관리하세요.
              </p>
              <div className="flex space-x-4">
                {[
                  { name: "Twitter", url: "#", icon: "M22 5.92375C21.2563 6.25 20.4637 6.465 19.6375 6.57125C20.4875 6.06375 21.1363 5.26625 21.4412 4.305C20.6488 4.7775 19.7738 5.11125 18.8412 5.2925C18.0887 4.49625 17.0162 4 15.8462 4C13.5763 4 11.7487 5.8425 11.7487 8.10125C11.7487 8.42625 11.7762 8.73875 11.8438 9.03625C8.435 8.87 5.41875 7.23625 3.3925 4.7475C3.03875 5.36125 2.83125 6.06375 2.83125 6.82C2.83125 8.24 3.5625 9.49875 4.6525 10.2275C3.99375 10.215 3.3475 10.0238 2.8 9.7225C2.8 9.735 2.8 9.75125 2.8 9.7675C2.8 11.76 4.22125 13.415 6.085 13.7962C5.75125 13.8875 5.3875 13.9312 5.01 13.9312C4.7475 13.9312 4.4825 13.9163 4.23375 13.8712C4.765 15.4963 6.2725 16.6837 8.065 16.7175C6.67 17.8162 4.89875 18.4688 2.98125 18.4688C2.645 18.4688 2.3225 18.4538 2 18.4112C3.81625 19.5813 5.96875 20.25 8.29 20.25C15.835 20.25 19.96 14 19.96 8.5825C19.96 8.40125 19.9538 8.22625 19.945 8.05125C20.7588 7.475 21.4425 6.75375 22 5.92375Z" },
                  { name: "Facebook", url: "#", icon: "M9.19795 21.5H13.198V13.4901H16.8021L17.198 9.50977H13.198V7.5C13.198 6.94772 13.6457 6.5 14.198 6.5H17.198V2.5H14.198C11.4365 2.5 9.19795 4.73858 9.19795 7.5V9.50977H7.19795L6.80206 13.4901H9.19795V21.5Z" },
                  { name: "Instagram", url: "#", icon: "M12 2C14.717 2 15.056 2.01 16.122 2.06C17.187 2.11 17.912 2.277 18.55 2.525C19.21 2.779 19.766 3.123 20.322 3.678C20.8305 4.1779 21.224 4.78259 21.475 5.45C21.722 6.087 21.89 6.813 21.94 7.878C21.987 8.944 22 9.283 22 12C22 14.717 21.99 15.056 21.94 16.122C21.89 17.187 21.722 17.912 21.475 18.55C21.2247 19.2178 20.8311 19.8226 20.322 20.322C19.822 20.8303 19.2173 21.2238 18.55 21.475C17.913 21.722 17.187 21.89 16.122 21.94C15.056 21.987 14.717 22 12 22C9.283 22 8.944 21.99 7.878 21.94C6.813 21.89 6.088 21.722 5.45 21.475C4.78233 21.2245 4.17753 20.8309 3.678 20.322C3.16941 19.8222 2.77593 19.2175 2.525 18.55C2.277 17.913 2.11 17.187 2.06 16.122C2.013 15.056 2 14.717 2 12C2 9.283 2.01 8.944 2.06 7.878C2.11 6.812 2.277 6.088 2.525 5.45C2.77524 4.78218 3.1688 4.17732 3.678 3.678C4.17767 3.16923 4.78243 2.77573 5.45 2.525C6.088 2.277 6.812 2.11 7.878 2.06C8.944 2.013 9.283 2 12 2ZM12 7C10.6739 7 9.40215 7.52678 8.46447 8.46447C7.52678 9.40215 7 10.6739 7 12C7 13.3261 7.52678 14.5979 8.46447 15.5355C9.40215 16.4732 10.6739 17 12 17C13.3261 17 14.5979 16.4732 15.5355 15.5355C16.4732 14.5979 17 13.3261 17 12C17 10.6739 16.4732 9.40215 15.5355 8.46447C14.5979 7.52678 13.3261 7 12 7V7ZM18.5 6.75C18.5 6.41848 18.3683 6.10054 18.1339 5.86612C17.8995 5.6317 17.5815 5.5 17.25 5.5C16.9185 5.5 16.6005 5.6317 16.3661 5.86612C16.1317 6.10054 16 6.41848 16 6.75C16 7.08152 16.1317 7.39946 16.3661 7.63388C16.6005 7.8683 16.9185 8 17.25 8C17.5815 8 17.8995 7.8683 18.1339 7.63388C18.3683 7.39946 18.5 7.08152 18.5 6.75ZM12 9C12.7956 9 13.5587 9.31607 14.1213 9.87868C14.6839 10.4413 15 11.2044 15 12C15 12.7956 14.6839 13.5587 14.1213 14.1213C13.5587 14.6839 12.7956 15 12 15C11.2044 15 10.4413 14.6839 9.87868 14.1213C9.31607 13.5587 9 12.7956 9 12C9 11.2044 9.31607 10.4413 9.87868 9.87868C10.4413 9.31607 11.2044 9 12 9Z" }
                ].map((social, index) => (
                  <a 
                    key={index}
                    href={social.url} 
                    className="w-10 h-10 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-600 hover:text-blue-600 hover:border-blue-100 transition-all" 
                    title={`${social.name} 방문하기`}
                    aria-label={social.name}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d={social.icon} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
            
            <div className="md:col-span-3">
              <h3 className="text-gray-900 font-medium mb-5">고객지원</h3>
              <ul className="space-y-4">
                {[
                  { name: "공지사항", path: "/notice" },
                  { name: "자주 묻는 질문", path: "/faq" },
                  { name: "고객센터", path: "/support" },
                  { name: "피드백 보내기", path: "/feedback" }
                ].map((item, index) => (
                  <li key={index}>
                    <Link href={item.path} className="text-gray-600 hover:text-blue-600 transition-colors">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="md:col-span-4">
              <h3 className="text-gray-900 font-medium mb-5">뉴스레터</h3>
              <p className="text-gray-600 mb-4">구독 관리의 팁과 새로운 소식을 받아보세요</p>
              <div className="flex flex-col space-y-3">
                <div className="flex">
                  <input 
                    type="email" 
                    placeholder="이메일 주소" 
                    className="px-4 py-3 w-full border border-gray-200 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    aria-label="이메일 주소"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={subscriptionStatus === 'loading'}
                  />
                  <button 
                    className={`${subscriptionStatus === 'loading' ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} text-white px-5 py-3 rounded-r-lg transition-colors flex-shrink-0 font-medium flex items-center justify-center min-w-[80px]`}
                    onClick={handleSubscribe}
                    disabled={subscriptionStatus === 'loading'}
                  >
                    {subscriptionStatus === 'loading' ? (
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : '구독'}
                  </button>
                </div>
                {subscriptionStatus !== 'idle' && (
                  <p className={`text-sm ${subscriptionStatus === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                    {statusMessage}
                  </p>
                )}
                <p className="text-xs text-gray-500">
                  구독신청 시 <Link href="/privacy" className="underline hover:text-blue-600">개인정보처리방침</Link>에 동의하게 됩니다.
                </p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex flex-wrap gap-5 items-center justify-center md:justify-start">
                {[
                  { name: "이용약관", path: "/terms" },
                  { name: "개인정보처리방침", path: "/privacy" },
                  { name: "쿠키 정책", path: "/cookies" }
                ].map((item, index) => (
                  <Link
                    key={index}
                    href={item.path}
                    className="text-sm text-gray-500 hover:text-blue-600 transition-colors whitespace-nowrap"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              
              <div className="text-center md:text-right">
                <div className="text-gray-400 text-sm">
                  © {new Date().getFullYear()} 어벤Subs. All rights reserved.
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  주소: 서울특별시 강남구 테헤란로 123, 4층 (어벤빌딩) | 사업자등록번호: 123-45-67890
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
