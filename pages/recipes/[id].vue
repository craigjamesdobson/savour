<template>
  <div>
    <RecipeHeader v-model="headerModel" />
    <div v-if="isEditMode" class="flex flex-col gap-5 my-5">
      <div class="flex flex-col items-start gap-2 py-5">
        <div class="flex-auto mb-2">
          <InputNumber
            v-model="activeRecipe.servings"
            prefix="Serves "
            inputId="minmax-buttons"
            mode="decimal"
            showButtons
            :min="0"
            :max="100"
            inputClass="!p-2"
          />
        </div>
        <div class="flex justify-start gap-2">
          <Icon
            v-for="i in activeRecipe.servings"
            size="1.5rem"
            name="codicon:account"
          />
        </div>
      </div>
      <Editor v-model="activeRecipe.ingredients" />
      <hr />
      <Editor v-model="activeRecipe.instructions" />
    </div>
    <div v-else class="ql-snow">
      <div class="flex flex-col-reverse justify-start gap-5 lg:flex-row md:justify-between">
        <div class="!p-0 ql-editor" v-html="activeRecipe.ingredients"></div>
        <div class="flex flex-col gap-2 py-5 lg:items-end">
          Serves {{ activeRecipe.servings }}
          <div class="flex gap-2">
            <Icon
              v-for="i in activeRecipe.servings"
              size="1.5rem"
              name="codicon:account"
            />
          </div>
          <hr class="mt-5">
        </div>
      </div>
      <hr class="my-5" />
      <div class="!p-0 ql-editor" v-html="activeRecipe.instructions"></div>
    </div>
  </div>
</template>

<script setup>
import { useRecipeStore } from "@/stores/recipes";
import Editor from "primevue/editor";
import "quill/dist/quill.snow.css";

const recipeStore = useRecipeStore();


const route = useRoute();
const currentRoute = +route.params.id;

const isEditMode = ref(false);
const activeRecipe = ref(recipeStore.getRecipeById(currentRoute));

const headerModel = reactive({
  activeRecipe,
  isEditMode
})
</script>

<style scoped></style>
