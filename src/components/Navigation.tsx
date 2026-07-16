"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { Search, User, ShoppingBag, Menu, X } from "lucide-react";

export default function Navigation() {
  const { cartCount, setCartOpen, setSearchOpen, setLoginOpen, user, authSignOut } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "SHOP", href: "/shop" },
    { name: "NEW", href: "/shop?sort=new" },
    { name: "BEST", href: "/shop?sort=best" },
    { name: "LOOKBOOK", href: "/#lookbook" },
    { name: "REVIEW", href: "/#review" },
    { name: "STORY", href: "/#story" },
    { name: "BLOG", href: "/blog" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-brand-bg/95 backdrop-blur-md border-b border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Mobile Hamburger Trigger */}
        <div className="flex md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-brand-text p-2 hover:bg-brand-primary/30 rounded-lg transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Logo */}
        <div className="flex-1 md:flex-initial text-center md:text-left">
          <Link href="/" className="text-xl sm:text-2xl font-bold tracking-widest text-brand-text font-serif">
            WITTY BÉBÉ
          </Link>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-xs font-semibold tracking-wider hover:text-brand-point transition-all relative py-1 group ${
                  isActive ? "text-brand-point" : "text-brand-text/80"
                }`}
              >
                {link.name}
                <span className={`absolute bottom-0 left-0 w-full h-[1.5px] bg-brand-point scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ${isActive ? "scale-x-100" : ""}`} />
              </Link>
            );
          })}
        </nav>

        {/* Utility Icons */}
        <div className="flex items-center gap-1 sm:gap-3">
          <button
            onClick={() => setSearchOpen(true)}
            className="p-2 text-brand-text hover:text-brand-point hover:bg-brand-primary/30 rounded-full transition-all cursor-pointer"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>
          
          {user ? (
            <div className="flex items-center gap-1.5 sm:gap-3">
              <span className="text-[10px] font-bold text-brand-secondary bg-brand-primary/45 px-2.5 py-1 rounded-full hidden sm:inline-block">
                {user.email?.split("@")[0]}님
              </span>
              <button
                onClick={authSignOut}
                className="p-2 text-brand-text hover:text-brand-point hover:bg-brand-primary/30 rounded-full transition-all cursor-pointer text-xs font-semibold"
                aria-label="Logout"
              >
                로그아웃
              </button>
            </div>
          ) : (
            <button
              onClick={() => setLoginOpen(true)}
              className="p-2 text-brand-text hover:text-brand-point hover:bg-brand-primary/30 rounded-full transition-all cursor-pointer"
              aria-label="Login"
            >
              <User className="w-5 h-5" />
            </button>
          )}

          <button
            onClick={() => setCartOpen(true)}
            className="p-2 text-brand-text hover:text-brand-point hover:bg-brand-primary/30 rounded-full transition-all relative cursor-pointer"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-brand-point text-white text-[9px] font-bold rounded-full flex items-center justify-center animate-pulse">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-brand-bg border-b border-brand-border py-4 shadow-xl z-50 animate-slide-down">
          <nav className="flex flex-col px-6 py-2 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-sm font-semibold tracking-wider text-brand-text hover:text-brand-point py-1 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
