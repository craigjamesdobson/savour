import { defineStore } from "pinia";

const formatItemData = (items: []) => {
  const categoryObject = items.reduce((acc, item) => {
    const { category } = item;

    // Check if the category already exists as a property, if not, create it
    if (!(category in acc)) {
      acc[category] = {
        category: category,
        items: [],
      };
    }

    // Push the item to the category's items array
    acc[category].items.push(item);

    return acc;
  }, {});

  // Convert the categoryObject into an array of category objects
  return Object.values(categoryObject);
};

export const useItemsStore = defineStore("items", () => {
  const supabase = useSupabaseClient();

  const items = ref([]);

  const fetchItems = async () => {
    const { data, error } = await supabase.from("items").select("*");
    if (error) {
      console.log(error);
    } else {
      items.value = data;
    }
  };

  const getItems = computed(() => items.value);
  const getItemsListedByCategory = computed(() => formatItemData(items.value));
  const getItemById = computed(
    () => (id: number) => items.value.find((item) => item.id === id)
  );

  return {
    items,
    fetchItems,
    getItems,
    getItemsListedByCategory,
    getItemById,
  };
});
