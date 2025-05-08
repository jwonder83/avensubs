"use client";

import { useState } from "react";
import { 
  BellRing, 
  Check, 
  Clock, 
  CreditCard, 
  Filter, 
  Info, 
  RefreshCw, 
  ShoppingCart, 
  Tag, 
  Trash2, 
  X 
} from "lucide-react";

// 알림 타입 정의
type NotificationType = "info" | "payment" | "subscription" | "promo" | "system";

// 알림 데이터 인터페이스
interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: NotificationType;
}

// 알림 타입별 아이콘 및 스타일 정의
const notificationStyles = {
  info: {
    icon: <Info size={16} />,
    bg: "bg-blue-100",
    text: "text-blue-600"
  },
  payment: {
    icon: <CreditCard size={16} />,
    bg: "bg-green-100",
    text: "text-green-600"
  },
  subscription: {
    icon: <Tag size={16} />,
    bg: "bg-purple-100",
    text: "text-purple-600"
  },
  promo: {
    icon: <ShoppingCart size={16} />,
    bg: "bg-amber-100",
    text: "text-amber-600"
  },
  system: {
    icon: <BellRing size={16} />,
    bg: "bg-red-100",
    text: "text-red-600"
  }
};

// 날짜 포맷팅 함수
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  
  // 1일 이내면 '3시간 전', '5분 전' 등으로 표시
  if (diff < 24 * 60 * 60 * 1000) {
    const hours = Math.floor(diff / (60 * 60 * 1000));
    if (hours > 0) return `${hours}시간 전`;
    
    const minutes = Math.floor(diff / (60 * 1000));
    if (minutes > 0) return `${minutes}분 전`;
    
    return '방금 전';
  }
  
  // 1일 이상 지난 경우 '2023년 4월 28일'과 같이 표시
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
};

