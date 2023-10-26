<template>
  <h1 class="pb-5 mb-5 text-4xl font-black border-b border-primary">{{ props.heading }}</h1>
</template>

<script setup lang="ts">
const props = defineProps({
  heading: String,
});
</script>

<style scoped></style>
