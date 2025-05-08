'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function SubscriptionOptimizationPage() {
  
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
              className="inline-flex items-center px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-sm font-medium"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
              구독 최적화
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight"
            >
              불필요한 지출을
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500 block">스마트하게 줄이세요</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="text-base text-gray-600 leading-relaxed"
            >
              맞춤형 최적화 추천으로 연간 최대 30만원을 절약하세요.
            </motion.p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <Link href="/signup" className="px-5 py-3 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 transition-all shadow-sm text-center flex items-center justify-center">
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
            <span className="text-emerald-600 font-medium">95%</span>의 사용자가 비용 절감
            <span className="text-xs text-gray-500">연간 평균 28만원 절약</span>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="w-full lg:w-1/2"
        >
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-5 shadow-lg">
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="bg-emerald-600 text-white p-2 rounded-lg">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">구독 최적화 추천</h3>
                </div>
                <div className="bg-emerald-50 text-emerald-600 px-2 py-1 rounded-full text-sm font-medium border border-emerald-100">절약 가능: 23,900원/월</div>
              </div>
              
              <div className="space-y-3 mb-4">
                {[
                  { 
                    name: "넷플릭스",
                    currentPlan: "프리미엄 (17,000원)",
                    recommendation: "스탠다드로 다운그레이드",
                    savings: "4,000원/월",
                    reason: "4K 컨텐츠 시청 기록이 거의 없음",
                    priority: "high"
                  },
                  { 
                    name: "스포티파이",
                    currentPlan: "개인 (10,900원)",
                    recommendation: "가족 플랜으로 변경",
                    savings: "5,900원/월",
                    reason: "가족 구성원 3명이 개별 구독 중",
                    priority: "high"
                  },
                  { 
                    name: "유튜브 프리미엄",
                    currentPlan: "개인 (14,900원)",
                    recommendation: "연간 결제로 전환",
                    savings: "1,800원/월",
                    reason: "월 결제 대비 12% 할인 혜택",
                    priority: "medium"
                  }
                ].map((item, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + (i * 0.1), duration: 0.3 }}
                    className={`p-3 rounded-lg ${
                      item.priority === 'high' 
                        ? 'bg-emerald-50 border border-emerald-100' 
                        : 'bg-white border border-gray-100'
                    } hover:shadow-sm transition-all relative`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium text-gray-900 mb-1">{item.name}</div>
                        <div className="text-xs text-gray-500 mb-2">현재: {item.currentPlan}</div>
                        <div className="flex items-center gap-1 mb-1">
                          <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                          </svg>
                          <span className="text-sm font-medium">{item.recommendation}</span>
                        </div>
                        <div className="text-xs text-gray-500">{item.reason}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-emerald-600 font-medium">-{item.savings}</div>
                        {item.priority === 'high' && (
                          <div className="text-xs bg-emerald-500 text-white px-1.5 py-0.5 rounded-full mt-1">강력 추천</div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="pt-3 mt-2 border-t border-gray-100">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm text-gray-500">연간 총 절감액</span>
                  <span className="text-lg font-bold text-gray-900">286,800원</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  className="w-full py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  모든 최적화 적용하기
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* 주요 기능 섹션 */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="py-12 space-y-8"
      >
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            스마트한 구독 최적화
          </h2>
          <p className="text-gray-600">
            어벤Subs의 AI 기반 추천으로 효율적인 구독 서비스 이용을 시작하세요
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          {[
            {
              title: "맞춤형 플랜 추천",
              description: "실제 사용 패턴을 분석하여 각 서비스별 최적의 요금제를 추천합니다.",
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                </svg>
              ),
            },
            {
              title: "중복 구독 감지",
              description: "가족 및 기기 간 중복되는 구독을 찾아 비용 절감 방안을 제시합니다.",
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
              ),
            },
            {
              title: "자동 최적화",
              description: "원클릭으로 추천된 최적화 방안을 적용하여 즉시 비용을 절감하세요.",
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
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
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center mb-4">
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
        className="py-12 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl my-12 text-center px-4 sm:px-8"
      >
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            지금 시작하고 연간 최대 30만원을 절약하세요
          </h2>
          <p className="text-emerald-100 mb-6 max-w-xl mx-auto">
            구독 서비스를 최적화하여 불필요한 지출을 줄이고 똑똑한 소비 습관을 만들어보세요
          </p>
          
          <Link href="/signup" className="inline-block px-6 py-3 bg-white text-emerald-600 font-medium rounded-xl shadow-md hover:bg-emerald-50 transition-colors">
            무료로 시작하기
          </Link>
        </div>
      </motion.section>
    </div>
  );
} 