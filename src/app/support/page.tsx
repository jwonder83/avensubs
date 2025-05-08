"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Phone, Mail, MessageSquare, Clock, Send } from "lucide-react";

export default function SupportPage() {
  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 실제로는 여기서 API 요청을 보냅니다
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-5 py-16 pb-24">
        <div className="mb-10">
          <Link
            href="/"
            className="inline-flex items-center text-gray-500 hover:text-gray-900 mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            <span className="text-sm">홈으로</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">고객센터</h1>
          <p className="text-sm text-gray-600 mt-1">
            어벤Subs 팀이 도와드리겠습니다
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* 연락처 정보 */}
          <div className="md:col-span-4 space-y-4">
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <h2 className="text-base font-medium text-gray-900 mb-5">연락처 정보</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 text-blue-500" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-xs font-medium text-gray-500">전화 문의</h3>
                    <p className="text-sm text-gray-900 mt-0.5 font-medium">02-1234-5678</p>
                    <p className="text-xs text-gray-500 mt-0.5">평일 09:00 - 18:00</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 text-blue-500" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-xs font-medium text-gray-500">이메일 문의</h3>
                    <p className="text-sm text-gray-900 mt-0.5 font-medium">support@avensubs.com</p>
                    <p className="text-xs text-gray-500 mt-0.5">24시간 접수 가능</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-4 h-4 text-blue-500" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-xs font-medium text-gray-500">채팅 상담</h3>
                    <p className="text-sm text-gray-900 mt-0.5 font-medium">실시간 채팅</p>
                    <p className="text-xs text-gray-500 mt-0.5">평일 10:00 - 17:00</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4 text-blue-500" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-xs font-medium text-gray-500">응답 시간</h3>
                    <p className="text-sm text-gray-900 mt-0.5 font-medium">평균 4시간 이내</p>
                    <p className="text-xs text-gray-500 mt-0.5">주말/공휴일은 지연될 수 있습니다</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-400 to-blue-500 rounded-2xl p-5 text-white">
              <h2 className="text-base font-medium mb-1">도움이 필요하세요?</h2>
              <p className="text-sm text-blue-50 mb-4">
                자주 묻는 질문에서 즉시 답변을 찾아보세요.
              </p>
              <Link
                href="/faq"
                className="inline-flex items-center px-3.5 py-2 bg-white text-blue-500 rounded-xl text-sm font-medium hover:bg-blue-50 transition-colors"
              >
                자주 묻는 질문
              </Link>
            </div>
          </div>

          {/* 문의 양식 */}
          <div className="md:col-span-8">
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <h2 className="text-xl font-medium text-gray-900 mb-2">문의가 접수되었습니다</h2>
                  <p className="text-sm text-gray-600 mb-6">
                    빠른 시일 내에 답변 드리겠습니다. 입력하신 이메일로 회신을 보내드립니다.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-4 py-2.5 bg-blue-500 text-white rounded-xl text-sm font-medium hover:bg-blue-600 transition-colors"
                  >
                    새 문의하기
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-base font-medium text-gray-900 mb-5">문의하기</h2>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1.5">문의 유형</label>
                      <select
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border-none text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                        title="문의 유형 선택"
                        aria-label="문의 유형 선택"
                      >
                        <option value="">문의 유형을 선택해주세요</option>
                        <option value="account">계정 관련</option>
                        <option value="billing">결제 및 요금제</option>
                        <option value="technical">기술적 문제</option>
                        <option value="feature">기능 추가 요청</option>
                        <option value="other">기타 문의</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1.5">이메일</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border-none text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="회신받으실 이메일을 입력해주세요"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1.5">문의 내용</label>
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border-none text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 h-36"
                        placeholder="문의 내용을 상세히 적어주세요"
                        required
                      ></textarea>
                    </div>
                    
                    <div className="flex items-center">
                      <input 
                        id="privacy" 
                        type="checkbox" 
                        className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
                        required
                      />
                      <label htmlFor="privacy" className="ml-2 block text-xs text-gray-600">
                        개인정보 수집 및 이용에 동의합니다. 
                        <Link href="/privacy" className="text-blue-500 hover:underline ml-1">
                          개인정보처리방침
                        </Link>
                      </label>
                    </div>
                    
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center px-4 py-2.5 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors text-sm font-medium"
                    >
                      <Send className="w-3.5 h-3.5 mr-1.5" />
                      문의하기
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
        
        {/* 자주 묻는 기술 문제 */}
        <div className="mt-14">
          <h2 className="text-lg font-medium text-gray-900 mb-5">자주 발생하는 기술 문제</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: "구독 서비스가 자동으로 인식되지 않아요",
                solution: "은행 계좌 연동을 확인하고, 최근 3개월 이내의 거래만 분석됩니다. 수동으로 구독을 추가할 수도 있습니다."
              },
              {
                title: "알림을 받지 못해요",
                solution: "앱 설정에서 알림 권한을 확인하고, 이메일 주소가 정확한지 확인해주세요. 스팸함도 확인해보세요."
              },
              {
                title: "계정에 로그인할 수 없어요",
                solution: "비밀번호 재설정을 시도하거나, 소셜 로그인을 사용하신 경우 해당 계정으로 로그인해주세요."
              },
              {
                title: "결제가 진행되지 않아요",
                solution: "등록된 카드의 만료일을 확인하고, 은행 거래 제한이 있는지 확인해주세요. 다른 결제 수단을 시도해보세요."
              }
            ].map((item, index) => (
              <div key={index} className="bg-white p-4 rounded-2xl border border-gray-100 hover:border-gray-200 transition-all">
                <h3 className="text-sm font-medium text-gray-900 mb-2">{item.title}</h3>
                <p className="text-xs text-gray-600 mb-3 leading-relaxed">{item.solution}</p>
                <Link
                  href="/faq"
                  className="text-blue-500 hover:text-blue-600 inline-flex items-center text-xs font-medium"
                >
                  자세히 알아보기
                  <svg className="ml-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 