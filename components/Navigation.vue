<template>
    <div class="flex flex-col w-full card justify-content-center">
        <nav class="flex flex-col gap-4">
            <nuxtLink
                class="flex items-center w-full gap-5 px-5 py-3 text-xl text-gray-200 rounded-md bg-primary hover:bg-white/10"
                v-for="item in menuList" :to="item.url">
                <Icon size="2rem" :name="item.icon" />
                {{ item.label }}
            </nuxtLink>
        </nav>
    </div>
</template>

<script setup lang="ts">
const menuList = ref([
    { label: 'Home', url: '/', icon: 'clarity:home-line' },
    { label: 'List', url: '/lists', icon: 'bx:basket' },
    { label: 'Recipes', url: '/recipes', icon: 'material-symbols:menu-book-outline' }
]);
</script>

<style scoped></style>