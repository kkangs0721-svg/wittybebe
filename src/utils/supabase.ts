import { createClient } from "@supabase/supabase-js";
import { Database } from "../types/database.types";
import { mockProducts, Product } from "@/data/mockData";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://your-project.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Helper to detect if Supabase is configured with real credentials
export const isSupabaseConfigured = (): boolean => {
  return (
    !!supabaseUrl &&
    supabaseUrl !== "https://your-project.supabase.co" &&
    supabaseUrl !== "https://placeholder.supabase.co" &&
    !!supabaseAnonKey &&
    supabaseAnonKey !== "placeholder-anon-key" &&
    !supabaseAnonKey.startsWith("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.placeholder")
  );
};

// Lists of New / Best items to match mock behavior for visuals
const NEW_ARRIVALS = [
  "scandi-organic-overalls",
  "modern-linen-play-set",
  "airy-peach-bow-blouse",
  "bear-ribbed-loungewear",
  "acorn-baby-bucket-hat",
  "natural-baby-bodysuit"
];

const BEST_SELLERS = [
  "scandi-organic-overalls",
  "modern-linen-play-set",
  "sage-soft-knit-cardigan",
  "wildflower-ribbon-dress",
  "scandi-eyelet-dress",
  "sage-puff-padded-outer",
  "cozy-waffle-easy-pants",
  "organic-stripe-shirt"
];

// Helper to dynamically map Supabase category to frontend categories
function mapDbCategory(category: string, name: string): Product["category"] {
  const norm = category.trim();
  if (norm === "우주복") {
    return name.includes("신생아") ? "신생아" : "베이비";
  }
  if (norm === "내복") {
    return "실내복";
  }
  if (norm === "외투") {
    return "아우터";
  }
  if (norm === "악세서리") {
    return "악세서리";
  }
  if (norm === "상의" || norm === "하의") {
    if (name.includes("원피스") || name.includes("블라우스")) {
      return "여아";
    }
    if (name.includes("남아") || name.includes("셔츠")) {
      return "남아";
    }
    return "등원룩";
  }
  return "베이비"; // fallback
}

// Fetch all products (for main pages and listing)
export async function getSupabaseProducts(): Promise<Product[]> {
  if (!isSupabaseConfigured()) {
    console.log("Supabase is not configured. Falling back to Mock Data.");
    return mockProducts;
  }

  try {
    // Fetch products along with their images and variants
    const { data: dbProducts, error } = await supabase
      .from("products")
      .select(`
        *,
        product_images (image_url, sort_order),
        product_variants (id, size, color, stock, sku, additional_price)
      `)
      .eq("status", "active")
      .order("created_at", { ascending: false });

    if (error) throw error;
    const productsData = dbProducts as any[];
    if (!productsData || productsData.length === 0) return mockProducts;

    // Fetch all reviews to attach to products
    const { data: dbReviews, error: reviewsError } = await supabase
      .from("reviews" as any)
      .select("*")
      .order("created_at", { ascending: false });

    const reviewsMap: Record<string, any[]> = {};
    if (!reviewsError && dbReviews) {
      (dbReviews as any[]).forEach((rev) => {
        if (!reviewsMap[rev.product_id]) {
          reviewsMap[rev.product_id] = [];
        }
        reviewsMap[rev.product_id].push({
          id: rev.id,
          author: "고*객", // Default masked author
          rating: rev.rating || 5,
          date: rev.created_at ? rev.created_at.split("T")[0] : new Date().toISOString().split("T")[0],
          content: rev.content || "",
          sizePurchased: rev.size_fit ? `${rev.size_fit} (${rev.child_age || "나이 미입력"})` : "정사이즈"
        });
      });
    }

    return productsData.map((p) => {
      // Sort images by sort_order
      const sortedImages = [...(p.product_images || [])].sort(
        (a: any, b: any) => (a.sort_order || 0) - (b.sort_order || 0)
      );

      const mainImage = p.thumbnail_url || (sortedImages[0]?.image_url) || "";
      const hoverImage = sortedImages[1]?.image_url || mainImage;

      // Extract distinct sizes
      const sizesList = Array.from(new Set((p.product_variants || []).map((v: any) => v.size))) as string[];

      return {
        id: p.id,
        name: p.name,
        englishName: p.slug
          .split("-")
          .map((w: any) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" "),
        price: p.discount_price ? p.discount_price : p.price,
        originalPrice: p.discount_price ? p.price : undefined,
        image: mainImage,
        hoverImage: hoverImage,
        category: mapDbCategory(p.category, p.name),
        isNew: NEW_ARRIVALS.includes(p.slug),
        isBest: BEST_SELLERS.includes(p.slug),
        description: p.description || "",
        detailImages: sortedImages.map((img: any) => img.image_url),
        sizes: sizesList,
        reviews: reviewsMap[p.id] || [],
        qna: [] // Mock QnA
      } as Product;
    });
  } catch (err) {
    console.error("Failed to query products from Supabase. Falling back to Mock Data:", err);
    return mockProducts;
  }
}

