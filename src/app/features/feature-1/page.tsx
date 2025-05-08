'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SubscriptionManagementPage() {
  const [email, setEmail] = useState('');
  
  const handleSubscribe = () => {
    if (email.trim() && email.includes('@')) {
      // 실제 구현에서는 API로 이메일 전송
      alert(`${email}로 구독 신청이 완료되었습니다!`);
      setEmail('');
    } else {
      alert('올바른 이메일 주소를 입력해주세요.');
    }
  };
  
  return (
    <div className="max-w-7xl mx-auto">
      {/* 히어로 섹션 */}
      <div className="flex flex-col-reverse lg:flex-row items-center lg:items-start gap-12 lg:gap-16 mb-24">
        <div className="w-full lg:w-1/2 space-y-8">
          <div className="space-y-6">
            <div className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
              구독 관리
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              내 모든 구독 서비스를
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">한눈에 관리하세요</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-lg">
              매달 어디에 얼마나 돈이 빠져나가는지 모르겠나요? 어벤Subs가 모든 구독을 자동으로 찾아내고 한 곳에서 관리할 수 있게 도와드립니다.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/signup" className="px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-all shadow-sm text-center">
              무료로 시작하기
            </Link>
            <Link href="/about" className="px-6 py-3 bg-white text-gray-700 font-medium rounded-xl border border-gray-200 hover:bg-gray-50 transition-all text-center">
              자세히 알아보기
            </Link>
          </div>
          
          <div className="pt-6 border-t border-gray-100">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map(num => (
                  <div key={num} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden">
                    <img 
                      src={`https://i.pravatar.cc/100?img=${num+10}`} 
                      alt="사용자" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="text-sm text-gray-500">
                <span className="text-blue-600 font-medium">8,500+</span> 명이 이미 사용중
              </div>
            </div>
          </div>
        </div>
        
        <div className="w-full lg:w-1/2">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-6 md:p-8 shadow-lg">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">구독 관리 대시보드</h3>
                <div className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">Premium</div>
              </div>
              
              <div className="space-y-4 mb-6">
                {[
                  { 
                    name: "넷플릭스", 
                    price: "17,000원", 
                    icon: "/icons/netflix.svg", 
                    color: "bg-red-100",
                    nextPayment: "10일 후",
                    status: "active" 
                  },
                  { 
                    name: "유튜브 프리미엄", 
                    price: "14,900원", 
                    icon: "/icons/youtube.svg", 
                    color: "bg-red-100",
                    nextPayment: "3일 후",
                    status: "warning" 
                  },
                  { 
                    name: "애플 뮤직", 
                    price: "8,900원", 
                    icon: "/icons/apple.svg", 
                    color: "bg-gray-100",
                    nextPayment: "15일 후",
                    status: "inactive" 
                  },
                  { 
                    name: "디즈니 플러스", 
                    price: "9,900원", 
                    icon: "/icons/disney.svg", 
                    color: "bg-blue-100",
                    nextPayment: "21일 후",
                    status: "active" 
                  }
                ].map((sub, i) => (
                  <div key={i} className={`p-4 rounded-xl ${sub.status === 'warning' ? 'bg-red-50 border border-red-100' : 'bg-white border border-gray-100'} transition-all hover:shadow-md`}>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg ${sub.color} flex items-center justify-center`}>
                          <div className="w-5 h-5 text-gray-700">
                            {sub.name.substring(0, 1)}
                          </div>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{sub.name}</div>
                          <div className="text-sm text-gray-500">결제: {sub.nextPayment}</div>
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
              
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                <span className="font-medium text-gray-700">이번 달 총액</span>
                <span className="text-xl font-bold text-gray-900">50,700원</span>
              </div>
              
              <div className="mt-6 text-center">
                <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                  최적화 추천 보기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 핵심 기능 섹션 */}
      <div className="mb-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            구독 관리, 이렇게 <span className="text-blue-600">쉽고 편리하게</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            어벤Subs는 모든 구독 서비스를 자동으로 찾아내고 관리할 수 있는 다양한 기능을 제공합니다.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "자동 구독 탐지",
              description: "계좌, 문자, 이메일에서 모든 구독 서비스를 자동으로 찾아드려요.",
              icon: (
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                </svg>
              )
            },
            {
              title: "통합 대시보드",
              description: "모든 구독을, 남은 결제일, 금액을 한눈에 확인할 수 있어요.",
              icon: (
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              )
            },
            {
              title: "결제일 알림",
              description: "놓치기 쉬운 결제일을 미리 알려드려 원치 않는 결제를 방지해요.",
              icon: (
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                </svg>
              )
            }
          ].map((feature, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all">
              <div className="bg-blue-50 rounded-xl w-12 h-12 flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* 고객 후기 섹션 */}
      <div className="mb-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            실제 사용자들의 <span className="text-blue-600">후기</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            어벤Subs를 통해 구독 서비스를 관리하고 비용을 절약한 사용자들의 실제 후기입니다.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              name: "김지민",
              role: "직장인",
              comment: "매달 빠져나가는 구독료를 한눈에 볼 수 있어서 너무 좋아요. 불필요한 구독 2개를 해지하고 월 25,000원을 절약했습니다!",
              avatar: "https://i.pravatar.cc/100?img=1"
            },
            {
              name: "이준호",
              role: "대학생",
              comment: "여러 OTT 서비스를 사용하고 있었는데, 어벤Subs 덕분에 어떤 구독이 정말 필요한지 파악할 수 있었어요.",
              avatar: "https://i.pravatar.cc/100?img=2"
            },
            {
              name: "박서연",
              role: "프리랜서",
              comment: "구독 결제일 알림 기능이 정말 유용해요. 필요 없는 서비스는 결제 전에 미리 해지할 수 있어 불필요한 지출을 막을 수 있었습니다.",
              avatar: "https://i.pravatar.cc/100?img=3"
            }
          ].map((testimonial, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img src={testimonial.avatar} alt={testimonial.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-600">{testimonial.comment}</p>
              <div className="mt-4 flex items-center">
                {[1, 2, 3, 4, 5].map(star => (
                  <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* CTA 섹션 */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl p-10 md:p-16 text-center text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          지금 바로 구독 관리를 시작하세요
        </h2>
        <p className="text-blue-100 max-w-2xl mx-auto mb-8">
          어벤Subs와 함께라면 모든 구독 서비스를 한 곳에서 쉽고 편리하게 관리할 수 있습니다.
          불필요한 지출을 줄이고 더 나은 구독 생활을 시작해보세요.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/signup" className="px-8 py-3 bg-white text-blue-600 font-medium rounded-xl hover:bg-blue-50 transition-all shadow-sm">
            무료로 시작하기
          </Link>
          <Link href="/about" className="px-8 py-3 bg-blue-700 bg-opacity-30 text-white font-medium rounded-xl hover:bg-opacity-40 transition-all border border-blue-400 border-opacity-30">
            자세히 알아보기
          </Link>
        </div>
      </div>
      
      {/* 뉴스레터 구독 섹션 추가 */}
      <div className="my-24 bg-gray-50 rounded-2xl p-8 md:p-12">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">구독 관리 팁을 받아보세요</h3>
          <p className="text-gray-600 mb-6">매주 구독 서비스 할인 정보와 최적화 팁을 이메일로 받아보세요.</p>
          
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <input
              type="email"
              placeholder="이메일 주소 입력"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button 
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all"
              onClick={handleSubscribe}
            >
              구독하기
            </button>
          </div>
          
          <p className="text-xs text-gray-500 mt-4">
            구독은 언제든지 취소할 수 있습니다. 개인정보는 안전하게 보호됩니다.
          </p>
        </div>
      </div>
    </div>
  );
} 