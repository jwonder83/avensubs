import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { Database } from '@/types/supabase';

export async function GET() {
  const supabase = createRouteHandlerClient<Database>({ cookies });
  
  // 여기에 서버 측 Supabase 요청 로직을 구현할 수 있습니다
  const { data, error } = await supabase
    .from('examples')
    .select('*')
    .limit(10);
    
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  
  return NextResponse.json({ data });
}

export async function POST(request: Request) {
  const supabase = createRouteHandlerClient<Database>({ cookies });
  const body = await request.json();
  
  // 서버 측 POST 요청 처리 예시
  const { data, error } = await supabase
    .from('examples')
    .insert(body)
    .select();
    
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  
  return NextResponse.json({ data });
} 