'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ExpenseAnalysisPage() {
  const [timeframe, setTimeframe] = useState('month');
  
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
              className="inline-flex items-center px-3 py-1 bg-green-50 text-green-600 rounded-full text-sm font-medium"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"></path>
              </svg>
              지출 분석
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight"
            >
              구독 지출을
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-teal-500 block">스마트하게 분석하세요</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="text-base text-gray-600 leading-relaxed"
            >
              구독 서비스 지출 패턴을 분석하여 더 효율적인 소비 습관을 만들어보세요.
            </motion.p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <Link href="/signup" className="px-5 py-3 bg-green-600 text-white font-medium rounded-xl hover:bg-green-700 transition-all shadow-sm text-center flex items-center justify-center">
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
            <span className="text-green-600 font-medium">92%</span>의 사용자가 비용 절감
            <span className="text-xs text-gray-500 ml-1">월 평균 25,300원 절약</span>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="w-full lg:w-1/2"
        >
          <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-5 shadow-lg">
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="bg-green-600 text-white p-2 rounded-lg">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">지출 분석 대시보드</h3>
                </div>
                <div className="flex p-1 bg-gray-100 rounded-lg">
                  {['월간', '분기', '연간'].map((period, i) => (
                    <motion.button 
                      key={i}
                      className={`px-2 py-1 text-sm rounded-md transition-all ${i === 0 ? 'bg-white shadow-sm text-gray-900' : 'text-gray-600'}`}
                      onClick={() => i === 0 && setTimeframe('month')}
                    >
                      {period}
                    </motion.button>
                  ))}
                </div>
              </div>
              
              <div className="space-y-4">
                {/* 차트 영역 */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  className="bg-gray-50 rounded-xl p-4 overflow-hidden"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="text-sm text-gray-500 mb-1">총 구독 지출</div>
                      <div className="text-2xl font-bold text-gray-900 flex items-baseline">
                        50,700
                        <span className="text-sm font-normal text-gray-500 ml-1">원/월</span>
                        <span className="text-xs font-medium text-green-600 ml-2 flex items-center">
                          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd"></path>
                          </svg>
                          5.2%
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
                        <span className="text-gray-600">이번 달</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-300 rounded-full mr-1"></div>
                        <span className="text-gray-600">지난 달</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="h-36 flex items-end justify-between gap-1 pt-4 border-t border-gray-200">
                    {['1월', '2월', '3월', '4월', '5월', '6월'].map((month, i) => {
                      const heights = [60, 45, 75, 50, 85, 70];
                      return (
                        <motion.div 
                          key={i} 
                          initial={{ height: 0 }}
                          animate={{ height: `${heights[i]}%` }}
                          transition={{ delay: 0.3 + (i * 0.1), duration: 0.5 }}
                          className="w-full bg-green-500 rounded-t-sm relative group"
                        >
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-green-600 text-white text-xs px-1.5 py-0.5 rounded mb-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            {month}: {heights[i] / 100 * 60000}원
                          </div>
                          <div className="text-xs text-center text-gray-600 absolute w-full bottom-0 transform translate-y-full mt-1">
                            {month.substring(0, 1)}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
                
                {/* 카테고리 분석 */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                  className="space-y-3"
                >
                  <div className="text-sm font-medium text-gray-900">카테고리별 지출</div>
                  
                  {[
                    { name: "엔터테인먼트", value: 48, amount: "24,500원" },
                    { name: "음악", value: 29, amount: "14,800원" },
                    { name: "생산성", value: 14, amount: "7,100원" },
                    { name: "기타", value: 9, amount: "4,300원" }
                  ].map((category, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-24 text-xs text-gray-600">{category.name}</div>
                      <div className="flex-1">
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${category.value}%` }}
                            transition={{ delay: 0.3 + (i * 0.1), duration: 0.5 }}
                            className={`h-full ${
                              i === 0 ? 'bg-green-500' : 
                              i === 1 ? 'bg-green-400' : 
                              i === 2 ? 'bg-green-300' : 'bg-green-200'
                            }`}
                          />
                        </div>
                      </div>
                      <div className="w-16 text-right text-xs font-medium text-gray-900">{category.amount}</div>
                      <div className="w-12 text-right text-xs text-gray-500">{category.value}%</div>
                    </div>
                  ))}
                </motion.div>
              </div>
              
              <div className="pt-4 mt-4 border-t border-gray-100">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  className="w-full py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
                >
                  상세 분석 보기
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
            지출 분석으로 얻는 혜택
          </h2>
          <p className="text-gray-600">
            어벤Subs의 데이터 분석 기능으로 더 현명한 구독 관리를 해보세요
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          {[
            {
              title: "소비 패턴 파악",
              description: "월별, 분기별, 연간 구독 지출 패턴을 파악하여 불필요한 지출을 찾아냅니다.",
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              ),
            },
            {
              title: "사용률 비교",
              description: "각 서비스의 실제 사용 빈도와 비용을 비교하여 가성비를 분석합니다.",
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"></path>
                </svg>
              ),
            },
            {
              title: "예산 계획",
              description: "월별 구독 예산을 설정하고 관리하여 지출 목표를 달성하세요.",
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
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
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-4">
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
        className="py-12 bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl my-12 text-center px-4 sm:px-8"
      >
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            지금 시작하고 지출을 최적화하세요
          </h2>
          <p className="text-green-100 mb-6 max-w-xl mx-auto">
            데이터 기반 분석으로 불필요한 지출을 줄이고 똑똑한 소비 습관을 만들어보세요
          </p>
          
          <Link href="/signup" className="inline-block px-6 py-3 bg-white text-green-600 font-medium rounded-xl shadow-md hover:bg-green-50 transition-colors">
            무료로 시작하기
          </Link>
        </div>
      </motion.section>
    </div>
  );
} 