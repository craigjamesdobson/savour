<template>
  <div v-if="templateRecipe">
    <RecipeHeader :active-recipe="activeRecipe" v-model:is-edit-mode="isEditMode" />
    <RecipeSectionEdit v-if="isEditMode" v-model="templateRecipe" :is-edit-mode="isEditMode"></RecipeSectionEdit>
    <RecipeSectionRead v-else :active-recipe="templateRecipe"></RecipeSectionRead>
  </div>
</template>

<script setup lang="ts">
import { DEFAULT_RECIPE_DATA } from "~/helpers/constants";

const templateRecipe = ref({ ...DEFAULT_RECIPE_DATA });

const isEditMode = ref(false);
const activeRecipe = templateRecipe;
</script>
