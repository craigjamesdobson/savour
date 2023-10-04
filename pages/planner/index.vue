<template>
  <div>
    <h1 class="mb-5 text-4xl font-black">Meal Planner</h1>
    <div class="flex flex-col gap-5">
      <nuxtLink
        v-for="day in plannerStore.planner"
        class="flex gap-5"
        :class="{ 'opacity-50': fetchCurrentDay() !== day.label }"
        :to="`/recipes/${day.recipe.id}`"
      >
        <img
          class="w-24 h-24 border rounded-lg"
          :src="
            day.recipe.header_image ??
            FALLBACK_IMAGE
          "
          alt="main image"
        />
        <div class="flex flex-col gap-2">
          <h2 class="font-bold">{{ day.label }}</h2>
          <p>{{ day.recipe.name }}</p>
          <div class="flex gap-2">
            <template v-for="category in day.recipe.categories">
              <span v-if="category.icon" class="p-2 border rounded-full">
                <Icon size="1.5rem" :name="category.icon" />
              </span>
            </template>
          </div>
        </div>
      </nuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FALLBACK_IMAGE } from "~/helpers/constants";
import { usePlannerStore } from "~/stores/planner";
const plannerStore = usePlannerStore();

plannerStore.fetchMealPlan();

const fetchCurrentDay = () => {
  var currentDate = new Date();

  var currentDay = currentDate.getDay();

  var daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return daysOfWeek[currentDay];
};

const currentDate = new Date();
const currentDay = currentDate.getDay();
</script>

<style scoped></style>
