import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    disableStaticImages: true
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production"
  },
  // 개발 도구 관련 설정
  experimental: {
    // 더 이상 필요하지 않은 appDir 제거 (App Router가 기본이 됨)
    // 더 이상 지원되지 않는 enableDeploymentId 제거
  },
  // 터보팩 설정 - enabled 속성은 더 이상 사용되지 않음
  // Next.js 14부터는 --turbo 플래그로 대신 활성화
  logging: {
    fetches: {
      fullUrl: true
    }
  },
  reactStrictMode: true,
  // swcMinify는 더 이상 설정할 필요 없음 (기본값이 됨)
  // 개발 지표 설정 업데이트
  devIndicators: {
    // buildActivity 제거 (더 이상 구성 불가)
    position: 'bottom-right' // buildActivityPosition 대신 position 사용
  },
  // 개발 도구 비활성화
  crossOrigin: 'anonymous'
};

export default nextConfig;
