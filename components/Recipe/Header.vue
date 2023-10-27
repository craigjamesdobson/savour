<template>
  <div class="relative flex bg-slate-950 place-content-center place-items-end">
    <NuxtImg
      placeholder
      width="2000"
      height="300"
      class="aspect-square lg:aspect-[4/1] object-cover w-full"
      :src="modelValue.activeRecipe.header_image"
      alt=""
    />
    <div
      class="absolute w-full h-full opacity-50 bg-gradient-to-t from-black/100 via-black/50 to-black/0 z-100"
    />
    <div
      class="absolute p-2 border border-white rounded-full hover:bg-white bg-white/50 right-5 top-5"
    >
      <button
        v-if="!modelValue.isEditMode"
        @click="modelValue.isEditMode = true"
      >
        <Icon size="2rem" name="tabler:edit" />
      </button>
      <button v-else @click="handleRecipeUpdate">
        <Icon size="2rem" name="fluent:save-16-regular" />
      </button>
    </div>
    <div
      class="absolute z-10 flex flex-col items-center justify-center gap-5 text-white left-5 right-5"
    >
      <input
        v-if="modelValue.isEditMode"
        class="w-full p-1 border border-white rounded-md md:w-2/3 bg-white/50"
        v-model="modelValue.activeRecipe.header_image"
        type="text"
      />
      <div
        class="flex flex-col w-full p-1 mb-5 overflow-hidden text-center border border-white rounded-md md:w-2/3 bg-white/25"
        v-if="modelValue.isEditMode"
      >
        <input
          class="text-2xl font-black tracking-wider text-center text-white bg-transparent md:text-4xl"
          v-model="modelValue.activeRecipe.name"
          type="text"
        />
        <input
          class="w-full py-1 text-sm font-light tracking-normal text-center bg-transparent"
          v-model="modelValue.activeRecipe.source"
          type="text"
        />
      </div>
      <h2
        v-else
        class="flex flex-col p-5 text-2xl font-black tracking-wider text-center text-white md:text-4xl"
      >
        {{ modelValue.activeRecipe.name }}
        <a
          class="py-1 text-sm font-light tracking-normal"
          target="_blank"
          :href="modelValue.activeRecipe.source"
          >{{ removeProtocolFromUrl(modelValue.activeRecipe.source) }}</a
        >
      </h2>
    </div>
  </div>
  <hr class="my-5" />
</template>

<script setup lang="ts">
import { removeProtocolFromUrl } from "@/helpers";

import { useRecipeStore } from "@/stores/recipes";
const recipeStore = useRecipeStore();

const modelValue = defineModel();

const handleRecipeUpdate = async () => {
  await recipeStore.updateRecipeAndCategories(modelValue.value.activeRecipe.id);
  modelValue.value.isEditMode = false;
};
</script>

<style scoped></style>