// Fetch single product details with full relations
export async function getSupabaseProductDetail(productId: string): Promise<Product | undefined> {
  const products = await getSupabaseProducts();
  return products.find((p) => p.id === productId);
}

// Interface for checkout orders
export interface OrderInput {
  userId?: string;
  orderNumber: string;
  totalAmount: number;
  shippingFee: number;
  paymentMethod: string;
  paymentKey: string;
  recipientName: string;
  recipientPhone: string;
  shippingAddress: string;
  items: {
    productId: string;
    productName: string;
    size: string;
    quantity: number;
    price: number;
  }[];
}

// Create an order in Supabase
export async function createSupabaseOrder(input: OrderInput): Promise<{ success: boolean; orderId?: string; error?: any }> {
  if (!isSupabaseConfigured()) {
    console.log("[Mock Checkout] Order logged:", input);
    return { success: true, orderId: input.orderNumber };
  }

  try {
    // 1. Insert order record
    const { data: orderData, error: orderError } = await supabase
      .from("orders" as any)
      .insert({
        user_id: input.userId || null,
        order_number: input.orderNumber,
        status: "paid", // Toss Sandbox pays instantly
        total_amount: input.totalAmount,
        shipping_fee: input.shippingFee,
        payment_method: input.paymentMethod,
        payment_key: input.paymentKey,
        recipient_name: input.recipientName,
        recipient_phone: input.recipientPhone,
        shipping_address: input.shippingAddress
      } as any)
      .select("id")
      .single();

    if (orderError) throw orderError;
    const dbOrderId = (orderData as any).id;

    // 2. Resolve variant UUIDs for order items and batch insert order items
    const orderItemsToInsert = [];
    for (const item of input.items) {
      // Find a variant that matches the selected size
      const { data: variantData } = await supabase
        .from("product_variants" as any)
        .select("id, color")
        .eq("product_id", item.productId)
        .eq("size", item.size)
        .limit(1)
        .maybeSingle();

      const variantObj = variantData as any;

      orderItemsToInsert.push({
        order_id: dbOrderId,
        product_id: item.productId,
        variant_id: variantObj?.id || null,
        product_name: item.productName,
        size: item.size,
        color: variantObj?.color || null,
        quantity: item.quantity,
        price: item.price
      });
    }

    const { error: itemsError } = await supabase
      .from("order_items" as any)
      .insert(orderItemsToInsert as any);

    if (itemsError) throw itemsError;

    return { success: true, orderId: dbOrderId };
  } catch (err) {
    console.error("Failed to create order in Supabase:", err);
    return { success: false, error: err };
  }
}

// Submit user review to Supabase
export async function submitSupabaseReview(review: {
  productId: string;
  userId?: string;
  rating: number;
  content: string;
  sizeFit: string;
  childAge: string;
}): Promise<boolean> {
  if (!isSupabaseConfigured()) {
    console.log("[Mock Review] Review submitted:", review);
    return true;
  }

  try {
    const { error } = await supabase
      .from("reviews" as any)
      .insert({
        product_id: review.productId,
        user_id: review.userId || null,
        rating: review.rating,
        content: review.content,
        size_fit: review.sizeFit,
        child_age: review.childAge,
        images: []
      } as any);

    if (error) throw error;
    return true;
  } catch (err) {
    console.error("Failed to post review to Supabase:", err);
    return false;
  }
}
