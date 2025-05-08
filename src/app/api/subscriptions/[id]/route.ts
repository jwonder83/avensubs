import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { Database } from '@/types/supabase';

// 단일 구독 조회
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createRouteHandlerClient<Database>({ cookies });
  
  // 현재 로그인한 사용자 확인
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 });
  }
  
  // 특정 구독 데이터 조회
  const { data, error } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('id', params.id)
    .single();
    
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  
  // 다른 사용자의 구독을 조회하려는 경우
  if (data.user_id !== session.user.id) {
    return NextResponse.json({ error: '권한이 없습니다.' }, { status: 403 });
  }
  
  return NextResponse.json({ data });
}

// 구독 업데이트
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createRouteHandlerClient<Database>({ cookies });
  
  // 현재 로그인한 사용자 확인
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 });
  }
  
  // 기존 구독 확인
  const { data: existingSubscription, error: fetchError } = await supabase
    .from('subscriptions')
    .select('user_id')
    .eq('id', params.id)
    .single();
    
  if (fetchError) {
    return NextResponse.json({ error: fetchError.message }, { status: 500 });
  }
  
  // 다른 사용자의 구독을 수정하려는 경우
  if (existingSubscription.user_id !== session.user.id) {
    return NextResponse.json({ error: '권한이 없습니다.' }, { status: 403 });
  }
  
  const body = await request.json();
  
  // 업데이트 시간 추가
  const subscription = {
    ...body,
    updated_at: new Date().toISOString()
  };
  
  // 구독 데이터 업데이트
  const { data, error } = await supabase
    .from('subscriptions')
    .update(subscription)
    .eq('id', params.id)
    .select();
    
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  
  return NextResponse.json({ data });
}

// 구독 삭제
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createRouteHandlerClient<Database>({ cookies });
  
  // 현재 로그인한 사용자 확인
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 });
  }
  
  // 기존 구독 확인
  const { data: existingSubscription, error: fetchError } = await supabase
    .from('subscriptions')
    .select('user_id')
    .eq('id', params.id)
    .single();
    
  if (fetchError) {
    return NextResponse.json({ error: fetchError.message }, { status: 500 });
  }
  
  // 다른 사용자의 구독을 삭제하려는 경우
  if (existingSubscription.user_id !== session.user.id) {
    return NextResponse.json({ error: '권한이 없습니다.' }, { status: 403 });
  }
  
  // 구독 데이터 삭제
  const { error } = await supabase
    .from('subscriptions')
    .delete()
    .eq('id', params.id);
    
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  
  return NextResponse.json({ success: true });
} 