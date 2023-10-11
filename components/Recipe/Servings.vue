<template>
  Serves {{ servings }}
  <div class="flex gap-2">
    <Icon
      v-for="i in servings"
      size="1.5rem"
      name="codicon:account"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  servings: Number;
}>();
</script>

<style scoped></style>
