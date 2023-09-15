<template>
  <div>
    <p>{{ ingredient?.name }}</p>
    <Dropdown
      :options="itemsStore.getItemsListedByCategory"
      :modelValue="ingredient"
      @change="(event: any) => updateRecipeItem(event.value.id)"
      optionLabel="name"
      optionGroupLabel="category"
      optionGroupChildren="items"
      filter
      placeholder="Select an ingredient"
      class="w-full md:w-14rem"
    >
      <template #value="slotProps">
        <div v-if="slotProps.value" class="flex align-items-center">
          <div>{{ slotProps.value.name }}</div>
        </div>
        <span v-else>
          {{ slotProps.placeholder }}
        </span>
      </template>
      <template #option="slotProps">
        <div class="flex align-items-center">
          <div>{{ slotProps.option.name }}</div>
        </div>
      </template>
    </Dropdown>
    <p>{{ props.itemDescription }}</p>
  </div>
</template>

<script setup lang="ts">
import Dropdown from "primevue/dropdown";

import { useItemsStore } from "@/stores/items";
import { useRecipeStore } from "@/stores/recipes";

const itemsStore = useItemsStore();
const recipeStore = useRecipeStore();

const props = defineProps({
  recipeId: {
    type: Number,
    required: true,
  },
  recipeItemId: {
    type: Number,
    required: true,
  },
  itemId: {
    type: Number,
    required: true,
  },
  itemDescription: String,
});

const updateRecipeItem = async (itemID: number) => {
  recipeStore.updateRecipeItem(props.recipeId, props.recipeItemId, {
    id: props.recipeItemId,
    item_id: itemID,
    description: props.itemDescription,
  });
};

const selectedIngredientID = ref(computed(() => props.itemId) || 0);

const ingredient = computed(() =>
  itemsStore.getItemById(selectedIngredientID.value)
);
</script>

<style scoped></style>
