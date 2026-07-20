"use client";

import React, { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { X, Mail, Lock, Eye, EyeOff, User, Loader2 } from "lucide-react";
import { supabase } from "../utils/supabase";
import Logo from "./Logo";

export default function LoginModal() {
  const { isLoginOpen, setLoginOpen } = useCart();
  const [isLoginTab, setIsLoginTab] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isLoginOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isLoginOpen]);

  if (!isLoginOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (isLoginTab) {
        const { data, error: authError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (authError) {
          if (authError.message.includes("fetch") || authError.message.includes("Invalid URL")) {
            console.warn("Supabase placeholder detected. Using mock login fallback.");
            alert(`[테스트 모드] ${email}님, 로그인이 완료되었습니다.`);
            setLoginOpen(false);
            return;
          }
          throw authError;
        }
        
        alert(`${data.user?.email?.split("@")[0]}님, 환영합니다!`);
        setLoginOpen(false);
      } else {
        const { data, error: authError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name: name,
            }
          }
        });

        if (authError) {
          if (authError.message.includes("fetch") || authError.message.includes("Invalid URL")) {
            console.warn("Supabase placeholder detected. Using mock signup fallback.");
            alert(`[테스트 모드] ${name}님, 회원가입이 완료되었습니다.`);
            setLoginOpen(false);
            return;
          }
          throw authError;
        }

        alert("회원가입이 완료되었습니다! 이메일 인증 링크를 발송했습니다.");
        setLoginOpen(false);
      }
    } catch (err: any) {
      console.error("Auth error:", err);
      setError(err.message || "오류가 발생했습니다. 다시 입력해 주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: "kakao" | "naver" | "google") => {
    setError("");
    try {
      const { error: authError } = await supabase.auth.signInWithOAuth({
        provider: provider as any,
        options: {
          redirectTo: typeof window !== "undefined" ? window.location.origin : undefined
        }
      });
      if (authError) {
        if (authError.message.includes("fetch") || authError.message.includes("Invalid URL")) {
          alert(`[테스트 모드] ${provider} 소셜 로그인이 정상적으로 완료되었습니다.`);
          setLoginOpen(false);
          return;
        }
        throw authError;
      }
    } catch (err: any) {
      console.error("Social login error:", err);
      setError(err.message || "소셜 로그인에 실패했습니다.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 transition-opacity duration-300">
      {/* Background click to close */}
      <div className="absolute inset-0" onClick={() => setLoginOpen(false)} />

      {/* Modal Card */}
      <div 
        className="relative bg-brand-bg w-full max-w-md border border-brand-border rounded-3xl overflow-hidden shadow-2xl z-10 p-6 md:p-8 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={() => setLoginOpen(false)}
          className="absolute top-4 right-4 p-1.5 hover:bg-brand-primary/45 rounded-full text-brand-text/60 hover:text-brand-text transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Logo Header */}
        <div className="text-center mb-6 mt-2">
          <div className="pointer-events-none cursor-default inline-block">
            <Logo className="text-3xl sm:text-4xl" />
          </div>
          <p className="text-xs text-brand-secondary font-medium tracking-wide mt-1">아이의 하루를 더 사랑스럽게</p>
        </div>

        {/* Tab Buttons */}
        <div className="flex border-b border-brand-border mb-6">
          <button
            onClick={() => setIsLoginTab(true)}
            className={`flex-1 pb-3 text-sm font-semibold border-b-2 transition-all duration-300 ${
              isLoginTab 
                ? "border-brand-point text-brand-text" 
                : "border-transparent text-brand-text/40 hover:text-brand-text/70"
            }`}
          >
            로그인
          </button>
          <button
            onClick={() => setIsLoginTab(false)}
            className={`flex-1 pb-3 text-sm font-semibold border-b-2 transition-all duration-300 ${
              !isLoginTab 
                ? "border-brand-point text-brand-text" 
                : "border-transparent text-brand-text/40 hover:text-brand-text/70"
            }`}
          >
            회원가입
          </button>
        </div>

        {/* Form content */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLoginTab && (
            <div className="space-y-1">
              <label className="text-xs font-semibold text-brand-text/60">이름</label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-4 h-4 text-brand-secondary" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="홍길동"
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-brand-border focus:border-brand-secondary focus:ring-1 focus:ring-brand-secondary rounded-xl text-sm outline-none transition-all placeholder:text-brand-secondary/50 text-brand-text"
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-semibold text-brand-text/60">이메일 주소</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-4 h-4 text-brand-secondary" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="witty@bebe.com"
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-brand-border focus:border-brand-secondary focus:ring-1 focus:ring-brand-secondary rounded-xl text-sm outline-none transition-all placeholder:text-brand-secondary/50 text-brand-text"
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-brand-text/60">비밀번호</label>
              {isLoginTab && (
                <a href="#" className="text-xs font-medium text-brand-point hover:underline">비밀번호 찾기</a>
              )}
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-4 h-4 text-brand-secondary" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2.5 bg-white border border-brand-border focus:border-brand-secondary focus:ring-1 focus:ring-brand-secondary rounded-xl text-sm outline-none transition-all placeholder:text-brand-secondary/50 text-brand-text"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-brand-secondary hover:text-brand-text transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

                  {error && (
            <div className="p-3 text-xs bg-red-50 border border-red-200 text-red-600 rounded-xl font-medium animate-fade-in">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 mt-4 bg-brand-secondary hover:bg-brand-secondary/90 text-white font-semibold text-sm rounded-xl shadow-md transition-all active:scale-[0.98] cursor-pointer disabled:opacity-50 flex items-center justify-center gap-1.5 animate-fade-in"
          >
            {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            {isLoginTab ? "로그인" : "회원가입 하기"}
          </button>
        </form>

        {/* Social Login Separator */}
        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-brand-border"></div>
          </div>
          <span className="relative bg-brand-bg px-3 text-xs text-brand-secondary/80 font-medium">간편 로그인</span>
        </div>

        {/* Social Logins */}
        <div className="grid grid-cols-3 gap-2.5">
          <button 
            type="button"
            onClick={() => handleSocialLogin("kakao")}
            className="flex items-center justify-center py-2.5 bg-[#FEE500] hover:bg-[#FEE500]/90 rounded-xl text-xs font-semibold text-[#191919] transition-all cursor-pointer"
          >
            Kakao
          </button>
          <button 
            type="button"
            onClick={() => handleSocialLogin("naver")}
            className="flex items-center justify-center py-2.5 bg-[#03C75A] hover:bg-[#03C75A]/90 rounded-xl text-xs font-semibold text-white transition-all cursor-pointer"
          >
            Naver
          </button>
          <button 
            type="button"
            onClick={() => handleSocialLogin("google")}
            className="flex items-center justify-center py-2.5 bg-white border border-brand-border hover:bg-brand-primary/20 rounded-xl text-xs font-semibold text-brand-text transition-all cursor-pointer"
          >
            Google
          </button>
        </div>
      </div>
    </div>
  );
}
