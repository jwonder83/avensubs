import { NextRequest, NextResponse } from 'next/server';

// 간단한 이메일 유효성 검사 함수
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function POST(request: NextRequest) {
  try {
    // 요청 본문에서 이메일 추출
    const { email } = await request.json();

    // 이메일 유효성 검사
    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { error: '유효한 이메일 주소를 입력해주세요.' },
        { status: 400 }
      );
    }

    // 실제 프로덕션 환경에서는 여기에 데이터베이스 저장 로직이 들어갑니다.
    // 예: Supabase, Firebase, 또는 자체 DB에 저장
    // const { data, error } = await supabase
    //   .from('newsletter_subscribers')
    //   .insert([{ email, subscribed_at: new Date() }]);

    // 테스트를 위한 인공 지연 (실제 API에서는 제거)
    await new Promise(resolve => setTimeout(resolve, 1000));

    // 성공 응답
    return NextResponse.json(
      { success: true, message: '뉴스레터 구독이 완료되었습니다!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('구독 API 에러:', error);
    
    // 에러 응답
    return NextResponse.json(
      { error: '구독 처리 중 오류가 발생했습니다. 다시 시도해주세요.' },
      { status: 500 }
    );
  }
} 