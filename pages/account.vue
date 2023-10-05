<template>
  <div>
    <div class="flex flex-row justify-between">
      <h1 class="text-4xl">Account</h1>
      <button class="flex gap-2" @click="handleSignOut">
        <Icon size="1.5rem" name="uil:sign-out-alt" />Sign out
      </button>
    </div>
    <div class="my-10">Hi {{ accountStore.user.email }}</div>
  </div>
</template>

<script setup lang="ts">
import { useAccountStore } from "@/stores/account";
const accountStore = useAccountStore();
const supabase = useSupabaseClient();
const user = useSupabaseUser()

watch(user, () => {
  if (!user.value) {
    return navigateTo('/login')
  }
}, { immediate: true })

const handleSignOut = async () => {
  const { error } = await supabase.auth.signOut();
};
</script>

<style scoped></style>
