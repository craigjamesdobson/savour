import { defineStore } from "pinia";

export const usePlannerStore = defineStore("planner", () => {
  const supabase = useSupabaseClient();

  const planner = ref(null);

  const fetchMealPlan = async () => {
    let { data, error } = await supabase.from("planner").select(`
      day,
      recipe:recipes (id, name)
    `);
    planner.value = data;
  };

  return {
    planner,
    fetchMealPlan,
  };
});
