import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const requestData = await request.json();
    const { username, avatar_url } = requestData;

    if (!username?.trim()) {
      return NextResponse.json(
        { error: '사용자 이름은 필수입니다.' },
        { status: 400 }
      );
    }

    const cookieStore = cookies();
    
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
          set(name: string, value: string, options: any) {
            cookieStore.set(name, value, options);
          },
          remove(name: string, options: any) {
            cookieStore.delete(name);
          }
        }
      }
    );

    const { data: { session }, error: sessionError } = await supabase.auth.getSession();

    if (sessionError || !session) {
      console.error('Session error:', sessionError);
      return NextResponse.json(
        { error: '로그인이 필요합니다.' },
        { status: 401 }
      );
    }

    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('id')
      .eq('username', username.trim())
      .neq('id', session.user.id)
      .single();

    if (existingProfile) {
      return NextResponse.json(
        { error: '이미 사용 중인 사용자 이름입니다.' },
        { status: 409 }
      );
    }

    // 프로필 데이터 준비
    const profileData = {
      id: session.user.id,
      username: username.trim(),
      email: session.user.email,
      avatar_url: avatar_url || null,
      updated_at: new Date().toISOString()
    };

    // 프로필 생성 또는 업데이트
    const { data, error: upsertError } = await supabase
      .from('profiles')
      .upsert(profileData)
      .select('*')
      .single();

    if (upsertError) {
      console.error('Profile upsert error:', upsertError);
      return NextResponse.json(
        { error: '프로필 업데이트 중 오류가 발생했습니다.' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      data: data
    });

  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' },
      { status: 500 }
    );
  }
} 