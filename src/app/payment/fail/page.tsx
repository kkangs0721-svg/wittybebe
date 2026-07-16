"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { AlertCircle, ArrowLeft, Headphones } from "lucide-react";

export default function PaymentFailPage() {
  return (
    <Suspense fallback={
      <div className="max-w-md mx-auto px-4 py-20 text-center text-brand-secondary">
        오류 확인 정보를 불러오는 중입니다...
      </div>
    }>
      <FailContent />
    </Suspense>
  );
}

function FailContent() {
  const searchParams = useSearchParams();

  const code = searchParams.get("code") || "UNKNOWN_ERROR";
  const message = searchParams.get("message") || "결제 처리가 비정상적으로 종료되었습니다.";

  return (
    <div className="max-w-md mx-auto px-4 py-16 sm:py-24 text-center">
      <div className="bg-white border border-brand-border rounded-[2.5rem] p-6 sm:p-8 shadow-md space-y-6">
        
        {/* Fail Icon */}
        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-red-500 mx-auto border border-red-100">
          <AlertCircle className="w-9 h-9" />
        </div>

        {/* Header */}
        <div className="space-y-1">
          <span className="text-[10px] font-bold tracking-widest text-red-500 uppercase">Payment Failed</span>
          <h1 className="text-xl sm:text-2xl font-extrabold text-brand-text font-serif">결제에 실패하였습니다</h1>
          <p className="text-xs text-brand-secondary font-medium">아래 오류 원인을 확인한 후 다시 한번 결제를 시도해 주세요.</p>
        </div>

        {/* Error Details */}
        <div className="bg-red-50/50 border border-red-100/80 rounded-2xl p-4 text-left text-xs space-y-2">
          <div className="flex gap-2">
            <span className="font-bold text-red-600 uppercase flex-shrink-0">에러 코드:</span>
            <span className="font-mono text-brand-text font-medium">{code}</span>
          </div>
          <div className="flex gap-2">
            <span className="font-bold text-red-600 uppercase flex-shrink-0">상세 설명:</span>
            <span className="text-brand-text font-light leading-relaxed">{message}</span>
          </div>
        </div>

        {/* Actions buttons */}
        <div className="space-y-2 pt-2">
          <Link
            href="/shop"
            className="w-full py-3.5 bg-brand-secondary hover:bg-brand-secondary/90 text-white font-bold text-xs sm:text-sm rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> 결제 다시 시도하기
          </Link>
          <a
            href="https://kakao.com"
            target="_blank"
            rel="noreferrer"
            className="w-full py-3.5 border border-brand-border hover:bg-brand-primary/20 text-brand-text font-semibold text-xs sm:text-sm rounded-xl transition-all flex items-center justify-center gap-1.5"
          >
            <Headphones className="w-4 h-4" /> 고객센터 문의하기
          </a>
        </div>

      </div>
    </div>
  );
}
