<template>
  <div>
    <RecipeHeader v-model="headerModel" />
    <RecipeSectionEdit
      v-if="isEditMode"
      v-model="templateRecipe"
      :is-edit-mode="isEditMode"
    ></RecipeSectionEdit>
    <RecipeSectionRead
      v-else
      :active-recipe="templateRecipe"
    ></RecipeSectionRead>
  </div>
</template>

<script setup lang="ts">
const isEditMode = true;
const templateRecipe = reactive({
  id: 0,
  header_image:
    "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&q=80&w=1500&h=1500",
  ingredients: "<h2>Add Ingredients</h2>",
  instructions: "<h2>Add instructions</h2>",
  name: "Recipe Name",
  source: "Recipe Source",
  servings: 1,
  categories: [{ id: 11, name: "Unassigned", icon: "IconUnassigned" }],
});
const headerModel = reactive({
  activeRecipe: templateRecipe,
  isEditMode: true,
});
</script>
