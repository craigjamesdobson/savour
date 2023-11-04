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
  const router = useRouter();

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
    `)
    .is('deleted_at', null)

    if (selectError) {
      throw new Error(selectError.message);
    }

    recipes.value = data;

    // Create a cached version of the data that can be used for rollbacks
    cachedRecipes.value = data;
    recipesLoaded.value = true;
  };

  const addNewRecipe = async (recipe: Recipe) => {
    // Create a new array of data that will be used
    // to update the database using the reactive state
    const { id, categories, ...rawRecipeData } = recipe;

    const { data, error: insertError } = await supabase
      .from("recipes")
      .insert(rawRecipeData)
      .select();

    if (insertError) {
      throw new Error(insertError.message);
    }

    return data;
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

  const addOrUpdateRecipeAndCategories = async (recipe: Recipe) => {

    // If the recipe ID is 0 then we know it is a new recipe that has the ID of 0
    if (recipe.id === 0) {
      try {
        // Add a new recipe to the db and push a new recipe 
        // into the state using the id returned from the db
        const [{ id }] = await addNewRecipe(recipe);
        const newRecipe = {...recipe, id: id}
        recipes.value.push(newRecipe)
        
        // Use the new recipe data to update the categories
        await updateRecipeCategories(newRecipe);

        // Navigate to the newly created recipe
        router.push(`/recipes/${id}`);
        
      } catch (err) {
        // If there was an error updating the database then reset the state
        resetRecipeState();
        throw new Error(err.message);
      }
    } else {  
      try {
        let activeRecipeID = recipes.value.findIndex(x => x.id === recipe.id);

        if (activeRecipeID !== undefined) {
          recipes.value[activeRecipeID] = recipe;
        }
        // Use promise all to make sure all aspects of the recipe have been updated
        await Promise.all([
          updateRecipe(recipe),
          updateRecipeCategories(recipe),
        ]);
      } catch (error) {
        // If there was an error updating the database then reset the state
        resetRecipeState();
        throw new Error("Recipe failed to update");
      } finally {
        // Recache the updated recipe state
        cachedRecipes.value = recipes.value;
      }
    }
  };

  const deleteRecipe = (recipe: Recipe) => {
    recipes.value = recipes.value.filter(x => x.id !== recipe.id);
    updateRecipe({...recipe, deleted_at: (new Date()).toISOString()})
    router.push(`/recipes`);
  }

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
    addNewRecipe,
    addOrUpdateRecipeAndCategories,
    deleteRecipe,
    getRecipeById,
    groupRecipesByCategory,
  };
});
