export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          category: string;
          age_group: string;
          price: number;
          discount_price: number | null;
          thumbnail_url: string | null;
          status: string | null;
          created_at: string | null;
        }
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          category: string;
          age_group: string;
          price: number;
          discount_price?: number | null;
          thumbnail_url?: string | null;
          status?: string | null;
          created_at?: string | null;
        }
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          category?: string;
          age_group?: string;
          price?: number;
          discount_price?: number | null;
          thumbnail_url?: string | null;
          status?: string | null;
          created_at?: string | null;
        }
      }
      product_images: {
        Row: {
          id: string;
          product_id: string | null;
          image_url: string;
          sort_order: number | null;
        }
        Insert: {
          id?: string;
          product_id?: string | null;
          image_url: string;
          sort_order?: number | null;
        }
        Update: {
          id?: string;
          product_id?: string | null;
          image_url?: string;
          sort_order?: number | null;
        }
      }
      product_variants: {
        Row: {
          id: string;
          product_id: string | null;
          size: string;
          color: string | null;
          stock: number;
          sku: string | null;
          additional_price: number | null;
        }
        Insert: {
          id?: string;
          product_id?: string | null;
          size: string;
          color?: string | null;
          stock?: number;
          sku?: string | null;
          additional_price?: number | null;
        }
        Update: {
          id?: string;
          product_id?: string | null;
          size?: string;
          color?: string | null;
          stock?: number;
          sku?: string | null;
          additional_price?: number | null;
        }
      }
      profiles: {
        Row: {
          id: string;
          name: string | null;
          phone: string | null;
          created_at: string | null;
        }
        Insert: {
          id: string;
          name?: string | null;
          phone?: string | null;
          created_at?: string | null;
        }
        Update: {
          id?: string;
          name?: string | null;
          phone?: string | null;
          created_at?: string | null;
        }
      }
      addresses: {
        Row: {
          id: string;
          user_id: string | null;
          recipient: string;
          phone: string;
          zipcode: string | null;
          address: string;
          address_detail: string | null;
          is_default: boolean | null;
        }
        Insert: {
          id?: string;
          user_id?: string | null;
          recipient: string;
          phone: string;
          zipcode?: string | null;
          address: string;
          address_detail?: string | null;
          is_default?: boolean | null;
        }
        Update: {
          id?: string;
          user_id?: string | null;
          recipient?: string;
          phone?: string;
          zipcode?: string | null;
          address?: string;
          address_detail?: string | null;
          is_default?: boolean | null;
        }
      }
      orders: {
        Row: {
          id: string;
          user_id: string | null;
          order_number: string;
          status: string | null;
          total_amount: number;
          shipping_fee: number | null;
          payment_method: string | null;
          payment_key: string | null;
          recipient_name: string;
          recipient_phone: string;
          shipping_address: string;
          created_at: string | null;
        }
        Insert: {
          id?: string;
          user_id?: string | null;
          order_number: string;
          status?: string | null;
          total_amount: number;
          shipping_fee?: number | null;
          payment_method?: string | null;
          payment_key?: string | null;
          recipient_name: string;
          recipient_phone: string;
          shipping_address: string;
          created_at?: string | null;
        }
        Update: {
          id?: string;
          user_id?: string | null;
          order_number?: string;
          status?: string | null;
          total_amount?: number;
          shipping_fee?: number | null;
          payment_method?: string | null;
          payment_key?: string | null;
          recipient_name?: string;
          recipient_phone?: string;
          shipping_address?: string;
          created_at?: string | null;
        }
      }
      order_items: {
        Row: {
          id: string;
          order_id: string | null;
          product_id: string | null;
          variant_id: string | null;
          product_name: string;
          size: string | null;
          color: string | null;
          quantity: number;
          price: number;
        }
        Insert: {
          id?: string;
          order_id?: string | null;
          product_id?: string | null;
          variant_id?: string | null;
          product_name: string;
          size?: string | null;
          color?: string | null;
          quantity: number;
          price: number;
        }
        Update: {
          id?: string;
          order_id?: string | null;
          product_id?: string | null;
          variant_id?: string | null;
          product_name?: string;
          size?: string | null;
          color?: string | null;
          quantity?: number;
          price?: number;
        }
      }
      reviews: {
        Row: {
          id: string;
          product_id: string | null;
          user_id: string | null;
          rating: number | null;
          content: string | null;
          size_fit: string | null;
          child_age: string | null;
          images: string[] | null;
          created_at: string | null;
        }
        Insert: {
          id?: string;
          product_id?: string | null;
          user_id?: string | null;
          rating?: number | null;
          content?: string | null;
          size_fit?: string | null;
          child_age?: string | null;
          images?: string[] | null;
          created_at?: string | null;
        }
        Update: {
          id?: string;
          product_id?: string | null;
          user_id?: string | null;
          rating?: number | null;
          content?: string | null;
          size_fit?: string | null;
          child_age?: string | null;
          images?: string[] | null;
          created_at?: string | null;
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
