<template>
  <div>
    <h1 class="text-4xl">Home</h1>
    <a :href="fileData">Download</a>
  </div>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient();

const generateData = async () => {
  const { data, error } = await supabase.from("recipes").select().csv();
  const blob = new Blob([data], { type: "text/csv" });
  fileData.value = window.URL.createObjectURL(blob)
};

const fileData = ref();

generateData();
</script>

<style scoped></style>
