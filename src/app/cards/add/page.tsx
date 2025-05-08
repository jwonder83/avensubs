"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { 
  ArrowLeft, 
  Shield, 
  CreditCard, 
  Check, 
  Eye, 
  EyeOff, 
  Info,
  ChevronRight,
  Loader2,
  Plus,
  Search,
  X,
  CreditCard as CreditCardIcon,
  Calendar
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import CardForm from "./components/CardForm";
import SecurityForm from "./components/SecurityForm";
import { CardCompany } from "./types";

// 카드사 정보 업데이트
const cardCompanies: CardCompany[] = [
  { id: "hyundai", name: "현대카드", color: "bg-gray-800", textColor: "text-white", icon: "신용카드", logo: "/images/card-logos/hyundai.png" },
  { id: "samsung", name: "삼성카드", color: "bg-blue-500", textColor: "text-white", icon: "신용카드", logo: "/images/card-logos/samsung.png" },
  { id: "shinhan", name: "신한카드", color: "bg-blue-700", textColor: "text-white", icon: "신용카드", logo: "/images/card-logos/shinhan.png" },
  { id: "kb", name: "국민카드", color: "bg-yellow-400", textColor: "text-gray-900", icon: "신용카드", logo: "/images/card-logos/kb.png" },
  { id: "lotte", name: "롯데카드", color: "bg-red-500", textColor: "text-white", icon: "신용카드", logo: "/images/card-logos/lotte.png" },
  { id: "hana", name: "하나카드", color: "bg-green-500", textColor: "text-white", icon: "신용카드", logo: "/images/card-logos/hana.png" },
  { id: "woori", name: "우리카드", color: "bg-blue-400", textColor: "text-white", icon: "신용카드", logo: "/images/card-logos/woori.png" },
  { id: "bc", name: "비씨카드", color: "bg-purple-500", textColor: "text-white", icon: "신용카드", logo: "/images/card-logos/bc.png" },
  { id: "citi", name: "씨티카드", color: "bg-blue-600", textColor: "text-white", icon: "신용카드", logo: "/images/card-logos/citi.png" },
];

