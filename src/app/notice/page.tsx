"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NoticePage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-5 py-16 pb-24">
        <div className="mb-12">
          <Link 
            href="/" 
            className="inline-flex items-center text-gray-500 hover:text-gray-900 mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            <span className="text-sm">홈으로</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">공지사항</h1>
          <p className="text-gray-600 mt-2 text-sm">어벤Subs의 최신 소식을 확인하세요</p>
        </div>

        <div className="space-y-3">
          {[
            {
              id: 1, 
              title: "서비스 업데이트 안내 (v2.3.0)", 
              date: "2023.12.15", 
              category: "업데이트",
              content: "어벤Subs 서비스가 2.3.0 버전으로 업데이트 되었습니다. 이번 업데이트에서는 더욱 정확한 구독 서비스 탐지 기능과 개선된 UI/UX를 제공합니다."
            },
            {
              id: 2, 
              title: "신규 제휴 서비스 안내", 
              date: "2023.11.28", 
              category: "안내",
              content: "어벤Subs가 디즈니플러스, 애플 TV+와 새롭게 제휴를 맺게 되었습니다. 이를 통해 사용자들은 더 많은 혜택과 할인 기회를 얻을 수 있습니다."
            },
            {
              id: 3, 
              title: "개인정보처리방침 개정 안내", 
              date: "2023.11.10", 
              category: "중요",
              content: "2023년 12월 1일부터 적용되는 개인정보처리방침 개정 내용을 안내드립니다. 주요 변경사항은 데이터 보관 기간 및 제3자 제공 범위에 관한 내용입니다."
            },
            {
              id: 4, 
              title: "연말 프로모션 안내", 
              date: "2023.12.01", 
              category: "프로모션",
              content: "연말을 맞아 어벤Subs 프리미엄 구독 30% 할인 프로모션을 진행합니다. 12월 31일까지 신규 가입 시 적용되며, 첫 3개월간 할인이 적용됩니다."
            },
            {
              id: 5, 
              title: "모바일 앱 출시 안내", 
              date: "2023.10.15", 
              category: "출시",
              content: "어벤Subs 모바일 앱이 안드로이드와 iOS 플랫폼에 정식 출시되었습니다. 이제 언제 어디서나 편리하게 구독 서비스를 관리할 수 있습니다."
            }
          ].map((notice) => (
            <div 
              key={notice.id} 
              className="bg-white p-5 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h2 className="text-base font-semibold text-gray-900">{notice.title}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-500">{notice.date}</span>
                    {notice.category && (
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        notice.category === "중요" 
                          ? "bg-red-50 text-red-600" 
                          : notice.category === "업데이트" 
                            ? "bg-blue-50 text-blue-600"
                            : notice.category === "프로모션"
                              ? "bg-yellow-50 text-yellow-600"
                              : "bg-gray-50 text-gray-600"
                      }`}>
                        {notice.category}
                      </span>
                    )}
                  </div>
                </div>
                <Link 
                  href={`/notice/${notice.id}`}
                  className="text-xs font-medium text-blue-500 hover:text-blue-600"
                >
                  자세히
                </Link>
              </div>
              <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                {notice.content}
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-10 flex justify-center">
          <div className="inline-flex items-center space-x-1">
            {[1, 2, 3].map((pageNum) => (
              <button 
                key={pageNum}
                className={`w-8 h-8 flex items-center justify-center rounded-full text-sm ${
                  pageNum === 1 
                    ? "bg-blue-50 text-blue-600 font-medium" 
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {pageNum}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 