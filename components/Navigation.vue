<template>
    <div class="w-full card flex flex-col justify-content-center">
        <nav class="flex flex-col gap-5">
            <nuxtLink
                class="flex w-full gap-5 items-center text-2xl py-2 px-3 bg-primary rounded-md text-gray-200 hover:bg-white/10"
                v-for="item in menuList" :to="item.url">
                <Icon :name="item.icon" />
                {{ item.label }}
            </nuxtLink>
        </nav>
    </div>
</template>

<script setup lang="ts">
const menuList = ref([
    { label: 'Home', url: '/', icon: 'clarity:home-line' },
    { label: 'List', url: '/lists', icon: 'bx:basket' },
    { label: 'Recipes', url: '/recipes', icon: 'octicon:book-16' }
]);
</script>

<style scoped></style>