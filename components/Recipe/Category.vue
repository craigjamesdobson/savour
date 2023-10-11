<template>
  <div
    :title="category.name ?? 'ingredient'"
    v-if="category.icon"
    class="flex items-center justify-center rounded-full w-7 h-7 bg-primary border-primary"
  >
    <Icon class="text-white" size="1.3rem" :name="category.icon" />
  </div>
</template>

<script setup lang="ts">
import { Category } from "@/types/recipe.interface";
defineProps<{
  category: Category;
}>();
</script>

<style scoped></style>
