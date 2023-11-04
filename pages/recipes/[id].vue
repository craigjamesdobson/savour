<template>
  <div>
    <RecipeHeader v-model="headerModel" />
    <RecipeSectionEdit
      v-if="isEditMode"
      :is-edit-mode="isEditMode"
      v-model="activeRecipe"
    ></RecipeSectionEdit>
    <RecipeSectionRead v-else :active-recipe="activeRecipe"></RecipeSectionRead>
  </div>
</template>

<script setup>
import { useRecipeStore } from "@/stores/recipes";

const recipeStore = useRecipeStore();

const route = useRoute();
const currentRoute = +route.params.id;

const isEditMode = ref(false);
const activeRecipe = ref({ ...recipeStore.getRecipeById(currentRoute)});

const headerModel = reactive({
  activeRecipe,
  isEditMode,
});
</script>

<style scoped></style>
