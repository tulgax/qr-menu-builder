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
      businesses: {
        Row: {
          id: string
          user_id: string
          name: string
          description: string | null
          logo_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          description?: string | null
          logo_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          description?: string | null
          logo_url?: string | null
          created_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          business_id: string
          name: string
          display_order: number
          created_at: string
        }
        Insert: {
          id?: string
          business_id: string
          name: string
          display_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          business_id?: string
          name?: string
          display_order?: number
          created_at?: string
        }
      }
      menu_items: {
        Row: {
          id: string
          category_id: string
          name: string
          description: string
          price: number
          image_url: string | null
          tags: string[]
          display_order: number
          is_available: boolean
          created_at: string
        }
        Insert: {
          id?: string
          category_id: string
          name: string
          description: string
          price: number
          image_url?: string | null
          tags?: string[]
          display_order?: number
          is_available?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          category_id?: string
          name?: string
          description?: string
          price?: number
          image_url?: string | null
          tags?: string[]
          display_order?: number
          is_available?: boolean
          created_at?: string
        }
      }
      tables: {
        Row: {
          id: string
          business_id: string
          name: string
          capacity: number
          location: string | null
          position_x: number
          position_y: number
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          business_id: string
          name: string
          capacity: number
          location?: string | null
          position_x?: number
          position_y?: number
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          business_id?: string
          name?: string
          capacity?: number
          location?: string | null
          position_x?: number
          position_y?: number
          is_active?: boolean
          created_at?: string
        }
      }
      table_scans: {
        Row: {
          id: string
          table_id: string
          scanned_at: string
          user_agent: string | null
          ip_address: string | null
        }
        Insert: {
          id?: string
          table_id: string
          scanned_at?: string
          user_agent?: string | null
          ip_address?: string | null
        }
        Update: {
          id?: string
          table_id?: string
          scanned_at?: string
          user_agent?: string | null
          ip_address?: string | null
        }
      }
    }
  }
}

export type Business = Database['public']['Tables']['businesses']['Row']
export type Category = Database['public']['Tables']['categories']['Row']
export type MenuItem = Database['public']['Tables']['menu_items']['Row']
export type Table = Database['public']['Tables']['tables']['Row']
export type TableScan = Database['public']['Tables']['table_scans']['Row']


