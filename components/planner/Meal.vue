<template>
  <div class="flex flex-col gap-5">
    <div class="flex items-center justify-between gap-5">
      <h2 class="text-lg font-bold">{{ modelValue.label }}</h2>
      <div class="flex gap-2.5">
        <Button icon="pi pi-pencil" outlined rounded aria-label="Edit" v-if="!isEditMode"
          @click="isEditMode = true" />
        <Button icon="pi pi-save" outlined rounded aria-label="Save" v-else @click="handleMealPlanUpdate"/>
        <Button icon="pi pi-times" @click="handleMealRemoval" rounded outlined severity="danger" aria-label="Remove" />
      </div>
    </div>
    <NuxtLink v-if="modelValue.recipe" class="shrink-0" :to="`/recipes/${modelValue.recipe.id}`">
      <img class="object-cover border rounded-lg aspect-[3/1] md:aspect-[5/1] w-full"
        :src="modelValue.recipe.header_image ?? FALLBACK_IMAGE" alt="main image" />
    </NuxtLink>
    <div class="flex gap-5">
      <div class="w-1/2 lg:w-3/4">
        <Dropdown class="w-full" v-if="isEditMode || modelValue.recipe === null" v-model="modelValue.recipe"
          :options="recipeStore.groupRecipesByCategory(recipeStore.recipes)" optionLabel="name" optionGroupLabel="name"
          optionGroupChildren="recipes" :placeholder="modelValue.recipe?.name ?? 'please select a recipe'"
          :filter="true" :pt="{
            input: { class: 'py-2 px-3' },
          }">
          <template #optiongroup="slotProps">
            <div class="flex items-center">
              <Icon class="mr-2 text-primary" size="1.3rem" :name="slotProps.option.icon" />
              <div>{{ slotProps.option.name }}</div>
            </div>
          </template>
        </Dropdown>
        <NuxtLink v-else :to="`/recipes/${modelValue.recipe.id}`">{{
          modelValue.recipe.name
          }}</NuxtLink>
      </div>
      <div class="flex flex-col items-end gap-1 text-xs ml-auto text-right">
        <span>
          Updated on {{ new Date(modelValue.updated_at).toLocaleDateString('en-GB') }}
        </span>
        <span v-if="modelValue.user">{{ modelValue.user.first_name }} {{ modelValue.user.last_name }}</span>
      </div>
    </div>
    <div class="flex gap-2">
      <RecipeCategory v-if="modelValue.recipe" v-for="category in modelValue.recipe.categories" :category="category">
      </RecipeCategory>
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

const isEditMode = ref(modelValue.value.recipe ? false : true);

const handleMealRemoval = () => {
  if (!modelValue.value) throw new Error("Selected recipe does not exist");
  plannerStore.updateMealPlan(modelValue.value.id, null);
  modelValue.value.recipe = null;
  isEditMode.value = false;
};

const handleMealPlanUpdate = () => {
  if (!modelValue.value) throw new Error("Selected recipe does not exist");
  plannerStore.updateMealPlan(modelValue.value.id, modelValue.value.recipe.id);
  isEditMode.value = false;
};
</script>

<style scoped></style>
