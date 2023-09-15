<template>
    <div>
        <h1 class="text-4xl">Account</h1>
        <div class="my-10">Hi {{ accountStore.user.email }}</div>
    </div>
</template>

<script setup lang="ts">
import { useAccountStore } from "@/stores/account";

const accountStore = useAccountStore();
</script>

<style scoped>

</style>