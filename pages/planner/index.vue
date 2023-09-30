<template>
  <div>
    <h1 class="mb-5 text-4xl font-black">Meal Planner</h1>
    <div v-for="day in plannerStore.planner">
      {{ day.day }} -
      <nuxtLink :to="`/recipes/${day.recipe.id}`">{{ day.recipe.name }}</nuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePlannerStore } from "~/stores/planner";
const plannerStore = usePlannerStore();

plannerStore.fetchMealPlan();
</script>

<style scoped></style>
