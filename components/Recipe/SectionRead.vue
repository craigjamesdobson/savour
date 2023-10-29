<template>
    <div class="ql-snow">
      <div
        class="flex flex-col-reverse justify-start gap-5 lg:flex-row md:justify-between"
      >
        <div class="!p-0 ql-editor" v-html="activeRecipe.ingredients"></div>
        <div class="flex flex-col gap-2 py-5 lg:items-end">
          <div class="flex gap-2 mb-2">
            <RecipeCategory
              v-for="category in activeRecipe.categories"
              :category="category"
            ></RecipeCategory>
          </div>
          <RecipeServings :servings="activeRecipe.servings ?? 0"></RecipeServings>
          <hr class="mt-5" />
        </div>
      </div>
      <hr class="my-5" />
      <div class="!p-0 ql-editor" v-html="activeRecipe.instructions"></div>
    </div>
</template>

<script setup lang="ts">
import type { Recipe } from '~/types/recipe.interface';

defineProps<{
  activeRecipe: Recipe;
}>();
</script>