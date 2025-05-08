'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function AuthError() {
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [errorDescription, setErrorDescription] = useState<string | null>(null);

  useEffect(() => {
    setError(searchParams.get('error'));
    setErrorDescription(searchParams.get('error_description'));
  }, [searchParams]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 py-12">
      <div className="mx-auto w-full max-w-md space-y-6 rounded-lg bg-white p-8 shadow-md">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">인증 오류</h1>
          <div className="mt-4 text-sm text-gray-500">
            {error && (
              <p className="mb-2 font-medium text-red-600">{error}</p>
            )}
            {errorDescription && (
              <p className="text-red-500">{errorDescription}</p>
            )}
            {!error && !errorDescription && (
              <p>알 수 없는 오류가 발생했습니다.</p>
            )}
          </div>
        </div>
        <div className="mt-8">
          <Link
            href="/login"
            className="block w-full rounded-md bg-blue-600 px-4 py-2 text-center text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            로그인 페이지로 돌아가기
          </Link>
          <Link
            href="/"
            className="mt-4 block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
} 