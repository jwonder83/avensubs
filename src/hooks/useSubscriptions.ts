import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';

export type Subscription = {
  id: string;
  name: string;
  icon: string | null;
  price: number;
  cycle: string;
  next_payment: string;
  category: string;
  status: string;
  warning: string | null;
  created_at: string;
  updated_at: string;
  user_id?: string;
};

// 가상 데이터 생성 함수
const generateMockSubscriptions = (): Subscription[] => {
  return [
    {
      id: "1",
      name: "넷플릭스",
      icon: "https://assets.nflxext.com/us/ffe/siteui/common/icons/nficon2016.ico",
      price: 17000,
      cycle: "monthly",
      next_payment: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7일 후
      category: "entertainment",
      status: "active",
      warning: null,
      created_at: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(), // 90일 전
      updated_at: new Date().toISOString()
    },
    {
      id: "2",
      name: "유튜브 프리미엄",
      icon: "https://www.youtube.com/s/desktop/e4d15d2c/img/favicon_144x144.png",
      price: 14900,
      cycle: "monthly",
      next_payment: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 14일 후
      category: "entertainment",
      status: "active",
      warning: "저조한 사용률",
      created_at: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(), // 60일 전
      updated_at: new Date().toISOString()
    },
    {
      id: "3",
      name: "멜론",
      icon: "https://www.melon.com/favicon.ico?2",
      price: 10900,
      cycle: "monthly",
      next_payment: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5일 후
      category: "music",
      status: "active",
      warning: null,
      created_at: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString(), // 120일 전
      updated_at: new Date().toISOString()
    },
    {
      id: "4",
      name: "Notion",
      icon: "https://www.notion.so/images/favicon.ico",
      price: 8000,
      cycle: "monthly",
      next_payment: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(), // 21일 후
      category: "utility",
      status: "active",
      warning: null,
      created_at: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(), // 45일 전
      updated_at: new Date().toISOString()
    },
    {
      id: "5",
      name: "Adobe Creative Cloud",
      icon: "https://www.adobe.com/content/dam/cc/icons/Adobe_Corporate_Horizontal_Red_HEX.svg",
      price: 65000,
      cycle: "monthly",
      next_payment: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3일 후
      category: "utility",
      status: "active",
      warning: "높은 지출",
      created_at: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString(), // 180일 전
      updated_at: new Date().toISOString()
    },
    {
      id: "6",
      name: "지그재그 클럽Z",
      icon: "https://zigzag.kr/images/icons/zigzag-192x192.png",
      price: 4900,
      cycle: "monthly",
      next_payment: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000).toISOString(), // 12일 후
      category: "shopping",
      status: "active",
      warning: null,
      created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30일 전
      updated_at: new Date().toISOString()
    },
    {
      id: "7",
      name: "쿠팡 와우",
      icon: "https://image6.coupangcdn.com/image/coupang/favicon/v2/favicon.ico",
      price: 4990,
      cycle: "monthly",
      next_payment: new Date(Date.now() + 24 * 24 * 60 * 60 * 1000).toISOString(), // 24일 후
      category: "shopping",
      status: "active",
      warning: null,
      created_at: new Date(Date.now() - 200 * 24 * 60 * 60 * 1000).toISOString(), // 200일 전
      updated_at: new Date().toISOString()
    },
    {
      id: "8",
      name: "Google One",
      icon: "https://ssl.gstatic.com/locate/tools/tool_suite/favicon.ico",
      price: 2900,
      cycle: "monthly",
      next_payment: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(), // 10일 후
      category: "utility",
      status: "active",
      warning: null,
      created_at: new Date(Date.now() - 150 * 24 * 60 * 60 * 1000).toISOString(), // 150일 전
      updated_at: new Date().toISOString()
    }
  ];
};

// 가상 데이터를 저장할 변수
let mockSubscriptions: Subscription[] = generateMockSubscriptions();

export const useSubscriptions = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  // 모든 구독 불러오기 (가상 데이터)
  const fetchSubscriptions = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // 실제 API 요청 대신 가상 데이터 사용
      setTimeout(() => {
        setSubscriptions(mockSubscriptions);
        setIsLoading(false);
      }, 800); // 로딩 시간을 시뮬레이션하기 위해 지연 추가
    } catch (err) {
      setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
      console.error('구독 정보 로딩 오류:', err);
      setIsLoading(false);
    }
  };
  
  // 구독 추가 (가상 데이터)
  const addSubscription = async (subscription: Omit<Subscription, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // 새 구독 객체 생성
      const newSubscription: Subscription = {
        id: `${mockSubscriptions.length + 1}`,
        ...subscription,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      // 가상 데이터에 추가
      mockSubscriptions = [...mockSubscriptions, newSubscription];
      
      // UI 업데이트
      setTimeout(() => {
        setSubscriptions(mockSubscriptions);
        setIsLoading(false);
      }, 500);
      
      return newSubscription;
    } catch (err) {
      setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
      console.error('구독 추가 오류:', err);
      setIsLoading(false);
      return null;
    }
  };
  
  // 구독 업데이트 (가상 데이터)
  const updateSubscription = async (id: string, updates: Partial<Subscription>) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // 가상 데이터 업데이트
      mockSubscriptions = mockSubscriptions.map(sub => 
        sub.id === id 
          ? { ...sub, ...updates, updated_at: new Date().toISOString() } 
          : sub
      );
      
      // UI 업데이트
      setTimeout(() => {
        setSubscriptions(mockSubscriptions);
        setIsLoading(false);
      }, 500);
      
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
      console.error('구독 업데이트 오류:', err);
      setIsLoading(false);
      return false;
    }
  };
  
  // 구독 삭제 (가상 데이터)
  const deleteSubscription = async (id: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // 가상 데이터에서 삭제
      mockSubscriptions = mockSubscriptions.filter(sub => sub.id !== id);
      
      // UI 업데이트
      setTimeout(() => {
        setSubscriptions(mockSubscriptions);
        setIsLoading(false);
      }, 500);
      
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
      console.error('구독 삭제 오류:', err);
      setIsLoading(false);
      return false;
    }
  };
  
  // 컴포넌트 마운트 시 구독 데이터 불러오기
  useEffect(() => {
    fetchSubscriptions();
  }, [user]);
  
  return {
    subscriptions,
    isLoading,
    error,
    fetchSubscriptions,
    addSubscription,
    updateSubscription,
    deleteSubscription,
  };
}; 