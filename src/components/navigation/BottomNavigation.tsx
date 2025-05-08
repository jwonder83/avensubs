"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  CreditCard, 
  ShoppingCart, 
  LineChart, 
  Users, 
  CreditCard as CardIcon,
  Repeat
} from "lucide-react";

type NavItem = {
  icon: React.ReactNode;
  activeIcon: React.ReactNode;
  label: string;
  href: string;
};

const navItems: NavItem[] = [
  {
    icon: <LayoutDashboard className="w-6 h-6" />,
    activeIcon: <LayoutDashboard className="w-6 h-6 fill-current" />,
    label: "대시보드",
    href: "/dashboard",
  },
  {
    icon: <Repeat className="w-6 h-6" />,
    activeIcon: <Repeat className="w-6 h-6 fill-current" />,
    label: "구독 관리",
    href: "/dashboard/subscriptions",
  },
  {
    icon: <CardIcon className="w-6 h-6" />,
    activeIcon: <CardIcon className="w-6 h-6 fill-current" />,
    label: "카드 관리",
    href: "/cards",
  },
  {
    icon: <ShoppingCart className="w-6 h-6" />,
    activeIcon: <ShoppingCart className="w-6 h-6 fill-current" />,
    label: "마켓",
    href: "/dashboard/marketplace",
  },
];

export default function BottomNavigation() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 shadow-lg">
      <nav className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full transition-colors relative",
                isActive 
                  ? "text-blue-600 dark:text-blue-400" 
                  : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="bottomNavIndicator"
                  className="absolute top-0 w-12 h-1 bg-blue-600 dark:bg-blue-400 rounded-b-md"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              )}
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: isActive ? 1.1 : 1 }}
                transition={{ duration: 0.2 }}
                className="relative mb-1"
              >
                {isActive ? item.activeIcon : item.icon}
              </motion.div>
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
} 