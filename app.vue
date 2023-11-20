<template>
  <div>
    <VitePwaManifest />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { useAccountStore } from "@/stores/account";
import { useRecipeStore } from "@/stores/recipes";

const accountStore = useAccountStore();
const recipeStore = useRecipeStore();

const user = useSupabaseUser();

const hydrateApp = async () => {
  try {
    const [recipes] = await Promise.all([
      recipeStore.fetchRecipes(),
    ]);
    accountStore.dataLoaded = true;
  } catch (error) {
    throw error;
  }
};

watch(
  user,
  async () => {
    if (user.value) {
      await accountStore.fetchUser();
      hydrateApp();
    }
  },
  { immediate: true }
);
</script>

<style scoped></style>
