<template>
  <NuxtLink :to="`/recipes/${modelValue.recipe.id}`">
    <NuxtImg
      class="w-24 h-24 border rounded-lg"
      :src="modelValue.recipe.header_image ?? FALLBACK_IMAGE"
      alt="main image"
    />
  </NuxtLink>
  <div class="flex flex-col gap-2">
    <div class="flex items-center gap-5">
      <h2 class="font-bold">{{ modelValue.label }}</h2>
      <div>
        <button v-if="!isEditMode" @click="isEditMode = true">
          <Icon size="1.5rem" name="tabler:edit" />
        </button>
        <button v-else @click="handleMealPlanUpdate">
          <Icon size="1.5rem" name="fluent:save-16-regular" />
        </button>
      </div>
    </div>
    <Dropdown
      v-if="isEditMode"
      v-model="modelValue.recipe"
      :options="recipeStore.groupRecipesByCategory"
      optionLabel="name"
      optionGroupLabel="name"
      optionGroupChildren="recipes"
      :placeholder="modelValue.recipe.name ?? 'please select a recipe'"
      :filter="true"
      :pt="{
        root: { class: 'w-full md:w-14rem' },
        input: { class: 'py-2 px-3' },
      }"
    >
      <template #optiongroup="slotProps">
        <div class="flex items-center">
          <Icon
            class="mr-2 text-primary"
            size="1.3rem"
            :name="slotProps.option.icon"
          />
          <div>{{ slotProps.option.name }}</div>
        </div>
      </template>
    </Dropdown>
    <NuxtLink v-else :to="`/recipes/${modelValue.recipe.id}`">{{
      modelValue.recipe.name
    }}</NuxtLink>
    <div class="flex gap-2">
      <RecipeCategory
        v-for="category in modelValue.recipe.categories"
        :category="category"
      ></RecipeCategory>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FALLBACK_IMAGE } from "~/helpers/constants";
import Dropdown from "primevue/dropdown";
import { useRecipeStore } from "~/stores/recipes";
import { usePlannerStore } from "~/stores/planner";
import type { Planner } from "@/types/planner.interface";

const recipeStore = useRecipeStore();
const plannerStore = usePlannerStore();
const modelValue: Ref<Planner | undefined> = defineModel();

const isEditMode = ref(false);

const handleMealPlanUpdate = () => {
  if (!modelValue.value) throw new Error("Selected recipe does not exist");
  plannerStore.updateMealPlan(modelValue.value.id, modelValue.value.recipe.id);
  isEditMode.value = false;
};
</script>

<style scoped></style>
