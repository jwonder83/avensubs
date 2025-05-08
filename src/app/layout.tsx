import "./globals.css";
import { Inter } from "next/font/google";
import { Metadata, Viewport } from "next";
import ClientLayout from "./client-layout";
import { AuthProvider } from "@/context/AuthContext";
import ToasterProvider from "@/components/providers/ToasterProvider";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Avensubs',
  description: '자막 번역 플랫폼',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body 
        className={`bg-[#f8f9fd] min-h-screen flex flex-col ${inter.className}`}
        suppressHydrationWarning
      >
        <AuthProvider>
          <ClientLayout>{children}</ClientLayout>
          <ToasterProvider />
        </AuthProvider>
      </body>
    </html>
  );
}
