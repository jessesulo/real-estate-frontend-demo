<script setup lang="ts">
import { ref, watch } from 'vue';
import { usePropertiesStore } from '@/stores/properties';
import type { PropertyFilters } from '@/models/property';
import PropertyFilterGroup from './PropertyFilterGroup.vue';
import PropertyFilterRange from './PropertyFilterRange.vue';
import PropertyFilterTooltip from './PropertyFilterTooltip.vue';

const store = usePropertiesStore();

const generateCurrencyMinOptions = () => {
  const options: Array<{ value: number | null; label: string }> = [
    { value: null, label: 'No Min' }
  ];

  for (let i = 50000; i <= 1500000; i += 50000) {
    options.push({
      value: i,
      label: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
      }).format(i)
    });
  }

  return options;
};

const generateCurrencyMaxOptions = () => {
  const options: Array<{ value: number | null; label: string }> = [];

  for (let i = 50000; i <= 1500000; i += 50000) {
    options.push({
      value: i,
      label: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
      }).format(i)
    });
  }

  options.push({ value: null, label: 'No Max' });
  return options;
};

const generateLoanScoreMinOptions = () => {
  const options: Array<{ value: number | string | null; label: string }> = [
    { value: null, label: 'No Min' }
  ];

  for (let i = 0.25; i <= 3.5; i += 0.25) {
    options.push({
      value: i,
      label: i.toString()
    });
  }

  return options;
};

const generateLoanScoreMaxOptions = () => {
  const options: Array<{ value: number | string | null; label: string }> = [];

  for (let i = 0.25; i <= 3.5; i += 0.25) {
    options.push({
      value: i,
      label: i.toString()
    });
  }

  options.push({ value: null, label: '3.5+' });
  return options;
};

const currencyMinOptions = generateCurrencyMinOptions();
const currencyMaxOptions = generateCurrencyMaxOptions();
const loanScoreMinOptions = generateLoanScoreMinOptions();
const loanScoreMaxOptions = generateLoanScoreMaxOptions();

const arvMin = ref<number | null>(store.filters.arv_from ?? null);
const arvMax = ref<number | null>(store.filters.arv_to ?? null);

const faMin = ref<number | null>(store.filters.fa_from ?? null);
const faMax = ref<number | null>(store.filters.fa_to ?? null);

const loanMin = ref<number | string | null>(store.filters.loan_from ?? null);
const loanMax = ref<number | string | null>(
  store.filters.loan_to !== undefined
    ? store.filters.loan_to
    : null
);

watch(
  () => store.filters,
  newVal => {
    arvMin.value = newVal.arv_from ?? null;
    arvMax.value = newVal.arv_to ?? null;
    faMin.value = newVal.fa_from ?? null;
    faMax.value = newVal.fa_to ?? null;
    loanMin.value = newVal.loan_from ?? null;
    loanMax.value = newVal.loan_to ?? null;
  },
  { deep: true }
);

const applyFilters = () => {
  const filters: PropertyFilters = {};

  filters.arv_from = arvMin.value;
  filters.arv_to = arvMax.value;
  filters.fa_from = faMin.value;
  filters.fa_to = faMax.value;
  filters.loan_from = loanMin.value ? +loanMin.value : null;
  filters.loan_to = loanMax.value ? +loanMax.value : null;

  store.fetchProperties(filters);
};
</script>

<template>
  <div class="bg-white rounded-lg shadow-lg min-w-92">
    <PropertyFilterGroup>
      <template #label>Estimated After Repair Value</template>
      <PropertyFilterRange v-model:model-value-min="arvMin" v-model:model-value-max="arvMax"
        :min-options="currencyMinOptions" :max-options="currencyMaxOptions" />
    </PropertyFilterGroup>

    <PropertyFilterGroup>
      <template #label>Foreclosure Amount</template>
      <PropertyFilterRange v-model:model-value-min="faMin" v-model:model-value-max="faMax"
        :min-options="currencyMinOptions" :max-options="currencyMaxOptions" />
    </PropertyFilterGroup>

    <PropertyFilterGroup>
      <template #label>
        Loan Score
        <PropertyFilterTooltip text="Property loan score rating" />
      </template>
      <PropertyFilterRange v-model:model-value-min="loanMin" v-model:model-value-max="loanMax"
        :min-options="loanScoreMinOptions" :max-options="loanScoreMaxOptions" />
    </PropertyFilterGroup>

    <div class="p-3">
      <button @click="applyFilters"
        class="w-full bg-cyan-800 text-white py-3.5 px-4 rounded-sm text-sm hover:bg-cyan-900 transition-colors cursor-pointer">
        Apply
      </button>
    </div>
  </div>
</template>
