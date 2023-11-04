interface Category {
  id: number;
  name: string | null;
  icon: string | null;
}
interface Recipe {
  id: number;
  name: string | null;
  source: string | null;
  header_image: string | null;
  ingredients: string | null;
  servings: number | null;
  instructions: string | null;
  categories: Category[];
  deleted_at: string | null;
}

export type { Recipe, Category };
