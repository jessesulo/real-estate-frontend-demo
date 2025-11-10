<script setup lang="ts">
import { ref, watch } from 'vue';
import { usePropertiesStore } from '@/stores/properties';
import type { PropertyFilters } from '@/models/property';
import PropertyFilterGroup from './PropertyFilterGroup.vue';
import PropertyFilterButtons from './PropertyFilterButtons.vue';

const store = usePropertiesStore();

const bedroomOptions = [
  { value: null, label: 'Any' },
  { value: '1', label: '1+' },
  { value: '2', label: '2+' },
  { value: '3', label: '3+' },
  { value: '4', label: '4+' },
  { value: '5', label: '5+' },
];

const bathroomOptions = [
  { value: null, label: 'Any' },
  { value: '1', label: '1+' },
  { value: '1.5', label: '1.5+' },
  { value: '2', label: '2+' },
  { value: '3', label: '3+' },
  { value: '4', label: '4+' },
];

const selectedBeds = ref<string | null>(
  store.filters.beds_exact != null
    ? store.filters.beds_exact.toString()
    : store.filters.beds?.replace('+', '') ?? null
);

const selectedBaths = ref<string | null>(
  store.filters.baths?.replace('+', '') ?? null
);

const useExactMatch = ref(store.filters.beds_exact !== undefined);

watch(
  () => store.filters,
  newVal => {
    if (!newVal.beds_exact) {
      selectedBeds.value = newVal.beds?.replace('+', '') ?? null;
    } else {
      selectedBeds.value = newVal.beds_exact ? newVal.beds_exact.toString() : null;
    }

    useExactMatch.value = newVal.beds_exact != null;

    selectedBaths.value = newVal.baths?.replace('+', '') ?? null;
  },
  { deep: true }
);

const applyFilters = () => {
  const filters: PropertyFilters = {};

  filters.beds = selectedBeds.value && !useExactMatch.value ? `${selectedBeds.value}+` : null;
  filters.beds_exact = selectedBeds.value && useExactMatch.value ? parseInt(selectedBeds.value) : null;
  filters.baths = selectedBaths.value ? `${selectedBaths.value}+` : null;

  store.fetchProperties(filters);
};
</script>

<template>
  <div class="bg-white rounded-lg shadow-lg min-w-92">
    <PropertyFilterGroup>
      <template #label>Number of Bedrooms</template>
      <div class="space-y-3">
        <PropertyFilterButtons v-model="selectedBeds" :options="bedroomOptions" />
        <label class="flex items-center gap-2 cursor-pointer">
          <input v-model="useExactMatch" type="checkbox"
            class="w-4 h-4 text-cyan-800 border-gray-300 rounded focus:ring-cyan-600" />
          <span class="text-sm text-gray-700">Use exact match</span>
        </label>
      </div>
    </PropertyFilterGroup>

    <PropertyFilterGroup>
      <template #label>Number of Bathrooms</template>
      <PropertyFilterButtons v-model="selectedBaths" :options="bathroomOptions" />
    </PropertyFilterGroup>

    <div class="p-3">
      <button @click="applyFilters"
        class="w-full bg-cyan-800 text-white py-3.5 px-4 rounded-sm text-sm hover:bg-cyan-900 transition-colors cursor-pointer">
        Apply
      </button>
    </div>
  </div>
</template>
