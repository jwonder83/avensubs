"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = "/test";
  
  return (
    <>
      {/* 헤더 */}
      <header>
        <div>
          <nav>
            {[
              { name: "메뉴1", href: "/menu1" },
              { name: "메뉴2", href: "/menu2" }
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          
          {/* 고객지원 메뉴 */}
          <div>
            <h3>고객지원</h3>
            <div>
              {[
                { name: "공지사항", href: "/notice", icon: "📢" },
                { name: "FAQ", href: "/faq", icon: "❓" }
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                >
                  {item.icon} {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </header>
      
      <main>{children}</main>
    </>
  );
} 