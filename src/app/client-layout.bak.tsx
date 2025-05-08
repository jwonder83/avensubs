"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { RiMenuLine, RiCloseLine, RiLogoutBoxLine, RiUserLine, RiNotification3Line } from "react-icons/ri";
import Image from "next/image";
import BottomNavigation from "@/components/navigation/BottomNavigation";
import { useAuth } from "@/context/AuthContext";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, signOut, isLoading } = useAuth();
  const router = useRouter();

  // 모바일 메뉴가 열려있을 때 스크롤 방지
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  // 경로 변경시 모바일 메뉴 닫기
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsMenuOpen(false);
      router.push('/');
    } catch (error) {
      console.error('로그아웃 오류:', error);
    }
  };

  // 모바일 메뉴 부분에서 user 상태에 따라 로그인/회원가입 또는 프로필/로그아웃 메뉴를 표시
  const renderMobileMenuItems = () => {
    if (isLoading) return null;
    
    if (user) {
      return (
        <>
          <Link
            href="/profile"
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              pathname === "/profile"
                ? "bg-blue-50 text-blue-600"
                : "text-gray-800 hover:bg-gray-50"
            }`}
          >
            프로필
          </Link>
          <div className="px-3 py-2 text-sm font-medium text-gray-800">
            {user.email}
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-800 hover:bg-gray-50"
          >
            <RiLogoutBoxLine className="mr-2" />
            로그아웃
          </button>
        </>
      );
    }
    
    return (
      <>
        <Link
          href="/login"
          className={`px-3 py-2 rounded-md text-sm font-medium ${
            pathname === "/login"
              ? "bg-blue-50 text-blue-600"
              : "text-gray-800 hover:bg-gray-50"
          }`}
        >
          로그인
        </Link>
        <Link
          href="/signup"
          className={`px-3 py-2 rounded-md text-sm font-medium ${
            pathname === "/signup"
              ? "bg-blue-50 text-blue-600"
              : "text-gray-800 hover:bg-gray-50"
          }`}
        >
          회원가입
        </Link>
      </>
    );
  };

  return (
    <>
      {/* 헤더 */}
      <header className="fixed w-full top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="container mx-auto flex items-center justify-between h-16 px-4 md:px-6">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-indigo-200 transition-all">
                <img 
                  alt="AvenSubs 로고" 
                  loading="lazy" 
                  width="24" 
                  height="24" 
                  decoding="async" 
                  src="/logo-ocean.svg"
                  className=""
                />
              </div>
              <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600 group-hover:from-indigo-600 group-hover:to-blue-600 transition-all">
                AvenSubs
              </span>
            </Link>
          </div>
          
          {/* 데스크톱 네비게이션 */}
          {user && (
            <nav className="hidden md:flex">
              {[
                { name: "대시보드", href: "/dashboard" },
                { name: "구독 관리", href: "/dashboard/subscriptions" },
                { name: "카드 관리", href: "/cards" },
                { name: "마켓플레이스", href: "/dashboard/marketplace" },
                { name: "인사이트", href: "/dashboard/insights" },
                { name: "팀 관리", href: "/dashboard/team" }
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition-colors relative mx-3 py-2 px-1 ${
                    pathname === item.href
                      ? "text-blue-600"
                      : "text-gray-600 hover:text-blue-600"
                  }`}
                >
                  {item.name}
                  {pathname === item.href && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"></span>
                  )}
                </Link>
              ))}
            </nav>
          )}
          
          {/* 데스크톱 우측 메뉴 */}
          <div className="flex items-center">
            {!isLoading && (
              <>
                {user ? (
                  <div className="hidden md:flex items-center space-x-1">
                    <Link
                      href="/dashboard/notifications"
                      className="text-sm font-medium text-gray-600 hover:text-blue-600 flex items-center mr-2 py-1.5 px-3 rounded-full hover:bg-blue-50 transition-colors"
                      aria-label="알림"
                    >
                      <RiNotification3Line className="text-xl" />
                    </Link>
                    <Link
                      href="/profile"
                      className="text-sm font-medium text-gray-600 hover:text-blue-600 flex items-center mr-2 py-1.5 px-3 rounded-full hover:bg-blue-50 transition-colors"
                    >
                      <RiUserLine className="mr-1.5" />
                      프로필
                    </Link>
                    
                    <button 
                      onClick={handleSignOut}
                      className="text-sm font-medium text-gray-600 hover:text-blue-600 flex items-center py-1.5 px-3 rounded-full hover:bg-blue-50 transition-colors"
                    >
                      <RiLogoutBoxLine className="mr-1.5" />
                      로그아웃
                    </button>
                  </div>
                ) : (
                  <div className="hidden md:flex items-center space-x-2">
                    <Link
                      href="/login"
                      className="text-sm font-medium text-gray-600 hover:text-blue-600 py-1.5 px-3 rounded-full hover:bg-blue-50 transition-colors"
                    >
                      로그인
                    </Link>
                    <Link
                      href="/signup"
                      className="text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 py-1.5 px-4 rounded-full transition-colors"
                    >
                      회원가입
                    </Link>
                  </div>
                )}
              </>
            )}
            
            {/* 모바일 우측 메뉴 */}
            <div className="flex md:hidden items-center">
              {user && (
                <Link
                  href="/dashboard/notifications"
                  className="text-gray-700 p-1.5 ml-2"
                  aria-label="알림"
                >
                  <RiNotification3Line className="h-6 w-6" />
                </Link>
              )}
              
              {/* 모바일 메뉴 버튼 */}
              <button 
                type="button" 
                className="inline-flex md:hidden items-center justify-center rounded-md text-gray-700 p-1.5 ml-2" 
                aria-label={isMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <RiCloseLine className="h-6 w-6" />
                ) : (
                  <RiMenuLine className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* 모바일 메뉴 */}
        {isMenuOpen && (
          <div className="md:hidden fixed inset-0 top-16 z-40 bg-black/20 backdrop-blur-sm">
            <div className="bg-white rounded-t-none rounded-b-xl shadow-lg h-[calc(100vh-4rem)] overflow-y-auto pb-28 overscroll-contain">
              <div className="px-4 pt-4 space-y-6 pb-4">
                {user ? (
                  <>
                    {/* 프로필 정보 */}
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl mb-4">
                      <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white text-lg font-semibold">
                        {user.email?.charAt(0).toUpperCase() || "U"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-gray-900 truncate">{user.email}</h3>
                        <Link 
                          href="/profile" 
                          className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1 mt-1"
                        >
                          프로필 관리
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </Link>
                      </div>
                    </div>

                    {/* 주요 메뉴 */}
                    <div>
                      <h3 className="text-xs uppercase font-semibold text-gray-500 px-2 mb-2">메인 메뉴</h3>
                      <div className="grid grid-cols-2 gap-2">
                        <Link
                          href="/dashboard"
                          className={`flex flex-col items-center p-3 rounded-xl text-center ${
                            pathname === "/dashboard"
                              ? "bg-blue-50 text-blue-600 border border-blue-100"
                              : "bg-gray-50 text-gray-700 border border-gray-100 hover:bg-gray-100"
                          }`}
                        >
                          <svg className="w-6 h-6 mb-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 12L5 10M5 10L12 3L19 10M5 10V20C5 20.5523 5.44772 21 6 21H9M19 10L21 12M19 10V20C19 20.5523 18.5523 21 18 21H15M9 21C9.55228 21 10 20.5523 10 20V16C10 15.4477 10.4477 15 11 15H13C13.5523 15 14 15.4477 14 16V20C14 20.5523 14.4477 21 15 21M9 21H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <span className="text-sm font-medium">대시보드</span>
                        </Link>
                        
                        <Link
                          href="/dashboard/subscriptions"
                          className={`flex flex-col items-center p-3 rounded-xl text-center ${
                            pathname === "/dashboard/subscriptions"
                              ? "bg-blue-50 text-blue-600 border border-blue-100"
                              : "bg-gray-50 text-gray-700 border border-gray-100 hover:bg-gray-100"
                          }`}
                        >
                          <svg className="w-6 h-6 mb-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M3 10H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M7 15H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 15H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <span className="text-sm font-medium">구독 관리</span>
                        </Link>
                        
                        <Link
                          href="/cards"
                          className={`flex flex-col items-center p-3 rounded-xl text-center ${
                            pathname === "/cards"
                              ? "bg-blue-50 text-blue-600 border border-blue-100"
                              : "bg-gray-50 text-gray-700 border border-gray-100 hover:bg-gray-100"
                          }`}
                        >
                          <svg className="w-6 h-6 mb-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M2 10H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M7 15H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <span className="text-sm font-medium">카드 관리</span>
                        </Link>
                        
                        <Link
                          href="/dashboard/marketplace"
                          className={`flex flex-col items-center p-3 rounded-xl text-center ${
                            pathname === "/dashboard/marketplace"
                              ? "bg-blue-50 text-blue-600 border border-blue-100"
                              : "bg-gray-50 text-gray-700 border border-gray-100 hover:bg-gray-100"
                          }`}
                        >
                          <svg className="w-6 h-6 mb-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 2L5 2L5.66667 8M5.66667 8L7 18L19 18L20.3333 8L5.66667 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <circle cx="11" cy="22" r="1" stroke="currentColor" strokeWidth="2" />
                            <circle cx="17" cy="22" r="1" stroke="currentColor" strokeWidth="2" />
                          </svg>
                          <span className="text-sm font-medium">마켓플레이스</span>
                        </Link>
                      </div>
                    </div>
                    
                    {/* 부가 기능 */}
                    <div>
                      <h3 className="text-xs uppercase font-semibold text-gray-500 px-2 mb-2">부가 기능</h3>
                      <div className="space-y-2">
                        {[
                          { 
                            name: "인사이트", 
                            href: "/dashboard/insights",
                            icon: (
                              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 16V11M12 16V9M16 16V13M3 4H21V20H3V4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            )
                          },
                          { 
                            name: "팀 관리", 
                            href: "/dashboard/team",
                            icon: (
                              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M23 20.9999V18.9999C22.9993 18.1136 22.7044 17.2527 22.1614 16.5522C21.6184 15.8517 20.8581 15.3515 20 15.1299" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M16 3.12988C16.8604 3.35018 17.623 3.85058 18.1676 4.55219C18.7122 5.2538 19.0078 6.1167 19.0078 7.00488C19.0078 7.89305 18.7122 8.75596 18.1676 9.45757C17.623 10.1592 16.8604 10.6596 16 10.8799" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            )
                          },
                          { 
                            name: "알림", 
                            href: "/dashboard/notifications",
                            icon: (
                              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            ),
                            badge: 2
                          }
                        ].map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center justify-between p-3 rounded-xl ${
                              pathname === item.href
                                ? "bg-blue-50 text-blue-600 border border-blue-100"
                                : "bg-white text-gray-700 border border-gray-100 hover:bg-gray-50"
                            }`}
                          >
                            <div className="flex items-center">
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${
                                pathname === item.href ? "bg-blue-100" : "bg-gray-100"
                              }`}>
                                {item.icon}
                              </div>
                              <span className="text-sm font-medium">{item.name}</span>
                            </div>
                            {item.badge && (
                              <span className="px-2 py-1 bg-red-100 text-red-600 text-xs font-medium rounded-full">
                                {item.badge}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                    
                    {/* 계정 메뉴 */}
                    <div>
                      <h3 className="text-xs uppercase font-semibold text-gray-500 px-2 mb-2">계정</h3>
                      <div className="space-y-2">
                        <Link
                          href="/profile"
                          className="flex items-center p-3 rounded-xl bg-white text-gray-700 border border-gray-100 hover:bg-gray-50"
                        >
                          <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center mr-3">
                            <RiUserLine className="w-5 h-5" />
                          </div>
                          <span className="text-sm font-medium">프로필 설정</span>
                        </Link>
                        
                        <button
                          onClick={handleSignOut}
                          className="flex items-center w-full p-3 rounded-xl bg-white text-gray-700 border border-gray-100 hover:bg-gray-50"
                        >
                          <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center mr-3">
                            <RiLogoutBoxLine className="w-5 h-5" />
                          </div>
                          <span className="text-sm font-medium">로그아웃</span>
                        </button>
                      </div>
                    </div>
                    
                    {/* 고객지원 메뉴 */}
                    <div>
                      <h3 className="text-xs uppercase font-semibold text-gray-500 px-2 mb-2">고객지원</h3>
                      <div className="space-y-2">
                        {[
                          { 
                            name: "공지사항", 
                            href: "/notice",
                            icon: (
                              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.7 18.4L11.3 15.8L9 14L11.3 12.2L10.7 9.6L13.3 10.2L15.1 8L16.9 10.2L19.5 9.6L18.9 12.2L21 14L18.9 15.8L19.5 18.4L16.9 17.8L15 20L13.2 17.8L10.7 18.4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M5 19.5L5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M9 6.5H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M9 10H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            )
                          },
                          { 
                            name: "자주 묻는 질문", 
                            href: "/faq",
                            icon: (
                              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M9 9C9 5.5 14.5 5.5 14.5 9C14.5 11.5 12 11 12 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M12 18.01L12.01 17.9989" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            )
                          },
                          { 
                            name: "고객센터", 
                            href: "/support",
                            icon: (
                              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18.364 18.3639L21.5355 21.5354" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M12 14.5L15 11.5L11.5 7.99997L8.5 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M2 21.9999L5.5 21.9999L13.5556 13.9443C14.3556 13.1443 14.3556 11.8499 13.5556 11.0499L12.95 10.4443C12.15 9.64427 10.8556 9.64427 10.0556 10.4443L2 18.4999L2 21.9999Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M7.5 8.5C8.32843 8.5 9 7.82843 9 7C9 6.17157 8.32843 5.5 7.5 5.5C6.67157 5.5 6 6.17157 6 7C6 7.82843 6.67157 8.5 7.5 8.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M11 2.5L15.5 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M17.5 4.5L19.5 2.5L21.5 4.5L19.5 6.5L17.5 4.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            )
                          },
                          { 
                            name: "피드백", 
                            href: "/feedback",
                            icon: (
                              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 9.00005H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M8 13.0001H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M18 21.0001L14 17.0001H6C5.46957 17.0001 4.96086 16.7894 4.58579 16.4143C4.21071 16.0392 4 15.5305 4 15.0001V7.00005C4 6.46962 4.21071 5.96091 4.58579 5.58584C4.96086 5.21076 5.46957 5.00005 6 5.00005H18C18.5304 5.00005 19.0391 5.21076 19.4142 5.58584C19.7893 5.96091 20 6.46962 20 7.00005V15.0001C20 16.1001 19.1 17.0001 18 17.0001" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            )
                          }
                        ].map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center justify-between p-3 rounded-xl ${
                              pathname === item.href
                                ? "bg-blue-50 text-blue-600 border border-blue-100"
                                : "bg-white text-gray-700 border border-gray-100 hover:bg-gray-50"
                            }`}
                          >
                            <div className="flex items-center">
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${
                                pathname === item.href ? "bg-blue-100" : "bg-gray-100"
                              }`}>
                                {item.icon}
                              </div>
                              <span className="text-sm font-medium">{item.name}</span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex flex-col space-y-3 p-2">
                      <Link
                        href="/login"
                        className="flex items-center justify-center bg-blue-600 text-white py-3 px-4 rounded-xl font-medium hover:bg-blue-700 transition-colors"
                      >
                        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M15 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M10 17L15 12L10 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M15 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        로그인
                      </Link>
                      <Link
                        href="/signup"
                        className="flex items-center justify-center bg-white text-gray-700 py-3 px-4 rounded-xl font-medium border border-gray-200 hover:bg-gray-50 transition-colors"
                      >
                        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M8.5 11C10.7091 11 12.5 9.20914 12.5 7C12.5 4.79086 10.7091 3 8.5 3C6.29086 3 4.5 4.79086 4.5 7C4.5 9.20914 6.29086 11 8.5 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M17 11L23 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M23 11L17 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        회원가입
                      </Link>
                    </div>
                    
                    <div>
                      <h3 className="text-xs uppercase font-semibold text-gray-500 px-2 mb-2">둘러보기</h3>
                      <div className="space-y-2">
                        {[
                          { name: "홈", href: "/", icon: "🏠" },
                          { name: "서비스 소개", href: "/about", icon: "ℹ️" },
                          { name: "가격 정책", href: "/pricing", icon: "💰" },
                          { name: "공지사항", href: "/notice", icon: "📢" },
                          { name: "자주 묻는 질문", href: "/faq", icon: "❓" },
                          { name: "고객센터", href: "/support", icon: "🛟" },
                          { name: "피드백", href: "/feedback", icon: "💬" }
                        ].map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center p-3 rounded-xl ${
                              pathname === item.href
                                ? "bg-blue-50 text-blue-600 border border-blue-100"
                                : "bg-white text-gray-700 border border-gray-100 hover:bg-gray-50"
                            }`}
                          >
                            <span className="mr-3 text-lg">{item.icon}</span>
                            <span className="text-sm font-medium">{item.name}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </header>

        {/* 메인 콘텐츠 */}
        <main className="flex-1 pt-16 md:pt-20">
          {children}
        </main>

        {/* 모바일 하단 네비게이션 */}
        {user && <BottomNavigation />}

        {/* 푸터 */}
        <footer className="bg-white border-t border-gray-200 py-6 hidden md:block">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-sm text-gray-500 mb-4 md:mb-0">
                © 2023 AvenSubs. All rights reserved.
              </div>
              <div className="flex space-x-4">
                <Link
                  href="/terms"
                  className="text-xs text-gray-500 hover:text-gray-700"
                >
                  이용약관
                </Link>
                <Link
                  href="/privacy"
                  className="text-xs text-gray-500 hover:text-gray-700"
                >
                  개인정보처리방침
                </Link>
                <Link
                  href="/notice"
                  className="text-xs text-gray-500 hover:text-gray-700"
                >
                  공지사항
                </Link>
                <Link
                  href="/faq"
                  className="text-xs text-gray-500 hover:text-gray-700"
                >
                  자주 묻는 질문
                </Link>
                <Link
                  href="/support"
                  className="text-xs text-gray-500 hover:text-gray-700"
                >
                  고객센터
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </>
    );
} 