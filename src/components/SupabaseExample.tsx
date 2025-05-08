'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';

type Example = {
  id: string;
  title: string;
  description: string | null;
  created_at: string;
};

export default function SupabaseExample() {
  const [examples, setExamples] = useState<Example[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    fetchExamples();
  }, []);

  async function fetchExamples() {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('examples')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      setExamples(data || []);
    } catch (error: any) {
      console.error('예제 데이터 불러오기 오류:', error);
      setError(error.message || '데이터를 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  }

  async function addExample() {
    if (!newTitle.trim()) {
      setError('제목을 입력해주세요.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('examples')
        .insert([
          { 
            title: newTitle,
            description: newDescription || null,
            user_id: user?.id || null
          }
        ])
        .select();
      
      if (error) {
        throw error;
      }
      
      setExamples([...(data || []), ...examples]);
      setNewTitle('');
      setNewDescription('');
      
      // 최신 데이터 다시 불러오기
      fetchExamples();
      
    } catch (error: any) {
      console.error('예제 추가 오류:', error);
      setError(error.message || '데이터를 추가하는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Supabase 예제</h2>
      
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4">
          {error}
        </div>
      )}
      
      <div className="mb-6 space-y-3">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="제목"
          className="w-full border rounded-md p-2"
        />
        <textarea
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          placeholder="설명 (선택사항)"
          className="w-full border rounded-md p-2"
          rows={3}
        />
        <button
          onClick={addExample}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:bg-blue-300"
        >
          {loading ? '처리 중...' : '추가하기'}
        </button>
      </div>
      
      <div className="space-y-4">
        <h3 className="font-medium">예제 목록</h3>
        {loading && <p>로딩 중...</p>}
        {!loading && examples.length === 0 && (
          <p className="text-gray-500">데이터가 없습니다.</p>
        )}
        {examples.map((example) => (
          <div key={example.id} className="border p-3 rounded-md">
            <h4 className="font-semibold">{example.title}</h4>
            {example.description && <p className="text-sm text-gray-600">{example.description}</p>}
            <p className="text-xs text-gray-400 mt-1">
              {new Date(example.created_at).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
} 