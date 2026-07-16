"use client";

import React, { useState, use, useEffect } from "react";
import { loadTossPayments } from "@tosspayments/payment-sdk";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { mockProducts, Product } from "@/data/mockData";
import { useCart } from "@/context/CartContext";
import { getSupabaseProductDetail, submitSupabaseReview } from "../../../utils/supabase";
import { 
  Star, 
  ShoppingCart, 
  CreditCard, 
  Check, 
  ArrowLeft, 
  Minus, 
  Plus, 
  ChevronRight, 
  HelpCircle,
  Truck,
  RotateCcw
} from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: PageProps) {
    const { id } = use(params);
  
  const { addToCart, user, setLoginOpen } = useCart();
  const [isPaying, setIsPaying] = useState(false);
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getSupabaseProductDetail(id).then((data) => {
      if (data) {
        setProduct(data);
      } else {
        setProduct(mockProducts.find((p) => p.id === id));
      }
    }).catch((err) => {
      console.log("Failed to fetch details from Supabase, using local mock data fallback.", err);
      setProduct(mockProducts.find((p) => p.id === id));
    }).finally(() => {
      setIsLoading(false);
    });
  }, [id]);

  // Detail Page States
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"detail" | "size" | "shipping" | "reviews" | "qna">("detail");
  
  // Review Form States
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewContent, setReviewContent] = useState("");
  const [reviewSizeFit, setReviewSizeFit] = useState("정사이즈");
  const [reviewChildAge, setReviewChildAge] = useState("");
  const [isReviewSubmitting, setIsReviewSubmitting] = useState(false);

  const [newQuestion, setNewQuestion] = useState("");
  const [qnaList, setQnaList] = useState<Product["qna"]>([]);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;
    if (!user) {
      alert("로그인이 필요한 서비스입니다.");
      setLoginOpen(true);
      return;
    }
    if (!reviewContent.trim()) {
      alert("리뷰 내용을 입력해 주세요.");
      return;
    }
    setIsReviewSubmitting(true);
    try {
      const success = await submitSupabaseReview({
        productId: product.id,
        userId: user.id,
        rating: reviewRating,
        content: reviewContent,
        sizeFit: reviewSizeFit,
        childAge: reviewChildAge
      });
      if (success) {
        alert("소중한 리뷰가 정상적으로 등록되었습니다.");
        // Reload details from Supabase to show the new review
        const updated = await getSupabaseProductDetail(product.id);
        if (updated) {
          setProduct(updated);
        }
        setReviewContent("");
        setReviewChildAge("");
        setReviewRating(5);
        setReviewSizeFit("정사이즈");
      } else {
        alert("리뷰 등록에 실패했습니다. 다시 시도해 주세요.");
      }
    } catch (err) {
      console.error("Review submission error:", err);
      alert("리뷰 등록 중 오류가 발생했습니다.");
    } finally {
      setIsReviewSubmitting(false);
    }
  };

  useEffect(() => {
    if (product) {
      setSelectedImage(product.image);
      setSelectedSize(product.sizes[0]);
      setQnaList(product.qna);
    }
  }, [product]);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center space-y-4">
        <Loader2 className="w-8 h-8 animate-spin mx-auto text-brand-secondary" />
        <p className="text-xs text-brand-secondary font-medium">상품 정보를 안전하게 불러오는 중입니다...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center space-y-6">
        <h2 className="text-2xl font-bold text-brand-text font-serif">상품을 찾을 수 없습니다</h2>
        <p className="text-sm text-brand-secondary">요청하신 상품의 번호가 올바르지 않거나 품절된 상품입니다.</p>
        <Link
          href="/shop"
          className="inline-block px-6 py-3 bg-brand-secondary hover:bg-brand-secondary/90 text-white font-semibold text-xs rounded-xl shadow"
        >
          쇼핑하러 가기
        </Link>
      </div>
    );
  }

  const discountRate = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  const averageRating = product.reviews.length > 0 
    ? (product.reviews.reduce((acc, r) => acc + r.rating, 0) / product.reviews.length).toFixed(1)
    : "5.0";

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize
    }, quantity);
    alert(`${product.name} (${selectedSize}) ${quantity}개가 장바구니에 추가되었습니다.`);
  };

  const handleBuyNow = async () => {
    if (!product) return;
    setIsPaying(true);
    try {
      const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY || "test_ck_D5aZkWqZ3Qxgzg228mNW8w6OfAlL";
      const tossPayments = await loadTossPayments(clientKey);

      const successUrl = process.env.NEXT_PUBLIC_TOSS_SUCCESS_URL || (window.location.origin + "/payment/success");
      const failUrl = process.env.NEXT_PUBLIC_TOSS_FAIL_URL || (window.location.origin + "/payment/fail");

      const orderId = `witty-${Date.now()}`;
      const orderName = `${product.name}(${selectedSize}) x${quantity}`;

      await tossPayments.requestPayment("카드", {
        amount: product.price * quantity,
        orderId,
        orderName,
        customerName: user?.email?.split("@")[0] || "비회원",
        successUrl,
        failUrl,
      });
    } catch (err: any) {
      console.error("Toss direct checkout error:", err);
      alert(`결제 준비 중 오류가 발생했습니다: ${err.message || err}`);
    } finally {
      setIsPaying(false);
    }
  };

  const handleQnaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;
    
    const newItem = {
      id: `new-${Date.now()}`,
      author: "고*객",
      date: new Date().toISOString().split("T")[0],
      question: newQuestion,
      isPrivate: false
    };

    setQnaList([newItem, ...qnaList]);
    setNewQuestion("");
    alert("문의사항이 등록되었습니다. 빠른 시일 내에 답변해 드리겠습니다.");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-12">
      {/* Back Button */}
      <Link
        href="/shop"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-secondary hover:text-brand-point transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> 목록으로 돌아가기
      </Link>

      {/* Product Summary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {/* Left Column: Image Area */}
        <div className="space-y-4">
          <div className="relative w-full aspect-[4/5] bg-brand-primary/20 rounded-3xl overflow-hidden border border-brand-border shadow-sm">
            <Image
              src={selectedImage || product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
          {/* Thumbnails */}
          {product.detailImages.length > 1 && (
            <div className="flex gap-2">
              {product.detailImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`relative w-20 h-24 rounded-xl overflow-hidden bg-brand-primary/20 border-2 transition-all ${
                    (selectedImage || product.image) === img 
                      ? "border-brand-point scale-[0.98]" 
                      : "border-transparent hover:border-brand-border"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail image ${idx + 1}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Order Info Panel */}
        <div className="flex flex-col justify-between py-2 space-y-6">
          <div className="space-y-4">
            <div className="space-y-1">
              <span className="text-xs font-bold tracking-wider text-brand-point uppercase">{product.category}</span>
              <h1 className="text-2xl md:text-3xl font-extrabold text-brand-text font-serif">{product.name}</h1>
              <p className="text-xs md:text-sm text-brand-secondary font-medium tracking-wide">{product.englishName}</p>
            </div>

            {/* Rating Stars summary */}
            <div className="flex items-center gap-2 border-b border-brand-border/40 pb-4">
              <div className="flex text-amber-400 gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${i < Math.round(Number(averageRating)) ? "fill-current" : "text-zinc-200"}`} 
                  />
                ))}
              </div>
              <span className="text-xs font-semibold text-brand-text">{averageRating}</span>
              <span className="text-xs text-brand-secondary/60">({product.reviews.length}개의 후기)</span>
            </div>

            {/* Price section */}
            <div className="space-y-1">
              {product.originalPrice && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-brand-secondary/60 line-through">
                    {product.originalPrice.toLocaleString()}원
                  </span>
                  <span className="text-sm font-bold text-brand-point">{discountRate}% 할인</span>
                </div>
              )}
              <p className="text-2xl font-bold text-brand-text">
                {product.price.toLocaleString()}원
              </p>
            </div>

            <p className="text-xs text-brand-text/75 leading-relaxed font-light">
              {product.description}
            </p>

            {/* Size selector */}
            <div className="space-y-2.5 pt-4">
              <span className="text-xs font-bold text-brand-text tracking-wide block">사이즈 선택</span>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all border cursor-pointer ${
                      selectedSize === size
                        ? "bg-brand-secondary border-brand-secondary text-white shadow-sm"
                        : "bg-white border-brand-border text-brand-text hover:bg-brand-primary/20"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity control */}
            <div className="space-y-2.5 pt-4">
              <span className="text-xs font-bold text-brand-text tracking-wide block">수량 선택</span>
              <div className="inline-flex items-center border border-brand-border bg-white rounded-xl">
                <button
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  className="p-2.5 text-brand-secondary hover:text-brand-text transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 text-sm font-bold text-brand-text min-w-[32px] text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="p-2.5 text-brand-secondary hover:text-brand-text transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="space-y-3 pt-6 border-t border-brand-border/60">
            <div className="flex justify-between items-center text-sm font-semibold text-brand-text mb-2">
              <span>총 상품 금액</span>
              <span className="text-xl font-bold text-brand-point">{(product.price * quantity).toLocaleString()}원</span>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleAddToCart}
                className="py-4 bg-brand-primary/50 hover:bg-brand-primary text-brand-text font-bold text-xs sm:text-sm rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer border border-brand-border/60"
              >
                <ShoppingCart className="w-4 h-4" /> 장바구니 담기
              </button>
              <button
                onClick={handleBuyNow}
                disabled={isPaying}
                className="py-4 bg-brand-secondary hover:bg-brand-secondary/90 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                {isPaying ? <Loader2 className="w-4 h-4 animate-spin" /> : <CreditCard className="w-4 h-4" />} 바로 구매하기
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Menu Area */}
      <div className="pt-10">
        <div className="flex border-b border-brand-border overflow-x-auto scrollbar-none">
          {[
            { id: "detail", label: "상세설명" },
            { id: "size", label: "사이즈 가이드" },
            { id: "shipping", label: "배송/교환/반품" },
            { id: "reviews", label: `리뷰 (${product.reviews.length})` },
            { id: "qna", label: `Q&A (${qnaList.length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-3.5 px-6 text-xs sm:text-sm font-bold tracking-wide border-b-2 whitespace-nowrap transition-all duration-300 ${
                activeTab === tab.id
                  ? "border-brand-point text-brand-text"
                  : "border-transparent text-brand-text/45 hover:text-brand-text/75"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab contents */}
        <div className="py-10">
          
          {/* Tab 1: Detailed images */}
          {activeTab === "detail" && (
            <div className="space-y-8 max-w-3xl mx-auto flex flex-col items-center">
              <p className="text-xs sm:text-sm text-brand-text/80 leading-relaxed font-light text-center">
                위티베베는 자연주의 감성과 최상의 편안함을 연구합니다.<br />
                직접 촬영한 화보 이미지를 통해 원단 텍스처와 감각적인 핏을 확인해 보세요.
              </p>
              {product.detailImages.map((img, idx) => (
                <div key={idx} className="relative w-full aspect-[4/5] bg-brand-primary/20 rounded-3xl overflow-hidden border border-brand-border">
                  <Image
                    src={img}
                    alt={`Detail view ${idx + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 768px"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Tab 2: Size Guide Table */}
          {activeTab === "size" && (
            <div className="max-w-2xl mx-auto space-y-6">
              <h3 className="text-base font-bold text-brand-text font-serif">위티베베 아동의류 사이즈 조견표</h3>
              <p className="text-xs text-brand-secondary">
                * 아기의 성장 발육 정도에 따라 크기가 상이할 수 있으므로, 평소 자주 입히는 옷의 실측 단면과 비교해 주세요. (오차범위 ±1~2cm)
              </p>
              <div className="border border-brand-border rounded-2xl overflow-hidden bg-white shadow-sm">
                <table className="w-full text-center border-collapse text-xs">
                  <thead>
                    <tr className="bg-brand-primary/20 font-bold border-b border-brand-border">
                      <th className="py-3 px-4">사이즈 표기</th>
                      <th className="py-3 px-4">추천 나이</th>
                      <th className="py-3 px-4">추천 키(cm)</th>
                      <th className="py-3 px-4">추천 몸무게(kg)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-border/40 font-medium text-brand-text/80">
                    <tr>
                      <td className="py-3 px-4 font-bold">XS</td>
                      <td className="py-3 px-4">6 - 12개월</td>
                      <td className="py-3 px-4">70 - 80cm</td>
                      <td className="py-3 px-4">7 - 10kg</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold">S</td>
                      <td className="py-3 px-4">1 - 2세</td>
                      <td className="py-3 px-4">80 - 90cm</td>
                      <td className="py-3 px-4">10 - 13kg</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold">M</td>
                      <td className="py-3 px-4">2 - 3세</td>
                      <td className="py-3 px-4">90 - 100cm</td>
                      <td className="py-3 px-4">13 - 15kg</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold">L</td>
                      <td className="py-3 px-4">3 - 4세</td>
                      <td className="py-3 px-4">100 - 110cm</td>
                      <td className="py-3 px-4">15 - 18kg</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold">XL</td>
                      <td className="py-3 px-4">4 - 5세</td>
                      <td className="py-3 px-4">110 - 118cm</td>
                      <td className="py-3 px-4">18 - 22kg</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab 3: Shipping & Returns Info */}
          {activeTab === "shipping" && (
            <div className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 text-xs leading-relaxed text-brand-text/80 font-light">
              <div className="space-y-3 bg-white p-5 border border-brand-border rounded-2xl shadow-sm">
                <h4 className="font-bold text-sm text-brand-text flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-brand-secondary" /> 배송 안내
                </h4>
                <ul className="space-y-1.5 list-disc pl-4 text-brand-secondary">
                  <li>위티베베 전 상품은 CJ대한통운을 통해 안전하게 배송됩니다.</li>
                  <li>기본 배송비는 3,000원입니다. (5만원 이상 주문 시 무료배송)</li>
                  <li>배송 준비는 주문 확인 후 영업일 기준 1~3일 소요됩니다.</li>
                  <li>인기 리오더 상품군의 경우 배송이 7~10일 지연될 수 있습니다.</li>
                </ul>
              </div>
              <div className="space-y-3 bg-white p-5 border border-brand-border rounded-2xl shadow-sm">
                <h4 className="font-bold text-sm text-brand-text flex items-center gap-1.5">
                  <RotateCcw className="w-4 h-4 text-brand-secondary" /> 교환 및 반품 안내
                </h4>
                <ul className="space-y-1.5 list-disc pl-4 text-brand-secondary">
                  <li>상품 수령 후 7일 이내에 고객센터나 게시판을 통해 신청 가능합니다.</li>
                  <li>단순 변심으로 인한 반품 왕복 배송비는 6,000원입니다.</li>
                  <li>오가닉 원단 특성상 세탁 및 향료 노출된 제품은 교환/환불 불가합니다.</li>
                  <li>불량 또는 조기 훼손으로 인한 반송 비용은 전액 본사가 부담합니다.</li>
                </ul>
              </div>
            </div>
          )}

          {/* Tab 4: Reviews List */}
          {activeTab === "reviews" && (
            <div className="max-w-3xl mx-auto space-y-8">
              <div className="flex justify-between items-center border-b border-brand-border pb-4">
                <h3 className="text-base font-bold text-brand-text font-serif">위티베베 맘들의 생생 후기</h3>
                <span className="text-xs font-semibold text-brand-secondary">총 {product.reviews.length}개의 리얼 리뷰가 있습니다</span>
              </div>
              {product.reviews.length === 0 ? (
                <div className="text-center py-16 text-brand-secondary text-xs">
                  아직 작성된 구매 후기가 없습니다. 첫 후기를 작성해보세요!
                </div>
              ) : (
                <div className="divide-y divide-brand-border/40">
                  {product.reviews.map((rev) => (
                    <div key={rev.id} className="py-5 space-y-2">
                      <div className="flex justify-between items-center text-xs font-semibold">
                        <div className="flex items-center gap-2">
                          <span className="text-brand-text">{rev.author}</span>
                          <span className="text-[10px] bg-brand-primary/30 px-2 py-0.5 rounded text-brand-secondary">
                            정보: {rev.sizePurchased}
                          </span>
                        </div>
                        <span className="text-brand-secondary/60">{rev.date}</span>
                      </div>
                      {/* Star Rating */}
                      <div className="flex text-amber-400 gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-3 h-3 ${i < rev.rating ? "fill-current" : "text-zinc-200"}`} 
                          />
                        ))}
                      </div>
                      <p className="text-xs text-brand-text/90 font-light leading-relaxed">
                        {rev.content}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Review Write Form */}
              <form onSubmit={handleReviewSubmit} className="space-y-4 pt-8 border-t border-brand-border/60">
                <h4 className="text-xs font-bold text-brand-text uppercase tracking-wider">리뷰 작성하기</h4>
                
                {/* Rating selection & options */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-brand-secondary mb-1">별점</label>
                    <select
                      value={reviewRating}
                      onChange={(e) => setReviewRating(Number(e.target.value))}
                      className="w-full p-2 bg-white border border-brand-border rounded-xl text-xs outline-none text-brand-text focus:border-brand-secondary"
                    >
                      <option value="5">★★★★★ (5점)</option>
                      <option value="4">★★★★☆ (4점)</option>
                      <option value="3">★★★☆☆ (3점)</option>
                      <option value="2">★★☆☆☆ (2점)</option>
                      <option value="1">★☆☆☆☆ (1점)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-brand-secondary mb-1">사이즈 피팅감</label>
                    <select
                      value={reviewSizeFit}
                      onChange={(e) => setReviewSizeFit(e.target.value)}
                      className="w-full p-2 bg-white border border-brand-border rounded-xl text-xs outline-none text-brand-text focus:border-brand-secondary"
                    >
                      <option value="정사이즈">정사이즈</option>
                      <option value="작아요">작아요</option>
                      <option value="커요">커요</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-brand-secondary mb-1">자녀 개월수 / 나이</label>
                    <input
                      type="text"
                      value={reviewChildAge}
                      onChange={(e) => setReviewChildAge(e.target.value)}
                      placeholder="예: 18개월 / 3세"
                      className="w-full p-2 bg-white border border-brand-border rounded-xl text-xs outline-none text-brand-text focus:border-brand-secondary"
                    />
                  </div>
                </div>

                {/* Review content */}
                <div className="flex flex-col sm:flex-row gap-2">
                  <textarea
                    value={reviewContent}
                    onChange={(e) => setReviewContent(e.target.value)}
                    required
                    placeholder={user ? "아이의 실착 후기나 코디 팁을 남겨주시면 다른 분들께 큰 도움이 됩니다." : "리뷰를 등록하려면 먼저 로그인해 주세요."}
                    disabled={!user}
                    rows={3}
                    className="flex-1 p-4 bg-white border border-brand-border focus:border-brand-secondary rounded-xl text-xs outline-none text-brand-text placeholder:text-brand-secondary/40 resize-none font-medium disabled:bg-zinc-50"
                  />
                  <button
                    type="submit"
                    disabled={isReviewSubmitting || !user}
                    className="px-6 py-4 bg-brand-secondary hover:bg-brand-secondary/90 text-white font-bold text-xs rounded-xl tracking-wider shadow transition-all flex items-center justify-center cursor-pointer disabled:bg-zinc-300 disabled:cursor-not-allowed"
                  >
                    {isReviewSubmitting ? (
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                    ) : (
                      "리뷰 등록"
                    )}
                  </button>
                </div>
                {!user && (
                  <p className="text-[10px] text-brand-point font-semibold">
                    * 리뷰는 회원만 작성할 수 있습니다. 
                    <button type="button" onClick={() => setLoginOpen(true)} className="underline ml-1 cursor-pointer">로그인하기</button>
                  </p>
                )}
              </form>
            </div>
          ) }

          {/* Tab 5: Q&A */}
          {activeTab === "qna" && (
            <div className="max-w-3xl mx-auto space-y-8">
              <div className="flex justify-between items-center border-b border-brand-border pb-4">
                <h3 className="text-base font-bold text-brand-text font-serif">상품 Q&A 게시판</h3>
                <span className="text-xs font-semibold text-brand-secondary">총 {qnaList.length}건의 문의사항이 있습니다</span>
              </div>

              {/* Q&A List */}
              {qnaList.length === 0 ? (
                <div className="text-center py-10 text-brand-secondary text-xs">
                  등록된 상품 질문이 없습니다. 사이즈나 코디 정보가 궁금하시다면 물어보세요!
                </div>
              ) : (
                <div className="space-y-4">
                  {qnaList.map((item) => (
                    <div key={item.id} className="p-5 bg-white border border-brand-border rounded-2xl space-y-3 text-xs shadow-sm">
                      <div className="flex justify-between text-brand-secondary/80 font-medium">
                        <span className="font-bold text-brand-text">{item.author}</span>
                        <span>{item.date}</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-start gap-1.5 font-semibold text-brand-text">
                          <HelpCircle className="w-4 h-4 text-brand-point flex-shrink-0 mt-0.5" />
                          <p>{item.question}</p>
                        </div>
                        {item.answer ? (
                          <div className="pl-6 border-l border-brand-secondary/40 space-y-1 text-brand-secondary">
                            <p className="font-bold text-brand-text">답변 완료 - 위티베베 에디터</p>
                            <p className="font-light">{item.answer}</p>
                          </div>
                        ) : (
                          <div className="pl-6 text-[10px] text-brand-point font-semibold">
                            답변을 준비하는 중입니다.
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Submit Question Box */}
              <form onSubmit={handleQnaSubmit} className="space-y-3 pt-6 border-t border-brand-border/60">
                <h4 className="text-xs font-bold text-brand-text uppercase tracking-wider">상품 문의하기</h4>
                <div className="flex flex-col sm:flex-row gap-2">
                  <textarea
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    required
                    placeholder="사이즈나 원단, 리오더 주기 등 궁금하신 점을 작성해 주세요."
                    rows={2}
                    className="flex-1 p-4 bg-white border border-brand-border focus:border-brand-secondary rounded-xl text-xs outline-none text-brand-text placeholder:text-brand-secondary/40 resize-none font-medium"
                  />
                  <button
                    type="submit"
                    className="px-6 py-4 bg-brand-secondary hover:bg-brand-secondary/90 text-white font-bold text-xs rounded-xl tracking-wider shadow transition-all flex items-center justify-center cursor-pointer"
                  >
                    문의 등록
                  </button>
                </div>
              </form>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
