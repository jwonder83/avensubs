'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function SubscriptionManagementPage() {
  const [email, setEmail] = useState('');
  
  const handleSubscribe = () => {
    if (email.trim() && email.includes('@')) {
      alert(`${email}로 구독 신청이 완료되었습니다!`);
      setEmail('');
    } else {
      alert('올바른 이메일 주소를 입력해주세요.');
    }
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      {/* 히어로 섹션 */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col-reverse lg:flex-row items-center lg:items-start gap-8 lg:gap-12 mb-16 mt-8"
      >
        <div className="w-full lg:w-1/2 space-y-6">
          <div className="space-y-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium"
            >
              <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 2v4M8 2v4M4 10h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              구독 관리
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight"
            >
              내 모든 구독 서비스를
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500 block">한눈에 관리하세요</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="text-base text-gray-600 leading-relaxed"
            >
              매달 지출되는 구독료를 한 곳에서 손쉽게 관리하고 불필요한 지출을 줄여보세요.
            </motion.p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <Link href="/signup" className="px-5 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-all shadow-sm text-center flex items-center justify-center">
              <span>무료로 시작하기</span>
              <svg className="w-4 h-4 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </Link>
            <Link href="/about" className="px-5 py-3 bg-white text-gray-700 font-medium rounded-xl border border-gray-200 hover:bg-gray-50 transition-all text-center">
              자세히 알아보기
            </Link>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="flex items-center gap-3 text-sm"
          >
            <span className="text-blue-600 font-medium">8,500+</span> 사용자 사용 중
            <div className="flex items-center">
              <div className="flex items-center text-yellow-400">
                ★★★★★
              </div>
              <span className="ml-1 text-xs text-gray-500">4.9/5</span>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="w-full lg:w-1/2"
        >
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-5 shadow-lg">
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="bg-blue-600 text-white p-2 rounded-lg">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 4H3C1.89543 4 1 4.89543 1 6V18C1 19.1046 1.89543 20 3 20H21C22.1046 20 23 19.1046 23 18V6C23 4.89543 22.1046 4 21 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M1 10H23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">구독 관리 대시보드</h3>
                </div>
                <div className="bg-blue-50 text-blue-600 px-2 py-1 rounded-full text-sm font-medium border border-blue-100">Premium</div>
              </div>
              
              <div className="space-y-3 mb-4">
                {[
                  { 
                    name: "넷플릭스", 
                    price: "17,000원", 
                    nextPayment: "10일 후",
                    status: "active" 
                  },
                  { 
                    name: "유튜브 프리미엄", 
                    price: "14,900원", 
                    nextPayment: "3일 후",
                    status: "warning" 
                  },
                  { 
                    name: "애플 뮤직", 
                    price: "8,900원", 
                    nextPayment: "15일 후",
                    status: "inactive" 
                  },
                  { 
                    name: "디즈니 플러스", 
                    price: "9,900원", 
                    nextPayment: "21일 후",
                    status: "active" 
                  }
                ].map((sub, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + (i * 0.1), duration: 0.3 }}
                    className={`p-3 rounded-lg ${sub.status === 'warning' ? 'bg-red-50 border border-red-100' : 'bg-white border border-gray-100'} hover:shadow-sm cursor-pointer group`}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                          {sub.name.substring(0, 1)}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 flex items-center gap-1">
                            {sub.name}
                            {sub.status === 'inactive' && (
                              <span className="text-xs bg-gray-200 text-gray-700 px-1.5 py-0.5 rounded-full">미사용</span>
                            )}
                            {sub.status === 'warning' && (
                              <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
                              </svg>
                            )}
                          </div>
                          <div className="text-xs text-gray-500">
                            결제: <span className={sub.status === 'warning' ? 'font-medium text-red-600' : ''}>{sub.nextPayment}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right font-medium text-gray-900">{sub.price}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="pt-3 mt-2 border-t border-gray-100">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">이번 달 총 지출</span>
                  <span className="text-lg font-bold text-gray-900">50,700원</span>
                </div>
                <div className="mt-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    className="w-full py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    모든 구독 관리하기
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* 핵심 기능 섹션 */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="py-12 space-y-8"
      >
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            구독 서비스를 관리하는 새로운 방법
          </h2>
          <p className="text-gray-600">
            복잡한 구독 서비스를 쉽게 관리하고 불필요한 지출을 줄여보세요
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          {[
            {
              title: "자동 구독 추적",
              description: "은행 계좌와 카드를 연결하면 모든 구독 서비스를 자동으로 찾아서 관리해 드립니다.",
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                </svg>
              ),
            },
            {
              title: "알림 및 리마인더",
              description: "결제일 전에 미리 알려드려 예상치 못한 결제를 방지합니다.",
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                </svg>
              ),
            },
            {
              title: "최적화 추천",
              description: "더 저렴한 요금제나 불필요한 구독을 파악해 비용 절감 방법을 제안합니다.",
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
              ),
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
              className="bg-white p-6 rounded-xl border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CTA 섹션 */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="py-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl my-12 text-center px-4 sm:px-8"
      >
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            지금 바로 구독 서비스 관리를 시작하세요
          </h2>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto">
            어벤Subs와 함께라면 매달 지출되는 구독료를 한눈에 파악하고 최적화할 수 있습니다
          </p>
          
          <form onSubmit={(e) => { e.preventDefault(); handleSubscribe(); }} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="이메일을 입력하세요"
              className="flex-1 px-4 py-3 rounded-xl border-2 border-transparent focus:border-blue-400 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className="bg-white text-blue-600 font-medium px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors"
            >
              시작하기
            </button>
          </form>
        </div>
      </motion.section>
    </div>
  );
} 