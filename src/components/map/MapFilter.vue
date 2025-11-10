<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import MapFilterDropdown from './MapFilterDropdown.vue';
import { usePropertiesStore } from '@/stores/properties';
import type { PropertyFilters } from '@/models/property';
import { countyFilter, generateMonthFilter, listFilter } from '@/utils/mapFilters';

const store = usePropertiesStore();

const selectedCounty = ref<string>('All');
const selectedMonth = ref<string>('');
const selectedList = ref<string>('all');

const parseMonth = (value: string): number | undefined => {
  if (value === 'month0' || value === 'all' || !value) {
    return undefined;
  }
  const month = parseInt(value, 10);
  return isNaN(month) ? undefined : month;
};

const handleCountyChange = (value: string) => {
  selectedCounty.value = value;
  const county = value;
  const filters: PropertyFilters = { county: county === 'all' ? undefined : county };
  if (store.filters.month !== undefined) {
    filters.month = store.filters.month;
  }
  store.fetchProperties(filters);
};

const handleMonthChange = (value: string) => {
  selectedMonth.value = value;
  const month = parseMonth(value);
  const filters: PropertyFilters = { month };
  if (store.filters.county) {
    filters.county = store.filters.county;
  }
  store.fetchProperties(filters);
};

const handleListChange = (value: string) => {
  selectedList.value = value;
  store.showFavoritesOnly = value === 'favorites';

  const currentFilters = {
    county: store.filters.county,
    month: store.filters.month,
  };
  store.fetchProperties(currentFilters);
};

const monthFilter = computed(() => generateMonthFilter());

onMounted(() => {
  if (selectedCounty.value === 'All') {
    handleCountyChange('All');
  }
});
</script>

<template>
  <div class="flex justify-center map-filter absolute top-0 left-0 right-0 z-50">
    <div class="inline-flex items-center mx-auto px-3 h-12 bg-white rounded-full shadow-lg shadow-neutral-300">
      <MapFilterDropdown :filter="countyFilter" title="County" :model-value="selectedCounty"
        @change="handleCountyChange" />
      <MapFilterDropdown :filter="monthFilter" title="Month" :model-value="selectedMonth" @change="handleMonthChange" />
      <MapFilterDropdown :filter="listFilter" title="List" :model-value="selectedList" @change="handleListChange" />
    </div>
  </div>
</template>