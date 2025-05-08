"use client";

import { useState } from 'react';
import Link from 'next/link';
import { createSupabaseClient } from '@/app/auth/auth-utils';
import { useAuth } from '@/context/AuthContext';

export default function ExamplesPage() {
  const { user } = useAuth();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const createProfilesTable = async () => {
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const supabase = createSupabaseClient();
      
      // 테이블이 이미 존재하는지 확인
      const { error: checkError } = await supabase.from('profiles').select('count').limit(1);
      
      if (checkError && checkError.code === '42P01') {
        // 테이블이 없으면 생성
        const { error } = await supabase.rpc('create_profiles_table');
        
        if (error) {
          // RPC가 없을 경우 직접 SQL 실행
          const { error: sqlError } = await supabase.rpc('execute_sql', {
            query: `
              CREATE TABLE IF NOT EXISTS profiles (
                id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
                email TEXT NOT NULL,
                username TEXT,
                avatar_url TEXT,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
              );
              
              -- 현재 사용자의 프로필 레코드 추가 (없는 경우)
              INSERT INTO profiles (id, email)
              VALUES ('${user?.id}', '${user?.email}')
              ON CONFLICT (id) DO NOTHING;
            `
          });
          
          if (sqlError) {
            throw sqlError;
          }
        }
        
        setMessage('profiles 테이블이 성공적으로 생성되었습니다!');
      } else {
        setMessage('profiles 테이블이 이미 존재합니다.');
      }
    } catch (err: any) {
      console.error('테이블 생성 오류:', err);
      setError(err?.message || '테이블을 생성하는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };
  
  const createProfile = async () => {
    if (!user) {
      setError('사용자 정보를 찾을 수 없습니다. 로그인 상태를 확인해주세요.');
      return;
    }
    
    setLoading(true);
    setMessage('');
    setError('');
    
    try {
      const supabase = createSupabaseClient();
      
      // 사용자 프로필 생성/업데이트
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          email: user.email,
          username: user.email?.split('@')[0] || '사용자',
          updated_at: new Date().toISOString(),
        });
      
      if (error) throw error;
      
      setMessage('프로필이 성공적으로 생성되었습니다!');
    } catch (err: any) {
      console.error('프로필 생성 오류:', err);
      setError(err?.message || '프로필을 생성하는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Supabase 예제</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">프로필 테이블 생성</h2>
          <p className="text-gray-600 mb-4">
            사용자 프로필 정보를 저장할 테이블을 생성합니다. 이 작업은 초기 설정 시 한 번만 필요합니다.
          </p>
          
          {message && (
            <div className="bg-green-50 text-green-700 p-3 rounded-md mb-4">
              {message}
            </div>
          )}
          
          {error && (
            <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4">
              {error}
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={createProfilesTable}
              disabled={loading}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {loading ? '처리 중...' : '테이블 생성하기'}
            </button>
            
            <button
              onClick={createProfile}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? '처리 중...' : '프로필 생성하기'}
            </button>
          </div>
        </div>
        
        <div className="mt-6">
          <Link 
            href="/dashboard" 
            className="text-indigo-600 hover:underline"
          >
            대시보드로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
} 