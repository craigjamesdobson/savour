<template>
  <div v-if="templateRecipe">
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
import { DEFAULT_RECIPE_DATA } from "~/helpers/constants";
const isEditMode = true;

const templateRecipe = { ...DEFAULT_RECIPE_DATA };

const headerModel = reactive({
  activeRecipe: templateRecipe,
  isEditMode: true,
});
</script>
