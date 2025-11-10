<script setup lang="ts">
import { ref, watch } from 'vue';
import { usePropertiesStore } from '@/stores/properties';
import type { PropertyFilters } from '@/models/property';
import PropertyFilterGroup from './PropertyFilterGroup.vue';

const store = usePropertiesStore();

interface SortingOption {
  label: string;
  sort_by: 'foreclosureAmount' | 'afterRepairValue' | 'address';
  order: 'asc' | 'desc';
}

const sortingOptions: SortingOption[] = [
  {
    label: 'Foreclosure Amount (Low to High)',
    sort_by: 'foreclosureAmount',
    order: 'asc',
  },
  {
    label: 'Foreclosure Amount (High to Low)',
    sort_by: 'foreclosureAmount',
    order: 'desc',
  },
  {
    label: 'Est. ARV (High to Low)',
    sort_by: 'afterRepairValue',
    order: 'desc',
  },
  {
    label: 'Est. ARV (Low to High)',
    sort_by: 'afterRepairValue',
    order: 'asc',
  },
  {
    label: 'Alphabetical (A>Z)',
    sort_by: 'address',
    order: 'asc',
  },
  {
    label: 'Alphabetical (Z>A)',
    sort_by: 'address',
    order: 'desc',
  },
];

const selectedSorting = ref<SortingOption | null>(
  store.filters.sort_by && store.filters.order
    ? sortingOptions.find(
      opt =>
        opt.sort_by === store.filters.sort_by &&
        opt.order === store.filters.order
    ) || null
    : null
);

watch(
  () => [store.filters.sort_by, store.filters.order],
  () => {
    if (store.filters.sort_by && store.filters.order) {
      const option = sortingOptions.find(
        opt =>
          opt.sort_by === store.filters.sort_by &&
          opt.order === store.filters.order
      );
      selectedSorting.value = option || null;
    } else {
      selectedSorting.value = null;
    }
  }
);

const applyFilters = () => {
  const filters: PropertyFilters = {};

  if (selectedSorting.value) {
    filters.sort_by = selectedSorting.value.sort_by;
    filters.order = selectedSorting.value.order;
  }

  store.fetchProperties(filters);
};
</script>

<template>
  <div class="bg-white rounded-lg shadow-lg min-w-92">
    <PropertyFilterGroup>
      <template #label>Sorting Preference</template>
      <div>
        <div class="space-y-1">
          <button v-for="option in sortingOptions" :key="`${option.sort_by}-${option.order}`"
            @click="selectedSorting = option"
            class="w-full text-left px-3 py-2 text-sm rounded-md transition-colors cursor-pointer" :class="selectedSorting?.sort_by === option.sort_by &&
              selectedSorting?.order === option.order
              ? 'bg-neutral-100 text-gray-900 font-semibold'
              : 'text-gray-700 hover:bg-gray-50'
              ">
            {{ option.label }}
          </button>
        </div>
      </div>
    </PropertyFilterGroup>
    <div class="p-3 border-t border-gray-200">
      <button @click="applyFilters"
        class="w-full bg-cyan-800 text-white py-3.5 px-4 rounded-sm text-sm hover:bg-cyan-900 transition-colors cursor-pointer">
        Apply
      </button>
    </div>
  </div>
</template>
