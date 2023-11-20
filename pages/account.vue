<template>
  <div>
    <div class="flex flex-row justify-between">
      <Header heading="Account"></Header>
      <button class="flex gap-2" @click="handleSignOut">
        <Icon size="1.5rem" name="uil:sign-out-alt" />Sign out
      </button>
    </div>
    <div class="mt-5">Hi, {{ accountStore.user.first_name }} {{ accountStore.user.last_name }}</div>
    <small>{{ accountStore.user.email }}</small>
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
