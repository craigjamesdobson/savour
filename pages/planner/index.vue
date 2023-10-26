<template>
  <div>
    <Header heading="Meal Planner"></Header>
    <div class="flex flex-col">
      <div v-for="(_, index) in plannerStore.planner">
        <PlannerMeal v-model="plannerStore.planner[index]" />
        <hr class="my-5">
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
