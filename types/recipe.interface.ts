interface Category {
  name: string | null;
  icon: string | null;
}
interface Recipe {
  id: number;
  name: string | null;
  source: string | null;
  header_image: string | null;
  ingredients: string | null;
  instructions: string | null;
  categories: Category[];
}

export type { Recipe };
