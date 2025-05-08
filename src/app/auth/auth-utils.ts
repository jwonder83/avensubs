// 인증 관련 유틸리티 함수

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { PostgrestError, Session, SupabaseClient, User } from "@supabase/supabase-js";

// Supabase 클라이언트 인스턴스 생성
export const createSupabaseClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Supabase 환경 변수가 설정되지 않았습니다.");
    console.error("URL:", supabaseUrl ? "[설정됨]" : "[설정되지 않음]");
    console.error("ANON_KEY:", supabaseAnonKey ? "[설정됨]" : "[설정되지 않음]");
  }
  
  return createClientComponentClient({
    supabaseUrl: supabaseUrl || "", 
    supabaseKey: supabaseAnonKey || "",
    options: {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      },
      global: {
        headers: {
          'X-Client-Info': 'supabase-js-client'
        },
        // 네트워크 오류에 대한 자동 재시도 옵션
        fetch: (url, options) => {
          return fetch(url, {
            ...options,
            // AbortController 설정으로 요청 타임아웃 관리
            signal: options?.signal || new AbortController().signal
          });
        }
      },
      // 타임아웃 옵션 설정 (기본 10초)
      realtime: {
        timeout: 10000
      }
    }
  });
};

// 인증 관련 유틸리티 함수들

/**
 * 현재 세션 정보를 가져옵니다.
 * @returns Session 객체 또는 null과 오류 정보
 */
export const getCurrentSession = async (): Promise<{
  session: Session | null;
  error: Error | null;
}> => {
  const supabase = createSupabaseClient();
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      console.error("세션 가져오기 오류:", error.message);
      return { session: null, error };
    }
    return { session: data.session, error: null };
  } catch (error) {
    console.error("세션 확인 중 예외 발생:", error);
    return { session: null, error: error as Error };
  }
};

/**
 * 현재 사용자 정보를 가져옵니다.
 * @returns User 객체 또는 null과 오류 정보
 */
export const getCurrentUser = async (): Promise<{
  user: User | null;
  error: Error | null;
}> => {
  const supabase = createSupabaseClient();
  try {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      console.error("사용자 가져오기 오류:", error.message);
      return { user: null, error };
    }
    return { user: data.user, error: null };
  } catch (error) {
    console.error("사용자 확인 중 예외 발생:", error);
    return { user: null, error: error as Error };
  }
};

/**
 * 세션이 유효한지 확인합니다.
 * @returns 세션 유효 여부와 오류 정보
 */
export const isSessionValid = async (): Promise<{
  valid: boolean;
  error: Error | null;
}> => {
  const { session, error } = await getCurrentSession();
  if (error) {
    return { valid: false, error };
  }
  
  // 세션이 없거나 만료되었는지 확인
  if (!session) {
    return { valid: false, error: null };
  }
  
  // 세션 만료 시간 확인 (만료 10분 전까지는 유효하다고 간주)
  const expiresAt = session.expires_at;
  const now = Math.floor(Date.now() / 1000); // 현재 시간(초)
  const isValid = expiresAt > now + 600; // 10분 이상 남았는지 확인
  
  return { valid: isValid, error: null };
};

/**
 * 인증 관련 데이터를 정리합니다.
 * 세션이 만료된 경우 로컬 스토리지를 정리합니다.
 */
export const cleanupAuth = async (): Promise<void> => {
  try {
    const { valid } = await isSessionValid();
    if (!valid) {
      // 세션이 유효하지 않으면 로컬 스토리지 데이터 정리
      if (typeof window !== "undefined" && window.localStorage) {
        // 모든 Supabase 관련 항목 탐색 및 제거
        const keys = [];
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && key.startsWith('supabase.auth.')) {
            keys.push(key);
          }
        }
        
        // 배열에 저장한 키들을 삭제 (루프 도중 삭제하면 인덱스가 변경될 수 있음)
        keys.forEach(key => localStorage.removeItem(key));
        console.log("만료된 세션 정리 완료:", keys.length, "개 항목 삭제");
      }
    }
  } catch (error) {
    console.error("인증 데이터 정리 중 오류:", error);
  }
};

/**
 * 지정된 시간(ms) 동안 대기합니다.
 */
const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * 사용자 로그인을 처리합니다. Rate limit 발생 시 자동 재시도를 수행합니다.
 * @param email 사용자 이메일
 * @param password 사용자 비밀번호
 * @param retries 재시도 횟수 (기본값: 2)
 * @param delay 재시도 간 대기 시간(ms) (기본값: 2000)
 * @returns 로그인 결과와 오류 정보
 */
