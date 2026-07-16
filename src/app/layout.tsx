import type { Metadata, Viewport } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SearchOverlay from "@/components/SearchOverlay";
import LoginModal from "@/components/LoginModal";
import CartDrawer from "@/components/CartDrawer";

export const metadata: Metadata = {
  title: "위티베베 WITTY BÉBÉ | 아이의 하루를 더 사랑스럽게",
  description: "0~7세 영유아를 위한 감성 아동복 브랜드 위티베베. 스칸디나비아 디자인의 프리미엄 어린이집 등원룩, 베이비 실내복, 여아 원피스, 남아 상하복 판매.",
  keywords: [
    "아동복",
    "유아복",
    "아기옷",
    "어린이집 등원룩",
    "여아 원피스",
    "남아 상하복",
    "유아 실내복",
    "아기 여름옷",
    "형제룩",
    "자매룩",
    "북유럽 아동복"
  ],
  authors: [{ name: "WITTY BÉBÉ" }],
  openGraph: {
    title: "위티베베 WITTY BÉBÉ | 프리미엄 감성 아동복 브랜드",
    description: "아이의 하루를 더 사랑스럽게. 편안한 착용감과 내추럴한 감성의 스칸디나비아 데일리 아동복 브랜드 위티베베.",
    url: "https://wittybebe.com",
    siteName: "WITTY BÉBÉ",
    images: [
      {
        url: "https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=800&auto=format&fit=crop",
        width: 800,
        height: 600,
        alt: "WITTY BÉBÉ Scandinavian Kids Fashion",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "위티베베 WITTY BÉBÉ | 프리미엄 감성 아동복 브랜드",
    description: "0~7세 아이들을 위한 자연스러운 스칸디나비아 감성 데일리웨어.",
    images: ["https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=800&auto=format&fit=crop"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Schema.org Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Store",
    "name": "WITTY BÉBÉ (위티베베)",
    "description": "0~7세 영유아를 위한 프리미엄 스칸디나비아 감성 아동복 브랜드",
    "url": "https://wittybebe.com",
    "logo": "https://wittybebe.com/logo.png",
    "image": "https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=800&auto=format&fit=crop",
    "telephone": "1588-0000",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "테헤란로 123",
      "addressLocality": "강남구",
      "addressRegion": "서울특별시",
      "postalCode": "06123",
      "addressCountry": "KR"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "10:00",
      "closes": "17:00"
    },
    "sameAs": [
      "https://www.instagram.com/wittybebe"
    ]
  };

  return (
    <html lang="ko" className="h-full scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-brand-bg text-brand-text font-sans antialiased">
        <CartProvider>
          <Navigation />
          
          {/* Main page content area */}
          <main className="flex-1">
            {children}
          </main>
          
          <Footer />

          {/* Overlays / Modals */}
          <SearchOverlay />
          <LoginModal />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
