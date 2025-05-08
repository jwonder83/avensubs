import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  
  if (code) {
    try {
      // Supabase 클라이언트 생성 (불변 쿠키 저장소 사용)
      const cookieStore = cookies();
      const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
      
      // 코드 교환 및 세션 설정 시도
      console.log("OAuth 콜백: 코드 교환 시도");
      const { data, error } = await supabase.auth.exchangeCodeForSession(code);
      
      if (error) {
        console.error('세션 코드 교환 오류:', error.message);
        // 오류 페이지로 리디렉션
        return NextResponse.redirect(
          `${requestUrl.origin}/auth/error?error=auth_error&error_description=${encodeURIComponent(error.message)}`
        );
      }
      
      // 세션 정보 확인
      if (data?.session) {
        console.log('OAuth 세션 생성 성공:', data.session.user.email);
        
        // 세션 저장 확인
        const { data: sessionData } = await supabase.auth.getSession();
        console.log('저장된 세션 확인:', !!sessionData.session);
        
        // 리다이렉트 경로
        let redirectTo = '/dashboard';
        
        // 로컬 스토리지에서 원래 경로 확인 시도
        try {
          const storedRedirectTo = requestUrl.searchParams.get('redirectTo');
          if (storedRedirectTo) {
            redirectTo = storedRedirectTo;
          }
        } catch (err) {
          console.error('리다이렉트 경로 확인 중 오류:', err);
        }
        
        // 로그인 성공 후 리다이렉트
        return NextResponse.redirect(`${requestUrl.origin}${redirectTo}`);
      }
    } catch (err) {
      console.error('OAuth 콜백 처리 중 오류:', err);
      return NextResponse.redirect(
        `${requestUrl.origin}/auth/error?error=unknown&error_description=${encodeURIComponent('인증 처리 중 알 수 없는 오류가 발생했습니다.')}`
      );
    }
  }

  // URL에서 error 파라미터를 확인
  const error = requestUrl.searchParams.get('error');
  const errorDescription = requestUrl.searchParams.get('error_description');

  // 오류가 있다면 오류 페이지로 리디렉션
  if (error) {
    return NextResponse.redirect(
      `${requestUrl.origin}/auth/error?error=${error}&error_description=${errorDescription}`
    );
  }

  // 오류가 없다면 대시보드로 리다이렉션
  return NextResponse.redirect(`${requestUrl.origin}/dashboard`);
} 