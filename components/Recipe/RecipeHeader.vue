<template v-if="props.activeRecipe">
  <Toast position="bottom-center" />
  <ConfirmPopup
    :pt="{
      acceptButton: { class: 'text-primary p-2 border-primary' },
      rejectButton: { class: 'text-primary p-2 border-primary' }
    }"
  ></ConfirmPopup>
  <div class="relative flex bg-slate-950 place-content-center place-items-end">
    <img
      v-if="props.activeRecipe.header_image"
      width="2000"
      height="300"
      class="aspect-square lg:aspect-[4/1] object-cover w-full"
      :src="props.activeRecipe.header_image"
      alt=""
    />
    <div
      class="absolute w-full h-full opacity-50 bg-gradient-to-t from-black/100 via-black/50 to-black/0 z-100"
    />
    <div
      class="absolute flex items-center justify-center w-10 h-10 p-2 text-red-800 border border-red-800 rounded-full left-5 top-5"
    >
      <button @click="handleRecipeDelete">
        <Icon size="1.5rem" name="radix-icons:cross-2" />
      </button>
    </div>
    <div
      class="absolute flex items-center justify-center w-10 h-10 p-2 border border-white rounded-full hover:bg-white bg-white/50 right-5 top-5"
    >
      <button
        v-if="!isEditMode"
        @click="isEditMode = true"
      >
        <Icon size="1.5rem" name="tabler:edit" />
      </button>
      <button v-else @click="handleRecipeUpdate">
        <Icon size="1.5rem" name="fluent:save-16-regular" />
      </button>
    </div>
    <div
      class="absolute z-10 flex flex-col items-center justify-center gap-5 text-white left-5 right-5"
    >
      <input
        v-if="isEditMode"
        class="w-full p-1 border border-white rounded-md md:w-2/3 bg-white/50"
        v-model="props.activeRecipe.header_image"
        type="text"
      />
      <div
        class="flex flex-col w-full p-1 mb-5 overflow-hidden text-center border border-white rounded-md md:w-2/3 bg-white/25"
        v-if="isEditMode"
      >
        <input
          class="text-2xl font-black tracking-wider text-center text-white bg-transparent md:text-4xl"
          v-model="props.activeRecipe.name"
          type="text"
        />
        <input
          class="w-full py-1 text-sm font-light tracking-normal text-center bg-transparent"
          v-model="props.activeRecipe.source"
          type="text"
        />
      </div>
      <h2
        v-else
        class="flex flex-col p-5 text-2xl font-black tracking-wider text-center text-white md:text-4xl"
      >
        {{ props.activeRecipe.name }}
        <a
          v-if="props.activeRecipe.source"
          class="py-1 text-sm font-light tracking-normal"
          target="_blank"
          :href="props.activeRecipe.source"
          >{{ removeProtocolFromUrl(props.activeRecipe.source) }}</a
        >
      </h2>
    </div>
  </div>
  <hr class="my-5" />
</template>

<script setup lang="ts">
import { removeProtocolFromUrl } from "@/helpers";
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";
import { useRecipeStore } from "@/stores/recipes";
import type { Recipe } from "~/types/recipe.interface";

const recipeStore = useRecipeStore();
const toast = useToast();
const confirm = useConfirm();
const isEditMode = defineModel('isEditMode');
const props = defineProps<{
  activeRecipe: Recipe
}>()

const handleRecipeUpdate = async () => {
  await recipeStore.addOrUpdateRecipeAndCategories(
    props.activeRecipe
  );
  isEditMode.value = false;
  toast.add({
    severity: "success",
    detail: "Recipe has been updated",
    life: 3000,
  });
};

const handleRecipeDelete = async (event: Event) => {
  confirm.require({
    target: <HTMLElement>event.currentTarget,
    message: "Do you want to delete this recipe?",
    header: "Delete Confirmation",
    icon: "pi pi-info-circle",
    accept: () => {
      recipeStore.deleteRecipe(props.activeRecipe);
    }
  });
};
</script>

<style scoped></style>
