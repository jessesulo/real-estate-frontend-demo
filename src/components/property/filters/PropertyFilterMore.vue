<script setup lang="ts">
import { ref, watch } from 'vue';
import { usePropertiesStore } from '@/stores/properties';
import type { PropertyFilters } from '@/models/property';
import PropertyFilterGroup from './PropertyFilterGroup.vue';
import PropertyFilterRange from './PropertyFilterRange.vue';
import PropertyFilterTooltip from './PropertyFilterTooltip.vue';

const store = usePropertiesStore();

const generateSquareFootageMinOptions = () => {
  const options: Array<{ value: number | null; label: string }> = [
    { value: null, label: 'No Min' }
  ];

  for (let i = 0; i <= 5000; i += 100) {
    options.push({
      value: i,
      label: i.toLocaleString()
    });
  }

  for (let i = 6000; i <= 10000; i += 500) {
    options.push({
      value: i,
      label: i.toLocaleString()
    });
  }

  return options;
};

const generateSquareFootageMaxOptions = () => {
  const options: Array<{ value: number | null; label: string }> = [];

  for (let i = 0; i <= 5000; i += 100) {
    options.push({
      value: i,
      label: i.toLocaleString()
    });
  }

  for (let i = 6000; i <= 10000; i += 500) {
    options.push({
      value: i,
      label: i.toLocaleString()
    });
  }

  options.push({ value: null, label: 'No Max' });
  return options;
};

const squareFootageMinOptions = generateSquareFootageMinOptions();
const squareFootageMaxOptions = generateSquareFootageMaxOptions();

const yearMin = ref<string>(store.filters.year_from?.toString() ?? '');
const yearMax = ref<string>(store.filters.year_to?.toString() ?? '');
const sqMin = ref<number | null>(store.filters.sq_from ?? null);
const sqMax = ref<number | null>(store.filters.sq_to ?? null);
const incompleteData = ref<string>(store.filters.incomplete_data !== undefined
  ? (store.filters.incomplete_data ? 'Yes' : 'No')
  : 'Yes'
);

watch(
  () => store.filters,
  ({ year_from, year_to, sq_from, sq_to, incomplete_data }) => {
    yearMin.value = year_from?.toString() ?? '';
    yearMax.value = year_to?.toString() ?? '';
    sqMin.value = sq_from ?? null;
    sqMax.value = sq_to ?? null;
    incompleteData.value =
      incomplete_data !== undefined
        ? incomplete_data
          ? 'Yes'
          : 'No'
        : 'Yes';
  },
  { deep: true }
);

const applyFilters = () => {
  const filters: PropertyFilters = {};

  filters.year_from = parseInt(yearMin.value || '', 10) || undefined;
  filters.year_to   = parseInt(yearMax.value || '', 10) || undefined;
  filters.sq_from = sqMin.value;
  filters.sq_to = sqMax.value;
  filters.incomplete_data = incompleteData.value === 'Yes';

  store.fetchProperties(filters);
};
</script>

<template>
  <div class="bg-white rounded-lg shadow-lg min-w-92">
    <PropertyFilterGroup>
      <template #label>Year Built</template>
      <div class="flex justify-between items-center gap-2">
        <div class="flex-1 flex flex-col">
          <div class="text-center text-sm font-semibold mb-1">Minimum</div>
          <input v-model="yearMin" type="number" placeholder="-1"
            class="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-cyan-600" />
        </div>
        <span class="text-gray-400 relative top-3">-</span>
        <div class="flex-1 flex flex-col">
          <div class="text-center text-sm font-semibold mb-1">Maximum</div>
          <input v-model="yearMax" type="number" placeholder="No Max"
            class="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-cyan-600" />
        </div>
      </div>
    </PropertyFilterGroup>

    <PropertyFilterGroup>
      <template #label>Finished Square Footage</template>
      <PropertyFilterRange v-model:model-value-min="sqMin" v-model:model-value-max="sqMax"
        :min-options="squareFootageMinOptions" :max-options="squareFootageMaxOptions" />
    </PropertyFilterGroup>

    <PropertyFilterGroup>
      <template #label>
        Incomplete Data
        <PropertyFilterTooltip text="Include properties with missing information" />
      </template>
      <div>
        <div class="text-xs tracking-wider text-gray-600 mb-2">Include Properties with incomplete data in results?</div>
        <select v-model="incompleteData"
          class="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-cyan-600 appearance-none bg-white bg-no-repeat"
          style="background-image: url('data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23374151%22 stroke-width=%222%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22%3E%3Cpolyline points=%226 9 12 15 18 9%22%3E%3C/polyline%3E%3C/svg%3E'); background-size: 16px; background-position: right 0.75rem center;">
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
    </PropertyFilterGroup>

    <div class="p-3">
      <button @click="applyFilters"
        class="w-full bg-cyan-800 text-white py-3.5 px-4 rounded-sm text-sm hover:bg-cyan-900 transition-colors cursor-pointer">
        Apply
      </button>
    </div>
  </div>
</template>
