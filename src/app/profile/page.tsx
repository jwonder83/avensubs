"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import { 
  User, 
  Camera, 
  ChevronLeft, 
  Save, 
  X, 
  AlertCircle, 
  CheckCircle2, 
  Lock
} from "lucide-react";
import { toast } from "react-hot-toast";

export default function Profile() {
  const router = useRouter();
  const { user, session } = useAuth();
  
  const [username, setUsername] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);
  const [updatingPassword, setUpdatingPassword] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // 인증 체크를 위한 useEffect
  useEffect(() => {
    if (!session || !user) {
      router.replace('/login');
      return;
    }

    loadProfile();
  }, [session, user, router]);
  
  async function loadProfile() {
    if (!user?.id) {
      console.log('사용자 정보가 없습니다.');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      // 기본값 설정
      const defaultUsername = user.email?.split('@')[0] || '';
      setUsername(defaultUsername);
      setAvatarUrl('');
      
      // 사용자 프로필 불러오기 시도
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('username, avatar_url')
          .eq('id', user.id)
          .single();
        
        if (data) {
          setUsername(data.username || defaultUsername);
          setAvatarUrl(data.avatar_url || '');
        }
      } catch (error) {
        console.log('프로필 조회 중 오류 발생:', error);
        // 프로필 테이블이 없거나 오류가 발생해도 기본값을 사용하므로 에러 처리하지 않음
      }
    } catch (error: any) {
      console.error('프로필 불러오기 오류:', error);
      // 치명적인 오류가 아닌 경우 사용자에게 보여주지 않음
    } finally {
      setLoading(false);
    }
  }
  
  async function createNewProfile() {
    if (!user?.id || !user?.email) {
      console.log('사용자 정보가 불완전합니다.');
      return;
    }
    
    try {
      const defaultUsername = user.email.split('@')[0];
      
      // 새 프로필 생성
      const { error } = await supabase
        .from('profiles')
        .insert({
          id: user.id,
          email: user.email,
          username: defaultUsername,
          avatar_url: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });
      
      if (error) {
        console.error('프로필 생성 오류:', error);
        throw new Error(error.message || '프로필을 생성하는 중 오류가 발생했습니다.');
      }
      
      // 기본 사용자명 설정
      setUsername(defaultUsername);
      toast.success('프로필이 생성되었습니다.');
    } catch (error: any) {
      console.error('프로필 생성 오류:', error);
      setError(error?.message || '프로필을 생성하는 중 오류가 발생했습니다.');
      toast.error(error?.message || '프로필을 생성하는 중 오류가 발생했습니다.');
    }
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!session) {
      router.replace('/login');
      return;
    }

    if (!username?.trim()) {
      setError('사용자 이름을 입력해주세요.');
      return;
    }

    setUpdating(true);
    setError(null);

    try {
      const response = await fetch('/api/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username.trim(),
          avatar_url: avatarUrl
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || '프로필 업데이트에 실패했습니다.');
      }

      if (result.data) {
        setUsername(result.data.username);
        setAvatarUrl(result.data.avatar_url);
        router.refresh();
        toast.success('프로필이 성공적으로 업데이트되었습니다.');
      }
    } catch (error: any) {
      console.error('Profile update error:', error);
      setError(error.message || '프로필 업데이트 중 오류가 발생했습니다.');
      toast.error(error.message || '프로필 업데이트 중 오류가 발생했습니다.');
    } finally {
      setUpdating(false);
    }
  };
  
  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!session) {
      router.replace('/login');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setPasswordError('새 비밀번호와 확인 비밀번호가 일치하지 않습니다.');
      return;
    }
    
    if (newPassword.length < 6) {
      setPasswordError('비밀번호는 최소 6자 이상이어야 합니다.');
      return;
    }
    
    try {
      setUpdatingPassword(true);
      setPasswordError(null);
      setPasswordSuccess(null);
      
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });
      
      if (error) throw error;
      
      setPasswordSuccess('비밀번호가 성공적으로 변경되었습니다.');
      setNewPassword('');
      setConfirmPassword('');
      toast.success('비밀번호가 변경되었습니다.');
    } catch (error: any) {
      console.error('비밀번호 변경 오류:', error);
      setPasswordError(error?.message || '비밀번호 변경 중 오류가 발생했습니다.');
      toast.error(error?.message || '비밀번호 변경 중 오류가 발생했습니다.');
    } finally {
      setUpdatingPassword(false);
    }
  };
  
  const uploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('이미지를 선택해주세요.');
      }
      
      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const filePath = `${user?.id}/${Math.random()}.${fileExt}`;
      
      // 스토리지에 이미지 업로드
      let { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);
        
      if (uploadError) {
        throw uploadError;
      }
      
      // 공개 URL 가져오기
      const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
      
      // 프로필 아바타 URL 업데이트
      setAvatarUrl(data.publicUrl);
      toast.success('이미지가 업로드되었습니다.');
      
    } catch (error: any) {
      console.error('아바타 업로드 오류:', error);
      setError(error.message || '이미지 업로드 중 오류가 발생했습니다.');
      toast.error(error.message || '이미지 업로드 중 오류가 발생했습니다.');
    } finally {
      setUploading(false);
    }
  };
  
  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-[60vh]">
          <div className="animate-pulse text-blue-500">로딩 중...</div>
        </div>
      </div>
    );
  }
  
  if (!session) {
    return null;
  }
  
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <div className="max-w-md mx-auto">
        {/* 헤더 */}
        <div className="flex items-center mb-8">
          <button
            onClick={() => router.push('/dashboard')}
            className="mr-3 h-8 w-8 rounded-full flex items-center justify-center bg-white text-gray-500 hover:bg-gray-100 transition-colors"
            aria-label="뒤로 가기"
          >
            <ChevronLeft size={18} />
          </button>
          <h1 className="text-xl font-bold text-gray-900">프로필 설정</h1>
        </div>
        
        <div className="space-y-6">
          {/* 알림 메시지 */}
          {error && (
            <div className="flex items-start p-3 rounded-xl bg-red-50 text-red-700 text-sm">
              <AlertCircle size={16} className="mr-2 mt-0.5 flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}
          
          {success && (
            <div className="flex items-start p-3 rounded-xl bg-blue-50 text-blue-700 text-sm">
              <CheckCircle2 size={16} className="mr-2 mt-0.5 flex-shrink-0" />
              <p>{success}</p>
            </div>
          )}
          
          {/* 프로필 카드 */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-gray-100">
                <div className="relative group">
                  <div className="w-20 h-20 rounded-full overflow-hidden bg-blue-50 flex items-center justify-center text-blue-500 text-xl font-medium border-2 border-white shadow-sm">
                    {avatarUrl ? (
                      <Image
                        src={avatarUrl}
                        alt="프로필 이미지"
                        fill
                        sizes="80px"
                        className="object-cover"
                        onError={() => setAvatarUrl('')}
                      />
                    ) : (
                      <span>{username?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || '?'}</span>
                    )}
                  </div>
                  
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="absolute -bottom-1 -right-1 bg-blue-500 text-white h-7 w-7 rounded-full flex items-center justify-center shadow-sm hover:bg-blue-600 transition-colors"
                    aria-label="이미지 변경"
                  >
                    <Camera size={14} />
                  </button>
                  
                  <input
                    type="file"
                    id="avatar"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={uploadAvatar}
                    className="hidden"
                    aria-label="프로필 이미지 업로드"
                  />
                </div>
                
                <div className="flex-1 space-y-1 text-center sm:text-left">
                  <div className="text-lg font-medium text-gray-900">{username || user?.email?.split('@')[0]}</div>
                  <div className="text-sm text-gray-500">{user?.email}</div>
                  
                  {avatarUrl && (
                    <button
                      type="button"
                      onClick={() => setAvatarUrl('')}
                      className="mt-2 text-xs text-red-500 hover:text-red-600 inline-flex items-center"
                    >
                      <X size={12} className="mr-1" />
                      이미지 삭제
                    </button>
                  )}
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                    사용자 이름
                  </label>
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="사용자 이름을 입력하세요"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    이메일
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={user?.email || ''}
                    readOnly
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-500"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    이메일은 변경할 수 없습니다.
                  </p>
                </div>
                
                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    disabled={updating}
                    className="inline-flex items-center px-5 py-2.5 rounded-xl bg-blue-500 text-white font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:bg-blue-300"
                  >
                    {updating ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        업데이트 중...
                      </>
                    ) : (
                      <>
                        <Save size={16} className="mr-1.5" />
                        저장하기
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
          
          {/* 비밀번호 변경 카드 */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center mb-4">
              <Lock size={18} className="text-blue-500 mr-2" />
              <h2 className="text-lg font-medium text-gray-900">비밀번호 변경</h2>
            </div>
            
            {passwordError && (
              <div className="flex items-start p-3 rounded-xl bg-red-50 text-red-700 text-sm mb-4">
                <AlertCircle size={16} className="mr-2 mt-0.5 flex-shrink-0" />
                <p>{passwordError}</p>
              </div>
            )}
            
            {passwordSuccess && (
              <div className="flex items-start p-3 rounded-xl bg-blue-50 text-blue-700 text-sm mb-4">
                <CheckCircle2 size={16} className="mr-2 mt-0.5 flex-shrink-0" />
                <p>{passwordSuccess}</p>
              </div>
            )}
            
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-1">
                  새 비밀번호
                </label>
                <input
                  id="new-password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  required
                  minLength={6}
                  placeholder="새 비밀번호를 입력하세요"
                />
              </div>
              
              <div>
                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                  비밀번호 확인
                </label>
                <input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  required
                  minLength={6}
                  placeholder="새 비밀번호를 다시 입력하세요"
                />
              </div>
              
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={updatingPassword}
                  className="w-full flex justify-center items-center px-5 py-2.5 rounded-xl bg-blue-500 text-white font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:bg-blue-300"
                >
                  {updatingPassword ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      변경 중...
                    </>
                  ) : (
                    "비밀번호 변경하기"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 