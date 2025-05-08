import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import type { Subscription } from '@/hooks/useSubscriptions';

// 카테고리 데이터
const categories = [
  { id: "entertainment", name: "엔터테인먼트" },
  { id: "music", name: "음악" },
  { id: "utility", name: "유틸리티" },
  { id: "education", name: "교육" },
  { id: "food", name: "식품/생활" },
  { id: "donation", name: "기부" }
];

// 아이콘 샘플 옵션
const iconOptions = [
  {
    name: "넷플릭스",
    url: "https://assets.nflxext.com/us/ffe/siteui/common/icons/nficon2016.ico"
  },
  {
    name: "유튜브",
    url: "https://www.youtube.com/s/desktop/e4d15d2c/img/favicon_144x144.png"
  },
  {
    name: "멜론",
    url: "https://www.melon.com/favicon.ico?2"
  },
  {
    name: "Notion",
    url: "https://www.notion.so/images/favicon.ico"
  },
  {
    name: "Adobe",
    url: "https://www.adobe.com/content/dam/cc/icons/Adobe_Corporate_Horizontal_Red_HEX.svg"
  },
  {
    name: "쿠팡",
    url: "https://image6.coupangcdn.com/image/coupang/favicon/v2/favicon.ico"
  }
];

type SubscriptionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Subscription, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => void;
  initialData?: Partial<Subscription>;
  title?: string;
};

export default function SubscriptionModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  title = '구독 추가'
}: SubscriptionModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    icon: '',
    price: '',
    cycle: 'monthly',
    next_payment: '',
    category: 'entertainment',
    status: 'active',
    warning: '',
  });
  
  // 초기 데이터가 있는 경우 폼 초기화
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        icon: initialData.icon || '',
        price: initialData.price?.toString() || '',
        cycle: initialData.cycle || 'monthly',
        next_payment: initialData.next_payment ? new Date(initialData.next_payment).toISOString().split('T')[0] : '',
        category: initialData.category || 'entertainment',
        status: initialData.status || 'active',
        warning: initialData.warning || '',
      });
    } else {
      // 기본값으로 초기화
      setFormData({
        name: '',
        icon: '',
        price: '',
        cycle: 'monthly',
        next_payment: new Date().toISOString().split('T')[0],
        category: 'entertainment',
        status: 'active',
        warning: '',
      });
    }
  }, [initialData, isOpen]);
  
  // 입력 값 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // 이모지 아이콘 선택
  const handleIconSelect = (icon: string) => {
    setFormData(prev => ({ ...prev, icon }));
  };
  
  // 폼 제출 핸들러
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 데이터 유효성 검사
    if (!formData.name || !formData.price || !formData.next_payment) {
      return;
    }
    
    // 데이터 변환 (문자열을 숫자로)
    const submissionData = {
      ...formData,
      price: parseInt(formData.price, 10)
    };
    
    onSubmit(submissionData);
    onClose();
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="닫기"
          >
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* 서비스명 */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              서비스명 *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="예: 넷플릭스"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          
          {/* 아이콘 선택 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              아이콘 URL
            </label>
            <input
              type="text"
              id="icon"
              name="icon"
              value={formData.icon}
              onChange={handleChange}
              placeholder="이미지 URL 입력 (예: https://example.com/icon.png)"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-2"
            />
            <div className="flex flex-wrap gap-2 border border-gray-300 rounded-md p-2 mt-2">
              {iconOptions.map((icon, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleIconSelect(icon.url)}
                  className={`w-12 h-12 p-1 flex items-center justify-center rounded-md ${
                    formData.icon === icon.url ? 'bg-indigo-100 border-2 border-indigo-500' : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                  title={icon.name}
                >
                  <img 
                    src={icon.url} 
                    alt={icon.name} 
                    className="max-w-full max-h-full object-contain"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%236366F1' width='24' height='24'%3E%3Cpath d='M12 7a5 5 0 110 10 5 5 0 010-10zm-7 5a7 7 0 1014 0 7 7 0 00-14 0z'/%3E%3C/svg%3E";
                    }} 
                  />
                </button>
              ))}
            </div>
          </div>
          
          {/* 금액 */}
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
              금액 (원) *
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="예: 9900"
              required
              min="0"
              step="100"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          
          {/* 결제 주기 */}
          <div>
            <label htmlFor="cycle" className="block text-sm font-medium text-gray-700 mb-1">
              결제 주기
            </label>
            <select
              id="cycle"
              name="cycle"
              value={formData.cycle}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="monthly">월간</option>
              <option value="yearly">연간</option>
              <option value="quarterly">분기 (3개월)</option>
              <option value="biannually">반기 (6개월)</option>
            </select>
          </div>
          
          {/* 다음 결제일 */}
          <div>
            <label htmlFor="next_payment" className="block text-sm font-medium text-gray-700 mb-1">
              다음 결제일 *
            </label>
            <input
              type="date"
              id="next_payment"
              name="next_payment"
              value={formData.next_payment}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          
          {/* 카테고리 */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              카테고리
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          
          {/* 상태 */}
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              상태
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="active">활성</option>
              <option value="inactive">비활성</option>
            </select>
          </div>
          
          {/* 경고/메모 */}
          <div>
            <label htmlFor="warning" className="block text-sm font-medium text-gray-700 mb-1">
              메모
            </label>
            <input
              type="text"
              id="warning"
              name="warning"
              value={formData.warning}
              onChange={handleChange}
              placeholder="예: 해지 검토 필요"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none"
            >
              저장
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 