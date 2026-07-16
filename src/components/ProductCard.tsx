"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/data/mockData";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, Star } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [hovered, setHovered] = useState(false);
  const [showSizePicker, setShowSizePicker] = useState(false);

  const discountRate = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  // Calculate average rating
  const averageRating = product.reviews.length > 0 
    ? (product.reviews.reduce((acc, r) => acc + r.rating, 0) / product.reviews.length).toFixed(1)
    : "5.0";

  const handleQuickAdd = (size: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: size
    });
    setShowSizePicker(false);
  };

  return (
    <div 
      className="group relative flex flex-col bg-white border border-brand-border rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setShowSizePicker(false);
      }}
    >
      {/* Badge container */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
        {product.isNew && (
          <span className="px-2.5 py-1 bg-brand-point text-white text-[10px] font-bold rounded-full tracking-wider shadow-sm uppercase">
            NEW
          </span>
        )}
        {product.isBest && (
          <span className="px-2.5 py-1 bg-brand-secondary text-white text-[10px] font-bold rounded-full tracking-wider shadow-sm uppercase">
            BEST
          </span>
        )}
      </div>

      {/* Image Gallery */}
      <Link href={`/shop/${product.id}`} className="relative w-full aspect-[4/5] overflow-hidden bg-brand-primary/20 cursor-pointer">
        <Image
          src={hovered ? product.hoverImage : product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          priority={product.isNew}
        />
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Link>

      {/* Details info */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category */}
          <span className="text-[10px] font-bold tracking-wider text-brand-secondary uppercase">
            {product.category}
          </span>
          {/* Title */}
          <Link href={`/shop/${product.id}`} className="block mt-1 font-semibold text-sm text-brand-text hover:text-brand-point transition-colors line-clamp-1">
            {product.name}
          </Link>
          <span className="text-[11px] text-brand-secondary/80 font-medium block mt-0.5">{product.englishName}</span>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-2">
            <div className="flex items-center text-amber-400">
              <Star className="w-3 h-3 fill-current" />
            </div>
            <span className="text-[11px] font-semibold text-brand-text">{averageRating}</span>
            <span className="text-[11px] text-brand-secondary/60">({product.reviews.length})</span>
          </div>
        </div>

        {/* Pricing & Add to Cart */}
        <div className="mt-4 flex items-end justify-between relative">
          <div>
            {product.originalPrice && (
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-brand-secondary/70 line-through">
                  {product.originalPrice.toLocaleString()}원
                </span>
                <span className="text-xs font-bold text-brand-point">{discountRate}% Off</span>
              </div>
            )}
            <span className="text-base font-bold text-brand-text">
              {product.price.toLocaleString()}원
            </span>
          </div>

          {/* Cart Button with Size Selector */}
          <div className="relative">
            {!showSizePicker ? (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowSizePicker(true);
                }}
                className="p-2.5 bg-brand-primary/40 hover:bg-brand-secondary text-brand-text hover:text-white rounded-2xl shadow-sm transition-all duration-300 active:scale-95 cursor-pointer"
                aria-label="Quick Add to Cart"
              >
                <ShoppingCart className="w-4 h-4" />
              </button>
            ) : (
              <div 
                className="absolute right-0 bottom-0 bg-white border border-brand-border rounded-2xl p-2.5 shadow-xl flex flex-col gap-1.5 z-20 min-w-[120px] animate-slide-up"
                onClick={(e) => e.stopPropagation()}
              >
                <span className="text-[9px] font-bold text-brand-secondary text-center tracking-wider">SIZE SELECT</span>
                <div className="flex flex-col gap-1">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={(e) => handleQuickAdd(size, e)}
                      className="px-3 py-1 bg-brand-primary/20 hover:bg-brand-point hover:text-white text-brand-text text-[10px] font-semibold rounded-lg transition-colors text-left"
                    >
                      {size}
                    </button>
                  ))}
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowSizePicker(false);
                  }}
                  className="text-[9px] font-bold text-brand-point hover:underline text-center mt-1"
                >
                  닫기
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
