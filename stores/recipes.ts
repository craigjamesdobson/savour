import { defineStore } from "pinia";
import { Database } from "~/types/database.types";
interface Category {
  name: string | null;
  icon: string | null;
}
interface Recipes {
  id: number;
  name: string | null;
  source: string | null;
  header_image: string | null;
  ingredients: string | null;
  instructions: string | null;
  categories: Category[];
}

const sortRecipeByCategory = (recipes: Recipes[]) => {

  // Create an object to hold categorized recipes
  const categorisedRecipes: any = {};

  // Iterate through the recipes and categorize them
  recipes.forEach((recipe) => {
    recipe.categories.forEach((category) => {
      if (!categorisedRecipes[category.id]) {
        categorisedRecipes[category.id] = {
          ...category,
          recipes: [],
        };
      }
      categorisedRecipes[category.id].recipes.push(recipe);
    });
  });

  // Convert the object into an array of categorized recipes
  const categorisedRecipesArray = Object.values(categorisedRecipes);

  return categorisedRecipesArray;
};

export const useRecipeStore = defineStore("recipes", () => {
  const supabase = useSupabaseClient<Database>();

  const recipes: Ref<Recipes[]> = ref([]);
  const recipesLoaded = ref(false);

  const fetchRecipes = async () => {
    const { data, error } = await supabase.from("recipes").select(`
      id,
      name,
      source, 
      header_image,
      ingredients,
      instructions, 
      servings,
      categories (id, name, icon)
    `);

    if (error) {
      throw error;
    }
    recipes.value = data;
    recipesLoaded.value = true;
  };

  const updateRecipe = async (recipeID: number) => {
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

  const groupRecipesByCategory = computed(() =>
    sortRecipeByCategory(recipes.value)
  );

  const getRecipeById = computed(
    () => (id: number) => recipes.value.find((recipe) => recipe.id === id)
  );

  return {
    recipes,
    recipesLoaded,
    fetchRecipes,
    updateRecipe,
    getRecipeById,
    groupRecipesByCategory,
  };
});
