<template>
  <div class="flex flex-col items-center w-full min-h-screen text-neutral-800 bg-primary">
    <div class="my-5">
      <h1
        class="gap-2 text-4xl font-thin tracking-widest md:flex text-gray-50"
      >
        <Icon size="2.5rem" name="fluent:bowl-salad-20-regular" /> SAVOUR
      </h1>
    </div>
    <main class="w-full px-4 my-auto mb-20 md:h-full md:w-5/6">
      <div class="h-full p-8 overflow-y-auto rounded-lg bg-secondary">
        <slot v-if="accountStore.dataLoaded" />
        <p v-else>Loading...</p>
      </div>
    </main>
    <div class="fixed bottom-0 z-50 flex flex-row items-center justify-between w-full p-4 bg-primary">
      <Navigation />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAccountStore } from "@/stores/account";
const accountStore = useAccountStore();
</script>

<style scoped>

main {
  height: calc(100vh - 165px);
}
</style>
