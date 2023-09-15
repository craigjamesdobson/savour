<template>
  <div>
    <div
      class="relative flex bg-slate-950 place-content-center place-items-end"
    >
      <img
        width="2000"
        height="300"
        class="aspect-[2/1] lg:aspect-[4/1] object-cover w-full"
        :src="activeRecipe?.header_image"
        alt=""
      />
      <div
        class="absolute w-full h-full opacity-50 bg-gradient-to-t from-black/100 via-black/50 to-black/0 z-100"
      />
      <h2
        class="absolute z-10 p-5 text-4xl font-black tracking-wider text-center text-white"
      >
        {{ activeRecipe?.name }}
      </h2>
    </div>
    <p>{{ activeRecipe.source }}</p>
    <div :key="item.id" v-for="(item, i) in activeRecipe.items">
      <RecipeIngredient
        :recipe-id="activeRecipe.id"
        :recipe-item-id="item.id"
        :item-id="item.item_id"
        :item-description="item.amount"
      />
    </div>
    <!-- <form v-if="editing">
      <template :key="item.id" v-for="item in activeRecipe?.items">
        <div class="flex flex-row gap-5 mb-5">
          <Dropdown
            v-model="selectedCountry"
            :options="itemsStore.items"
            filter
            optionLabel="name"
            placeholder="Select an ingredient"
            class="w-full md:w-14rem"
          >
            <template #value="slotProps">
              <div v-if="slotProps.value" class="flex align-items-center">
                <div>{{ slotProps.value.name }}</div>
              </div>
              <span v-else>
                {{ slotProps.placeholder }}
              </span>
            </template>
            <template #option="slotProps">
              <div class="flex align-items-center">
                <div>{{ slotProps.option.name }}</div>
              </div>
            </template>
          </Dropdown>
          <input v-model="item.amount" type="text" />
        </div>
      </template>
    </form>
    <ul v-else>
      <li :key="item.id" v-for="item in activeRecipe?.items">
        {{ item.name }} - <input v-model="item.amount" type="text" />
      </li>
    </ul> -->
  </div>
</template>

<script setup>
import { useRecipeStore } from "@/stores/recipes";

const route = useRoute();
const currentRoute = +route.params.id;

const recipeStore = useRecipeStore();
const activeRecipe = ref(recipeStore.getRecipeById(currentRoute));
</script>

<style lang="scss" scoped></style>
