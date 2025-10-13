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
          favicon_url: string | null
          primary_color: string
          background_color: string
          text_color: string
          card_background_color: string
          font_family: string
          heading_font_family: string
          layout_style: string
          menu_width: string
          phone: string | null
          email: string | null
          address: string | null
          website: string | null
          facebook_url: string | null
          instagram_url: string | null
          twitter_url: string | null
          opening_hours: Record<string, string> | null
          wifi_password: string | null
          additional_notes: string | null
          show_logo: boolean
          show_contact_info: boolean
          show_social_links: boolean
          show_opening_hours: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          description?: string | null
          logo_url?: string | null
          favicon_url?: string | null
          primary_color?: string
          background_color?: string
          text_color?: string
          card_background_color?: string
          font_family?: string
          heading_font_family?: string
          layout_style?: string
          menu_width?: string
          phone?: string | null
          email?: string | null
          address?: string | null
          website?: string | null
          facebook_url?: string | null
          instagram_url?: string | null
          twitter_url?: string | null
          opening_hours?: Record<string, string> | null
          wifi_password?: string | null
          additional_notes?: string | null
          show_logo?: boolean
          show_contact_info?: boolean
          show_social_links?: boolean
          show_opening_hours?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          description?: string | null
          logo_url?: string | null
          favicon_url?: string | null
          primary_color?: string
          background_color?: string
          text_color?: string
          card_background_color?: string
          font_family?: string
          heading_font_family?: string
          layout_style?: string
          menu_width?: string
          phone?: string | null
          email?: string | null
          address?: string | null
          website?: string | null
          facebook_url?: string | null
          instagram_url?: string | null
          twitter_url?: string | null
          opening_hours?: Record<string, string> | null
          wifi_password?: string | null
          additional_notes?: string | null
          show_logo?: boolean
          show_contact_info?: boolean
          show_social_links?: boolean
          show_opening_hours?: boolean
          created_at?: string
          updated_at?: string
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


