"use client";

import { useState } from "react";
import { 
  FiUser, 
  FiCreditCard, 
  FiBell, 
  FiShield, 
  FiHelpCircle, 
  FiSave,
  FiCheck,
  FiMail,
  FiPhone,
  FiEdit2,
  FiChevronRight,
  FiCamera,
  FiPlusCircle,
  FiInfo,
  FiLock,
  FiAlertCircle
} from "react-icons/fi";

// 사용자 프로필 타입 정의
type UserProfile = {
  name: string;
  email: string;
  phone: string;
  profileImage?: string;
}

// 결제 정보 타입 정의
type PaymentMethod = {
  id: string;
  type: "credit" | "bank";
  name: string;
  lastFour: string;
  expiryDate?: string;
  isDefault: boolean;
}

export default function SettingsPage() {
  // 활성 탭 상태 관리
  const [activeTab, setActiveTab] = useState<string>("profile");
  
  // 사용자 프로필 상태 관리
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: "홍길동",
    email: "hong@example.com",
    phone: "010-1234-5678",
    profileImage: "https://i.pravatar.cc/150?img=12"
  });

  // 결제 수단 상태 관리
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: "pm_1",
      type: "credit",
      name: "신한카드",
      lastFour: "4567",
      expiryDate: "12/25",
      isDefault: true
    },
    {
      id: "pm_2",
      type: "bank",
      name: "국민은행",
      lastFour: "7890",
      isDefault: false
    }
  ]);

  // 알림 설정 상태 관리
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    push: true,
    sms: false,
    newsletter: false
  });

  // 보안 설정 상태 관리
  const [securitySettings, setSecuritySettings] = useState({
    twoFactor: false,
    sessionTimeout: 30,
    rememberDevices: true
  });

  // 프로필 정보 수정 저장
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editedProfile, setEditedProfile] = useState<UserProfile>({...userProfile});
  
  // 프로필 편집 저장
  const saveProfileChanges = () => {
    setUserProfile(editedProfile);
    setIsEditingProfile(false);
    // 여기에 저장 API 호출 코드 추가
    showSaveSuccess("프로필");
  };

  // 프로필 편집 취소
  const cancelProfileEdit = () => {
    setEditedProfile({...userProfile});
    setIsEditingProfile(false);
  };

  // 결제수단 삭제
  const removePaymentMethod = (id: string) => {
    setPaymentMethods(paymentMethods.filter(method => method.id !== id));
    // 여기에 삭제 API 호출 코드 추가
  };

  // 기본 결제수단으로 설정
  const setDefaultPaymentMethod = (id: string) => {
    setPaymentMethods(paymentMethods.map(method => ({
      ...method,
      isDefault: method.id === id
    })));
    // 여기에 기본 설정 API 호출 코드 추가
    showSaveSuccess("결제수단");
  };

  // 알림 설정 변경
  const toggleNotificationSetting = (key: keyof typeof notificationSettings) => {
    setNotificationSettings({
      ...notificationSettings,
      [key]: !notificationSettings[key]
    });
    // 여기에 알림 설정 변경 API 호출 코드 추가
    showSaveSuccess("알림 설정");
  };

  // 보안 설정 변경
  const updateSecuritySetting = (key: keyof typeof securitySettings, value: any) => {
    setSecuritySettings({
      ...securitySettings,
      [key]: value
    });
    // 여기에 보안 설정 변경 API 호출 코드 추가
    showSaveSuccess("보안 설정");
  };

  // 저장 성공 메시지 상태
  const [saveSuccess, setSaveSuccess] = useState({
    show: false,
    message: ""
  });

  // 저장 성공 메시지 표시
  const showSaveSuccess = (type: string) => {
    setSaveSuccess({
      show: true,
      message: `${type} 정보가 성공적으로 저장되었습니다.`
    });
    setTimeout(() => {
      setSaveSuccess({
        show: false,
        message: ""
      });
    }, 3000);
  };

  // 탭 아이템 정의
  const tabItems = [
    { id: "profile", icon: <FiUser />, label: "프로필" },
    { id: "payment", icon: <FiCreditCard />, label: "결제 정보" },
    { id: "notifications", icon: <FiBell />, label: "알림" },
    { id: "security", icon: <FiShield />, label: "보안" },
    { id: "help", icon: <FiHelpCircle />, label: "도움말" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">설정</h1>
          <p className="text-gray-600 mt-2">계정 설정을 관리하고 개인 정보를 업데이트하세요.</p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* 사이드바 탭 네비게이션 */}
          <div className="w-full md:w-64 shrink-0">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden sticky top-6">
              <nav className="flex flex-col">
                {tabItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center gap-3 px-6 py-4 border-l-4 transition-all ${
                      activeTab === item.id 
                        ? "border-blue-500 bg-blue-50 text-blue-600" 
                        : "border-transparent hover:bg-gray-50"
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* 콘텐츠 영역 */}
          <div className="flex-1">
            {/* 저장 성공 메시지 */}
            {saveSuccess.show && (
              <div className="fixed top-24 right-6 bg-green-50 border border-green-200 text-green-700 px-6 py-3 rounded-lg flex items-center shadow-md animate-fade-in z-50">
                <FiCheck className="mr-3 text-xl text-green-500" />
                <span className="font-medium">{saveSuccess.message}</span>
              </div>
            )}
            
            {/* 활성 탭 콘텐츠 */}
            <div className="bg-white rounded-xl shadow-sm">
              {/* 프로필 탭 */}
              {activeTab === "profile" && (
                <div className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 pb-4 border-b border-gray-100">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">사용자 프로필</h2>
                      <p className="text-gray-600 mt-1">개인 정보를 관리하고 업데이트하세요.</p>
                    </div>
                    
                    {!isEditingProfile ? (
                      <button 
                        className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-sm flex items-center"
                        onClick={() => setIsEditingProfile(true)}
                      >
                        <FiEdit2 className="mr-2" />
                        프로필 편집
                      </button>
                    ) : (
                      <div className="flex items-center space-x-3">
                        <button 
                          className="px-5 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors"
                          onClick={cancelProfileEdit}
                        >
                          취소
                        </button>
                        <button 
                          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-sm flex items-center"
                          onClick={saveProfileChanges}
                        >
                          <FiSave className="mr-2" />
                          변경사항 저장
                        </button>
                      </div>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-1">
                      <div className="flex flex-col items-center">
                        <div className="group relative w-40 h-40 rounded-full overflow-hidden mb-4 border-4 border-gray-100 shadow-sm">
                          <img 
                            src={userProfile.profileImage || "https://i.pravatar.cc/300?img=default"} 
                            alt="프로필 이미지" 
                            className="w-full h-full object-cover" 
                          />
                          {isEditingProfile && (
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                              <div className="text-white flex flex-col items-center gap-2">
                                <FiCamera className="text-3xl" />
                                <span className="text-sm">이미지 변경</span>
                              </div>
                            </div>
                          )}
                        </div>
                        {!isEditingProfile && (
                          <h3 className="text-lg font-bold text-center">{userProfile.name}</h3>
                        )}
                      </div>
                    </div>
                    
                    <div className="md:col-span-2">
                      <div className="space-y-6">
                        <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                          <h3 className="font-semibold text-gray-700 mb-4 flex items-center">
                            <FiUser className="mr-2 text-blue-500" />
                            기본 정보
                          </h3>
                          
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">이름</label>
                              {isEditingProfile ? (
                                <input 
                                  type="text" 
                                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" 
                                  value={editedProfile.name}
                                  onChange={(e) => setEditedProfile({...editedProfile, name: e.target.value})}
                                  title="사용자 이름"
                                />
                              ) : (
                                <div className="p-3 bg-white rounded-lg border border-gray-200">{userProfile.name}</div>
                              )}
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
                              {isEditingProfile ? (
                                <input 
                                  type="email" 
                                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" 
                                  value={editedProfile.email}
                                  onChange={(e) => setEditedProfile({...editedProfile, email: e.target.value})}
                                  title="사용자 이메일"
                                />
                              ) : (
                                <div className="p-3 bg-white rounded-lg border border-gray-200">{userProfile.email}</div>
                              )}
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="phone-input">전화번호</label>
                              {isEditingProfile ? (
                                <input 
                                  id="phone-input"
                                  type="tel" 
                                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" 
                                  value={editedProfile.phone}
                                  onChange={(e) => setEditedProfile({...editedProfile, phone: e.target.value})}
                                  aria-label="전화번호"
                                  title="전화번호"
                                />
                              ) : (
                                <div className="p-3 bg-white rounded-lg border border-gray-200">{userProfile.phone}</div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* 계정 정보 */}
                        <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                          <h3 className="font-semibold text-gray-700 mb-4 flex items-center">
                            <FiInfo className="mr-2 text-blue-500" />
                            계정 정보
                          </h3>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center py-2">
                              <span className="text-gray-600">회원 가입일</span>
                              <span className="font-medium">2023년 5월 15일</span>
                            </div>
                            <div className="flex justify-between items-center py-2">
                              <span className="text-gray-600">마지막 로그인</span>
                              <span className="font-medium">2023년 8월 12일</span>
                            </div>
                            <div className="flex justify-between items-center py-2">
                              <span className="text-gray-600">계정 상태</span>
                              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">활성</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 결제 정보 탭 */}
              {activeTab === "payment" && (
                <div className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 pb-4 border-b border-gray-100">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">결제 정보</h2>
                      <p className="text-gray-600 mt-1">구독 결제에 사용할 결제 수단을 관리하세요.</p>
                    </div>
                    <button 
                      className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-sm flex items-center"
                    >
                      <FiPlusCircle className="mr-2" />
                      새 결제 수단 추가
                    </button>
                  </div>
                  
                  <div className="space-y-8">
                    {/* 결제 수단 섹션 */}
                    <div>
                      <h3 className="text-xl font-semibold mb-4 text-gray-900">등록된 결제 수단</h3>
                      
                      {paymentMethods.length > 0 ? (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          {paymentMethods.map((method) => (
                            <div 
                              key={method.id} 
                              className={`relative rounded-xl p-6 transition-all ${
                                method.isDefault 
                                  ? 'border-2 border-blue-500 bg-blue-50' 
                                  : 'border border-gray-200 hover:border-gray-300 bg-white'
                              }`}
                            >
                              {method.isDefault && (
                                <span className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                                  기본 결제 수단
                                </span>
                              )}
                              
                              <div className="flex items-start">
                                {method.type === "credit" ? (
                                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mr-4 shadow-sm">
                                    <FiCreditCard className="text-white text-xl" />
                                  </div>
                                ) : (
                                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mr-4 shadow-sm">
                                    <FiCreditCard className="text-white text-xl" />
                                  </div>
                                )}
                                
                                <div className="flex-1">
                                  <div className="flex justify-between">
                                    <div>
                                      <h4 className="font-semibold text-lg text-gray-900">{method.name}</h4>
                                      <p className="text-gray-600">
                                        {method.type === "credit" ? "신용카드" : "계좌"} •••• {method.lastFour}
                                        {method.expiryDate && <span className="ml-2">• 유효기간: {method.expiryDate}</span>}
                                      </p>
                                    </div>
                                  </div>
                                  
                                  <div className="mt-4 flex gap-2">
                                    {!method.isDefault && (
                                      <button 
                                        className="px-3 py-1.5 text-sm bg-white border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
                                        onClick={() => setDefaultPaymentMethod(method.id)}
                                      >
                                        기본으로 설정
                                      </button>
                                    )}
                                    <button 
                                      className="px-3 py-1.5 text-sm bg-white border border-red-500 text-red-600 rounded-lg hover:bg-red-50 transition-colors font-medium"
                                      onClick={() => removePaymentMethod(method.id)}
                                    >
                                      삭제
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                          
                          {/* 새 결제 수단 추가 카드 */}
                          <div className="border border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center text-center h-full min-h-[180px] cursor-pointer hover:bg-gray-50 transition-colors">
                            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                              <FiPlusCircle className="text-blue-600 text-xl" />
                            </div>
                            <h4 className="font-semibold text-gray-900 mb-1">새 결제 수단 추가</h4>
                            <p className="text-gray-600 text-sm">신용카드, 체크카드 또는 은행 계좌를 등록하세요.</p>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-10 bg-gray-50 rounded-xl border border-gray-200">
                          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mx-auto mb-4">
                            <FiCreditCard className="text-gray-500 text-2xl" />
                          </div>
                          <h3 className="text-lg font-medium text-gray-900 mb-2">등록된 결제 수단이 없습니다</h3>
                          <p className="text-gray-600 mb-6">구독 결제를 위해 결제 수단을 추가해 주세요.</p>
                          <button className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-sm">
                            결제 수단 추가
                          </button>
                        </div>
                      )}
                    </div>
                    
                    {/* 결제 내역 섹션 */}
                    <div className="border-t border-gray-200 pt-8">
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-semibold text-gray-900">최근 결제 내역</h3>
                        <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center">
                          전체보기 <FiChevronRight className="ml-1" />
                        </button>
                      </div>
                      
                      <div className="overflow-x-auto">
                        <table className="min-w-full border border-gray-200 rounded-lg">
                          <thead>
                            <tr className="bg-gray-50">
                              <th className="py-3 px-4 text-left font-medium text-gray-700">날짜</th>
                              <th className="py-3 px-4 text-left font-medium text-gray-700">항목</th>
                              <th className="py-3 px-4 text-left font-medium text-gray-700">금액</th>
                              <th className="py-3 px-4 text-left font-medium text-gray-700">상태</th>
                              <th className="py-3 px-4 text-left font-medium text-gray-700">영수증</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            <tr className="hover:bg-gray-50">
                              <td className="py-3 px-4 text-gray-900">2023-08-01</td>
                              <td className="py-3 px-4 text-gray-900">프리미엄 구독</td>
                              <td className="py-3 px-4 text-gray-900">₩15,000</td>
                              <td className="py-3 px-4">
                                <span className="bg-green-100 text-green-800 px-2.5 py-1 rounded-full text-xs font-medium">결제 완료</span>
                              </td>
                              <td className="py-3 px-4">
                                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">보기</button>
                              </td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                              <td className="py-3 px-4 text-gray-900">2023-07-01</td>
                              <td className="py-3 px-4 text-gray-900">프리미엄 구독</td>
                              <td className="py-3 px-4 text-gray-900">₩15,000</td>
                              <td className="py-3 px-4">
                                <span className="bg-green-100 text-green-800 px-2.5 py-1 rounded-full text-xs font-medium">결제 완료</span>
                              </td>
                              <td className="py-3 px-4">
                                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">보기</button>
                              </td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                              <td className="py-3 px-4 text-gray-900">2023-06-01</td>
                              <td className="py-3 px-4 text-gray-900">프리미엄 구독</td>
                              <td className="py-3 px-4 text-gray-900">₩15,000</td>
                              <td className="py-3 px-4">
                                <span className="bg-green-100 text-green-800 px-2.5 py-1 rounded-full text-xs font-medium">결제 완료</span>
                              </td>
                              <td className="py-3 px-4">
                                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">보기</button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 알림 탭 */}
              {activeTab === "notifications" && (
                <div className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 pb-4 border-b border-gray-100">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">알림 설정</h2>
                      <p className="text-gray-600 mt-1">알림 수신 방법과 종류를 설정하세요.</p>
                    </div>
                  </div>
                  
                  <div className="space-y-8">
                    {/* 알림 채널 설정 */}
                    <div>
                      <h3 className="text-xl font-semibold mb-4 text-gray-900">알림 채널</h3>
                      <p className="text-gray-600 mb-6">알림을 받을 방법을 선택해 주세요.</p>
                      
                      <div className="space-y-4">
                        <div className="bg-white rounded-xl border border-gray-200 p-5 transition-all hover:shadow-sm">
                          <div className="flex items-center justify-between">
                            <div className="flex items-start gap-4">
                              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                <FiMail className="text-blue-600" />
                              </div>
                              <div>
                                <h4 className="text-lg font-medium text-gray-900">이메일 알림</h4>
                                <p className="text-gray-600 mt-1">새로운 구독 알림, 결제 영수증, 보안 알림 등을 이메일로 받습니다.</p>
                              </div>
                            </div>
                            
                            <label className="relative inline-flex items-center cursor-pointer" htmlFor="email-notification">
                              <input 
                                id="email-notification"
                                type="checkbox" 
                                className="sr-only peer" 
                                checked={notificationSettings.email}
                                onChange={() => toggleNotificationSetting('email')}
                                aria-label="이메일 알림 사용"
                              />
                              <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                          </div>
                          
                          {notificationSettings.email && (
                            <div className="mt-4 pt-4 border-t border-gray-100">
                              <p className="text-sm text-gray-600 mb-2">이메일 수신 주소: {userProfile.email}</p>
                              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                                이메일 주소 변경
                              </button>
                            </div>
                          )}
                        </div>
                        
                        <div className="bg-white rounded-xl border border-gray-200 p-5 transition-all hover:shadow-sm">
                          <div className="flex items-center justify-between">
                            <div className="flex items-start gap-4">
                              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                                <FiBell className="text-purple-600" />
                              </div>
                              <div>
                                <h4 className="text-lg font-medium text-gray-900">푸시 알림</h4>
                                <p className="text-gray-600 mt-1">웹 및 모바일 앱에서 푸시 알림을 받습니다.</p>
                              </div>
                            </div>
                            
                            <label className="relative inline-flex items-center cursor-pointer" htmlFor="push-notification">
                              <input 
                                id="push-notification"
                                type="checkbox" 
                                className="sr-only peer" 
                                checked={notificationSettings.push}
                                onChange={() => toggleNotificationSetting('push')}
                                aria-label="푸시 알림 사용"
                              />
                              <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                          </div>
                          
                          {notificationSettings.push && (
                            <div className="mt-4 pt-4 border-t border-gray-100">
                              <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-lg p-4 flex items-start gap-3">
                                <FiAlertCircle className="text-yellow-500 text-lg flex-shrink-0 mt-0.5" />
                                <div>
                                  <p className="text-sm font-medium">브라우저 알림 권한 필요</p>
                                  <p className="text-sm mt-1">푸시 알림을 받으려면 브라우저 알림 권한을 허용해 주세요.</p>
                                  <button className="mt-2 text-sm bg-yellow-600 text-white px-3 py-1 rounded-md hover:bg-yellow-700 transition-colors">
                                    알림 권한 허용
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                        
                        <div className="bg-white rounded-xl border border-gray-200 p-5 transition-all hover:shadow-sm">
                          <div className="flex items-center justify-between">
                            <div className="flex items-start gap-4">
                              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                                <FiPhone className="text-green-600" />
                              </div>
                              <div>
                                <h4 className="text-lg font-medium text-gray-900">SMS 알림</h4>
                                <p className="text-gray-600 mt-1">중요한 알림을 SMS로 받습니다. 문자 메시지 요금이 부과될 수 있습니다.</p>
                              </div>
                            </div>
                            
                            <label className="relative inline-flex items-center cursor-pointer" htmlFor="sms-notification">
                              <input 
                                id="sms-notification"
                                type="checkbox" 
                                className="sr-only peer" 
                                checked={notificationSettings.sms}
                                onChange={() => toggleNotificationSetting('sms')}
                                aria-label="SMS 알림 사용"
                              />
                              <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                          </div>
                          
                          {notificationSettings.sms && (
                            <div className="mt-4 pt-4 border-t border-gray-100">
                              <p className="text-sm text-gray-600 mb-2">SMS 수신 번호: {userProfile.phone}</p>
                              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                                전화번호 변경
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* 알림 유형 설정 */}
                    <div className="border-t border-gray-200 pt-8">
                      <h3 className="text-xl font-semibold mb-4 text-gray-900">알림 유형</h3>
                      <p className="text-gray-600 mb-6">알림을 받고 싶은 정보 유형을 선택하세요.</p>
                      
                      <div className="space-y-4">
                        <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-sm transition-all">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium text-gray-900">구독 알림</h4>
                              <p className="text-gray-600 text-sm mt-1">구독 갱신, 만료 알림, 요금 변경 등</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input 
                                type="checkbox" 
                                className="sr-only peer" 
                                checked={true}
                                onChange={() => {}}
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                          </div>
                        </div>
                        
                        <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-sm transition-all">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium text-gray-900">결제 알림</h4>
                              <p className="text-gray-600 text-sm mt-1">결제 성공, 실패, 영수증 등</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input 
                                type="checkbox" 
                                className="sr-only peer" 
                                checked={true}
                                onChange={() => {}}
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                          </div>
                        </div>
                        
                        <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-sm transition-all">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium text-gray-900">보안 알림</h4>
                              <p className="text-gray-600 text-sm mt-1">로그인 시도, 비밀번호 변경, 계정 활동 등</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input 
                                type="checkbox" 
                                className="sr-only peer" 
                                checked={true}
                                onChange={() => {}}
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                          </div>
                        </div>
                        
                        <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-sm transition-all">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium text-gray-900">뉴스레터 및 마케팅</h4>
                              <p className="text-gray-600 text-sm mt-1">신규 기능, 프로모션, 이벤트 등</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input 
                                type="checkbox" 
                                className="sr-only peer" 
                                checked={notificationSettings.newsletter}
                                onChange={() => toggleNotificationSetting('newsletter')}
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 보안 탭 */}
              {activeTab === "security" && (
                <div className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 pb-4 border-b border-gray-100">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">보안 설정</h2>
                      <p className="text-gray-600 mt-1">계정 보안 설정을 관리하고 보안을 강화하세요.</p>
                    </div>
                  </div>
                  
                  <div className="space-y-8">
                    {/* 보안 점수 */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                      <h3 className="text-xl font-semibold mb-4 text-gray-900">보안 점수</h3>
                      
                      <div className="mb-6">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-700 font-medium">계정 보안 수준</span>
                          <span className="text-amber-600 font-bold">보통</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: '65%' }}></div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-sm">
                          <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                            <FiCheck className="text-green-600 text-xs" />
                          </div>
                          <span className="text-gray-700">강력한 비밀번호 사용 중</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center">
                            <FiCheck className="text-red-600 text-xs" />
                          </div>
                          <span className="text-gray-700">이중 인증 미설정</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center">
                            <FiCheck className="text-amber-600 text-xs" />
                          </div>
                          <span className="text-gray-700">최근 로그인 기록 확인 필요</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* 비밀번호 설정 */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                          <FiLock className="text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900">비밀번호 관리</h3>
                              <p className="text-gray-600 text-sm">마지막 변경일: 3개월 전</p>
                            </div>
                            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-sm text-sm">
                              비밀번호 변경
                            </button>
                          </div>
                          
                          <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <p className="text-sm text-blue-800">
                              <span className="font-medium">보안 팁:</span> 비밀번호는 정기적으로 변경하고, 타 서비스와 다른 비밀번호를 사용하는 것이 좋습니다.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* 이중 인증 */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                          <FiShield className="text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900">이중 인증 (2FA)</h3>
                              <p className="text-gray-600 text-sm">로그인 시 추가 인증 단계를 통해 보안을 강화합니다.</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer" htmlFor="two-factor">
                              <input 
                                id="two-factor"
                                type="checkbox" 
                                className="sr-only peer" 
                                checked={securitySettings.twoFactor}
                                onChange={() => updateSecuritySetting('twoFactor', !securitySettings.twoFactor)}
                                aria-label="이중 인증 사용"
                              />
                              <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                          </div>
                          
                          {!securitySettings.twoFactor && (
                            <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                              <p className="text-sm text-yellow-800">
                                <FiAlertCircle className="inline-block mr-2" />
                                <span className="font-medium">추천:</span> 이중 인증을 활성화하여 계정 보안을 강화하세요.
                              </p>
                            </div>
                          )}
                          
                          {securitySettings.twoFactor && (
                            <div className="mt-4 space-y-4">
                              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                <p className="text-sm text-green-800 flex items-center">
                                  <FiCheck className="mr-2" />
                                  이중 인증이 활성화되었습니다.
                                </p>
                              </div>
                              
                              <div className="border border-gray-200 rounded-lg p-4">
                                <h4 className="font-medium text-gray-900 mb-2">인증 방식</h4>
                                <div className="space-y-2">
                                  <label className="flex items-center space-x-3">
                                    <input type="radio" name="auth-method" checked className="w-4 h-4 text-blue-600" />
                                    <span className="text-gray-800">SMS 인증</span>
                                  </label>
                                  <label className="flex items-center space-x-3">
                                    <input type="radio" name="auth-method" className="w-4 h-4 text-blue-600" />
                                    <span className="text-gray-800">인증 앱 (Google Authenticator, Microsoft Authenticator 등)</span>
                                  </label>
                                  <label className="flex items-center space-x-3">
                                    <input type="radio" name="auth-method" className="w-4 h-4 text-blue-600" />
                                    <span className="text-gray-800">이메일 인증</span>
                                  </label>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* 세션 관리 */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                          <FiLock className="text-green-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">세션 관리</h3>
                          
                          <div className="space-y-6">
                            <div>
                              <label className="block text-gray-700 font-medium mb-2" htmlFor="session-timeout">세션 타임아웃</label>
                              <p className="text-gray-600 text-sm mb-3">비활성 상태일 때 자동 로그아웃되는 시간을 설정합니다.</p>
                              <select 
                                id="session-timeout"
                                className="w-full md:w-72 p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                value={securitySettings.sessionTimeout}
                                onChange={(e) => updateSecuritySetting('sessionTimeout', parseInt(e.target.value))}
                              >
                                <option value={15}>15분</option>
                                <option value={30}>30분</option>
                                <option value={60}>1시간</option>
                                <option value={120}>2시간</option>
                              </select>
                            </div>
                            
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <label className="block text-gray-700 font-medium" htmlFor="remember-devices">기기 기억</label>
                                <label className="relative inline-flex items-center cursor-pointer" htmlFor="remember-devices">
                                  <input 
                                    id="remember-devices"
                                    type="checkbox" 
                                    className="sr-only peer" 
                                    checked={securitySettings.rememberDevices}
                                    onChange={() => updateSecuritySetting('rememberDevices', !securitySettings.rememberDevices)}
                                  />
                                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                </label>
                              </div>
                              <p className="text-gray-600 text-sm">신뢰할 수 있는 기기를 기억하여 로그인을 더 편리하게 합니다.</p>
                            </div>
                            
                            <div>
                              <h4 className="font-medium text-gray-900 mb-3">활성 세션</h4>
                              <div className="border border-gray-200 rounded-lg overflow-hidden">
                                <div className="p-4 bg-white border-b border-gray-200">
                                  <div className="flex justify-between items-center">
                                    <div>
                                      <p className="font-medium text-gray-900">현재 기기 (Windows)</p>
                                      <p className="text-xs text-gray-600 mt-1">IP: 192.168.1.1 • 마지막 활동: 방금 전</p>
                                    </div>
                                    <span className="bg-green-100 text-green-800 px-2.5 py-1 rounded-full text-xs font-medium">현재 세션</span>
                                  </div>
                                </div>
                                <div className="p-4 bg-white border-b border-gray-200">
                                  <div className="flex justify-between items-center">
                                    <div>
                                      <p className="font-medium text-gray-900">iPhone 13 (iOS 15)</p>
                                      <p className="text-xs text-gray-600 mt-1">IP: 211.45.xx.xx • 마지막 활동: 2일 전</p>
                                    </div>
                                    <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                                      로그아웃
                                    </button>
                                  </div>
                                </div>
                                <div className="p-4 bg-white">
                                  <div className="flex justify-between items-center">
                                    <div>
                                      <p className="font-medium text-gray-900">MacBook Pro (macOS)</p>
                                      <p className="text-xs text-gray-600 mt-1">IP: 172.16.xx.xx • 마지막 활동: 5일 전</p>
                                    </div>
                                    <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                                      로그아웃
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <div className="mt-3">
                                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                                  모든 기기에서 로그아웃
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* 로그인 기록 */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">로그인 기록</h3>
                      <p className="text-gray-600 text-sm mb-6">최근 로그인 시도 및 활동을 확인하세요.</p>
                      
                      <div className="overflow-x-auto">
                        <table className="min-w-full border border-gray-200 rounded-lg">
                          <thead>
                            <tr className="bg-gray-50">
                              <th className="py-3 px-4 text-left font-medium text-gray-700">날짜/시간</th>
                              <th className="py-3 px-4 text-left font-medium text-gray-700">기기</th>
                              <th className="py-3 px-4 text-left font-medium text-gray-700">IP 주소</th>
                              <th className="py-3 px-4 text-left font-medium text-gray-700">상태</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            <tr className="hover:bg-gray-50">
                              <td className="py-3 px-4 text-gray-900">2023-08-15 14:23</td>
                              <td className="py-3 px-4 text-gray-900">Windows</td>
                              <td className="py-3 px-4 text-gray-900">192.168.1.1</td>
                              <td className="py-3 px-4">
                                <span className="bg-green-100 text-green-800 px-2.5 py-1 rounded-full text-xs font-medium">성공</span>
                              </td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                              <td className="py-3 px-4 text-gray-900">2023-08-13 09:45</td>
                              <td className="py-3 px-4 text-gray-900">iPhone</td>
                              <td className="py-3 px-4 text-gray-900">211.45.xx.xx</td>
                              <td className="py-3 px-4">
                                <span className="bg-green-100 text-green-800 px-2.5 py-1 rounded-full text-xs font-medium">성공</span>
                              </td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                              <td className="py-3 px-4 text-gray-900">2023-08-10 18:12</td>
                              <td className="py-3 px-4 text-gray-900">Unknown</td>
                              <td className="py-3 px-4 text-gray-900">45.123.xx.xx</td>
                              <td className="py-3 px-4">
                                <span className="bg-red-100 text-red-800 px-2.5 py-1 rounded-full text-xs font-medium">실패</span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="mt-4 text-right">
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                          전체 로그인 기록 보기
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 도움말 탭 */}
              {activeTab === "help" && (
                <div className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 pb-4 border-b border-gray-100">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">도움말 및 지원</h2>
                      <p className="text-gray-600 mt-1">자주 묻는 질문 확인 및 고객 지원 서비스 이용하기</p>
                    </div>
                    <a 
                      href="#"
                      className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-sm flex items-center"
                    >
                      <FiHelpCircle className="mr-2" />
                      지원 센터 방문
                    </a>
                  </div>
                  
                  <div className="space-y-8">
                    {/* 자주 묻는 질문 */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                      <h3 className="text-xl font-semibold mb-6 text-gray-900">자주 묻는 질문</h3>
                      
                      <div className="space-y-2">
                        <details className="group border border-gray-200 rounded-lg">
                          <summary className="flex justify-between items-center cursor-pointer p-4 bg-gray-50 rounded-lg group-open:rounded-b-none">
                            <span className="font-medium text-gray-900">구독을 취소하려면 어떻게 해야 하나요?</span>
                            <span className="transition-transform transform group-open:rotate-180">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                                <polyline points="6 9 12 15 18 9"></polyline>
                              </svg>
                            </span>
                          </summary>
                          <div className="p-4 border-t border-gray-200 text-gray-700">
                            <p>구독 취소는 다음과 같은 절차로 진행할 수 있습니다:</p>
                            <ol className="list-decimal ml-5 mt-2 space-y-1">
                              <li>대시보드에서 '구독 관리' 메뉴로 이동</li>
                              <li>현재 활성화된 구독 상세 페이지에서 '구독 취소' 버튼 클릭</li>
                              <li>취소 사유를 선택하고 확인</li>
                              <li>구독 취소 확인 이메일 수신 확인</li>
                            </ol>
                            <p className="mt-2 text-gray-600">구독 취소 후에도 결제 기간이 끝날 때까지 서비스는 계속 이용 가능합니다.</p>
                          </div>
                        </details>
                        
                        <details className="group border border-gray-200 rounded-lg">
                          <summary className="flex justify-between items-center cursor-pointer p-4 bg-gray-50 rounded-lg group-open:rounded-b-none">
                            <span className="font-medium text-gray-900">결제 방법을 변경할 수 있나요?</span>
                            <span className="transition-transform transform group-open:rotate-180">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                                <polyline points="6 9 12 15 18 9"></polyline>
                              </svg>
                            </span>
                          </summary>
                          <div className="p-4 border-t border-gray-200 text-gray-700">
                            <p>네, 언제든지 결제 방법을 변경할 수 있습니다. 설정 > 결제 정보 페이지에서 새로운 결제 수단을 추가하고 기본 결제 수단으로 설정하시면 됩니다.</p>
                            <p className="mt-2 text-gray-600">다음 정기 결제부터 새로운 결제 수단으로 청구됩니다.</p>
                          </div>
                        </details>
                        
                        <details className="group border border-gray-200 rounded-lg">
                          <summary className="flex justify-between items-center cursor-pointer p-4 bg-gray-50 rounded-lg group-open:rounded-b-none">
                            <span className="font-medium text-gray-900">팀원을 초대하려면 어떻게 해야 하나요?</span>
                            <span className="transition-transform transform group-open:rotate-180">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                                <polyline points="6 9 12 15 18 9"></polyline>
                              </svg>
                            </span>
                          </summary>
                          <div className="p-4 border-t border-gray-200 text-gray-700">
                            <p>팀원 초대 과정은 다음과 같습니다:</p>
                            <ol className="list-decimal ml-5 mt-2 space-y-1">
                              <li>대시보드에서 '팀 관리' 메뉴로 이동</li>
                              <li>'팀원 초대' 버튼 클릭</li>
                              <li>초대할 사용자의 이메일 주소 입력</li>
                              <li>적절한 권한 레벨 설정</li>
                              <li>초대장 발송</li>
                            </ol>
                            <p className="mt-2 text-gray-600">초대된 사용자는 이메일을 통해 초대를 수락하고 계정을 설정할 수 있습니다.</p>
                          </div>
                        </details>
                        
                        <details className="group border border-gray-200 rounded-lg">
                          <summary className="flex justify-between items-center cursor-pointer p-4 bg-gray-50 rounded-lg group-open:rounded-b-none">
                            <span className="font-medium text-gray-900">구독 정보를 확인하려면 어디로 가야 하나요?</span>
                            <span className="transition-transform transform group-open:rotate-180">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                                <polyline points="6 9 12 15 18 9"></polyline>
                              </svg>
                            </span>
                          </summary>
                          <div className="p-4 border-t border-gray-200 text-gray-700">
                            <p>구독 정보는 다음 경로에서 확인 가능합니다:</p>
                            <p className="mt-2">대시보드 > 구독 관리</p>
                            <p className="mt-2 text-gray-600">이곳에서 현재 구독 플랜, 결제 주기, 다음 결제일, 사용 중인 기능 등을 확인할 수 있습니다.</p>
                          </div>
                        </details>
                      </div>
                      
                      <div className="mt-6 text-center">
                        <a href="#" className="text-blue-600 hover:text-blue-700 font-medium flex items-center justify-center">
                          모든 FAQ 보기
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                          </svg>
                        </a>
                      </div>
                    </div>
                    
                    {/* 고객 지원 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-white rounded-xl border border-gray-200 p-6">
                        <h3 className="text-xl font-semibold mb-4 text-gray-900">고객 지원</h3>
                        <p className="text-gray-600 mb-6">도움이 필요하시면 아래 방법으로 문의해 주세요.</p>
                        
                        <div className="space-y-4">
                          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                              <FiMail className="text-blue-600" />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">이메일 지원</h4>
                              <p className="text-gray-600 text-sm">영업일 기준 24시간 이내 답변</p>
                              <a href="mailto:support@avensubs.com" className="text-blue-600 hover:text-blue-700 mt-1 inline-block font-medium">
                                support@avensubs.com
                              </a>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                              <FiPhone className="text-green-600" />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">전화 지원</h4>
                              <p className="text-gray-600 text-sm">평일 09:00-18:00 운영</p>
                              <a href="tel:0212345678" className="text-blue-600 hover:text-blue-700 mt-1 inline-block font-medium">
                                02-123-4567
                              </a>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600">
                                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                              </svg>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">라이브 채팅</h4>
                              <p className="text-gray-600 text-sm">실시간 문의 및 빠른 답변</p>
                              <button className="text-blue-600 hover:text-blue-700 mt-1 inline-block font-medium">
                                채팅 시작하기
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* 피드백 보내기 */}
                      <div className="bg-white rounded-xl border border-gray-200 p-6">
                        <h3 className="text-xl font-semibold mb-4 text-gray-900">피드백 보내기</h3>
                        <p className="text-gray-600 mb-6">서비스 개선을 위한 의견을 남겨주세요.</p>
                        
                        <div className="space-y-4">
                          <div>
                            <label htmlFor="feedback-category" className="block text-sm font-medium text-gray-700 mb-1">피드백 유형</label>
                            <select 
                              id="feedback-category" 
                              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                              <option value="">유형 선택</option>
                              <option value="suggestion">기능 제안</option>
                              <option value="bug">오류 신고</option>
                              <option value="compliment">칭찬</option>
                              <option value="other">기타</option>
                            </select>
                          </div>
                          
                          <div>
                            <label htmlFor="feedback-textarea" className="block text-sm font-medium text-gray-700 mb-1">피드백 내용</label>
                            <textarea 
                              id="feedback-textarea"
                              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                              rows={4} 
                              placeholder="서비스 개선을 위한 의견을 남겨주세요."
                              aria-label="피드백 내용"
                            ></textarea>
                          </div>
                          
                          <div className="flex items-center">
                            <input 
                              id="feedback-contact" 
                              type="checkbox" 
                              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <label htmlFor="feedback-contact" className="ml-2 text-sm text-gray-700">
                              피드백에 대한 답변을 받겠습니다.
                            </label>
                          </div>
                          
                          <div>
                            <button className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-sm w-full">
                              피드백 제출하기
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* 도움말 자료 */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                      <h3 className="text-xl font-semibold mb-6 text-gray-900">학습 자료</h3>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <a href="#" className="block group">
                          <div className="border border-gray-200 rounded-lg overflow-hidden group-hover:border-blue-500 transition-colors">
                            <div className="h-40 bg-gray-100 flex items-center justify-center">
                              <img src="https://via.placeholder.com/300x200/f3f4f6/5c93bb?text=사용자+가이드" alt="사용자 가이드" className="w-full h-full object-cover" />
                            </div>
                            <div className="p-4">
                              <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">사용자 가이드</h4>
                              <p className="text-gray-600 text-sm mt-1">AvenSubs의 기본적인 사용 방법을 알아보세요.</p>
                            </div>
                          </div>
                        </a>
                        
                        <a href="#" className="block group">
                          <div className="border border-gray-200 rounded-lg overflow-hidden group-hover:border-blue-500 transition-colors">
                            <div className="h-40 bg-gray-100 flex items-center justify-center">
                              <img src="https://via.placeholder.com/300x200/f3f4f6/5c93bb?text=동영상+튜토리얼" alt="동영상 튜토리얼" className="w-full h-full object-cover" />
                            </div>
                            <div className="p-4">
                              <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">동영상 튜토리얼</h4>
                              <p className="text-gray-600 text-sm mt-1">단계별 영상으로 서비스 사용법을 배우세요.</p>
                            </div>
                          </div>
                        </a>
                        
                        <a href="#" className="block group">
                          <div className="border border-gray-200 rounded-lg overflow-hidden group-hover:border-blue-500 transition-colors">
                            <div className="h-40 bg-gray-100 flex items-center justify-center">
                              <img src="https://via.placeholder.com/300x200/f3f4f6/5c93bb?text=API+문서" alt="API 문서" className="w-full h-full object-cover" />
                            </div>
                            <div className="p-4">
                              <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">API 문서</h4>
                              <p className="text-gray-600 text-sm mt-1">개발자를 위한 API 연동 가이드와 문서입니다.</p>
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 