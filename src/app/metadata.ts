import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "어벤Subs - 구독/정기지출 통합관리",
  description: "사용자 정기지출 및 구독 내역을 자동으로 탐지하고, 정보 제공 및 관리 지원하는 앱입니다.",
  keywords: ["구독", "정기지출", "관리", "통합관리", "비용절감"],
  authors: [{ name: "AvenSubs Team" }],
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}; 