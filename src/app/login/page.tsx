"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { cleanupAuth, getCurrentSession, signInUser, signInWithOAuthProvider } from "../auth/auth-utils";
import { LogIn, User, Lock, AlertCircle, CheckCircle2 } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("credentials");
  const router = useRouter();

  // 페이지 로드 시 세션 확인
  useEffect(() => {
    const checkAndCleanupSession = async () => {
      try {
        // URL에서 오류 메시지 체크
        const searchParams = new URLSearchParams(window.location.search);
        const error = searchParams.get("error");
        const message = searchParams.get("message");
        
        if (error) {
          setErrorMessage(decodeURIComponent(error));
        } else if (message) {
          setSuccessMessage(decodeURIComponent(message));
        }
        
        // 만료된 세션 정리
        await cleanupAuth();
        
        // 이미 로그인한 사용자는 대시보드로 리디렉션
        const { session } = await getCurrentSession();
        if (session) {
          router.replace("/dashboard");
        }
      } catch (error) {
        console.error("로그인 페이지 초기화 중 오류:", error);
      }
    };
    
    checkAndCleanupSession();
  }, [router]);

  // 로그인 핸들러
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 입력 유효성 검사
    if (!email || !password) {
      setErrorMessage("이메일과 비밀번호를 모두 입력해주세요.");
      return;
    }
    
    setIsLoading(true);
    setErrorMessage(null);
    
    try {
      // 이메일/비밀번호 로그인 시도
      const { data, error } = await signInUser(email, password);
      
      if (error) {
        setErrorMessage(error.message);
        setIsLoading(false);
        return;
      }
      
      if (data?.session) {
        // 성공 시 즉시 대시보드로 리디렉션 (replace 사용)
        router.replace("/dashboard");
      } else {
        setErrorMessage("로그인은 성공했지만 세션을 생성하지 못했습니다. 다시 시도해주세요.");
        setIsLoading(false);
      }
    } catch (error: any) {
      console.error("로그인 처리 중 예외 발생:", error);
      setErrorMessage(`로그인 중 오류가 발생했습니다: ${error.message || "알 수 없는 오류"}`);
      setIsLoading(false);
    }
  };

  // OAuth 로그인 핸들러
  const handleOAuthLogin = async (provider: "google" | "github") => {
    setIsLoading(true);
    setErrorMessage(null);
    
    try {
      await signInWithOAuthProvider(provider);
      // 성공 시 리디렉션은 OAuth 프로세스에서 자동 처리
    } catch (error: any) {
      setErrorMessage(`${provider} 로그인 중 오류가 발생했습니다: ${error.message}`);
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
                <LogIn size={28} className="text-blue-500" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">로그인</h2>
            <p className="text-sm text-gray-500 mt-1">계정에 로그인하여 서비스를 이용하세요</p>
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
          
          <div className="mb-4">
            <div className="grid grid-cols-2 gap-2 mb-4">
              <button
                className={`py-2 text-sm font-medium rounded-xl border transition-colors ${activeTab === "credentials" 
                  ? "bg-blue-100 text-blue-700 border-blue-200" 
                  : "bg-gray-100 text-gray-700 border-transparent hover:bg-gray-200"}`}
                onClick={() => setActiveTab("credentials")}
                type="button"
              >
                계정 로그인
              </button>
              <button
                className={`py-2 text-sm font-medium rounded-xl border transition-colors ${activeTab === "oauth" 
                  ? "bg-blue-100 text-blue-700 border-blue-200" 
                  : "bg-gray-100 text-gray-700 border-transparent hover:bg-gray-200"}`}
                onClick={() => setActiveTab("oauth")}
                type="button"
              >
                소셜 로그인
              </button>
            </div>
            
            {activeTab === "credentials" ? (
              <form onSubmit={handleLogin} className="space-y-4">
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
                  <div className="flex justify-between mb-1">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      비밀번호
                    </label>
                    <Link 
                      href="/forgot-password" 
                      className="text-xs text-blue-600 hover:underline"
                    >
                      비밀번호 찾기
                    </Link>
                  </div>
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
                </div>
                
                <button 
                  type="submit" 
                  className="w-full py-2.5 px-4 rounded-xl text-base font-semibold text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:bg-blue-300 flex items-center justify-center"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : null}
                  로그인
                </button>
              </form>
            ) : (
              <div className="space-y-3">
                <button 
                  className="w-full flex items-center justify-center px-4 py-2.5 border border-gray-200 rounded-lg text-base font-medium text-gray-700 bg-white hover:bg-blue-50 transition-colors"
                  onClick={() => handleOAuthLogin("google")}
                  disabled={isLoading}
                >
                  <FaGoogle className="mr-2 text-blue-500" />
                  Google로 로그인
                </button>
                <button 
                  className="w-full flex items-center justify-center px-4 py-2.5 border border-gray-200 rounded-lg text-base font-medium text-gray-700 bg-white hover:bg-blue-50 transition-colors"
                  onClick={() => handleOAuthLogin("github")}
                  disabled={isLoading}
                >
                  <FaGithub className="mr-2 text-gray-700" />
                  GitHub로 로그인
                </button>
              </div>
            )}
          </div>
        </div>
        
        <div className="px-8 py-5 bg-blue-50 border-t border-blue-100 text-center rounded-b-2xl">
          <p className="text-sm text-gray-600">
            계정이 없으신가요?{" "}
            <Link href="/signup" className="text-blue-600 hover:underline font-semibold">
              회원가입
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
} 