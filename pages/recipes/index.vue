<template>
  <div>
    <div class="flex items-start justify-between gap-2">
      <Header heading="Recipe Book"></Header>
      <NuxtLink
        to="/recipes/new"
        class="flex items-center justify-center w-12 h-12 text-white rounded-full bg-primary"
        @click=""
      >
        <Icon size="2rem" name="tabler:plus" />
      </NuxtLink>
    </div>
    <div class="flex flex-wrap gap-3 card justify-content-center">
        <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText v-model.lazy="searchQuery" placeholder="Search" />
        </span>
    </div>
    <div v-for="category in recipeStore.groupRecipesByCategory(filteredRecipes)">
      <div class="flex flex-row items-center gap-5">
        <RecipeCategory
        :category="category"
      ></RecipeCategory>
        <h1 class="my-5 text-2xl">{{ category.name }}</h1>
      </div>
      <div class="grid gap-8 lg:grid-cols-4">
        <div v-for="recipe in category.recipes">
          <NuxtLink
            :to="`/recipes/${recipe.id}`"
            class="flex justify-start items-end relative border rounded-md aspect-[2/1] overflow-hidden"
          >
            <NuxtImg
              class="absolute object-cover w-full h-full"
              :src="recipe.header_image ?? FALLBACK_IMAGE"
              alt="main image"
            />
            <div
              class="absolute w-full h-full bg-gradient-to-t from-black/75 to-black/0 z-100"
            />
            <h2
              class="z-10 p-5 font-black tracking-wider text-white text-md md:text-xl"
            >
              {{ recipe.name }}
            </h2>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRecipeStore } from "@/stores/recipes";
import { FALLBACK_IMAGE } from "~/helpers/constants";
const recipeStore = useRecipeStore();
const searchQuery = ref("");
const filteredRecipes = computed(() => recipeStore.getFilteredRecipes(searchQuery.value));
</script>

<style scoped></style>
