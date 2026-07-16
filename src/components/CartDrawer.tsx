"use client";

import React, { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { X, Plus, Minus, Trash2, ShoppingBag, Loader2 } from "lucide-react";
import Image from "next/image";
import { loadTossPayments } from "@tosspayments/payment-sdk";

export default function CartDrawer() {
  const { 
    cart, 
    isCartOpen, 
    setCartOpen, 
    updateQuantity, 
    removeFromCart, 
    cartTotal,
    cartCount,
    user
  } = useCart();

  const [isPaying, setIsPaying] = useState(false);

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    setIsPaying(true);
    try {
      const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY || "test_ck_D5aZkWqZ3Qxgzg228mNW8w6OfAlL";
      const tossPayments = await loadTossPayments(clientKey);
      
      const successUrl = process.env.NEXT_PUBLIC_TOSS_SUCCESS_URL || (window.location.origin + "/payment/success");
      const failUrl = process.env.NEXT_PUBLIC_TOSS_FAIL_URL || (window.location.origin + "/payment/fail");

      // Generate order ID
      const orderId = `witty-${Date.now()}`;
      const orderName = cart.map((item) => `${item.name}(${item.size})`).join(", ").substring(0, 80);

      await tossPayments.requestPayment("카드", {
        amount: cartTotal,
        orderId,
        orderName,
        customerName: user?.email?.split("@")[0] || "비회원",
        successUrl,
        failUrl,
      });
    } catch (err: any) {
      console.error("Toss checkout error:", err);
      alert(`결제 준비 중 오류가 발생했습니다: ${err.message || err}`);
    } finally {
      setIsPaying(false);
    }
  };

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-sm transition-opacity duration-300">
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={() => setCartOpen(false)} />

      {/* Drawer Panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-brand-bg border-l border-brand-border flex flex-col shadow-2xl animate-slide-in-right">
          {/* Header */}
          <div className="px-6 py-6 border-b border-brand-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-brand-text" />
              <h2 className="text-lg font-bold text-brand-text font-serif">장바구니 ({cartCount})</h2>
            </div>
            <button
              onClick={() => setCartOpen(false)}
              className="p-1 hover:bg-brand-primary/40 rounded-full text-brand-text/60 hover:text-brand-text transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items Area */}
          <div className="flex-1 py-6 overflow-y-auto px-6 space-y-6">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 bg-brand-primary/20 rounded-full flex items-center justify-center text-brand-secondary">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <p className="text-base font-semibold text-brand-text/80">장바구니가 비어 있습니다.</p>
                  <p className="text-xs text-brand-secondary font-medium">위티베베의 특별한 신상품들을 담아보세요.</p>
                </div>
                <button
                  onClick={() => setCartOpen(false)}
                  className="px-6 py-2.5 bg-brand-secondary hover:bg-brand-secondary/90 text-white font-semibold text-sm rounded-xl transition-all"
                >
                  쇼핑하러 가기
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div 
                    key={`${item.id}-${item.size}`} 
                    className="flex gap-4 p-4 bg-white border border-brand-border rounded-2xl shadow-sm transition-all hover:shadow-md"
                  >
                    {/* Item Image */}
                    <div className="relative w-20 h-24 bg-brand-primary/20 rounded-xl overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="text-sm font-semibold text-brand-text line-clamp-1">{item.name}</h4>
                          <button
                            onClick={() => removeFromCart(item.id, item.size)}
                            className="text-brand-secondary hover:text-brand-point transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-xs text-brand-secondary mt-1">사이즈: {item.size}</p>
                      </div>

                      <div className="flex justify-between items-center mt-2">
                        {/* Quantity controls */}
                        <div className="flex items-center border border-brand-border bg-brand-bg rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                            className="p-1.5 text-brand-secondary hover:text-brand-text transition-colors"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-2.5 text-xs font-semibold text-brand-text">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                            className="p-1.5 text-brand-secondary hover:text-brand-text transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Price */}
                        <span className="text-sm font-bold text-brand-text">
                          {(item.price * item.quantity).toLocaleString()}원
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Checkout Footer */}
          {cart.length > 0 && (
            <div className="border-t border-brand-border px-6 py-6 space-y-4 bg-white">
              <div className="flex justify-between text-base font-medium text-brand-text">
                <span>총 주문 상품</span>
                <span className="font-bold text-lg text-brand-point">{cartTotal.toLocaleString()}원</span>
              </div>
              <p className="text-xs text-brand-secondary/80 leading-normal">
                * 배송비는 3,000원이며 50,000원 이상 구매 시 무료배송됩니다. (총 주문액에 배송비 미포함)
              </p>
              <div className="grid grid-cols-1 gap-2 pt-2">
                <button
                  onClick={handleCheckout}
                  disabled={isPaying}
                  className="w-full py-3.5 bg-brand-secondary hover:bg-brand-secondary/90 text-white font-bold text-sm rounded-xl shadow-md transition-all active:scale-[0.98] cursor-pointer disabled:opacity-50 flex items-center justify-center gap-1.5"
                >
                  {isPaying && <Loader2 className="w-4 h-4 animate-spin" />}
                  결제하기 (토스페이)
                </button>
                <button
                  onClick={() => setCartOpen(false)}
                  className="w-full py-3 border border-brand-border hover:bg-brand-primary/20 text-brand-text font-semibold text-sm rounded-xl transition-all"
                >
                  쇼핑 계속하기
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
