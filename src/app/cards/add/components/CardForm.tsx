import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, CreditCard, Plus } from "lucide-react";
import { CardCompany } from "../types";

interface CardFormProps {
  cardNumber: string[];
  handleCardNumber: (idx: number, value: string) => void;
  expiry: string;
  handleExpiry: (value: string) => void;
  owner: string;
  setOwner: (value: string) => void;
  company: string;
  setCompany: (value: string) => void;
  cardCompanies: CardCompany[];
  setCardSelectOpen: (open: boolean) => void;
  activeField: string | null;
  setActiveField: (field: string | null) => void;
  inputRefs: React.MutableRefObject<(HTMLInputElement | null)[]>;
  expiryRef: React.RefObject<HTMLInputElement>;
  ownerRef: React.RefObject<HTMLInputElement>;
}

export default function CardForm({
  cardNumber,
  handleCardNumber,
  expiry,
  handleExpiry,
  owner,
  setOwner,
  company,
  setCompany,
  cardCompanies,
  setCardSelectOpen,
  activeField,
  setActiveField,
  inputRefs,
  expiryRef,
  ownerRef
}: CardFormProps) {
  const [showMoreCards, setShowMoreCards] = useState(false);
  const selectedCard = cardCompanies.find(c => c.id === company);

  // 카드사 목록을 보여줄 개수 결정
  const visibleCardCompanies = showMoreCards 
    ? cardCompanies 
    : cardCompanies.slice(0, 6);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* 카드사 선택 */}
      <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
        <label className="block text-sm font-medium text-gray-700 mb-3">카드사 선택</label>
        
        {/* 선택된 카드사가 있는 경우 표시 */}
        {company ? (
          <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-blue-200 mb-3">
            <div className="flex items-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-3 ${selectedCard?.color}`}>
                <CreditCard className={`w-6 h-6 ${selectedCard?.textColor}`} />
              </div>
              <div>
                <div className="text-sm font-medium">{selectedCard?.name}</div>
                <div className="text-xs text-gray-500">선택됨</div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setCardSelectOpen(true)}
              className="text-blue-500 text-sm font-medium hover:text-blue-600"
            >
              변경
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setCardSelectOpen(true)}
            className="w-full flex items-center justify-center p-4 bg-white border border-dashed border-blue-300 rounded-xl hover:border-blue-400 transition-colors"
          >
            <Plus className="w-5 h-5 text-blue-500 mr-2" />
            <span className="text-blue-500 font-medium">카드사 선택하기</span>
          </button>
        )}
        
        {/* 빠른 선택 옵션 */}
        {!company && (
          <div className="mt-3">
            <div className="text-xs text-gray-500 mb-2">빠른 선택</div>
            <div className="grid grid-cols-3 gap-2">
              {visibleCardCompanies.map((c) => (
                <button
                  type="button"
                  key={c.id}
                  onClick={() => setCompany(c.id)}
                  className="flex flex-col items-center justify-center py-2 px-1 rounded-xl border border-gray-200 bg-white hover:border-blue-400 hover:bg-blue-50 transition-all"
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-1 ${c.color}`}>
                    <CreditCard className={`w-5 h-5 ${c.textColor}`} />
                  </div>
                  <span className="text-xs font-medium text-gray-900 line-clamp-1">{c.name}</span>
                </button>
              ))}
              
              {!showMoreCards && cardCompanies.length > 6 && (
                <button
                  type="button"
                  onClick={() => setShowMoreCards(true)}
                  className="flex flex-col items-center justify-center py-2 px-1 rounded-xl border border-dashed border-gray-300 bg-white hover:border-gray-400 transition-all"
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center mb-1 bg-gray-100">
                    <Plus className="w-5 h-5 text-gray-500" />
                  </div>
                  <span className="text-xs font-medium text-gray-500">더보기</span>
                </button>
              )}
            </div>
            
            {showMoreCards && (
              <button 
                type="button" 
                onClick={() => setShowMoreCards(false)}
                className="w-full mt-2 text-xs text-blue-500 hover:text-blue-600"
              >
                접기
              </button>
            )}
          </div>
        )}
      </div>

      {/* 카드 번호 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">카드 번호</label>
        <div className="flex gap-2">
          {cardNumber.map((num, idx) => (
            <div key={idx} className="relative flex-1">
              <input
                ref={el => inputRefs.current[idx] = el}
                type="text"
                inputMode="numeric"
                maxLength={4}
                value={num}
                onChange={e => handleCardNumber(idx, e.target.value.replace(/[^0-9]/g, ""))}
                onFocus={() => setActiveField(`card-${idx}`)}
                onBlur={() => setActiveField(null)}
                className={`w-full h-12 px-3 py-3 rounded-xl border text-center text-lg focus:outline-none transition-colors ${
                  activeField === `card-${idx}` 
                    ? "border-blue-500 ring-2 ring-blue-100" 
                    : "border-gray-200 focus:border-blue-400"
                }`}
                required
                aria-label={`카드번호 ${idx+1}번째`}
              />
              {num.length === 4 && (
                <Check className="absolute right-2 top-3.5 w-5 h-5 text-blue-500" />
              )}
            </div>
          ))}
        </div>
        <p className="mt-1 text-xs text-gray-500">카드 앞면의 16자리 번호를 입력해주세요.</p>
      </div>

      {/* 유효기간 및 소유자명 */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">유효기간</label>
          <div className="relative">
            <input
              ref={expiryRef}
              type="text"
              placeholder="MM/YY"
              maxLength={5}
              value={expiry}
              onChange={e => handleExpiry(e.target.value)}
              onFocus={() => setActiveField("expiry")}
              onBlur={() => setActiveField(null)}
              className={`w-full h-12 px-3 py-3 rounded-xl border text-center text-lg focus:outline-none transition-colors ${
                activeField === "expiry" 
                  ? "border-blue-500 ring-2 ring-blue-100" 
                  : "border-gray-200 focus:border-blue-400"
              }`}
              required
              aria-label="유효기간"
            />
            {/^\d{2}\/\d{2}$/.test(expiry) && (
              <Check className="absolute right-3 top-3.5 w-5 h-5 text-blue-500" />
            )}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">소유자명</label>
          <div className="relative">
            <input
              ref={ownerRef}
              type="text"
              value={owner}
              onChange={e => setOwner(e.target.value)}
              onFocus={() => setActiveField("owner")}
              onBlur={() => setActiveField(null)}
              className={`w-full h-12 px-3 py-3 rounded-xl border text-center text-lg focus:outline-none transition-colors ${
                activeField === "owner" 
                  ? "border-blue-500 ring-2 ring-blue-100" 
                  : "border-gray-200 focus:border-blue-400"
              }`}
              required
              aria-label="소유자명"
            />
            {owner.length > 1 && (
              <Check className="absolute right-3 top-3.5 w-5 h-5 text-blue-500" />
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
} 