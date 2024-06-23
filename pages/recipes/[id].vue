<template>
  <div>
    <RecipeHeader :active-recipe="activeRecipe" v-model:is-edit-mode="isEditMode" />
    <RecipeSectionEdit v-if="isEditMode" :is-edit-mode="isEditMode" v-model="activeRecipe"></RecipeSectionEdit>
    <RecipeSectionRead v-else :active-recipe="activeRecipe"></RecipeSectionRead>
  </div>
</template>

<script setup>
import { useRecipeStore } from "@/stores/recipes";

const recipeStore = useRecipeStore();

const route = useRoute();

const isEditMode = ref(false);
const activeRecipe = computed(() => {
  return { ...recipeStore.getRecipeById(route.params.id) };
});
</script>

<style scoped></style>
