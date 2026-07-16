"use client";

import React, { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { mockBlogs, mockProducts } from "@/data/mockData";
import ProductCard from "@/components/ProductCard";
import { Calendar, User, ArrowLeft, ArrowRight, Share2, Heart } from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function BlogDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const blog = mockBlogs.find((b) => b.id === id);

  if (!blog) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center space-y-6">
        <h2 className="text-2xl font-bold text-brand-text font-serif">게시글을 찾을 수 없습니다</h2>
        <p className="text-sm text-brand-secondary">요청하신 매거진 글이 존재하지 않거나 보관 해제되었습니다.</p>
        <Link
          href="/blog"
          className="inline-block px-6 py-3 bg-brand-secondary hover:bg-brand-secondary/90 text-white font-semibold text-xs rounded-xl shadow"
        >
          매거진 목록으로 가기
        </Link>
      </div>
    );
  }

  // Find related products matching the category or keywords
  let relatedCategoryMap: "신생아" | "베이비" | "여아" | "남아" | "실내복" | "등원룩" | "아우터" | "악세서리" = "등원룩";
  if (blog.category === "육아정보") relatedCategoryMap = "신생아";
  else if (blog.category === "스타일링 팁") relatedCategoryMap = "여아";
  else if (blog.category === "계절별 코디") relatedCategoryMap = "아우터";
  
  const relatedProducts = mockProducts
    .filter((p) => p.category === relatedCategoryMap)
    .slice(0, 4);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-16 space-y-10">
      
      {/* Back Button */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-secondary hover:text-brand-point transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> 매거진 목록으로 돌아가기
      </Link>

      {/* Header Info */}
      <div className="space-y-4 text-center">
        <span className="px-3 py-1 bg-brand-point/20 text-brand-point text-[10px] font-bold rounded-full tracking-wider uppercase inline-block">
          {blog.category}
        </span>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-text font-serif leading-tight max-w-3xl mx-auto">
          {blog.title}
        </h1>
        
        <div className="flex items-center justify-center gap-4 text-xs text-brand-secondary font-medium pt-2 border-b border-brand-border pb-6">
          <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {blog.date}</span>
          <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> {blog.author}</span>
        </div>
      </div>

      {/* Article Main Image */}
      <div className="relative w-full aspect-video bg-brand-primary/20 rounded-[2.5rem] overflow-hidden border border-brand-border shadow-sm">
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </div>

      {/* Article Text Content */}
      <article className="prose prose-zinc max-w-none text-brand-text leading-relaxed font-light text-sm sm:text-base space-y-6 pt-4">
        {blog.content.split("\n\n").map((paragraph, index) => {
          if (!paragraph.trim()) return null;
          
          // Render lists if paragraphs start with dash or numbers
          if (paragraph.trim().startsWith("-") || paragraph.trim().startsWith("1.")) {
            return (
              <div 
                key={index} 
                className="pl-4 border-l-2 border-brand-secondary/40 space-y-2 py-1 text-xs sm:text-sm text-brand-secondary"
                dangerouslySetInnerHTML={{
                  __html: paragraph
                    .trim()
                    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // bold markdown parsing
                    .replace(/\n/g, "<br/>")
                }}
              />
            );
          }
          return (
            <p 
              key={index}
              dangerouslySetInnerHTML={{ 
                __html: paragraph.trim().replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") 
              }}
            />
          );
        })}
      </article>

      {/* Social Actions */}
      <div className="flex justify-center gap-3 border-t border-b border-brand-border py-6">
        <button
          onClick={() => alert("해당 게시글이 스크랩되었습니다.")}
          className="px-5 py-2.5 bg-white border border-brand-border hover:bg-brand-primary/20 rounded-xl text-xs font-semibold text-brand-text flex items-center gap-1.5 transition-all cursor-pointer"
        >
          <Heart className="w-4 h-4 text-brand-point" /> 스크랩하기
        </button>
        <button
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            alert("게시글 주소가 복사되었습니다.");
          }}
          className="px-5 py-2.5 bg-white border border-brand-border hover:bg-brand-primary/20 rounded-xl text-xs font-semibold text-brand-text flex items-center gap-1.5 transition-all cursor-pointer"
        >
          <Share2 className="w-4 h-4" /> 링크 공유하기
        </button>
      </div>

      {/* Bottom: Related Product Recommendations */}
      {relatedProducts.length > 0 && (
        <div className="pt-8 space-y-6">
          <div className="flex justify-between items-end border-b border-brand-border pb-4">
            <div>
              <span className="text-[10px] font-bold tracking-widest text-brand-point uppercase">Shop the Look</span>
              <h3 className="text-lg font-bold text-brand-text font-serif">매거진 추천 아이템</h3>
            </div>
            <Link 
              href={`/shop?category=${encodeURIComponent(relatedCategoryMap)}`} 
              className="text-xs font-bold text-brand-secondary hover:text-brand-point flex items-center gap-0.5 transition-all"
            >
              스토어 가기 <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
