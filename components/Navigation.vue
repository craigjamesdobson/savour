<template>
  <div class="flex flex-col w-full card justify-content-center">
    <nav class="flex flex-row gap-4 justify-evenly">
      <nuxtLink
        class="flex items-center justify-center gap-5 px-5 py-3 text-xl text-gray-200 border rounded-md border-primary md:w-full bg-primary hover:bg-white/10"
        v-for="item in menuList"
        :to="item.url"
      >
        <Icon size="2rem" :name="item.icon" />
        <span class="hidden md:flex">{{ item.label }}</span>
      </nuxtLink>
      <nuxtLink
        class="flex items-center justify-center gap-5 px-5 py-3 text-xl text-gray-200 border rounded-md border-primary md:w-full bg-primary hover:bg-white/10"
        v-if="!accountStore.user"
        to="/login"
      >
        <Icon name="ant-design:login-outlined" />
        <span class="hidden md:flex">Login</span>
      </nuxtLink>
      <nuxtLink
        class="flex items-center justify-center gap-5 px-5 py-3 text-xl text-gray-200 border rounded-md border-primary md:w-full bg-primary hover:bg-white/10"
        v-else
        to="/account"
      >
        <Icon size="1.5em" name="codicon:account" />
        <span class="hidden md:flex">Account</span>
      </nuxtLink>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { useAccountStore } from "@/stores/account";
const accountStore = useAccountStore();

const menuList = ref([
  { label: "Home", url: "/", icon: "clarity:home-line" },
  { label: "Meal Plan", url: "/planner", icon: "tabler:calendar" },
  {
    label: "Recipes",
    url: "/recipes",
    icon: "material-symbols:menu-book-outline",
  },
]);
</script>

<style scoped>
.router-link-active {
  @apply bg-white/25 border-white;
}
</style>