export const signInUser = async (
  email: string,
  password: string,
  retries = 2,
  delay = 2000
): Promise<{
  data: { user: User | null; session: Session | null } | null;
  error: Error | PostgrestError | null;
}> => {
  if (!email || !password) {
    return { 
      data: null, 
      error: new Error("이메일과 비밀번호가 필요합니다.")
    };
  }

  const supabase = createSupabaseClient();
  
  // 최대 재시도 횟수(retries)만큼 로그인 시도
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      // 첫 시도가 아닌 경우 대기
      if (attempt > 0) {
        console.log(`${attempt}번째 로그인 재시도 중... (${delay}ms 후)`);
        await wait(delay);
      }
      
      // 로그인 시도 전 클라이언트 로그 
      console.log(`로그인 시도 (${attempt+1}/${retries+1}):`, email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        // Rate limit 오류인 경우 재시도 (마지막 시도가 아닌 경우)
        if (error.message?.includes("rate limit") && attempt < retries) {
          console.warn("요청 제한 도달, 잠시 후 재시도합니다...");
          continue; // 다음 반복으로 진행
        }
        
        console.error("로그인 오류:", error.message, error);
        
        // 자세한 오류 메시지
        if (error.message?.includes("Invalid login")) {
          return { data: null, error: new Error("이메일 또는 비밀번호가 올바르지 않습니다.") };
        } else if (error.message?.includes("Email not confirmed")) {
          return { data: null, error: new Error("이메일 인증이 완료되지 않았습니다. 이메일을 확인해주세요.") };
        } else if (error.message?.includes("rate limit")) {
          return { data: null, error: new Error("너무 많은 로그인 시도가 있었습니다. 잠시 후 다시 시도해주세요.") };
        }
        
        return { data: null, error };
      }
      
      console.log("로그인 성공:", data.user?.email);
      return { data, error: null };
    } catch (error) {
      // 마지막 시도에서만 오류 반환
      if (attempt === retries) {
        console.error("로그인 중 예외 발생:", error);
        return { data: null, error: error as Error };
      }
      
      // 그렇지 않으면 다시 시도
      console.warn("로그인 중 오류 발생, 재시도합니다:", error);
    }
  }
  
  // 모든 시도가 실패한 경우
  return { 
    data: null, 
    error: new Error("여러 번의 시도 후에도 로그인에 실패했습니다. 잠시 후 다시 시도해주세요.") 
  };
};

/**
 * 사용자 로그아웃을 처리합니다.
 * @returns 로그아웃 결과와 오류 정보
 */
export const signOutUser = async (): Promise<{
  error: Error | null;
}> => {
  const supabase = createSupabaseClient();
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("로그아웃 오류:", error.message);
      return { error };
    }
    return { error: null };
  } catch (error) {
    console.error("로그아웃 중 예외 발생:", error);
    return { error: error as Error };
  }
};

/**
 * OAuth 제공자를 통한 로그인을 처리합니다.
 * @param provider OAuth 제공자 (google, github 등)
 * @returns OAuth 로그인 결과와 오류 정보
 */
export const signInWithOAuthProvider = async (
  provider: "google" | "github"
): Promise<{
  error: Error | null;
}> => {
  const supabase = createSupabaseClient();
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    
    if (error) {
      console.error(`${provider} 로그인 오류:`, error.message);
      return { error };
    }
    
    return { error: null };
  } catch (error) {
    console.error(`${provider} 로그인 중 예외 발생:`, error);
    return { error: error as Error };
  }
};

/**
 * 사용자 계정을 생성합니다.
 * @param email 사용자 이메일
 * @param password 사용자 비밀번호
 * @param metadata 추가 메타데이터
 * @returns 회원가입 결과와 오류 정보
 */
export const signUpUser = async (
  email: string,
  password: string,
  metadata?: { [key: string]: any }
): Promise<{
  data: { user: User | null; session: Session | null } | null;
  error: Error | PostgrestError | null;
}> => {
  const supabase = createSupabaseClient();
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    
    if (error) {
      console.error("회원가입 오류:", error.message);
      return { data: null, error };
    }
    
    return { data, error: null };
  } catch (error) {
    console.error("회원가입 중 예외 발생:", error);
    return { data: null, error: error as Error };
  }
};

/**
 * 비밀번호 재설정 이메일을 발송합니다.
 * @param email 사용자 이메일
 * @returns 비밀번호 재설정 요청 결과와 오류 정보
 */
export const resetPassword = async (
  email: string
): Promise<{
  error: Error | null;
}> => {
  const supabase = createSupabaseClient();
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/update-password`,
    });
    
    if (error) {
      console.error("비밀번호 재설정 요청 오류:", error.message);
      return { error };
    }
    
    return { error: null };
  } catch (error) {
    console.error("비밀번호 재설정 요청 중 예외 발생:", error);
    return { error: error as Error };
  }
}; 