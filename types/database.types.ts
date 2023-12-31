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
      categories: {
        Row: {
          created_at: string
          icon: string | null
          id: number
          name: string | null
        }
        Insert: {
          created_at?: string
          icon?: string | null
          id?: number
          name?: string | null
        }
        Update: {
          created_at?: string
          icon?: string | null
          id?: number
          name?: string | null
        }
        Relationships: []
      }
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
      planner: {
        Row: {
          created_at: string
          id: number
          label: string | null
          recipe_id: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          label?: string | null
          recipe_id?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          label?: string | null
          recipe_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "planner_recipe_id_fkey"
            columns: ["recipe_id"]
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          }
        ]
      }
      recipe_category: {
        Row: {
          category_id: number
          recipe_id: number
        }
        Insert: {
          category_id: number
          recipe_id: number
        }
        Update: {
          category_id?: number
          recipe_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "recipe_category_category_id_fkey"
            columns: ["category_id"]
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recipe_category_recipe_id_fkey"
            columns: ["recipe_id"]
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          }
        ]
      }
      recipe_items: {
        Row: {
          description: string | null
          item_id: number
          recipe_id: number
        }
        Insert: {
          description?: string | null
          item_id: number
          recipe_id: number
        }
        Update: {
          description?: string | null
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
            foreignKeyName: "recipe_items_recipe_id_fkey"
            columns: ["recipe_id"]
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          }
        ]
      }
      recipes: {
        Row: {
          header_image: string | null
          id: number
          ingredients: string | null
          instructions: string | null
          name: string | null
          servings: number | null
          source: string | null
          tags: string[] | null
        }
        Insert: {
          header_image?: string | null
          id?: number
          ingredients?: string | null
          instructions?: string | null
          name?: string | null
          servings?: number | null
          source?: string | null
          tags?: string[] | null
        }
        Update: {
          header_image?: string | null
          id?: number
          ingredients?: string | null
          instructions?: string | null
          name?: string | null
          servings?: number | null
          source?: string | null
          tags?: string[] | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_recipe_with_items: {
        Args: {
          p_recipe_id: number
        }
        Returns: {
          recipe_id: number
          recipe_name: string
          item_id: number
          item_name: string
          item_description: string
        }[]
      }
      get_recipe_with_items_grouped: {
        Args: {
          p_recipe_id: number
        }
        Returns: {
          recipe_id: number
          recipe_name: string
          items: Json[]
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
