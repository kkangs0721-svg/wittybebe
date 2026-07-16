"use client";

import React, { useEffect, useRef, useState } from "react";
import { useCart } from "@/context/CartContext";
import { Search, X, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function SearchOverlay() {
  const { isSearchOpen, setSearchOpen } = useCart();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      inputRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const popularKeywords = ["등원룩", "실내복", "아기 여름옷", "여아 원피스", "남아 상하복", "신생아 바디수트"];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-sm transition-opacity duration-300">
      <div 
        className="bg-brand-bg w-full border-b border-brand-border px-4 py-8 md:px-12 animate-slide-down shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="max-w-4xl mx-auto">
          {/* Header & Input */}
          <div className="flex items-center justify-between gap-4 border-b border-brand-secondary/40 pb-4">
            <div className="flex items-center gap-3 flex-1">
              <Search className="w-6 h-6 text-brand-secondary" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="검색어를 입력해 주세요 (예: 등원룩, 원피스)"
                className="w-full text-lg md:text-xl bg-transparent border-none outline-none placeholder:text-brand-secondary/60 text-brand-text font-light"
              />
            </div>
            <button 
              onClick={() => setSearchOpen(false)}
              className="p-1 hover:bg-brand-primary/40 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-brand-text" />
            </button>
          </div>

          {/* Search Content */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Recent/Popular Keywords */}
            <div>
              <h4 className="text-sm font-semibold text-brand-text/60 tracking-wider mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" /> 인기 검색어
              </h4>
              <div className="flex flex-wrap gap-2">
                {popularKeywords.map((keyword) => (
                  <Link
                    key={keyword}
                    href={`/shop?search=${encodeURIComponent(keyword)}`}
                    onClick={() => setSearchOpen(false)}
                    className="px-4 py-2 bg-brand-primary/30 hover:bg-brand-primary/70 border border-brand-border text-brand-text text-sm rounded-full transition-all duration-200"
                  >
                    {keyword}
                  </Link>
                ))}
              </div>
            </div>

            {/* Visual Guide / Promotion */}
            <div className="hidden md:flex flex-col justify-center p-6 bg-brand-primary/20 rounded-2xl border border-brand-border/60">
              <span className="text-xs uppercase tracking-widest text-brand-point font-semibold mb-2">Witty Bébé Style</span>
              <p className="text-base text-brand-text font-medium leading-relaxed">
                아이의 특별한 날부터 편안한 데일리룩까지<br />
                스칸디나비아 감성의 등원룩 코디를 확인해보세요.
              </p>
              <Link
                href="/shop"
                onClick={() => setSearchOpen(false)}
                className="mt-4 text-xs font-bold text-brand-text hover:text-brand-point flex items-center gap-1 group transition-colors"
              >
                추천 코디 보러가기 <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background click to close */}
      <div className="w-full h-full" onClick={() => setSearchOpen(false)} />
    </div>
  );
}
