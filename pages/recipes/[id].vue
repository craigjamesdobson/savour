<template>
  <div>
    <RecipeHeader v-if="activeRecipe" :active-recipe="activeRecipe" v-model:is-edit-mode="isEditMode" />
    <RecipeSectionEdit v-if="isEditMode" :is-edit-mode="isEditMode" v-model:recipe="activeRecipe"></RecipeSectionEdit>
    <RecipeSectionRead v-else-if="activeRecipe" :active-recipe="activeRecipe"></RecipeSectionRead>
  </div>
</template>

<script setup>
import { useRecipeStore } from "@/stores/recipes";

const recipeStore = useRecipeStore();

const route = useRoute();

const isEditMode = ref(false);
const activeRecipe = computed(() =>
  recipeStore.getRecipeById(route.params.id)
);
</script>

<style scoped></style>
