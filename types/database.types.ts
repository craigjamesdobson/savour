export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
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
          day_id: number
          id: number
          label: string | null
          recipe_id: number | null
          updated_at: string | null
          updated_by: string | null
          user_group: number
        }
        Insert: {
          created_at?: string
          day_id?: number
          id?: number
          label?: string | null
          recipe_id?: number | null
          updated_at?: string | null
          updated_by?: string | null
          user_group?: number
        }
        Update: {
          created_at?: string
          day_id?: number
          id?: number
          label?: string | null
          recipe_id?: number | null
          updated_at?: string | null
          updated_by?: string | null
          user_group?: number
        }
        Relationships: [
          {
            foreignKeyName: "planner_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "planner_updated_by_fkey1"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          first_name: string | null
          id: string
          is_admin: boolean
          last_name: string | null
          user_group: number
        }
        Insert: {
          first_name?: string | null
          id: string
          is_admin?: boolean
          last_name?: string | null
          user_group?: number
        }
        Update: {
          first_name?: string | null
          id?: string
          is_admin?: boolean
          last_name?: string | null
          user_group?: number
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
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
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recipe_category_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
        ]
      }
      recipes: {
        Row: {
          deleted_at: string | null
          header_image: string | null
          id: number
          ingredients: string | null
          instructions: string | null
          name: string | null
          servings: number | null
          source: string | null
          user_group: number | null
        }
        Insert: {
          deleted_at?: string | null
          header_image?: string | null
          id?: number
          ingredients?: string | null
          instructions?: string | null
          name?: string | null
          servings?: number | null
          source?: string | null
          user_group?: number | null
        }
        Update: {
          deleted_at?: string | null
          header_image?: string | null
          id?: number
          ingredients?: string | null
          instructions?: string | null
          name?: string | null
          servings?: number | null
          source?: string | null
          user_group?: number | null
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
