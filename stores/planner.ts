import { defineStore } from "pinia";
import { Database } from "~/types/database.types";
import { Planner } from "~/types/planner.interface";

export const usePlannerStore = defineStore("planner", () => {
  const supabase = useSupabaseClient<Database>();

  const planner: Ref<Planner[]> = ref([]);

  const fetchMealPlan = async () => {
    let { data, error } = await supabase
      .from("planner")
      .select(
        `
      id,
      label,
      recipe:recipes (id, name, header_image, categories (name, icon))
    `
      )
      .order("id");

    if (error) {
      throw error;
    }
    planner.value = data;
  };

  const updateMealPlan = async (
    mealPlanID: number,
    updatedRecipeID: number
  ) => {
    const supabase = useSupabaseClient<Database>();
    const { data, error } = await supabase
      .from("planner")
      .update({ recipe_id: updatedRecipeID })
      .eq("id", mealPlanID)
      .select();
  };

  return {
    planner,
    fetchMealPlan,
    updateMealPlan,
  };
});
