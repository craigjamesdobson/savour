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
        updated_at,
        recipe:recipes (id, name, header_image, categories (name, icon)),
        user:updated_by (first_name, last_name)
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
      .update({ recipe_id: updatedRecipeID, updated_by: accountStore.user.id })
      .eq("id", mealPlanID)
      .select();
  };

  return {
    planner,
    fetchMealPlan,
    updateMealPlan,
  };
});
