<script setup lang="ts">
import { computed } from 'vue';

interface RangeOption {
  value: number | string | null;
  label: string;
}

const props = defineProps<{
  modelValueMin: number | string | null;
  modelValueMax: number | string | null;
  minOptions: RangeOption[];
  maxOptions: RangeOption[];
}>();

const emit = defineEmits<{
  (e: 'update:modelValueMin', value: number | string | null): void;
  (e: 'update:modelValueMax', value: number | string | null): void;
}>();

const minValue = computed({
  get: () => props.modelValueMin,
  set: (value) => emit('update:modelValueMin', value),
});

const maxValue = computed({
  get: () => props.modelValueMax,
  set: (value) => emit('update:modelValueMax', value),
});
</script>

<template>
  <div class="flex justify-between items-center gap-2">
    <div class="flex-1 flex flex-col">
      <div class="text-center text-sm font-semibold mb-1">Minimum</div>
      <select v-model="minValue"
        class="flex-1 px-3 py-2 pr-10 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-cyan-600 appearance-none bg-white bg-no-repeat"
        style="background-image: url('data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23374151%22 stroke-width=%222%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22%3E%3Cpolyline points=%226 9 12 15 18 9%22%3E%3C/polyline%3E%3C/svg%3E'); background-size: 16px; background-position: right 0.75rem center;">
        <option v-for="option in minOptions" :key="option.label" :value="option.value">
          {{ option.label }}
        </option>
      </select>
    </div>
    <span class="text-gray-400 relative top-3">-</span>
    <div class="flex-1 flex flex-col">
      <div class="text-center text-sm font-semibold mb-1">Maximum</div>
      <select v-model="maxValue"
        class="flex-1 px-3 py-2 pr-10 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-cyan-600 appearance-none bg-white bg-no-repeat"
        style="background-image: url('data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23374151%22 stroke-width=%222%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22%3E%3Cpolyline points=%226 9 12 15 18 9%22%3E%3C/polyline%3E%3C/svg%3E'); background-size: 16px; background-position: right 0.75rem center;">
        <option v-for="option in maxOptions" :key="option.label" :value="option.value">
          {{ option.label }}
        </option>
      </select>
    </div>
  </div>
</template>
