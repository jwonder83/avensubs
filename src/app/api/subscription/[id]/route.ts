import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    // 임시 데이터 반환
    const mockSubscription = {
      id: params.id,
      user_id: "mock-user-id",
      name: "넷플릭스",
      price: 17000,
      category: "엔터테인먼트",
      icon: "🎬",
      color: "bg-red-500",
      status: "active",
      billing_cycle: "monthly",
      next_payment: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7일 후
      created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30일 전
      updated_at: new Date().toISOString()
    };

    return NextResponse.json(mockSubscription);
  } catch (error) {
    console.error('구독 정보 조회 오류:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
} 