"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronDown, ChevronUp, Search } from "lucide-react";

// FAQ 아이템 컴포넌트
const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        className="w-full flex justify-between items-center py-5 text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-base font-medium text-gray-900">{question}</h3>
        <div className="ml-4 flex-shrink-0">
          {isOpen ? (
            <ChevronUp className="w-4 h-4 text-gray-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-400" />
          )}
        </div>
      </button>
      {isOpen && (
        <div className="pb-5 text-sm leading-relaxed text-gray-600">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

export default function FAQPage() {
  const faqs = [
    {
      question: "어벤Subs는 어떤 서비스인가요?",
      answer: "어벤Subs는 사용자의 모든 구독 서비스를 한 곳에서 관리할 수 있는 통합 구독 관리 플랫폼입니다. 은행 계좌, 문자, 이메일 등을 통해 자동으로 구독 서비스를 탐지하고, 비용 최적화, 결제일 알림 등의 기능을 제공합니다."
    },
    {
      question: "구독 서비스는 어떻게 자동으로 탐지되나요?",
      answer: "어벤Subs는 사용자의 은행 거래 내역, 이메일, 문자 메시지 등을 분석하여 정기적으로 결제되는 구독 서비스를 자동으로 탐지합니다. 이 과정은 사용자의 동의 하에 안전하게 이루어지며, 모든 데이터는 암호화되어 처리됩니다."
    },
    {
      question: "구독 비용 최적화는 어떻게 이루어지나요?",
      answer: "어벤Subs의 AI 시스템이 사용자의 구독 서비스 사용 패턴을 분석하여 불필요한 구독이나 더 저렴한 요금제로 변경 가능한 서비스를 찾아냅니다. 또한 비슷한 기능을 제공하는 더 저렴한 대안 서비스도 추천해 드립니다."
    },
    {
      question: "결제일 알림 기능은 어떻게 작동하나요?",
      answer: "어벤Subs는 각 구독 서비스의 다음 결제일을 추적하고, 결제일 3일 전에 이메일이나 앱 알림을 통해 사용자에게 알려드립니다. 이를 통해 불필요한 구독 연장을 방지하고 예산 관리를 도와드립니다."
    },
    {
      question: "어벤Subs는 무료인가요?",
      answer: "어벤Subs는 기본 기능(구독 탐지, 목록 관리, 결제일 알림 등)을 무료로 제공합니다. 고급 기능(상세한 구독 분석, 자동 최적화 추천, 여러 계정 연동 등)은 프리미엄 서비스로 제공됩니다. 자세한 요금 정보는 요금제 페이지에서 확인하실 수 있습니다."
    },
    {
      question: "개인 정보는 안전하게 보호되나요?",
      answer: "네, 어벤Subs는 사용자의 개인 정보 보호를 최우선으로 생각합니다. 모든 데이터는 업계 표준 암호화 방식으로 안전하게 저장되며, 철저한 보안 프로토콜을 통해 보호됩니다. 또한 데이터 분석 과정에서도 사용자의 프라이버시를 최대한 보장합니다."
    },
    {
      question: "어떤 구독 서비스를 지원하나요?",
      answer: "어벤Subs는 넷플릭스, 디즈니플러스, 유튜브 프리미엄, 스포티파이 등의 스트리밍 서비스부터 Microsoft 365, 클라우드 스토리지, 뉴스 구독, 음식 배달 서비스 등 다양한 구독 서비스를 지원합니다. 현재 200개 이상의 인기 구독 서비스를 자동으로 인식할 수 있습니다."
    },
    {
      question: "구독 서비스 해지도 도와주나요?",
      answer: "어벤Subs는 불필요한 구독 서비스를 식별하고 해지 방법을 안내해 드립니다. 일부 제휴 서비스의 경우 어벤Subs 앱 내에서 직접 해지 프로세스를 진행할 수도 있습니다. 그러나 모든 서비스의 해지를 자동화하지는 않으며, 일부 서비스는 해당 서비스 제공업체의 웹사이트나 앱을 통해 직접 해지해야 할 수 있습니다."
    },
    {
      question: "가족 계정은 어떻게 관리하나요?",
      answer: "어벤Subs의 프리미엄 플랜에서는 가족 계정 관리 기능을 제공합니다. 가족 구성원을 초대하여 공유 중인 구독 서비스의 비용을 쉽게 분할하고 관리할 수 있습니다. 또한 각 구성원별로 사용량을 추적하고 공정한 비용 분담을 도와드립니다."
    },
    {
      question: "해외 서비스도 지원하나요?",
      answer: "네, 어벤Subs는 글로벌 서비스로 국내뿐만 아니라 해외 구독 서비스도 지원합니다. 현재 주요 글로벌 서비스들을 모두 지원하고 있으며, 지속적으로 지원 서비스를 확대하고 있습니다."
    }
  ];

  const categories = [
    "전체", "서비스 이용", "결제 및 요금", "계정 관리", "보안 및 개인정보"
  ];

  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-5 py-16 pb-24">
        <div className="mb-10">
          <Link
            href="/"
            className="inline-flex items-center text-gray-500 hover:text-gray-900 mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            <span className="text-sm">홈으로</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">자주 묻는 질문</h1>
          <p className="text-sm text-gray-600 mt-2">어벤Subs 서비스에 대한 궁금증을 해결해 드립니다.</p>
        </div>

        {/* 검색 */}
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="질문 검색하기"
              className="w-full px-4 py-3 pl-10 bg-gray-50 border-none rounded-2xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search
              className="absolute left-3 top-3.5 w-4 h-4 text-gray-400"
            />
          </div>
        </div>

        {/* 카테고리 필터 */}
        <div className="flex overflow-x-auto pb-3 space-x-2 scrollbar-hide mb-5">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`flex items-center px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors
                ${selectedCategory === category
                  ? 'bg-blue-50 text-blue-600 border border-blue-100'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-50'
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ 목록 */}
        <div className="border border-gray-100 rounded-2xl bg-white overflow-hidden">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>

        {/* 추가 지원 안내 */}
        <div className="mt-12 bg-blue-50 rounded-2xl p-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-1">더 궁금한 점이 있으신가요?</h3>
          <p className="text-sm text-gray-600 mb-4">
            FAQ에서 원하는 답변을 찾지 못하셨다면, 고객센터에 문의해 주세요.
            전문 상담원이 신속하게 도움을 드리겠습니다.
          </p>
          <div className="flex space-x-3">
            <Link
              href="/support"
              className="inline-flex items-center justify-center px-4 py-2 bg-blue-500 text-white text-sm rounded-xl font-medium hover:bg-blue-600 transition-colors"
            >
              고객센터 문의하기
            </Link>
            <Link
              href="/feedback"
              className="inline-flex items-center justify-center px-4 py-2 bg-white text-gray-700 border border-gray-200 text-sm rounded-xl font-medium hover:bg-gray-50 transition-colors"
            >
              피드백 남기기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 