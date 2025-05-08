"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import { 
  CreditCard,
  PlusCircle, 
  AlertCircle, 
  Trash2, 
  Edit,
  CheckCircle
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { toast } from "react-hot-toast";

type Card = {
  id: string;
  user_id: string;
  card_number: string;
  card_holder: string;
  expiry_date: string;
  card_type: string;
  is_default: boolean;
  created_at: string;
  updated_at: string;
  card_nick?: string;
};

// 임의의 샘플 카드 데이터
const sampleCards: Card[] = [
  {
    id: '1',
    user_id: 'user-1',
    card_number: '4111111111111111',
    card_holder: '홍길동',
    expiry_date: '2025-12',
    card_type: 'visa',
    is_default: true,
    created_at: '2023-01-01T00:00:00.000Z',
    updated_at: '2023-01-01T00:00:00.000Z',
    card_nick: '메인 비자카드'
  },
  {
    id: '2',
    user_id: 'user-1',
    card_number: '5555555555554444',
    card_holder: '김철수',
    expiry_date: '2024-06',
    card_type: 'mastercard',
    is_default: false,
    created_at: '2023-02-15T00:00:00.000Z',
    updated_at: '2023-02-15T00:00:00.000Z'
  },
  {
    id: '3',
    user_id: 'user-1',
    card_number: '3566002020360505',
    card_holder: '이영희',
    expiry_date: '2026-03',
    card_type: 'jcb',
    is_default: false,
    created_at: '2023-03-20T00:00:00.000Z',
    updated_at: '2023-03-20T00:00:00.000Z',
    card_nick: '쇼핑용 카드'
  }
];

