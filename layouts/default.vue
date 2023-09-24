<template>
  <div class="flex h-screen text-neutral-800 bg-primary">
    <div class="flex flex-col items-center justify-between w-1/6 h-full p-4">
      <h1
        class="flex gap-2 my-2 text-4xl font-thin tracking-widest text-gray-50"
      >
        <Icon size="2.5rem" name="fluent:bowl-salad-20-regular" /> SAVOUR
      </h1>
      <Navigation />
      <nuxtLink class="mb-2 text-gray-50" v-if="!accountStore.user" to="/login">
        <Icon mr-5 name="ant-design:login-outlined" />
        Login
      </nuxtLink>
      <nuxtLink class="mb-2 text-gray-50" v-else to="/account">
        <Icon class="mr-2" size="1.5em" name="codicon:account" />
        Account
      </nuxtLink>
    </div>
    <main class="w-5/6 h-full p-4">
      <div class="h-full p-10 overflow-y-auto rounded-lg bg-secondary">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useAccountStore } from "@/stores/account";

const accountStore = useAccountStore();
</script>

<style scoped></style>
