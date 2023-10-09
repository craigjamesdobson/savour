<template>
  <div>
    <h1 class="mb-5 text-4xl font-black">Meal Planner</h1>
    <div class="flex flex-col gap-5">
      <div v-for="(_, index) in plannerStore.planner" class="flex gap-5">
        <PlannerMeal v-model="plannerStore.planner[index]" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePlannerStore } from "~/stores/planner";
const plannerStore = usePlannerStore();

plannerStore.fetchMealPlan();
</script>

<style scoped></style>
