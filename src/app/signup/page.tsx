"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signUpUser, getCurrentSession, cleanupAuth } from "../auth/auth-utils";
import { User, Lock, CheckCircle2, AlertCircle, UserPlus } from "lucide-react";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // 페이지 로드 시 세션 확인
  useEffect(() => {
    const checkSession = async () => {
      // 만료된 세션 정리
      await cleanupAuth();
      
      // 이미 로그인한 사용자는 대시보드로 리디렉션
      const { session, error } = await getCurrentSession();
      if (session && !error) {
        router.push("/dashboard");
      }
    };
    
    checkSession();
  }, [router]);

  // 회원가입 핸들러
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 입력 유효성 검사
    if (!email || !password || !confirmPassword) {
      setErrorMessage("모든 필드를 입력해주세요.");
      return;
    }
    
    if (password !== confirmPassword) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
      return;
    }
    
    if (password.length < 8) {
      setErrorMessage("비밀번호는 최소 8자 이상이어야 합니다.");
      return;
    }
    
    if (!agreedToTerms) {
      setErrorMessage("서비스 이용약관에 동의해주세요.");
      return;
    }
    
    setIsLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);
    
    try {
      const { error } = await signUpUser(email, password);
      
      if (error) {
        // 오류 유형별 메시지 처리
        if (error.message?.includes("already registered")) {
          setErrorMessage("이미 가입된 이메일 주소입니다. 로그인을 시도하거나 다른 이메일을 사용해주세요.");
        } else if (error.message?.includes("weak password")) {
          setErrorMessage("보안에 취약한 비밀번호입니다. 더 복잡한 비밀번호를 사용해주세요.");
        } else if (error.message?.includes("valid email")) {
          setErrorMessage("유효한 이메일 주소를 입력해주세요.");
        } else {
          setErrorMessage(`회원가입 실패: ${error.message}`);
        }
        return;
      }
      
      // 회원가입 성공
      setSuccessMessage("회원가입이 완료되었습니다! 이메일을 확인하여 계정을 인증해주세요.");
      
      // 이메일 확인 후 로그인으로 이동할 수 있도록 안내 메시지와 함께 로그인 페이지로 이동
      setTimeout(() => {
        router.push("/login?message=" + encodeURIComponent("회원가입이 완료되었습니다. 이메일 인증 후 로그인해주세요."));
      }, 3000);
    } catch (error: any) {
      setErrorMessage(`회원가입 중 오류가 발생했습니다: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm overflow-hidden border border-blue-100">
        <div className="p-8 space-y-6">
          <div className="text-center mb-2">
            <div className="flex justify-center mb-2">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <UserPlus size={28} className="text-blue-500" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">회원가입</h2>
            <p className="text-sm text-gray-500 mt-1">새 계정을 만들어 서비스를 이용하세요</p>
          </div>
          
          {errorMessage && (
            <div className="flex items-center p-3 rounded-xl bg-red-50 text-red-700 text-sm">
              <AlertCircle size={16} className="mr-2 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}
          
          {successMessage && (
            <div className="flex items-center p-3 rounded-xl bg-blue-50 text-blue-700 text-sm">
              <CheckCircle2 size={16} className="mr-2 flex-shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}
          
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                이메일
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900 bg-gray-50"
                />
                <User size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300" />
              </div>
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                비밀번호
              </label>
              <div className="relative">
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900 bg-gray-50"
                />
                <Lock size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300" />
              </div>
              <p className="text-xs text-gray-500 mt-1">비밀번호는 최소 8자 이상이어야 합니다</p>
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                비밀번호 확인
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900 bg-gray-50"
                />
                <Lock size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300" />
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                id="terms"
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                disabled={isLoading}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="terms"
                className="text-sm font-medium text-gray-700"
              >
                <span>
                  <Link href="/terms" className="text-blue-600 hover:underline font-semibold">
                    서비스 이용약관
                  </Link>
                  에 동의합니다
                </span>
              </label>
            </div>
            
            <button 
              type="submit" 
              className="w-full py-2.5 px-4 rounded-xl text-base font-semibold text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:bg-blue-300 flex items-center justify-center mt-6"
              disabled={isLoading}
            >
              {isLoading ? (
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : null}
              회원가입
            </button>
          </form>
        </div>
        
        <div className="px-8 py-5 bg-blue-50 border-t border-blue-100 text-center rounded-b-2xl">
          <p className="text-sm text-gray-600">
            이미 계정이 있으신가요?{' '}
            <Link href="/login" className="text-blue-600 hover:underline font-semibold">
              로그인
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
} 