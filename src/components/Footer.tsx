"use client";

import React from "react";
import Link from "next/link";
import { MessageCircle, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-white border-t border-brand-border text-brand-text/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        
        {/* Footer Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <span className="text-xl font-bold tracking-widest text-brand-text font-serif">WITTY BÉBÉ</span>
            <p className="text-xs text-brand-secondary font-medium tracking-wide">
              "아이의 하루를 더 사랑스럽게"
            </p>
            <p className="text-xs text-brand-text/60 leading-relaxed">
              위티베베는 스칸디나비아 감성의 프리미엄 아동복 브랜드입니다. 편안한 착용감과 세련된 디자인으로 매일 입고 싶은 옷을 만듭니다.
            </p>
          </div>

          {/* Customer Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-text">고객센터</h4>
            <p className="text-lg font-bold text-brand-point">1588-0000</p>
            <p className="text-xs text-brand-text/60 leading-relaxed">
              오전 10:00 - 오후 5:00<br />
              점심시간 오후 12:00 - 오후 1:00<br />
              주말, 공휴일 휴무
            </p>
            <div className="flex gap-2 pt-1">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-brand-primary/20 hover:bg-brand-primary/50 text-brand-text rounded-full transition-colors flex items-center gap-1.5 text-xs font-medium"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg> 인스타그램
              </a>
              <a
                href="https://kakao.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-[#FEE500]/30 hover:bg-[#FEE500]/60 text-brand-text rounded-full transition-colors flex items-center gap-1.5 text-xs font-medium"
              >
                <MessageCircle className="w-3.5 h-3.5" /> 카카오톡 문의
              </a>
            </div>
          </div>

          {/* Quick Menu */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-text font-semibold">쇼핑 정보</h4>
            <ul className="space-y-2 text-xs text-brand-text/70">
              <li><Link href="/shop" className="hover:text-brand-point transition-colors">SHOP ALL</Link></li>
              <li><Link href="/shop?sort=new" className="hover:text-brand-point transition-colors">NEW ARRIVALS</Link></li>
              <li><Link href="/shop?sort=best" className="hover:text-brand-point transition-colors">BEST SELLERS</Link></li>
              <li><Link href="/blog" className="hover:text-brand-point transition-colors">PARENTING BLOG</Link></li>
            </ul>
          </div>

          {/* Policy Information */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-text font-semibold">회사 정보</h4>
            <ul className="space-y-2 text-xs text-brand-text/70">
              <li><a href="#" className="hover:text-brand-point transition-colors">회사소개</a></li>
              <li><a href="#" className="hover:text-brand-point transition-colors">이용약관</a></li>
              <li><a href="#" className="hover:text-brand-point transition-colors">개인정보처리방침</a></li>
              <li><a href="#" className="hover:text-brand-point transition-colors">배송 및 반품안내</a></li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom info */}
        <div className="border-t border-brand-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-[11px] text-brand-text/50 space-y-1.5 text-center md:text-left leading-relaxed">
            <p>상호명: (주)위티베베 | 대표자: 홍길동 | 주소: 서울특별시 강남구 테헤란로 123</p>
            <p>사업자등록번호: 120-00-00000 | 통신판매업신고: 제 2026-서울강남-0000호</p>
            <p>© 2026 WITTY BÉBÉ. All rights reserved.</p>
          </div>
          <button
            onClick={scrollToTop}
            className="p-3 bg-brand-primary/30 hover:bg-brand-primary/65 border border-brand-border text-brand-text rounded-xl transition-all flex items-center justify-center cursor-pointer shadow-sm"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
