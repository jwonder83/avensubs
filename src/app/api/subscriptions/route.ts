import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { Database } from '@/types/supabase';

// 모든 구독 조회
export async function GET() {
  const supabase = createRouteHandlerClient<Database>({ cookies });
  
  // 현재 로그인한 사용자 확인
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 });
  }
  
  // 로그인한 사용자의 구독 데이터 조회
  const { data, error } = await supabase
    .from('subscriptions')
    .select('*')
    .order('next_payment', { ascending: true });
    
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  
  return NextResponse.json({ data });
}

// 새 구독 추가
export async function POST(request: Request) {
  const supabase = createRouteHandlerClient<Database>({ cookies });
  
  // 현재 로그인한 사용자 확인
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 });
  }
  
  const body = await request.json();
  
  // 데이터 유효성 검사
  if (!body.name || !body.price || !body.next_payment || !body.category) {
    return NextResponse.json({ error: '필수 필드가 누락되었습니다.' }, { status: 400 });
  }
  
  // 현재 사용자 ID 추가
  const subscription = {
    ...body,
    user_id: session.user.id,
    updated_at: new Date().toISOString()
  };
  
  // 구독 데이터 추가
  const { data, error } = await supabase
    .from('subscriptions')
    .insert(subscription)
    .select();
    
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  
  return NextResponse.json({ data });
} 