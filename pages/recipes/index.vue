<template>
  <div>
    <h1 class="mb-5 text-4xl font-black">Recipe Book</h1>
    <div class="grid gap-8 lg:grid-cols-4">
      <NuxtLink
        :to="`/recipes/${recipe.id}`"
        class="relative flex items-end justify-center border aspect-square"
        v-for="recipe in recipes"
      >
        <img
          class="absolute object-cover w-full h-full"
          :src="recipe.header_image ?? FALLBACK_IMAGE"
          alt="main image"
        />
        <div
          class="absolute w-full h-full opacity-50 bg-gradient-to-t from-black/100 to-black/0 z-100"
        />
        <h2
          class="z-10 p-5 font-black tracking-wider text-center text-white text-md md:text-xl"
        >
          {{ recipe.name }}
        </h2>
      </NuxtLink>
      <NuxtLink
        :to="`/recipes/${recipe.id}`"
        class="relative flex items-end justify-center border aspect-square"
        v-for="recipe in recipes"
      >
        <img
          class="absolute object-cover w-full h-full"
          :src="recipe.header_image ?? FALLBACK_IMAGE"
          alt="main image"
        />
        <div
          class="absolute w-full h-full opacity-50 bg-gradient-to-t from-black/100 to-black/0 z-100"
        />
        <h2
          class="z-10 p-5 text-xl font-black tracking-wider text-center text-white"
        >
          {{ recipe.name }}
        </h2>
      </NuxtLink>
      <NuxtLink
        :to="`/recipes/${recipe.id}`"
        class="relative flex items-end justify-center border aspect-square"
        v-for="recipe in recipes"
      >
        <img
          class="absolute object-cover w-full h-full"
          :src="recipe.header_image ?? FALLBACK_IMAGE"
          alt="main image"
        />
        <div
          class="absolute w-full h-full opacity-50 bg-gradient-to-t from-black/100 to-black/0 z-100"
        />
        <h2
          class="z-10 p-5 text-xl font-black tracking-wider text-center text-white"
        >
          {{ recipe.name }}
        </h2>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRecipeStore } from "@/stores/recipes";
import { FALLBACK_IMAGE } from "~/helpers/constants";
const recipeStore = useRecipeStore();

const recipes = ref(computed(() => recipeStore.recipes));
</script>

<style scoped></style>