export default function AlertsPage() {
  // 가상의 알림 데이터
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "넷플릭스 결제 예정",
      message: "내일 넷플릭스 구독 요금 17,000원이 결제될 예정입니다.",
      timestamp: "2025-04-27T10:30:00",
      read: false,
      type: "payment"
    },
    {
      id: "2",
      title: "구독 추천",
      message: "현재 사용 패턴을 분석한 결과, 스포티파이 패밀리 플랜으로 변경하면 월 5,000원을 절약할 수 있습니다.",
      timestamp: "2025-04-26T14:15:00",
      read: false,
      type: "subscription"
    },
    {
      id: "3",
      title: "왓챠 50% 할인 프로모션",
      message: "어벤Subs 사용자 대상 왓챠 연간 구독 50% 할인 프로모션이 진행 중입니다. 5월 5일까지만 적용됩니다.",
      timestamp: "2025-04-25T09:00:00",
      read: true,
      type: "promo"
    },
    {
      id: "4",
      title: "구독 서비스 업데이트",
      message: "유튜브 프리미엄의 요금제가 변경되었습니다. 확인해보세요.",
      timestamp: "2025-04-23T11:20:00",
      read: true,
      type: "info"
    },
    {
      id: "5",
      title: "시스템 유지보수 안내",
      message: "5월 1일 오전 2시부터 4시까지 시스템 유지보수가 진행됩니다. 서비스 이용에 참고해주세요.",
      timestamp: "2025-04-22T16:45:00",
      read: true,
      type: "system"
    }
  ]);

  // 필터 상태
  const [filter, setFilter] = useState<NotificationType | "all">("all");
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  // 알림 읽음 처리
  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  // 알림 삭제
  const deleteNotification = (id: string) => {
    setNotifications(prev => 
      prev.filter(notification => notification.id !== id)
    );
  };

  // 모든 알림 읽음 처리
  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  // 필터링된 알림 목록
  const filteredNotifications = notifications.filter(notification => {
    if (showUnreadOnly && notification.read) return false;
    if (filter !== "all" && notification.type !== filter) return false;
    return true;
  });

  // 읽지 않은 알림 개수
  const unreadCount = notifications.filter(notification => !notification.read).length;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {/* 헤더 */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-red-100 text-red-600 mr-3">
                <BellRing size={20} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">알림</h1>
                <p className="text-sm text-gray-500">
                  {unreadCount > 0 ? `${unreadCount}개의 읽지 않은 알림이 있습니다` : "모든 알림을 확인했습니다"}
                </p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <button
                onClick={markAllAsRead}
                disabled={unreadCount === 0}
                className={`inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium ${
                  unreadCount === 0 
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                    : "bg-blue-50 text-blue-600 hover:bg-blue-100"
                } transition-colors`}
              >
                <Check size={16} className="mr-1.5" />
                모두 읽음 처리
              </button>
              
              <button
                onClick={() => setNotifications([])}
                disabled={notifications.length === 0}
                className={`inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium ${
                  notifications.length === 0 
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                    : "bg-red-50 text-red-600 hover:bg-red-100"
                } transition-colors`}
              >
                <Trash2 size={16} className="mr-1.5" />
                모두 삭제
              </button>
            </div>
          </div>
        </div>
        
        {/* 필터 */}
        <div className="px-6 py-3 border-b border-gray-200 bg-gray-50 flex flex-wrap items-center gap-2">
          <div className="inline-flex items-center bg-white rounded-full px-2 py-1 border border-gray-200 text-sm text-gray-700 mr-2">
            <Filter size={14} className="mr-1" />
            <span>필터:</span>
          </div>
          
          {[
            { value: "all", label: "전체" },
            { value: "payment", label: "결제" },
            { value: "subscription", label: "구독" },
            { value: "promo", label: "프로모션" },
            { value: "info", label: "정보" },
            { value: "system", label: "시스템" },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => setFilter(option.value as NotificationType | "all")}
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                filter === option.value
                  ? "bg-indigo-100 text-indigo-600"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              } transition-colors`}
            >
              {option.label}
            </button>
          ))}
          
          <div className="ml-auto flex items-center">
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={showUnreadOnly}
                onChange={() => setShowUnreadOnly(!showUnreadOnly)}
              />
              <div className={`relative w-9 h-5 rounded-full transition ${
                showUnreadOnly ? 'bg-indigo-600' : 'bg-gray-200'
              }`}>
                <div className={`absolute bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  showUnreadOnly ? 'translate-x-4' : 'translate-x-0.5'
                } top-0.5`}></div>
              </div>
              <span className="ml-2 text-sm font-medium text-gray-600">
                읽지 않은 알림만
              </span>
            </label>
            
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center ml-4 p-1.5 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              aria-label="새로고침"
            >
              <RefreshCw size={16} />
            </button>
          </div>
        </div>
        
        {/* 알림 목록 */}
        <div className="divide-y divide-gray-100">
          {filteredNotifications.length === 0 ? (
            <div className="py-16 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-full bg-gray-100">
                  <BellRing className="h-8 w-8 text-gray-400" />
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-900 mb-1">알림이 없습니다</h3>
              <p className="text-sm text-gray-500">
                {filter !== "all" ? "다른 필터를 선택해 보세요" : "새로운 알림이 도착하면 여기에 표시됩니다"}
              </p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`p-4 hover:bg-gray-50 transition-colors ${notification.read ? "" : "bg-blue-50/20"}`}
              >
                <div className="flex items-start">
                  <div className={`p-2 rounded-md mt-1 mr-4 ${notificationStyles[notification.type].bg} ${notificationStyles[notification.type].text}`}>
                    {notificationStyles[notification.type].icon}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className={`text-sm font-semibold ${notification.read ? "text-gray-800" : "text-gray-900"}`}>
                        {notification.title}
                        {!notification.read && (
                          <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                            새 알림
                          </span>
                        )}
                      </h3>
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock size={12} className="mr-1" />
                        {formatDate(notification.timestamp)}
                      </div>
                    </div>
                    
                    <p className={`text-sm ${notification.read ? "text-gray-500" : "text-gray-700"}`}>
                      {notification.message}
                    </p>
                    
                    <div className="mt-2 flex items-center justify-end gap-2">
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="inline-flex items-center py-1 px-2 text-xs font-medium text-blue-600 hover:bg-blue-50 rounded transition-colors"
                        >
                          <Check size={12} className="mr-1" />
                          읽음 표시
                        </button>
                      )}
                      
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="inline-flex items-center py-1 px-2 text-xs font-medium text-red-600 hover:bg-red-50 rounded transition-colors"
                      >
                        <X size={12} className="mr-1" />
                        삭제
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
} 