// 카드 타입별 스타일 정의
const cardStyles = {
  visa: {
    gradient: "bg-gradient-to-r from-blue-700 to-blue-500",
    textColor: "text-white",
    logo: (
      <svg width="40" height="12" viewBox="0 0 40 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.014 1.05L13.442 10.934H10.638L7.084 2.516C6.898 2.011 6.736 1.806 6.258 1.599C5.512 1.272 4.337 0.964 3.333 0.793L3.405 0.421H8C8.636 0.421 9.185 0.845 9.352 1.599L11.235 7.818L13.69 0.421H16.602L17.014 1.05ZM27.899 7.458C27.908 4.564 23.986 4.456 24.003 3.135C24.008 2.704 24.423 2.244 25.304 2.137C25.751 2.084 26.824 2.045 28.025 2.513L28.525 0.272C27.685 0.015 26.638 -0.106 25.349 -0.106C22.698 -0.106 20.821 1.325 20.809 3.397C20.795 4.936 22.141 5.795 23.152 6.305C24.196 6.827 24.563 7.169 24.558 7.639C24.55 8.34 23.705 8.651 22.913 8.662C21.474 8.682 20.665 8.283 20.004 7.983L19.486 10.295C20.15 10.592 21.38 10.85 22.653 10.862C25.478 10.862 27.891 9.449 27.899 7.458ZM33.999 10.934H36.674L33.999 0.421H31.758C31.187 0.421 30.705 0.764 30.509 1.285L25.758 10.934H28.433L29.098 9.308H33.442L33.999 10.934ZM30.018 7.073L31.654 3.339L32.613 7.073H30.018ZM22.05 0.421L19.903 10.934H17.363L19.511 0.421H22.05Z" fill="white"/>
      </svg>
    )
  },
  mastercard: {
    gradient: "bg-gradient-to-r from-orange-600 via-orange-500 to-yellow-500",
    textColor: "text-white",
    logo: (
      <svg width="32" height="20" viewBox="0 0 32 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.436 2.875H20.167V16.875H11.436V2.875Z" fill="#FF5F00"/>
        <path d="M11.959 9.875C11.958 7.789 12.691 5.773 14.034 4.193C15.376 2.613 17.239 1.577 19.292 1.267C21.345 0.958 23.444 1.397 25.193 2.508C26.943 3.620 28.222 5.328 28.796 7.324C29.37 9.320 29.2 11.463 28.318 13.349C27.435 15.236 25.897 16.729 23.998 17.562C22.098 18.395 19.968 18.516 17.988 17.901C16.009 17.286 14.311 15.972 13.205 14.186C12.383 12.857 11.959 11.33 11.959 9.775V9.875Z" fill="#EB001B"/>
        <path d="M27.825 14.524V14.375H28.036V14.309H27.648V14.375H27.858V14.524H27.825ZM28.561 14.524V14.307H28.444L28.326 14.442L28.208 14.307H28.09V14.524H28.174V14.357L28.284 14.486H28.366L28.476 14.356V14.524H28.561Z" fill="#F79E1B"/>
        <path d="M29.341 9.875C29.341 11.43 28.917 12.957 28.095 14.286C26.99 16.072 25.291 17.386 23.311 18.001C21.332 18.616 19.201 18.495 17.302 17.662C15.403 16.829 13.864 15.336 12.982 13.449C12.1 11.563 11.93 9.42 12.504 7.424C13.078 5.428 14.357 3.72 16.106 2.608C17.856 1.497 19.955 1.058 22.008 1.367C24.06 1.677 25.924 2.713 27.266 4.293C28.609 5.873 29.341 7.889 29.341 9.975V9.875Z" fill="#F79E1B"/>
        <path d="M29.341 9.875C29.341 11.43 28.917 12.957 28.095 14.286C26.99 16.072 25.291 17.386 23.311 18.001C21.332 18.616 19.201 18.495 17.302 17.662C15.403 16.829 13.864 15.336 12.982 13.449C12.1 11.563 11.93 9.42 12.504 7.424C13.078 5.428 14.357 3.72 16.106 2.608C17.856 1.497 19.955 1.058 22.008 1.367C24.06 1.677 25.924 2.713 27.266 4.293C28.609 5.873 29.341 7.889 29.341 9.975V9.875Z" fill="#F79E1B"/>
      </svg>
    )
  },
  jcb: {
    gradient: "bg-gradient-to-r from-blue-800 via-blue-600 to-indigo-700",
    textColor: "text-white",
    logo: (
      <svg width="30" height="20" viewBox="0 0 30 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M27.554 0H17.963C15.363 0 13.257 2.091 13.257 4.673V9.782C14.803 10.909 16.558 11.164 18.004 10.673C19.886 10.055 20.846 8.473 20.846 6.218V4.673H27.554V11.891C27.554 13.945 25.881 15.618 23.827 15.618H13.258V4.673C13.258 2.091 15.363 0 17.963 0H27.554Z" fill="#007B40"/>
        <path d="M16.534 0H6.943C4.343 0 2.238 2.091 2.238 4.673V9.782C3.784 10.909 5.539 11.164 6.985 10.673C8.867 10.055 9.826 8.473 9.826 6.218V4.673H16.534V11.891C16.534 13.945 14.861 15.618 12.808 15.618H2.238V4.673C2.238 2.091 4.344 0 6.943 0H16.534Z" fill="#EB001B"/>
        <path d="M5.515 0H2.238V4.673H5.515C7.569 4.673 9.242 3 9.242 0.946V0.946C9.242 -1.107 7.569 -2.78 5.516 -2.78H2.239" fill="#F79E1B"/>
      </svg>
    )
  },
  amex: {
    gradient: "bg-gradient-to-r from-blue-400 to-blue-300",
    textColor: "text-white",
    logo: (
      <svg width="36" height="11" viewBox="0 0 36 11" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M33.059 10.892H2.101C0.941 10.892 0 9.951 0 8.791V2.101C0 0.941 0.941 0 2.101 0H33.059C34.219 0 35.16 0.941 35.16 2.101V8.791C35.16 9.951 34.219 10.892 33.059 10.892Z" fill="#016FD0"/>
        <path d="M4.877 5.812V2.479H7.825L8.363 3.116L8.915 2.479H16.355V5.411C16.355 5.411 16.708 5.431 16.881 5.431C17.166 5.431 17.417 5.241 17.417 4.852V2.479H20.46V5.45C20.46 5.45 20.891 5.812 21.588 5.812H22.953V4.539H23.297C23.297 4.539 23.621 4.559 23.621 4.861V5.812H28.11V5.117H28.244C28.244 5.117 28.426 5.117 28.426 5.336V5.812H33.059V2.479H36.022L36.56 3.116L37.112 2.479H40.002V8.409H37.083L36.517 7.762L35.952 8.409H30.831V7.266H30.486C30.486 7.266 30.144 7.266 30.144 7.524V8.409H25.99C25.313 8.409 24.862 8.047 24.862 8.047V8.409H20.411L19.901 7.591H18.773L18.285 8.409H14.799V6.803L14.353 8.409H13.194L12.748 6.813V8.409H9.762L9.263 7.591H8.124L7.625 8.409H4.877V5.812Z" fill="#016FD0"/>
        <path d="M35.055 3.116L33.804 5.212H35.055H36.305L35.055 3.116ZM14.343 3.116L13.093 5.212H14.343H15.593L14.343 3.116ZM7.187 5.736H8.067L7.625 4.634L7.187 5.736ZM18.698 5.736H19.578L19.128 4.634L18.698 5.736ZM24.862 5.736V6.469C24.862 6.469 25.342 6.097 25.952 6.097H27.575V5.441H25.952C25.342 5.441 24.862 5.069 24.862 5.736ZM28.426 4.387V3.078H30.486C30.889 3.078 31.187 3.326 31.187 3.721C31.187 4.14 30.889 4.387 30.486 4.387H28.426ZM2.101 0.772C1.366 0.772 0.772 1.366 0.772 2.101V8.791C0.772 9.526 1.366 10.12 2.101 10.12H33.059C33.794 10.12 34.388 9.526 34.388 8.791V2.101C34.388 1.366 33.794 0.772 33.059 0.772H2.101Z" fill="white"/>
      </svg>
    )
  },
  discover: {
    gradient: "bg-gradient-to-r from-orange-500 to-orange-400",
    textColor: "text-white",
    logo: (
      <svg width="60" height="12" viewBox="0 0 60 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.198 0.137C2.373 0.137 0.082 2.419 0.082 5.232C0.082 8.046 2.373 10.328 5.198 10.328C8.022 10.328 10.314 8.046 10.314 5.232C10.314 2.419 8.022 0.137 5.198 0.137Z" fill="#F27712"/>
        <path d="M33.303 0.492H30.082V9.913H33.303V0.492Z" fill="white"/>
        <path d="M24.287 0.492L20.452 9.913H23.889L27.723 0.492H24.287Z" fill="white"/>
        <path d="M42.599 3.773C42.599 2.006 41.223 0.492 38.977 0.492H35.687V9.913H38.908V6.773H38.977C41.154 6.773 42.599 5.467 42.599 3.773ZM38.977 4.401H38.908V2.864H38.977C39.803 2.864 40.355 3.223 40.355 3.701C40.355 4.18 39.803 4.401 38.977 4.401Z" fill="white"/>
        <path d="M14.149 5.574L13.93 5.435C13.253 4.961 12.783 4.622 12.783 4.128C12.783 3.704 13.115 3.364 13.73 3.364C14.238 3.364 14.607 3.634 14.962 4.06L16.408 2.435C15.544 1.488 14.607 1.033 13.668 1.033C11.876 1.033 10.53 2.296 10.53 4.075C10.53 5.487 11.383 6.258 12.59 7.046L12.822 7.198C13.602 7.722 14.135 8.114 14.135 8.693C14.135 9.311 13.602 9.766 12.877 9.766C12.138 9.766 11.599 9.271 11.121 8.625L9.524 10.191C10.387 11.367 11.613 12 12.836 12C14.89 12 16.388 10.639 16.388 8.666C16.388 7.099 15.477 6.299 14.149 5.574Z" fill="white"/>
        <path d="M16.83 5.232C16.83 7.929 19.093 10.191 22.013 10.191C22.93 10.191 23.683 9.99 24.588 9.535V6.772C23.888 7.493 23.271 7.764 22.463 7.764C20.917 7.764 19.773 6.669 19.773 5.232C19.773 3.845 20.917 2.75 22.395 2.75C23.244 2.75 23.875 3.061 24.588 3.782V1.019C23.724 0.55 22.971 0.363 22.04 0.363C19.106 0.363 16.83 2.576 16.83 5.232Z" fill="white"/>
        <path d="M52.571 6.478L48.052 0.491H45.27V9.913H48.203V3.926L52.722 9.913H55.504V0.491H52.571V6.478Z" fill="white"/>
        <path d="M55.926 7.845C55.926 9.109 56.968 10.152 58.232 10.152C59.496 10.152 60.538 9.109 60.538 7.845C60.538 6.581 59.496 5.539 58.232 5.539C56.968 5.539 55.926 6.581 55.926 7.845Z" fill="white"/>
      </svg>
    )
  },
  unionpay: {
    gradient: "bg-gradient-to-r from-red-600 via-blue-600 to-green-600",
    textColor: "text-white",
    logo: (
      <svg width="32" height="20" viewBox="0 0 32 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1" y="1" width="30" height="18" rx="2" fill="white"/>
        <path d="M14 13.75H4C2.895 13.75 2 12.855 2 11.75V4.25C2 3.145 2.895 2.25 4 2.25H14C15.105 2.25 16 3.145 16 4.25V11.75C16 12.855 15.105 13.75 14 13.75Z" fill="#D10429"/>
        <path d="M28 13.75H18C16.895 13.75 16 12.855 16 11.75V4.25C16 3.145 16.895 2.25 18 2.25H28C29.105 2.25 30 3.145 30 4.25V11.75C30 12.855 29.105 13.75 28 13.75Z" fill="#022E64"/>
        <path d="M30 17.75H2V15.75C2 14.645 2.895 13.75 4 13.75H28C29.105 13.75 30 14.645 30 15.75V17.75Z" fill="#076F74"/>
        <path d="M11.5 7.75L12 6L12.5 7.75H13.5L12.5 9L13 10.75H12L11.5 9L11 10.75H10L10.5 9L9.5 7.75H11.5Z" fill="white"/>
        <path d="M25.5 7.75L26 6L26.5 7.75H27.5L26.5 9L27 10.75H26L25.5 9L25 10.75H24L24.5 9L23.5 7.75H25.5Z" fill="white"/>
        <path d="M6.5 7.75L7 6L7.5 7.75H8.5L7.5 9L8 10.75H7L6.5 9L6 10.75H5L5.5 9L4.5 7.75H6.5Z" fill="white"/>
        <path d="M20.5 7.75L21 6L21.5 7.75H22.5L21.5 9L22 10.75H21L20.5 9L20 10.75H19L19.5 9L18.5 7.75H20.5Z" fill="white"/>
      </svg>
    )
  },
  default: {
    gradient: "bg-gradient-to-r from-gray-700 to-gray-600",
    textColor: "text-white",
    logo: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 4H4C2.89 4 2 4.89 2 6V18C2 19.11 2.89 20 4 20H20C21.11 20 22 19.11 22 18V6C22 4.89 21.11 4 20 4ZM20 18H4V12H20V18ZM20 8H4V6H20V8Z" fill="white"/>
      </svg>
    )
  }
};

