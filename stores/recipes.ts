import { defineStore } from "pinia";
import type { Database } from "~/types/database.types";
import type { Category, Recipe } from "@/types/recipe.interface";

const sortRecipeByCategory = (recipes: Recipe[]) => {
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
  const categorisedRecipesArray = Object.values(categorisedRecipes);
  return categorisedRecipesArray;
};

export const useRecipeStore = defineStore("recipes", () => {
  const supabase = useSupabaseClient<Database>();

  const recipes: Ref<Recipe[]> = ref([]);
  const categories = ref([]);
  const cachedRecipes: Ref<Recipe[]> = ref([]);
  const recipesLoaded = ref(false);

  const fetchRecipes = async () => {
    const { data: categoryData } = await supabase.from("categories").select(`
    id,
    name,
    icon
  `);

    categories.value = categoryData;

    const { data, error: selectError } = await supabase.from("recipes").select(`
      id,
      name,
      source, 
      header_image,
      ingredients,
      instructions, 
      servings,
      categories (id, name, icon)
    `);

    if (selectError) {
      throw new Error(selectError.message);
    }

    recipes.value = data;

    // Create a cached version of the data that can be used for rollbacks
    cachedRecipes.value = data;
    recipesLoaded.value = true;
  };

  const updateRecipeCategories = async (recipe: Recipe) => {
    // Delete any categories that are in this recipe
    const { error: deleteError } = await supabase
      .from("recipe_category")
      .delete()
      .eq("recipe_id", recipe.id);

    if (deleteError) {
      throw new Error(deleteError.message);
    }

    // Create a new array of data that will be used
    // to update the database using the reactive state
    const newRawCategoryData = recipe.categories.map((x) => ({
      recipe_id: recipe.id,
      category_id: x.id,
    }));

    // Update the recipe_category table with the new data
    const { error: upsertError } = await supabase
      .from("recipe_category")
      .upsert(newRawCategoryData)
      .select();

    if (upsertError) {
      throw new Error(upsertError.message);
    }
  };

  const updateRecipe = async (recipe: Recipe) => {
    // Create a new array of data that will be used
    // to update the database using the reactive state
    const { categories, ...rawRecipeData } = recipe;

    // Update the database using the new data
    const { error: updateError } = await supabase
      .from("recipes")
      .update(rawRecipeData)
      .eq("id", recipe.id);

    if (updateError) {
      throw new Error(updateError.message);
    }
  };

  const updateRecipeAndCategories = async (recipeID: number) => {
    // Using optimisitic UI patterns we will update the state first to keep
    // things fast and fluid and if the database update fails we will rollback

    // Find the active recipe
    const activeRecipe = recipes.value.find((x) => x.id === recipeID);

    if (!activeRecipe) {
      throw new Error("Error finding recipe");
    }

    try {
      // Use promise all to make sure all aspects of the recipe have been updated
      await Promise.all([
        updateRecipe(activeRecipe),
        updateRecipeCategories(activeRecipe),
      ]);
    } catch (error) {
      // If there was an error updating the database then reset the state
      resetRecipeState();
      throw new Error("Recipe failed to update");
    }
  };

  const resetRecipeState = () => {
    recipes.value = cachedRecipes.value;
  };

  const groupRecipesByCategory = computed(() =>
    sortRecipeByCategory(recipes.value)
  );

  const getRecipeById = computed(
    () => (id: number) => recipes.value.find((recipe) => recipe.id === id)
  );

  return {
    recipes,
    categories,
    recipesLoaded,
    fetchRecipes,
    updateRecipeAndCategories,
    getRecipeById,
    groupRecipesByCategory,
  };
});
