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
      items: {
        Row: {
          category: string | null
          created_at: string | null
          id: number
          is_purchased: boolean | null
          name: string
          quantity: number | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          id?: number
          is_purchased?: boolean | null
          name: string
          quantity?: number | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          id?: number
          is_purchased?: boolean | null
          name?: string
          quantity?: number | null
        }
        Relationships: []
      }
      members: {
        Row: {
          team_id: number
          user_id: number
        }
        Insert: {
          team_id: number
          user_id: number
        }
        Update: {
          team_id?: number
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "members_team_id_fkey"
            columns: ["team_id"]
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "members_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      recipe_items: {
        Row: {
          id: number
          item_amount: string | null
          item_id: number
          recipe_id: number
        }
        Insert: {
          id?: number
          item_amount?: string | null
          item_id: number
          recipe_id: number
        }
        Update: {
          id?: number
          item_amount?: string | null
          item_id?: number
          recipe_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "recipe_items_item_id_fkey"
            columns: ["item_id"]
            referencedRelation: "items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recipe_items_item_id_fkey"
            columns: ["item_id"]
            referencedRelation: "recipe_items_view"
            referencedColumns: ["item_id"]
          },
          {
            foreignKeyName: "recipe_items_recipe_id_fkey"
            columns: ["recipe_id"]
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recipe_items_recipe_id_fkey"
            columns: ["recipe_id"]
            referencedRelation: "recipe_items_view"
            referencedColumns: ["recipe_id"]
          }
        ]
      }
      recipes: {
        Row: {
          created_at: string
          header_image: string | null
          id: number
          items: number | null
          name: string | null
          source: string | null
        }
        Insert: {
          created_at?: string
          header_image?: string | null
          id?: number
          items?: number | null
          name?: string | null
          source?: string | null
        }
        Update: {
          created_at?: string
          header_image?: string | null
          id?: number
          items?: number | null
          name?: string | null
          source?: string | null
        }
        Relationships: []
      }
      teams: {
        Row: {
          id: number
          team_name: string | null
        }
        Insert: {
          id?: number
          team_name?: string | null
        }
        Update: {
          id?: number
          team_name?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          id: number
          name: string | null
        }
        Insert: {
          id?: number
          name?: string | null
        }
        Update: {
          id?: number
          name?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      recipe_items_view: {
        Row: {
          item_id: number | null
          item_name: string | null
          recipe_id: number | null
          recipe_name: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      get_recipe_by_id: {
        Args: {
          recipe_id: number
        }
        Returns: {
          id: number
          created_at: string
          name: string
          source: string
          items: number
        }[]
      }
      get_recipe_by_id_2: {
        Args: {
          recipe_id: number
        }
        Returns: {
          id: number
          created_at: string
          name: string
          source: string
          items: number
          item_id: number
          item_name: string
        }[]
      }
      get_recipe_by_id_3: {
        Args: {
          recipe_id: number
        }
        Returns: {
          id: number
          created_at: string
          name: string
          source: string
          items: number
          item_id: number
          item_name: string
        }[]
      }
      get_recipe_by_id_4: {
        Args: {
          recipe_id_param: number
        }
        Returns: {
          id: number
          created_at: string
          name: string
          source: string
          items: number
          item_id: number
          item_name: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
