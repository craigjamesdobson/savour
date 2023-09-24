import { defineStore } from "pinia";
import { Database } from "~/types/database.types";

interface Recipes {
  id: number;
  name: string | null;
  source: string | null;
  header_image: string | null;
  description: string | null;
  instructions: string | null;
}

export const useRecipeStore = defineStore("recipes", () => {
  const supabase = useSupabaseClient<Database>();

  const recipes = ref<Recipes[]>([]);
  const recipesLoaded = ref(false);

  const fetchRecipes = async () => {
    const { data, error } = await supabase.from("recipes").select("*");

    if (error) {
      throw error;
    }
    recipes.value = data;
    recipesLoaded.value = true;
  };

  const updateRecipe = async (
    recipeID: number,
  ) => {

    // Using optimisitic UI patterns we will update the state first to keep
    // things fast and fluid and if the database update fails we will rollback

    // Find the index of the current recipe
    const recipeIndex = recipes.value.findIndex((x) => x.id === recipeID);

    // Cache a version of the current items so it can be used to rollback state
    const resetState = recipes.value[recipeIndex];

    // Update the database using the new data
    const { error } = await supabase
      .from("recipes")
      .update(recipes.value[recipeIndex])
      .eq("id", recipeID);

      // If an error occurs reset the state back to the cached version and throw an error
      if (error) {
        throw new Error("Recipe ingredient was not updated");
      }
  };


  const getRecipeById = computed(
    () => (id: number) => recipes.value.find((recipe) => recipe.id === id)
  );

  return {
    recipes,
    recipesLoaded,
    fetchRecipes,
    updateRecipe,
    getRecipeById,
  };
});
