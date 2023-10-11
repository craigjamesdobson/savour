<template>
  <div>
    <VitePwaManifest />
    <NuxtLayout>
       <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { useAccountStore } from '@/stores/account';
import { useRecipeStore } from '@/stores/recipes';
import { useItemsStore } from '@/stores/items';

const accountStore = useAccountStore();
const recipeStore = useRecipeStore();
const itemsStore = useItemsStore();

const user = useSupabaseUser();
accountStore.fetchUser();

const hydrateApp = async () => {
  try {
    const [recipes, items] = await Promise.all([
      recipeStore.fetchRecipes(),
      itemsStore.fetchItems(),
    ]);
    accountStore.dataLoaded = true;
  } catch (error) {
    throw error;
  }
}

if (accountStore.user?.value !== null) {
  hydrateApp();
}
</script>

<style scoped>

</style>