// 카드 타입에 따른 로고 및 브랜드명 가져오기
function getCardBrandInfo(cardType: string) {
  const cardStyle = cardStyles[cardType as keyof typeof cardStyles] || cardStyles.default;
  const brandName = getCardBrandName(cardType);
  
  return {
    ...cardStyle,
    brandName
  };
}

export default function Cards() {
  const router = useRouter();
  const { user, session } = useAuth();
  
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingCardId, setDeletingCardId] = useState<string | null>(null);
  const [deletingCard, setDeletingCard] = useState(false);
  const [changingDefaultCard, setChangingDefaultCard] = useState(false);

  // 인증 체크를 위한 useEffect
  useEffect(() => {
    if (!session || !user) {
      router.replace('/login');
      return;
    }

    // 실제 API 호출 대신 샘플 데이터 사용
    loadSampleCards();
  }, [session, user, router]);

  async function loadSampleCards() {
    try {
      setLoading(true);
      // 데이터 로딩 시간 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 800));
      setCards(sampleCards);
    } catch (error: any) {
      console.error('카드 목록 불러오기 오류:', error);
      setError('카드 목록을 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  }
  
  // 기존 loadCards 함수는 주석 처리
  /*
  async function loadCards() {
    if (!user?.id) {
      console.log('사용자 정보가 없습니다.');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('cards')
        .select('*')
        .eq('user_id', user.id)
        .order('is_default', { ascending: false })
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      setCards(data || []);
    } catch (error: any) {
      console.error('카드 목록 불러오기 오류:', error);
      setError('카드 목록을 불러오는 중 오류가 발생했습니다.');
      toast.error('카드 목록을 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  }
  */
  
  const handleDeleteCard = async (cardId: string) => {
    try {
      setDeletingCardId(cardId);
      setDeletingCard(true);
      
      // 삭제 시간 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setCards(cards.filter(card => card.id !== cardId));
      toast.success('카드가 성공적으로 삭제되었습니다.');
    } catch (error: any) {
      console.error('카드 삭제 오류:', error);
      toast.error('카드 삭제 중 오류가 발생했습니다.');
    } finally {
      setDeletingCardId(null);
      setDeletingCard(false);
    }
  };
  
  const handleSetDefaultCard = async (cardId: string) => {
    try {
      setChangingDefaultCard(true);
      
      // 처리 시간 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // 상태 업데이트
      setCards(cards.map(card => ({
        ...card,
        is_default: card.id === cardId
      })));
      
      toast.success('기본 결제 카드가 변경되었습니다.');
    } catch (error: any) {
      console.error('기본 카드 설정 오류:', error);
      toast.error('기본 카드 설정 중 오류가 발생했습니다.');
    } finally {
      setChangingDefaultCard(false);
    }
  };
  
  const formatCardNumber = (cardNumber: string) => {
    // 카드번호 앞 6자리와 마지막 4자리만 표시 (나머지는 *)
    const firstSix = cardNumber.substring(0, 6);
    const lastFour = cardNumber.substring(cardNumber.length - 4);
    const maskedLength = cardNumber.length - 10;
    const masked = '*'.repeat(maskedLength);
    
    return `${firstSix}${masked}${lastFour}`;
  };
  
  const formatDisplayCardNumber = (cardNumber: string) => {
    // 4자리마다 공백 추가하여 표시
    return cardNumber.replace(/(.{4})/g, '$1 ').trim();
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
  
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 bg-gray-50 min-h-screen pb-24">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">카드 관리</h1>
          <p className="text-gray-500 text-sm">결제에 사용되는 카드를 관리할 수 있습니다.</p>
        </div>
        
        {error && (
          <div className="flex items-start p-4 mb-6 rounded-xl bg-red-50 text-red-700 text-sm">
            <AlertCircle size={18} className="mr-2 mt-0.5 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}
        
        <div className="space-y-6">
          {cards.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
              <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <CreditCard className="w-10 h-10 text-blue-500" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">등록된 카드가 없습니다.</h3>
              <p className="text-gray-500 mb-6 max-w-xs mx-auto">아래 버튼을 눌러 새 카드를 추가해주세요.</p>
              <Link
                href="/cards/add"
                className="inline-flex items-center px-5 py-2.5 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                <PlusCircle size={18} className="mr-2" />
                카드 추가하기
              </Link>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-6">
                {cards.map((card) => {
                  const cardInfo = getCardBrandInfo(card.card_type);
                  return (
                    <div key={card.id} className="relative overflow-hidden group">
                      {/* 실제 카드 디자인 */}
                      <div className={`${cardInfo.gradient} rounded-2xl shadow-lg p-6 relative overflow-hidden transition-all duration-300 group-hover:shadow-xl`}>
                        {/* 배경 장식 요소 */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/5 rounded-full -ml-10 -mb-10"></div>
                        
                        {/* 카드 브랜드 로고 */}
                        <div className="flex justify-between items-start mb-6">
                          <div className="bg-white/10 rounded-lg p-2 backdrop-blur-sm">
                            {cardInfo.logo}
                          </div>
                          {card.is_default && (
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium">
                              <CheckCircle size={12} className="mr-1" />
                              기본 카드
                            </span>
                          )}
                        </div>
                        
                        {/* 카드 번호 */}
                        <div className="mb-6">
                          <div className={`${cardInfo.textColor} text-lg font-mono tracking-widest`}>
                            {formatDisplayCardNumber(formatCardNumber(card.card_number))}
                          </div>
                        </div>
                        
                        {/* 카드 정보 */}
                        <div className="flex justify-between">
                          <div>
                            <div className="text-white/60 text-xs mb-1">카드 소유자</div>
                            <div className={`${cardInfo.textColor} font-medium`}>{card.card_holder}</div>
                          </div>
                          <div>
                            <div className="text-white/60 text-xs mb-1">만료일</div>
                            <div className={`${cardInfo.textColor} font-medium`}>{formatExpiryDate(card.expiry_date)}</div>
                          </div>
                        </div>

                        {/* 카드 닉네임 */}
                        {card.card_nick && (
                          <div className="absolute bottom-3 right-4 px-2 py-1 rounded-full bg-white/20 backdrop-blur-sm">
                            <span className="text-white text-xs font-medium">{card.card_nick}</span>
                          </div>
                        )}
                      </div>
                      
                      {/* 카드 액션 버튼 */}
                      <div className="bg-white rounded-2xl shadow-sm mt-2 p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="text-base font-medium text-gray-900">
                              {card.card_nick || cardInfo.brandName}
                            </h3>
                            <p className="text-sm text-gray-500 mt-0.5">
                              {card.card_number.substring(card.card_number.length - 4)}으로 끝나는 카드
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            {!card.is_default && (
                              <button
                                onClick={() => handleSetDefaultCard(card.id)}
                                disabled={changingDefaultCard}
                                className="p-2 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
                                title="기본 카드로 설정"
                              >
                                <CheckCircle size={18} />
                              </button>
                            )}
                            <Link
                              href={`/cards/edit/${card.id}`}
                              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                              title="카드 수정"
                            >
                              <Edit size={18} />
                            </Link>
                            <button
                              onClick={() => handleDeleteCard(card.id)}
                              disabled={deletingCard && deletingCardId === card.id}
                              className={cn(
                                "p-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors",
                                (deletingCard && deletingCardId === card.id) && "opacity-50 cursor-not-allowed"
                              )}
                              title="카드 삭제"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="flex justify-center mt-8">
                <Link
                  href="/cards/add"
                  className="inline-flex items-center px-4 py-2 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  <PlusCircle size={18} className="mr-2" />
                  새 카드 추가하기
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// 카드 브랜드 이름 반환 함수
function getCardBrandName(cardType: string): string {
  const brands: Record<string, string> = {
    'visa': 'Visa',
    'mastercard': 'Mastercard',
    'amex': 'American Express',
    'discover': 'Discover',
    'jcb': 'JCB',
    'unionpay': 'UnionPay',
    'diners': 'Diners Club'
  };
  
  return brands[cardType.toLowerCase()] || cardType;
}

// 만료일 포맷 함수
function formatExpiryDate(expiryDate: string): string {
  if (expiryDate.includes('/')) return expiryDate;
  
  // yyyy-MM 형식을 MM/YY 형식으로 변환
  if (expiryDate.match(/^\d{4}-\d{2}$/)) {
    const [year, month] = expiryDate.split('-');
    return `${month}/${year.slice(2)}`;
  }
  
  return expiryDate;
} 