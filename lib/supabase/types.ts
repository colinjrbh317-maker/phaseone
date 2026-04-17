export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      inventory: {
        Row: {
          available: number
          on_hand: number
          shipstation_sku: string
          synced_at: string
          warehouse_id: string
        }
        Insert: {
          available: number
          on_hand: number
          shipstation_sku: string
          synced_at: string
          warehouse_id: string
        }
        Update: {
          available?: number
          on_hand?: number
          shipstation_sku?: string
          synced_at?: string
          warehouse_id?: string
        }
        Relationships: []
      }
      orders: {
        Row: {
          clerk_user_id: string
          created_at: string
          currency: string
          id: string
          line_items: Json
          shipping_address: Json | null
          shipstation_order_id: string | null
          status: string
          tagadapay_order_id: string
          tagadapay_payment_id: string | null
          total_cents: number
          updated_at: string
        }
        Insert: {
          clerk_user_id: string
          created_at?: string
          currency?: string
          id?: string
          line_items: Json
          shipping_address?: Json | null
          shipstation_order_id?: string | null
          status: string
          tagadapay_order_id: string
          tagadapay_payment_id?: string | null
          total_cents: number
          updated_at?: string
        }
        Update: {
          clerk_user_id?: string
          created_at?: string
          currency?: string
          id?: string
          line_items?: Json
          shipping_address?: Json | null
          shipstation_order_id?: string | null
          status?: string
          tagadapay_order_id?: string
          tagadapay_payment_id?: string | null
          total_cents?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_clerk_user_id_fkey"
            columns: ["clerk_user_id"]
            isOneToOne: false
            referencedRelation: "users_ext"
            referencedColumns: ["clerk_user_id"]
          },
        ]
      }
      products: {
        Row: {
          badge: string | null
          coa_path: string | null
          created_at: string
          description: string
          disclaimer: string
          id: string
          image_path: string
          is_active: boolean
          name: string
          price_cents: number
          research_group: string
          shipstation_sku: string | null
          size: string
          slug: string
          updated_at: string
        }
        Insert: {
          badge?: string | null
          coa_path?: string | null
          created_at?: string
          description: string
          disclaimer: string
          id?: string
          image_path: string
          is_active?: boolean
          name: string
          price_cents: number
          research_group: string
          shipstation_sku?: string | null
          size: string
          slug: string
          updated_at?: string
        }
        Update: {
          badge?: string | null
          coa_path?: string | null
          created_at?: string
          description?: string
          disclaimer?: string
          id?: string
          image_path?: string
          is_active?: boolean
          name?: string
          price_cents?: number
          research_group?: string
          shipstation_sku?: string | null
          size?: string
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      restock_pipeline: {
        Row: {
          eta_date: string | null
          id: string
          notes: string | null
          shipstation_sku: string
          stage: Database["public"]["Enums"]["pipeline_stage"]
          started_at: string
          updated_at: string
        }
        Insert: {
          eta_date?: string | null
          id?: string
          notes?: string | null
          shipstation_sku: string
          stage: Database["public"]["Enums"]["pipeline_stage"]
          started_at?: string
          updated_at?: string
        }
        Update: {
          eta_date?: string | null
          id?: string
          notes?: string | null
          shipstation_sku?: string
          stage?: Database["public"]["Enums"]["pipeline_stage"]
          started_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "restock_pipeline_shipstation_sku_fkey"
            columns: ["shipstation_sku"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["shipstation_sku"]
          },
        ]
      }
      users_ext: {
        Row: {
          age_verified_at: string
          clerk_user_id: string
          created_at: string
          dob: string
          email: string
          klaviyo_profile_id: string | null
          research_use_accepted_at: string
        }
        Insert: {
          age_verified_at: string
          clerk_user_id: string
          created_at?: string
          dob: string
          email: string
          klaviyo_profile_id?: string | null
          research_use_accepted_at: string
        }
        Update: {
          age_verified_at?: string
          clerk_user_id?: string
          created_at?: string
          dob?: string
          email?: string
          klaviyo_profile_id?: string | null
          research_use_accepted_at?: string
        }
        Relationships: []
      }
    }
    Views: { [_ in never]: never }
    Functions: { [_ in never]: never }
    Enums: {
      pipeline_stage:
        | "ordered"
        | "sent_for_testing"
        | "in_qc"
        | "packaged_and_ready"
    }
    CompositeTypes: { [_ in never]: never }
  }
}
