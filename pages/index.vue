<template>
  <div>
    <Header heading="Home"></Header>
    <div class="grid grid-cols-1 gap-10 py-5 text-center lg:grid-cols-2">
      <NuxtLink to="/recipes" class="flex flex-col gap-5 p-10 border-2 rounded-md border-primary">
        <h2 class="text-3xl font-black">Recipe Book</h2>
        <hr>
        <p class="text-xl">Manage your recipe book and create recipes that can be used within your meal planner.</p>
      </NuxtLink>
      <NuxtLink to="/planner" class="flex flex-col gap-5 p-10 border-2 rounded-md border-primary">
        <h2 class="text-3xl font-black">Meal Planner</h2>
        <hr>
        <p class="text-xl">Select from your recipes list to plan your meals for the week.</p>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped></style>
