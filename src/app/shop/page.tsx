"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { mockProducts, Product } from "@/data/mockData";
import ProductCard from "@/components/ProductCard";
import { getSupabaseProducts } from "../../utils/supabase";
import { SlidersHorizontal, ArrowUpDown, RefreshCw } from "lucide-react";

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-brand-secondary">
        <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4" />
        위티베베 스토어를 불러오고 있습니다...
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}

function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Query Params
  const categoryParam = searchParams.get("category") || "전체";
  const sortParam = searchParams.get("sort") || "recommended";
  const searchParam = searchParams.get("search") || "";

  // State
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts);

  useEffect(() => {
    getSupabaseProducts().then((data) => {
      if (data && data.length > 0) {
        setProducts(data);
      }
    }).catch((err) => {
      console.log("Failed to fetch products from Supabase, using local fallback:", err);
    });
  }, []);

  const categories = ["전체", "신생아", "베이비", "여아", "남아", "실내복", "등원룩", "아우터", "악세서리"];

  const sortOptions = [
    { value: "recommended", label: "추천순" },
    { value: "new", label: "신상품순" },
    { value: "best", label: "베스트순" },
    { value: "low-price", label: "낮은가격순" },
    { value: "high-price", label: "높은가격순" },
  ];

  // Filtering & Sorting effect
  useEffect(() => {
    let result = [...products];

    // 1. Text Search Filter
    if (searchParam) {
      const query = searchParam.toLowerCase();
      result = result.filter(
        (p) => 
          p.name.toLowerCase().includes(query) || 
          p.englishName.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      );
    }

    // 2. Category Filter
    if (categoryParam !== "전체") {
      result = result.filter((p) => p.category === categoryParam);
    }

    // 3. Sorting
    if (sortParam === "new") {
      result = result.filter((p) => p.isNew);
    } else if (sortParam === "best") {
      result = result.filter((p) => p.isBest);
    } else if (sortParam === "low-price") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortParam === "high-price") {
      result.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(result);
  }, [categoryParam, sortParam, searchParam, products]);

  const updateParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/shop?${params.toString()}`);
  };

  const clearAllFilters = () => {
    router.push("/shop");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-8">
      {/* Page Header */}
      <div className="text-center">
        <span className="text-[10px] font-bold tracking-widest text-brand-point uppercase">Shop Collection</span>
        <h1 className="text-3xl font-extrabold text-brand-text mt-1 font-serif">위티베베 컬렉션</h1>
        {searchParam && (
          <p className="text-sm text-brand-secondary mt-2">
            검색어 <span className="font-semibold text-brand-point">"{searchParam}"</span>에 대한 검색결과입니다 ({filteredProducts.length}개)
          </p>
        )}
      </div>

      {/* Category Scroll Tabs */}
      <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-none border-b border-brand-border/60">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => updateParams("category", cat)}
            className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wide whitespace-nowrap transition-all duration-300 border cursor-pointer font-rounded ${
              categoryParam === cat
                ? "bg-brand-secondary border-brand-secondary text-white shadow-sm"
                : "bg-white border-brand-border text-brand-text hover:bg-brand-primary/20"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Utility Control Panel */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-brand-border/60 pb-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-brand-secondary">
          <SlidersHorizontal className="w-4 h-4" />
          <span>총 {filteredProducts.length}개의 어여쁜 의류가 있습니다</span>
        </div>
        
        {/* Sort Select */}
        <div className="flex items-center gap-2 self-stretch sm:self-auto justify-between border-t sm:border-t-0 pt-2 sm:pt-0">
          <div className="flex items-center gap-1.5 text-xs text-brand-secondary font-medium">
            <ArrowUpDown className="w-3.5 h-3.5" />
            <span>정렬</span>
          </div>
          <select
            value={sortParam}
            onChange={(e) => updateParams("sort", e.target.value)}
            className="text-xs font-semibold text-brand-text bg-white border border-brand-border rounded-xl px-3.5 py-2.5 outline-none focus:border-brand-secondary cursor-pointer"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-24 space-y-4">
          <p className="text-base text-brand-secondary font-medium">조건에 맞는 상품이 존재하지 않습니다.</p>
          <button
            onClick={clearAllFilters}
            className="px-6 py-2.5 bg-brand-secondary hover:bg-brand-secondary/90 text-white font-semibold text-xs rounded-xl shadow transition-all"
          >
            필터 초기화
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
