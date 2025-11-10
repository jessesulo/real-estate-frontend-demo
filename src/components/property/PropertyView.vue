<script setup lang="ts">
import { ref, computed } from 'vue';
import PropertyFilter from './PropertyFilter.vue';
import PropertyList from './PropertyList.vue';
import PropertyTable from './PropertyTable.vue';
import PropertyViewSwitcher from './PropertyViewSwitcher.vue';
import { usePropertiesStore } from '@/stores/properties';

const store = usePropertiesStore();
const isListView = ref(false);

const showingText = computed(() => {
  if (store.loading) {
    return 'Loading...';
  }
  const count = store.showFavoritesOnly ? store.filteredProperties.length : store.totalCount;
  return `Showing ${count} properties`;
});
</script>

<template>
  <div
    class="property-view md:h-[calc(100vh-theme(--header-height)-theme(--container-padding)-theme(--container-padding))] flex flex-col">
    <div class="flex justify-between items-center mb-4.5">
      <div class="text-gray-400 text-sm">{{ showingText }}</div>
      <PropertyViewSwitcher v-model="isListView" />
    </div>
    <PropertyFilter />
    <PropertyList v-if="!isListView" />
    <PropertyTable v-else />
  </div>
</template>