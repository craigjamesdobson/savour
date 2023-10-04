import { defineStore } from "pinia";
import { Database } from "~/types/database.types";

interface Category {
  name: string | null;
  icon: string | null;
}

interface Recipe {
  id: number;
  name: string | null;
  header_image: string | null;
  categories: Category[];
}

interface Planner {
  label: string | null;
  recipe: Recipe;
}

export const usePlannerStore = defineStore("planner", () => {
  const supabase = useSupabaseClient<Database>();

  const planner: Ref<Planner[]> = ref([]);

  const fetchMealPlan = async () => {
    let { data, error } = await supabase.from("planner").select(`
      label,
      recipe:recipes (id, name, header_image, categories (name, icon))
    `);

    if (error) {
      throw error;
    }
    
    planner.value = data;
  };

  return {
    planner,
    fetchMealPlan,
  };
});
