import { motion } from "framer-motion";
import { Check, CreditCard, CreditCard as CreditCardIcon, Eye, EyeOff, Info } from "lucide-react";
import { CardCompany } from "../types";

interface SecurityFormProps {
  password: string;
  setPassword: (value: string) => void;
  birth: string;
  setBirth: (value: string) => void;
  company: string;
  cardCompanies: CardCompany[];
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
  showTip: boolean;
  setShowTip: (show: boolean) => void;
  activeField: string | null;
  setActiveField: (field: string | null) => void;
  passwordRef: React.RefObject<HTMLInputElement>;
  birthRef: React.RefObject<HTMLInputElement>;
}

export default function SecurityForm({
  password,
  setPassword,
  birth,
  setBirth,
  company,
  cardCompanies,
  showPassword,
  setShowPassword,
  showTip,
  setShowTip,
  activeField,
  setActiveField,
  passwordRef,
  birthRef
}: SecurityFormProps) {
  const selectedCard = cardCompanies.find(c => c.id === company);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* 선택된 카드사 표시 */}
      <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
        <div className="flex items-center">
          <div className="mr-3">
            <div className={`w-14 h-14 rounded-full flex items-center justify-center ${company ? selectedCard?.color : 'bg-gray-200'}`}>
              <CreditCardIcon className={`w-7 h-7 ${company ? selectedCard?.textColor : 'text-gray-500'}`} />
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-1">선택한 카드사</div>
            <div className="font-medium text-lg">{company ? selectedCard?.name : '카드사 미선택'}</div>
          </div>
        </div>
      </div>

      {/* 비밀번호 및 생년월일 */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">비밀번호 앞 2자리</label>
          <div className="relative">
            <input
              ref={passwordRef}
              type={showPassword ? "text" : "password"}
              maxLength={2}
              inputMode="numeric"
              value={password}
              onChange={e => setPassword(e.target.value.replace(/[^0-9]/g, ""))}
              onFocus={() => setActiveField("password")}
              onBlur={() => setActiveField(null)}
              className={`w-full h-12 px-3 py-3 rounded-xl border text-center text-lg focus:outline-none transition-colors ${
                activeField === "password" 
                  ? "border-blue-500 ring-2 ring-blue-100" 
                  : "border-gray-200 focus:border-blue-400"
              }`}
              required
              aria-label="비밀번호 앞 2자리"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
              aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          <div className="mt-1 text-xs text-gray-500">
            카드 비밀번호 앞 2자리만 입력하세요.
          </div>
        </div>
        <div>
          <div className="flex items-center mb-2">
            <label className="text-sm font-medium text-gray-700">생년월일(6자리)</label>
            <button 
              type="button" 
              className="ml-1 text-gray-400 hover:text-gray-600"
              onClick={() => setShowTip(!showTip)}
              aria-label="생년월일 입력 도움말"
            >
              <Info className="w-4 h-4" />
            </button>
          </div>
          {showTip && (
            <motion.div 
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="mb-2 p-2 bg-blue-50 rounded-lg text-xs text-blue-700"
            >
              예: 980101 (98년 1월 1일)
            </motion.div>
          )}
          <div className="relative">
            <input
              ref={birthRef}
              type="text"
              maxLength={6}
              inputMode="numeric"
              value={birth}
              onChange={e => setBirth(e.target.value.replace(/[^0-9]/g, ""))}
              onFocus={() => setActiveField("birth")}
              onBlur={() => setActiveField(null)}
              className={`w-full h-12 px-3 py-3 rounded-xl border text-center text-lg focus:outline-none transition-colors ${
                activeField === "birth" 
                  ? "border-blue-500 ring-2 ring-blue-100" 
                  : "border-gray-200 focus:border-blue-400"
              }`}
              required
              aria-label="생년월일 6자리"
            />
            {birth.length === 6 && (
              <Check className="absolute right-3 top-3.5 w-5 h-5 text-blue-500" />
            )}
          </div>
          <div className="mt-1 text-xs text-gray-500">
            생년월일 6자리를 입력하세요. (예: 980101)
          </div>
        </div>
      </div>
      
      {/* 추가 보안 알림 */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-yellow-50 rounded-xl p-4 border border-yellow-200"
      >
        <h4 className="text-sm font-medium text-yellow-800 mb-2">필수 보안 정보</h4>
        <p className="text-xs text-yellow-700">
          비밀번호와 생년월일은 카드 인증을 위해 사용되며, 이 정보는 안전하게 암호화되어 저장됩니다. 
          최소한의 필요 정보만 입력받아 보안을 강화하고 있습니다.
        </p>
      </motion.div>
    </motion.div>
  );
} 