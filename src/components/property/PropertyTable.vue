<script setup lang="ts">
import { computed } from 'vue';
import { HeartIcon } from '@heroicons/vue/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/vue/24/solid';
import BasePagination from '@/components/BasePagination.vue';
import { usePropertiesStore } from '@/stores/properties';
import { formatCurrency, formatDate } from '@/utils/format';

const store = usePropertiesStore();

const toggleFavorite = (propertyId: number) => {
  store.toggleFavorite(propertyId);
};

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
      <div class="mb-8 overflow-x-auto">
        <div v-if="store.paginatedProperties.length === 0" class="flex justify-center items-center h-full">
          <div class="text-gray-400 text-lg">No properties found</div>
        </div>
        <table v-else class="w-full border-collapse">
          <thead class="bg-neutral-100 sticky top-0 z-10">
            <tr>
              <th
                class="px-4 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider border-b border-neutral-200">
              </th>
              <th
                class="px-4 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider border-b border-neutral-200">
                Address
              </th>
              <th
                class="px-4 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider border-b border-neutral-200">
                ARV
              </th>
              <th
                class="px-4 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider border-b border-neutral-200">
                Beds
              </th>
              <th
                class="px-4 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider border-b border-neutral-200">
                Baths
              </th>
              <th
                class="px-4 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider border-b border-neutral-200">
                Sq. Ft.
              </th>
              <th
                class="px-4 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider border-b border-neutral-200">
                Built
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-neutral-200">
            <tr v-for="property in store.paginatedProperties" :key="property.id"
              class="hover:bg-neutral-50 transition-colors">
              <td class="px-4 py-3 whitespace-nowrap">
                <component :is="store.isFavorite(property.id) ? HeartIconSolid : HeartIcon" :class="[
                  'w-5 h-5 cursor-pointer transition-colors',
                  store.isFavorite(property.id)
                    ? 'text-red-500'
                    : 'text-neutral-400 hover:text-red-500'
                ]" @click="toggleFavorite(property.id)" />
              </td>
              <td class="px-4 py-3 text-sm text-cyan-800 font-medium">
                {{ property.address }}
              </td>
              <td class="px-4 py-3 text-sm text-neutral-900 font-semibold">
                {{ formatCurrency(property.afterRepairValue) }}
              </td>
              <td class="px-4 py-3 text-sm text-neutral-600">
                {{ property.beds }}
              </td>
              <td class="px-4 py-3 text-sm text-neutral-600">
                {{ property.baths }}
              </td>
              <td class="px-4 py-3 text-sm text-neutral-600">
                {{ property.square.toLocaleString() }}
              </td>
              <td class="px-4 py-3 text-sm text-neutral-600">
                {{ formatDate(property.builtDate) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <BasePagination v-if="(store.showFavoritesOnly ? store.filteredProperties.length : store.totalCount) > 0"
        v-model="currentPage" :total="store.showFavoritesOnly ? store.filteredProperties.length : store.totalCount"
        :per-page="store.itemsPerPage" />
    </div>
  </div>
</template>
