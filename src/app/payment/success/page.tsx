"use client";

import React, { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { CheckCircle2, ShoppingBag, Calendar, CreditCard, ChevronRight } from "lucide-react";
import { createSupabaseOrder } from "@/utils/supabase";

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="max-w-md mx-auto px-4 py-20 text-center text-brand-secondary">
        결제 확인 정보를 불러오는 중입니다...
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const { cart, user, clearCart } = useCart();

  const paymentKey = searchParams.get("paymentKey") || "";
  const orderId = searchParams.get("orderId") || "";
  const amountParam = searchParams.get("amount") || "0";
  const amount = Number(amountParam);

  // Save order to database and then clear the cart
  useEffect(() => {
    if (cart.length > 0) {
      const orderNumber = orderId || `witty-${Date.now()}`;
      const totalAmount = amount || cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const shippingFee = totalAmount >= 50000 ? 0 : 3000;
      
      const orderItems = cart.map((item) => ({
        productId: item.id,
        productName: item.name,
        size: item.size,
        quantity: item.quantity,
        price: item.price
      }));

      createSupabaseOrder({
        userId: user?.id,
        orderNumber,
        totalAmount,
        shippingFee,
        paymentMethod: "card",
        paymentKey,
        recipientName: user?.user_metadata?.name || user?.email?.split("@")[0] || "비회원 고객",
        recipientPhone: user?.user_metadata?.phone || "010-0000-0000",
        shippingAddress: "배송지 입력 대기",
        items: orderItems
      }).then((res) => {
        if (res.success) {
          console.log("Order saved to database successfully.");
        } else {
          console.error("Failed to save order to database:", res.error);
        }
      }).catch((err) => {
        console.error("Order database save error:", err);
      }).finally(() => {
        clearCart();
      });
    }
  }, [cart, orderId, amount, paymentKey, user, clearCart]);

  const todayStr = new Date().toISOString().split("T")[0];

  return (
    <div className="max-w-md mx-auto px-4 py-16 sm:py-24 text-center">
      <div className="bg-white border border-brand-border rounded-[2.5rem] p-6 sm:p-8 shadow-md space-y-6">
        
        {/* Success Icon */}
        <div className="w-16 h-16 bg-brand-success/20 rounded-full flex items-center justify-center text-brand-success mx-auto">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        {/* Header */}
        <div className="space-y-1">
          <span className="text-[10px] font-bold tracking-widest text-brand-point uppercase">Order Confirmed</span>
          <h1 className="text-xl sm:text-2xl font-extrabold text-brand-text font-serif">결제가 완료되었습니다</h1>
          <p className="text-xs text-brand-secondary font-medium">위티베베를 찾아주셔서 감사드립니다. 예쁘게 포장해서 보내드릴게요.</p>
        </div>

        {/* Invoice Summary */}
        <div className="border-t border-b border-brand-border/60 py-5 text-left text-xs space-y-3">
          <div className="flex justify-between items-center text-brand-secondary">
            <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> 결제 일시</span>
            <span className="font-semibold text-brand-text">{todayStr}</span>
          </div>
          <div className="flex justify-between items-center text-brand-secondary">
            <span className="flex items-center gap-1.5"><ShoppingBag className="w-3.5 h-3.5" /> 주문 번호</span>
            <span className="font-semibold text-brand-text truncate max-w-[180px]">{orderId}</span>
          </div>
          <div className="flex justify-between items-center text-brand-secondary">
            <span className="flex items-center gap-1.5"><CreditCard className="w-3.5 h-3.5" /> 결제 금액</span>
            <span className="font-bold text-sm text-brand-point">{amount.toLocaleString()}원</span>
          </div>
          {paymentKey && (
            <div className="flex justify-between items-center text-brand-secondary pt-2 border-t border-brand-border/40">
              <span>승인 키(Toss)</span>
              <span className="font-mono text-[10px] text-brand-secondary/60 truncate max-w-[180px]">{paymentKey}</span>
            </div>
          )}
        </div>

        {/* Actions buttons */}
        <div className="space-y-2 pt-2">
          <Link
            href="/shop"
            className="w-full py-3.5 bg-brand-secondary hover:bg-brand-secondary/90 text-white font-bold text-xs sm:text-sm rounded-xl shadow-sm transition-all flex items-center justify-center gap-1 cursor-pointer"
          >
            쇼핑 계속하기 <ChevronRight className="w-4 h-4" />
          </Link>
          <Link
            href="/"
            className="w-full py-3.5 border border-brand-border hover:bg-brand-primary/20 text-brand-text font-semibold text-xs sm:text-sm rounded-xl transition-all block"
          >
            메인 홈으로 가기
          </Link>
        </div>

      </div>
    </div>
  );
}
