<template>
    <div class="flex h-screen bg-primary">
        <div class="flex h-full w-1/6 flex-col items-center justify-between p-4">
            <h1 class="flex gap-2 text-4xl my-2 font-thin tracking-widest text-gray-50"><Icon size="2.5rem" name="fluent:bowl-salad-20-regular"/> SAVOUR</h1>
            <Navigation/>
            <div>Login</div>
        </div>
        <main class="h-full w-5/6 p-4">
            <div class="h-full overflow-y-auto rounded-lg bg-secondary p-10">
                <slot />
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped></style>