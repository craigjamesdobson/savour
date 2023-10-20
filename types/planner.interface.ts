import type { Recipe } from "./recipe.interface";

interface Planner {
  id: number;
  label: string | null;
  recipe: Recipe;
}

export type { Planner };
