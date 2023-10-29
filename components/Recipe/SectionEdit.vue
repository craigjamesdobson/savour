<template>
    <div class="flex flex-col gap-5 my-5">
      <div class="flex flex-col items-start gap-5 py-5">
        <MultiSelect
          v-model="modelValue.categories"
          :options="recipeStore.categories"
          optionLabel="name"
          placeholder="Select Categories..."
          display="chip"
          class="w-full md:w-72"
        >
          <template #option="slotProps">
            <div class="flex gap-2 align-items-center">
              <RecipeCategory :category="slotProps.option"></RecipeCategory>
              <div>{{ slotProps.option.name }}</div>
            </div>
          </template>
        </MultiSelect>
        <div class="flex-auto mb-2">
          <InputNumber
            v-model="modelValue.servings"
            prefix="Serves "
            showButtons
            buttonLayout="horizontal"
            :min="0"
            :max="100"
            :pt="{
              input: { class: 'p-2 border-primary border w-full' },
              incrementButton: { class: 'bg-primary text-white' },
              decrementButton: { class: 'bg-primary text-white' },
            }"
          />
        </div>
        <div class="flex justify-start gap-2">
          <Icon
            v-for="i in modelValue.servings"
            size="1.5rem"
            name="codicon:account"
          />
        </div>
      </div>
      <Editor v-model="modelValue.ingredients" />
      <hr />
      <Editor v-model="modelValue.instructions" />
    </div>
</template>

<script setup lang="ts">
import { useRecipeStore } from "@/stores/recipes";
import type { Recipe } from '~/types/recipe.interface';

const recipeStore = useRecipeStore();
const modelValue: Ref<Recipe | undefined> = defineModel();

defineProps<{
  isEditMode: Boolean;
}>();

</script>