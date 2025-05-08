"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Star, ThumbsUp, ThumbsDown, MessageSquare, Send } from "lucide-react";

export default function FeedbackPage() {
  const [rating, setRating] = useState(0);
  const [feedbackType, setFeedbackType] = useState("");
  const [feedback, setFeedback] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 실제로는 여기서 API 요청을 보냅니다
    setSubmitted(true);
  };

  const resetForm = () => {
    setRating(0);
    setFeedbackType("");
    setFeedback("");
    setEmail("");
    setSubmitted(false);
  };

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
          <h1 className="text-2xl font-bold text-gray-900">서비스 피드백</h1>
          <p className="text-sm text-gray-600 mt-1">
            어벤Subs를 개선하는데 도움이 되는 의견을 남겨주세요
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <ThumbsUp className="w-6 h-6 text-green-500" />
              </div>
              <h2 className="text-xl font-medium text-gray-900 mb-2">피드백이 접수되었습니다</h2>
              <p className="text-sm text-gray-600 mb-6">
                소중한 의견 감사합니다. 더 나은 서비스를 위해 노력하겠습니다.
              </p>
              <button
                onClick={resetForm}
                className="px-4 py-2.5 bg-blue-500 text-white rounded-xl text-sm font-medium hover:bg-blue-600 transition-colors"
              >
                다른 피드백 남기기
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-7">
              {/* 별점 */}
              <div>
                <h2 className="text-sm font-medium text-gray-900 mb-3">어벤Subs 서비스에 대해 어떻게 생각하시나요?</h2>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="focus:outline-none p-1"
                      aria-label={`${star}점 평가`}
                    >
                      <Star
                        className={`w-8 h-8 ${
                          star <= rating
                            ? "text-yellow-400 fill-current"
                            : "text-gray-200"
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-3 text-sm text-gray-600">
                    {rating === 0 && "평가해주세요"}
                    {rating === 1 && "매우 불만족"}
                    {rating === 2 && "불만족"}
                    {rating === 3 && "보통"}
                    {rating === 4 && "만족"}
                    {rating === 5 && "매우 만족"}
                  </span>
                </div>
              </div>

              {/* 피드백 유형 */}
              <div>
                <h2 className="text-sm font-medium text-gray-900 mb-3">피드백 유형을 선택해주세요</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: "ui", name: "UI/UX", icon: <ThumbsUp className="w-4 h-4" /> },
                    { id: "features", name: "기능 제안", icon: <MessageSquare className="w-4 h-4" /> },
                    { id: "bugs", name: "오류 신고", icon: <ThumbsDown className="w-4 h-4" /> },
                    { id: "other", name: "기타", icon: <Star className="w-4 h-4" /> }
                  ].map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setFeedbackType(type.id)}
                      className={`flex items-center p-3 rounded-xl border transition-colors ${
                        feedbackType === type.id
                          ? "bg-blue-50 border-blue-100 text-blue-600"
                          : "bg-gray-50 border-gray-50 text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <div className={`w-7 h-7 rounded-full ${
                        feedbackType === type.id
                          ? "bg-blue-100"
                          : "bg-white"
                      } flex items-center justify-center mr-2.5`}>
                        {type.icon}
                      </div>
                      <span className="text-sm font-medium">{type.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 피드백 내용 */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  상세 피드백
                </label>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border-none text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                  placeholder="어떤 점이 좋았고, 어떤 점이 아쉬웠는지 알려주세요. 제안하고 싶은 개선사항이 있다면 자세히 알려주세요."
                  required
                ></textarea>
              </div>

              {/* 이메일 */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  이메일 <span className="text-xs text-gray-500">(선택사항)</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border-none text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="답변이 필요하신 경우 이메일을 남겨주세요"
                />
              </div>

              {/* 제출 버튼 */}
              <button
                type="submit"
                className={`w-full flex items-center justify-center px-4 py-2.5 rounded-xl text-sm font-medium ${
                  (rating > 0 && feedbackType && feedback)
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                } transition-colors`}
                disabled={!(rating > 0 && feedbackType && feedback)}
              >
                <Send className="w-3.5 h-3.5 mr-1.5" />
                피드백 보내기
              </button>
            </form>
          )}
        </div>

        <div className="mt-8 bg-blue-50 rounded-2xl p-5">
          <div className="flex items-start">
            <div className="flex-shrink-0 bg-blue-100 rounded-full p-2">
              <MessageSquare className="w-4 h-4 text-blue-500" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-gray-900">다른 문의사항이 있으신가요?</h3>
              <p className="text-xs text-gray-600 mt-1 mb-3 leading-relaxed">
                서비스 이용 중 발생한 기술적 문제나 결제, 계정 관련 문의는 고객센터를 이용해 주세요.
              </p>
              <Link
                href="/support"
                className="inline-flex items-center text-blue-500 hover:text-blue-600 text-sm font-medium"
              >
                고객센터로 이동하기
                <svg className="ml-1 w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 