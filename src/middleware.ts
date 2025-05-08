import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  // 응답 객체 생성
  const res = NextResponse.next();
  
  try {
    // 경로 확인 - _next/data 요청은 처리하지 않음
    if (req.nextUrl.pathname.startsWith('/_next/data')) {
      return res;
    }
    
    // Supabase 클라이언트 생성
    const supabase = createMiddlewareClient({ req, res });
    
    // 세션 정보 가져오기 (쿠키 설정 포함)
    const sessionResponse = await supabase.auth.getSession();
    const session = sessionResponse.data.session;
    
    // 인증 상태 기록
    const authStatus = session ? 'authenticated' : 'unauthenticated';
    res.headers.set('X-Auth-Status', authStatus);
    
    // 디버깅을 위한 로그
    console.log(`미들웨어 - 인증 상태: ${authStatus}`, 
      session ? `유저: ${session.user.email}` : '로그인 안됨',
      `경로: ${req.nextUrl.pathname}`
    );
    
    // 보호된 경로 정의
    const protectedRoutes = ['/dashboard', '/profile', '/admin'];
    const isProtectedRoute = protectedRoutes.some(route => 
      req.nextUrl.pathname.startsWith(route)
    );

    // 인증이 필요한 페이지에 세션 없이 접근하는 경우
    if (isProtectedRoute && !session) {
      console.log(`미들웨어 - 보호된 경로 접근 차단: ${req.nextUrl.pathname}`);
      
      // 로그인 페이지로 리다이렉트
      const redirectUrl = new URL('/login', req.url);
      // 원래 접근하려던 URL을 쿼리 파라미터로 전달
      redirectUrl.searchParams.set('redirectTo', req.nextUrl.pathname);
      return NextResponse.redirect(redirectUrl);
    }

    // 이미 로그인한 사용자가 로그인/회원가입 페이지에 접근하는 경우
    if ((req.nextUrl.pathname === '/login' || req.nextUrl.pathname === '/signup') && session) {
      console.log("미들웨어 - 이미 로그인된 상태에서 로그인/회원가입 페이지 접근, 대시보드로 리다이렉트");
      
      // 대시보드로 리다이렉트
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
    
    // 응답에 페이지 변경사항 반영
    return res;
  } catch (error) {
    console.error("미들웨어 오류:", error);
    return res;
  }
}

// 미들웨어가 실행될 경로 지정 (특정 경로는 제외)
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|_next/data|assets|images|favicon.ico|.*\\.svg).*)',
  ],
}; 