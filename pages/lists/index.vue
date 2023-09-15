<template>
  <div>
    <h1 class="text-4xl">Shopping List</h1>
    <!-- <UTable :columns="columns" :rows="items">
        <template #is_purchased-data="{ row }">
            <UCheckbox v-model="row.is_purchased" name="is_purchased" />
        </template>
    </UTable> -->
  </div>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient();

const columns = [{
  key: 'id',
  label: 'ID'
}, {
  key: 'item_name',
  label: 'items'
}, {
  key: 'quantity',
  label: 'quantity'
}, {
  key: 'category',
  label: 'category'
}, {
  key: 'is_purchased',
  label: 'purchased'
}]
import { useItemsStore } from '@/stores/items';
const itemsStore = useItemsStore();

const items = ref(computed(() => itemsStore.items));
</script>

<style scoped></style>
