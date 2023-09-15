import { defineStore } from "pinia";

interface Item {
  id?: number;
  item_id: number;
  description: string | undefined;
}

interface Recipes {
  id: number;
  name: string;
  source: string;
  header_image: string;
  items: Item[];
}

export const useRecipeStore = defineStore("recipes", () => {
  const supabase = useSupabaseClient();

  const recipes = ref<Recipes[]>([]);
  const recipesLoaded = ref(false);

  const fetchRecipes = async () => {
    const { data, error } = await supabase.from("recipes").select(`
    id, 
    name,
    source,
    header_image,
    items ( id, recipe_items(id, item_amount) )
  `);

    if (error) {
      throw error;
    }

    const formattedData = data.map((recipe) => ({
      id: recipe.id,
      name: recipe.name,
      source: recipe.source,
      header_image: recipe.header_image,
      items: recipe.items.map((item) => ({
        id: item.recipe_items[0].id,
        item_id: item.id,
        description: item.recipe_items[0].item_amount, // Assuming you want the first recipe_item
      })),
    }));
    recipes.value = formattedData;
    recipesLoaded.value = true;
  };

  const updateRecipeItem = async (
    recipeID: number,
    recipeItemID: number,
    data: Item,
  ) => {

    // Using optimisitic UI patterns we will update the state first to keep
    // things fast and fluid and if the database update fails we will rollback

    // Find the index of the current recipe
    const recipeIndex = recipes.value.findIndex((x) => x.id === recipeID);

    // Cache a version of the current items so it can be used to rollback state
    const resetState = [...recipes.value[recipeIndex].items];

    // Create a new array of items and update the new itemID
    const updatedItems = recipes.value[recipeIndex].items.map((item: Item) => {
      if (item.id === data.id) {
        return data;
      } else {
        return item;
      }
    });

    // Set the state to the newly created items array
    recipes.value[recipeIndex].items = updatedItems;

    // Delete the id key so it can be used in database update
    // delete data.id;

    // // Update the database using the new data
    // const { error } = await supabase
    //   .from("recipe_items")
    //   .update(data)
    //   .eq("id", recipeItemID);

    //   // If an error occurs reset the state back to the cached version and throw an error
    //   if (error) {
    //     recipes.value[recipeIndex].items = resetState;
    //     throw new Error("Recipe ingredient was not updated");
    //   }
  };


  const getRecipeById = computed(
    () => (id: number) => recipes.value.find((recipe) => recipe.id === id)
  );

  return {
    recipes,
    recipesLoaded,
    fetchRecipes,
    updateRecipeItem,
    getRecipeById,
  };
});
