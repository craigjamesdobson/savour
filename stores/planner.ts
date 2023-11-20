import { defineStore } from "pinia";
import type { Planner } from "~/types/planner.interface";
import { useAccountStore } from "./account";

export const usePlannerStore = defineStore("planner", () => {
  const supabase = useSupabaseClient();
  const accountStore = useAccountStore();

  const planner: Ref<Planner[] | null> = ref(null);

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
      .eq("user_group", accountStore.user.user_group)
      .order("day_id");

    if (error) {
      throw error;
    }
    planner.value = data;
  };

  const updateMealPlan = async (
    mealPlanID: number,
    updatedRecipeID: number
  ) => {
    const supabase = useSupabaseClient();
    await supabase
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
