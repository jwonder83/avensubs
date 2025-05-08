"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  CreditCard, 
  BarChart2, 
  ShoppingCart, 
  Users, 
  Settings,
  BellRing,
  User,
  LogOut,
  ChevronRight
} from "lucide-react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useState } from "react";

const mainNavItems = [
  { name: "대시보드", path: "/dashboard", icon: <LayoutDashboard size={18} />, color: "text-blue-600", bg: "bg-blue-100" },
  { name: "구독 관리", path: "/dashboard/subscriptions", icon: <CreditCard size={18} />, color: "text-purple-600", bg: "bg-purple-100" },
  { name: "마켓플레이스", path: "/dashboard/marketplace", icon: <ShoppingCart size={18} />, color: "text-emerald-600", bg: "bg-emerald-100" },
  { name: "인사이트", path: "/dashboard/insights", icon: <BarChart2 size={18} />, color: "text-amber-600", bg: "bg-amber-100" },
];

const utilityNavItems = [
  { name: "팀 관리", path: "/dashboard/team", icon: <Users size={18} />, color: "text-indigo-600", bg: "bg-indigo-100" },
  { name: "알림", path: "/dashboard/alerts", icon: <BellRing size={18} />, color: "text-red-600", bg: "bg-red-100" },
  { name: "설정", path: "/dashboard/settings", icon: <Settings size={18} />, color: "text-gray-600", bg: "bg-gray-100" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [email] = useState("jvic83@naver.com");

  // 로그아웃 핸들러
  const handleLogout = () => {
    // 로그아웃 로직 구현
    console.log("로그아웃");
  };

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-gray-50">
        {/* 사이드바 */}
        <aside className="w-64 bg-white border-r border-gray-200 hidden md:block shadow-sm">
          <div className="h-full flex flex-col">
            <div className="p-5 border-b border-gray-100">
              <Link href="/" className="flex items-center">
                <span className="text-xl font-bold text-indigo-600">어벤Subs</span>
                <span className="text-sm ml-2 px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-800 font-medium">Beta</span>
              </Link>
            </div>
            
            <div className="flex-1 py-6 flex flex-col justify-between overflow-y-auto custom-scrollbar">
              <div className="px-4 space-y-6">
                {/* 메인 네비게이션 */}
                <div>
                  <h3 className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    주요 메뉴
                  </h3>
                  <nav className="space-y-1">
                    {mainNavItems.map((item) => {
                      const isActive = pathname === item.path;
                      return (
                        <Link
                          key={item.path}
                          href={item.path}
                          className={`group flex items-center px-4 py-2.5 rounded-lg transition-all duration-200 ${
                            isActive 
                              ? "bg-indigo-50 text-indigo-700" 
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          <div className={`p-1.5 rounded-md mr-3 ${isActive ? item.bg : "bg-gray-100 group-hover:bg-gray-200"} ${isActive ? item.color : "text-gray-500"} transition-colors duration-200`}>
                            {item.icon}
                          </div>
                          <span className="font-medium text-sm">{item.name}</span>
                          {isActive && <ChevronRight className="h-4 w-4 ml-auto text-indigo-500" />}
                        </Link>
                      );
                    })}
                  </nav>
                </div>
                
                {/* 유틸리티 네비게이션 */}
                <div>
                  <h3 className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    설정 및 도구
                  </h3>
                  <nav className="space-y-1">
                    {utilityNavItems.map((item) => {
                      const isActive = pathname === item.path;
                      return (
                        <Link
                          key={item.path}
                          href={item.path}
                          className={`group flex items-center px-4 py-2.5 rounded-lg transition-all duration-200 ${
                            isActive 
                              ? "bg-indigo-50 text-indigo-700" 
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          <div className={`p-1.5 rounded-md mr-3 ${isActive ? item.bg : "bg-gray-100 group-hover:bg-gray-200"} ${isActive ? item.color : "text-gray-500"} transition-colors duration-200`}>
                            {item.icon}
                          </div>
                          <span className="font-medium text-sm">{item.name}</span>
                          {isActive && <ChevronRight className="h-4 w-4 ml-auto text-indigo-500" />}
                        </Link>
                      );
                    })}
                  </nav>
                </div>
              </div>
              
              {/* 프로필 및 로그아웃 */}
              <div className="px-4 mt-auto">
                <div className="pt-4 border-t border-gray-100">
                  <Link 
                    href="/profile"
                    className="group flex items-center p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 mb-2"
                  >
                    <div className="h-9 w-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-3">
                      <User size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">내 프로필</p>
                      <p className="text-xs text-gray-500 truncate">{email}</p>
                    </div>
                  </Link>
                  
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center px-4 py-2.5 mt-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-700 transition-colors duration-200"
                  >
                    <div className="p-1.5 rounded-md mr-3 bg-gray-100 text-gray-500 group-hover:bg-red-100 group-hover:text-red-600">
                      <LogOut size={18} />
                    </div>
                    <span>로그아웃</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* 메인 컨텐츠 */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* 페이지 내용 */}
          <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
} 