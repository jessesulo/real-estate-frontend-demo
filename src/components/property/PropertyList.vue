<script setup lang="ts">
import { computed } from 'vue';
import PropertyCard from './PropertyCard.vue';
import BasePagination from '@/components/BasePagination.vue';
import { usePropertiesStore } from '@/stores/properties';

const store = usePropertiesStore();

const currentPage = computed({
  get: () => store.currentPage,
  set: (value: number) => store.setPage(value),
});

</script>

<template>
  <div class="flex-1 overflow-y-auto">
    <div v-if="store.loading" class="flex justify-center items-center h-full">
      <div class="text-cyan-800 text-lg">Loading properties...</div>
    </div>
    <div v-else-if="store.error" class="flex justify-center items-center h-full">
      <div class="text-red-600 text-lg">{{ store.error }}</div>
    </div>
    <div v-else>
      <div class="overflow-y-auto mb-8">
        <div v-if="store.paginatedProperties.length === 0" class="flex justify-center items-center h-full">
          <div class="text-gray-400 text-lg">No properties found</div>
        </div>
        <div v-else class="grid grid-cols-[repeat(auto-fill,minmax(286px,1fr))] gap-4.5">
          <PropertyCard v-for="property in store.paginatedProperties" :key="property.id" :property="property" />
        </div>
      </div>
      <BasePagination v-if="(store.showFavoritesOnly ? store.filteredProperties.length : store.totalCount) > 0"
        v-model="currentPage" :total="store.showFavoritesOnly ? store.filteredProperties.length : store.totalCount"
        :per-page="store.itemsPerPage" />
    </div>
  </div>
</template>