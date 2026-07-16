"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { mockBlogs, Blog } from "@/data/mockData";
import { Calendar, User, ArrowRight, MessageSquare } from "lucide-react";

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState<string>("전체");

  const categories = ["전체", "육아정보", "등원룩 추천", "계절별 코디", "신상품 소식", "스타일링 팁"];

  const filteredBlogs = activeCategory === "전체"
    ? mockBlogs
    : mockBlogs.filter((blog) => blog.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-12">
      {/* Header */}
      <div className="text-center">
        <span className="text-[10px] font-bold tracking-widest text-brand-point uppercase">Parenting & Styling Hub</span>
        <h1 className="text-3xl font-extrabold text-brand-text mt-1 font-serif">위티베베 라이프 매거진</h1>
        <p className="text-xs text-brand-secondary mt-2">아이를 키우는 엄마들을 위한 유익한 육아 정보와 감성 코디 가이드</p>
      </div>

      {/* Categories Tabs */}
      <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-none border-b border-brand-border/60">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide whitespace-nowrap transition-all duration-300 border cursor-pointer ${
              activeCategory === cat
                ? "bg-brand-secondary border-brand-secondary text-white shadow-sm"
                : "bg-white border-brand-border text-brand-text hover:bg-brand-primary/20"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Featured Main Post (Show first blog if we have one) */}
      {activeCategory === "전체" && mockBlogs.length > 0 && (
        <div className="bg-white border border-brand-border rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 grid grid-cols-1 lg:grid-cols-2">
          <div className="relative h-64 lg:h-auto min-h-[300px] bg-brand-primary/20">
            <Image
              src={mockBlogs[0].image}
              alt={mockBlogs[0].title}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="p-8 sm:p-12 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="px-3 py-1 bg-brand-point/20 text-brand-point text-[10px] font-bold rounded-full tracking-wider uppercase">
                {mockBlogs[0].category}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-brand-text font-serif leading-tight">
                <Link href={`/blog/${mockBlogs[0].id}`} className="hover:text-brand-point transition-colors">
                  {mockBlogs[0].title}
                </Link>
              </h2>
              <p className="text-xs sm:text-sm text-brand-text/75 leading-relaxed font-light">
                {mockBlogs[0].summary}
              </p>
            </div>
            
            <div className="flex items-center justify-between border-t border-brand-border/60 pt-6">
              <div className="flex items-center gap-4 text-[11px] text-brand-secondary font-medium">
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {mockBlogs[0].date}</span>
                <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> {mockBlogs[0].author}</span>
              </div>
              <Link
                href={`/blog/${mockBlogs[0].id}`}
                className="text-xs font-bold text-brand-text hover:text-brand-point flex items-center gap-1 group transition-colors"
              >
                자세히 읽기 <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Blogs list grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
        {filteredBlogs.map((blog) => (
          <article
            key={blog.id}
            className="bg-white border border-brand-border rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col"
          >
            {/* Blog Image */}
            <Link href={`/blog/${blog.id}`} className="relative aspect-video w-full bg-brand-primary/20 cursor-pointer overflow-hidden block">
              <Image
                src={blog.image}
                alt={blog.title}
                fill
                className="object-cover hover:scale-[1.03] transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </Link>

            {/* Content Details */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="text-[9px] font-bold tracking-wider text-brand-point uppercase block">
                  {blog.category}
                </span>
                <h3 className="text-base font-bold text-brand-text font-serif line-clamp-2">
                  <Link href={`/blog/${blog.id}`} className="hover:text-brand-point transition-colors">
                    {blog.title}
                  </Link>
                </h3>
                <p className="text-xs text-brand-secondary/80 font-light leading-relaxed line-clamp-3">
                  {blog.summary}
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-brand-border/40 pt-4 text-[10px] text-brand-secondary/70 font-semibold">
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {blog.date}</span>
                <span className="flex items-center gap-1"><User className="w-3 h-3" /> {blog.author}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
