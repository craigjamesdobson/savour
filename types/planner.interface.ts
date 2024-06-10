import type { Recipe } from "./recipe.interface";

interface Planner {
  id: number;
  label: string | null;
  recipe: Recipe;
  user: any;
}

export type { Planner };
