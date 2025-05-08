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
                {/* 사용자 프로필 정보 */}
                {!isLoading && user && (
                  <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl mb-4 border border-blue-100">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                      {user.email?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold text-gray-900 truncate">{user.email}</h3>
                      <p className="text-xs text-blue-600 truncate">프리미엄 구독 사용자</p>
                    </div>
                  </div>
                )}

                {/* 로그인 메뉴 (비로그인 시) */}
                {!isLoading && !user && (
                  <div className="flex flex-col gap-3 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl mb-4 border border-blue-100">
                    <h3 className="text-sm font-bold text-gray-900">로그인하여 모든 기능을 이용해보세요</h3>
                    <div className="flex gap-3">
                      <Link
                        href="/login"
                        className="flex-1 py-2.5 px-4 rounded-lg bg-blue-600 text-white text-sm font-medium text-center hover:bg-blue-700 transition"
                      >
                        로그인
                      </Link>
                      <Link
                        href="/signup"
                        className="flex-1 py-2.5 px-4 rounded-lg bg-white text-blue-600 text-sm font-medium text-center border border-blue-200 hover:bg-blue-50 transition"
                      >
                        회원가입
                      </Link>
                    </div>
                  </div>
                )}

                {/* 메인 메뉴 */}
                <div>
                  <h3 className="text-xs uppercase font-semibold text-gray-500 px-2 mb-3">메인 메뉴</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { 
                        name: "대시보드", 
                        href: "/dashboard",
                        icon: (
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="3" y="3" width="7" height="9" rx="1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <rect x="14" y="3" width="7" height="5" rx="1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <rect x="14" y="12" width="7" height="9" rx="1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <rect x="3" y="16" width="7" height="5" rx="1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )
                      },
                      { 
                        name: "구독 관리", 
                        href: "/dashboard/subscriptions",
                        icon: (
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21 4V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M18 7H21H18Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M3 12V18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M6 15H3H6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M17 20C18.6569 20 20 18.6569 20 17C20 15.3431 18.6569 14 17 14C15.3431 14 14 15.3431 14 17C14 18.6569 15.3431 20 17 20Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M7 8C8.65685 8 10 6.65685 10 5C10 3.34315 8.65685 2 7 2C5.34315 2 4 3.34315 4 5C4 6.65685 5.34315 8 7 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M17 9L7 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )
                      },
                      { 
                        name: "카드 관리", 
                        href: "/cards",
                        icon: (
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 10H23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M21 6V18C21 19.1046 20.1046 20 19 20H5C3.89543 20 3 19.1046 3 18V6C3 4.89543 3.89543 4 5 4H19C20.1046 4 21 4.89543 21 6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M7 15H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )
                      },
                      { 
                        name: "마켓플레이스", 
                        href: "/dashboard/marketplace",
                        icon: (
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )
                      }
                    ].map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex flex-col items-center justify-center p-4 rounded-xl ${
                          pathname === item.href || pathname.startsWith(item.href + "/")
                            ? "bg-blue-100 text-blue-700 border border-blue-200"
                            : "bg-gray-50 text-gray-700 border border-gray-100 hover:bg-gray-100"
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                          pathname === item.href || pathname.startsWith(item.href + "/") ? "bg-blue-200" : "bg-white"
                        }`}>
                          {item.icon}
                        </div>
                        <span className="text-sm font-medium">{item.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
                
                {/* 부가 기능 메뉴 */}
                <div>
                  <h3 className="text-xs uppercase font-semibold text-gray-500 px-2 mb-3">부가 기능</h3>
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
                        )
                      }
                    ].map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center p-3 rounded-xl ${
                          pathname === item.href || pathname.startsWith(item.href + "/")
                            ? "bg-blue-50 text-blue-600 border border-blue-100"
                            : "bg-white text-gray-700 border border-gray-100 hover:bg-gray-50"
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${
                          pathname === item.href || pathname.startsWith(item.href + "/") ? "bg-blue-100" : "bg-gray-100"
                        }`}>
                          {item.icon}
                        </div>
                        <span className="text-sm font-medium">{item.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
                
                {/* 고객지원 메뉴 */}
                <div>
                  <h3 className="text-xs uppercase font-semibold text-gray-500 px-2 mb-3">고객지원</h3>
                  <div className="space-y-2">
                    {[
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
                        <span className="mr-3 text-lg flex items-center justify-center w-8 h-8 bg-gray-100 rounded-lg">{item.icon}</span>
                        <span className="text-sm font-medium">{item.name}</span>
                    </Link>
                  ))}
                  </div>
                </div>

                {/* 계정 설정 및 로그아웃 */}
                {user && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="space-y-2">
                  <Link
                    href="/profile"
                        className="flex items-center p-3 rounded-xl bg-white text-gray-700 border border-gray-100 hover:bg-gray-50"
                      >
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center mr-3 bg-gray-100">
                          <RiUserLine className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-medium">내 프로필 관리</span>
                  </Link>
                  <button
                    onClick={handleSignOut}
                        className="w-full flex items-center p-3 rounded-xl bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100"
                      >
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center mr-3 bg-white">
                          <RiLogoutBoxLine className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-medium">로그아웃</span>
                  </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      <main className="pt-20 pb-24">
        {children}
      </main>

      <BottomNavigation />
    </>
  );
} 