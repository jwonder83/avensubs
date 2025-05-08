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
        </div>
      </header>
      {/* Rest of the component code */}
    </>
  );
}