export default function CardAdd() {
  const router = useRouter();
  const [cardNumber, setCardNumber] = useState(["", "", "", ""]);
  const [expiry, setExpiry] = useState("");
  const [owner, setOwner] = useState("");
  const [password, setPassword] = useState("");
  const [birth, setBirth] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeField, setActiveField] = useState<string | null>(null);
  const [formComplete, setFormComplete] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formStep, setFormStep] = useState(1);
  const [showTip, setShowTip] = useState(false);
  const [cardSelectOpen, setCardSelectOpen] = useState(false);
  const [cardSelectSearch, setCardSelectSearch] = useState("");
  const [cardAdded, setCardAdded] = useState(false);
  
  // 입력 필드 참조를 만들어 자동 포커스 구현
  const inputRefs = useRef<(HTMLInputElement | null)[]>([null, null, null, null]);
  const expiryRef = useRef<HTMLInputElement>(null);
  const ownerRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const birthRef = useRef<HTMLInputElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  // 카드사 필터링
  const filteredCardCompanies = cardSelectSearch 
    ? cardCompanies.filter(c => c.name.includes(cardSelectSearch))
    : cardCompanies;

  // 폼 완성 여부 체크
  useEffect(() => {
    const isCardNumberComplete = cardNumber.every(n => n.length === 4);
    const isExpiryComplete = /^\d{2}\/\d{2}$/.test(expiry);
    const isStep1Complete = isCardNumberComplete && isExpiryComplete && owner && company;
    const isStep2Complete = password.length === 2 && birth.length === 6;
    
    if (formStep === 1) {
      setFormComplete(isStep1Complete);
    } else {
      setFormComplete(isStep1Complete && isStep2Complete);
    }
  }, [cardNumber, expiry, owner, password, birth, company, formStep]);

  // 카드번호 입력 처리 및 자동 포커스
  const handleCardNumber = (idx: number, value: string) => {
    if (/^\d{0,4}$/.test(value)) {
      const next = [...cardNumber];
      next[idx] = value;
      setCardNumber(next);
      
      // 4자리 입력 완료 시 다음 입력란으로 자동 포커스
      if (value.length === 4 && idx < 3) {
        inputRefs.current[idx + 1]?.focus();
      } else if (value.length === 4 && idx === 3) {
        expiryRef.current?.focus();
      }
    }
  };

  // 유효기간 자동 포맷팅
  const handleExpiry = (value: string) => {
    const cleaned = value.replace(/[^0-9]/g, "");
    
    if (cleaned.length <= 4) {
      if (cleaned.length <= 2) {
        setExpiry(cleaned);
      } else {
        setExpiry(`${cleaned.substring(0, 2)}/${cleaned.substring(2)}`);
      }
      
      // 유효기간 입력 완료 시 이름 입력란으로 포커스
      if (cleaned.length === 4) {
        ownerRef.current?.focus();
      }
    }
  };

  // 다음 단계로 이동
  const goToNextStep = () => {
    if (formStep === 1 && formComplete) {
      setFormStep(2);
      setTimeout(() => {
        passwordRef.current?.focus();
      }, 100);
    }
  };

  // 이전 단계로 이동
  const goToPrevStep = () => {
    if (formStep === 2) {
      setFormStep(1);
    }
  };

  // 폼 제출
  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    setError(null);
    
    if (!formComplete) {
      setError("모든 정보를 올바르게 입력해주세요.");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // 서버 요청 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // 성공 애니메이션 표시
      setCardAdded(true);
      
      // 약간의 딜레이 후 대시보드로 이동
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    } catch (err) {
      setError("카드 등록 중 오류가 발생했습니다. 다시 시도해주세요.");
      setIsLoading(false);
    }
  };

  // 카드 미리보기 렌더링
  const renderCardPreview = () => {
    const selectedCard = cardCompanies.find(c => c.id === company);
    const cardNumberDisplay = cardNumber.map(num => 
      num ? num : "••••"
    ).join(" ");
    
    const expiryDisplay = expiry || "••/••";
    const ownerDisplay = owner || "••••••••";
    
    return (
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className={`w-full h-48 rounded-2xl p-5 relative overflow-hidden transition-all duration-300 ${
          selectedCard ? selectedCard.color : "bg-gradient-to-r from-blue-500 to-blue-600"
        } shadow-lg`}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-black/5"></div>
        <div className="absolute top-0 right-0 w-20 h-20 rounded-full bg-white/10 -mt-10 -mr-10"></div>
        
        <div className="flex flex-col h-full justify-between">
          <div className="flex justify-between items-start">
            <CreditCard className={`w-10 h-10 ${selectedCard ? selectedCard.textColor : "text-white"}`} />
            <span className={`text-xs font-medium ${selectedCard ? selectedCard.textColor : "text-white"} bg-black/20 px-3 py-1 rounded-full`}>
              {selectedCard?.name || "카드사 선택"}
            </span>
          </div>
          
          <div className="space-y-4">
            <div className={`text-lg font-medium ${selectedCard ? selectedCard.textColor : "text-white"} tracking-wider`}>
              {cardNumberDisplay}
            </div>
            
            <div className="flex justify-between">
              <div className="space-y-1">
                <div className={`text-xs opacity-80 ${selectedCard ? selectedCard.textColor : "text-white"}`}>만료일</div>
                <div className={`text-sm ${selectedCard ? selectedCard.textColor : "text-white"}`}>{expiryDisplay}</div>
              </div>
              
              <div className="space-y-1">
                <div className={`text-xs opacity-80 ${selectedCard ? selectedCard.textColor : "text-white"}`}>이름</div>
                <div className={`text-sm ${selectedCard ? selectedCard.textColor : "text-white"}`}>{ownerDisplay}</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  // 카드사 선택 모달
  const renderCardCompanySelector = () => {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl w-full max-w-md p-5 shadow-xl"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">카드사 선택</h3>
            <button 
              onClick={() => setCardSelectOpen(false)}
              className="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100"
              aria-label="닫기"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="relative mb-4">
            <input
              ref={searchRef}
              type="text"
              placeholder="카드사 검색"
              value={cardSelectSearch}
              onChange={(e) => setCardSelectSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
            />
            <Search className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
            {cardSelectSearch && (
              <button 
                onClick={() => setCardSelectSearch('')}
                className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                aria-label="검색어 지우기"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
          
          <div className="grid grid-cols-3 gap-3 max-h-80 overflow-y-auto pr-1">
            {filteredCardCompanies.map((c) => (
              <button
                type="button"
                key={c.id}
                onClick={() => {
                  setCompany(c.id);
                  setCardSelectOpen(false);
                }}
                className={`flex flex-col items-center justify-center py-4 px-2 rounded-xl border transition-all ${
                  company === c.id 
                    ? "border-blue-500 bg-blue-50 shadow-sm" 
                    : "border-gray-200 bg-white hover:border-blue-400"
                }`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${c.color}`}>
                  <CreditCard className={`w-6 h-6 ${c.textColor}`} />
                </div>
                <span className="text-xs font-medium text-gray-900 text-center">{c.name}</span>
              </button>
            ))}
            
            {filteredCardCompanies.length === 0 && (
              <div className="col-span-3 py-8 text-center text-gray-500">
                검색 결과가 없습니다
              </div>
            )}
          </div>
        </motion.div>
      </div>
    );
  };

  // 카드 등록 성공 애니메이션
  const renderSuccessAnimation = () => {
    return (
      <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6"
          >
            <Check className="w-10 h-10 text-green-500" />
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">카드 등록 완료!</h2>
          <p className="text-gray-500 mb-8">새로운 카드가 성공적으로 등록되었습니다.</p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="w-72"
          >
            {renderCardPreview()}
          </motion.div>
        </motion.div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AnimatePresence>
        {cardSelectOpen && renderCardCompanySelector()}
        {cardAdded && renderSuccessAnimation()}
      </AnimatePresence>

      {/* 헤더 */}
      <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-100 z-10">
        <div className="max-w-2xl mx-auto px-4 h-16 flex items-center justify-between">
          <button
            onClick={() => formStep === 1 ? router.back() : goToPrevStep()}
            className="p-2.5 text-gray-800 hover:text-blue-600 flex items-center bg-gray-100 hover:bg-blue-50 rounded-lg transition-colors"
            aria-label={formStep === 1 ? "뒤로 가기" : "이전 단계"}
            type="button"
          >
            <ArrowLeft className="w-5 h-5 mr-1" />
            <span className="text-sm font-medium">{formStep === 1 ? "이전" : "이전 단계"}</span>
          </button>
          <span className="text-base font-bold text-gray-900">
            {formStep === 1 ? "카드 추가" : "추가 정보 입력"}
          </span>
          <div className="w-20">
            {formStep === 1 && formComplete && (
              <button
                type="button"
                onClick={goToNextStep}
                className="text-blue-500 font-medium text-sm hover:text-blue-600"
              >
                다음
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="pt-16 pb-52 max-w-2xl mx-auto px-4">
        {/* 프로그레스 바 */}
        <div className="mt-4 mb-6">
          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: "50%" }}
              animate={{ width: formStep === 1 ? "50%" : "100%" }}
              className="h-full bg-blue-500"
              transition={{ duration: 0.3 }}
            ></motion.div>
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <span className={formStep >= 1 ? "text-blue-500 font-medium" : ""}>
              카드 정보
            </span>
            <span className={formStep >= 2 ? "text-blue-500 font-medium" : ""}>
              추가 정보
            </span>
          </div>
        </div>

        {/* 카드 미리보기 */}
        <div className="mb-8 transition-opacity duration-300">
          <AnimatePresence mode="wait">
            <div key={`card-preview-${formStep}`}>
              {renderCardPreview()}
            </div>
          </AnimatePresence>
        </div>
        
        <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
          <AnimatePresence mode="wait">
            {formStep === 1 ? (
              <CardForm 
                key="card-form"
                cardNumber={cardNumber}
                handleCardNumber={handleCardNumber}
                expiry={expiry}
                handleExpiry={handleExpiry}
                owner={owner}
                setOwner={setOwner}
                company={company}
                setCompany={setCompany}
                cardCompanies={cardCompanies}
                setCardSelectOpen={setCardSelectOpen}
                activeField={activeField}
                setActiveField={setActiveField}
                inputRefs={inputRefs}
                expiryRef={expiryRef}
                ownerRef={ownerRef}
              />
            ) : (
              <SecurityForm
                key="security-form"
                password={password}
                setPassword={setPassword}
                birth={birth}
                setBirth={setBirth}
                company={company}
                cardCompanies={cardCompanies}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                showTip={showTip}
                setShowTip={setShowTip}
                activeField={activeField}
                setActiveField={setActiveField}
                passwordRef={passwordRef}
                birthRef={birthRef}
              />
            )}
          </AnimatePresence>

          {/* 에러 메시지 */}
          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="p-3 bg-red-50 rounded-xl text-sm text-red-600 flex items-center gap-2"
              >
                <Shield className="w-4 h-4 text-red-400" />
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* 보안 안내 */}
          <div className="flex items-start mt-2 text-xs text-gray-500 bg-gray-50 p-3 rounded-xl border border-gray-200">
            <Shield className="w-4 h-4 text-blue-400 mr-2 mt-0.5" />
            <div>
              <p className="font-medium text-gray-700 mb-1">안전한 정보 보호</p>
              <p>입력하신 카드 정보는 안전하게 암호화되어 처리됩니다. 당사는 PCI DSS 보안 인증을 준수하며, 카드 정보는 안전하게 보호됩니다.</p>
            </div>
          </div>
        </form>
      </main>

      {/* 하단 버튼 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 pt-4 pb-20 px-4 shadow-lg z-10">
        <div className="max-w-2xl mx-auto">
          {formStep === 1 ? (
            <motion.button
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={goToNextStep}
              disabled={!formComplete}
              className={`w-full h-14 rounded-2xl font-medium transition-all duration-200 flex items-center justify-center ${
                formComplete
                  ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg" 
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
            >
              {formComplete ? (
                <>
                  다음 단계 <ChevronRight className="w-5 h-5 ml-1" />
                </>
              ) : (
                "카드 정보를 입력해주세요"
              )}
            </motion.button>
          ) : (
            <motion.button
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={handleSubmit}
              disabled={isLoading || !formComplete}
              className={`w-full h-14 rounded-2xl font-medium transition-all duration-200 flex items-center justify-center ${
                formComplete && !isLoading
                  ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg" 
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  카드 등록 중...
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5 mr-2" />
                  카드 추가하기
                </>
              )}
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
} 