<script setup lang="ts">
import { computed } from 'vue';

interface ButtonOption {
  value: string | null;
  label: string;
}

const props = defineProps<{
  modelValue: string | null;
  options: ButtonOption[];
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | null): void;
}>();

const selectedValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

const selectOption = (value: string | null) => {
  selectedValue.value = value;
};
</script>

<template>
  <div class="flex border border-gray-300 rounded-md overflow-hidden">
    <button v-for="option in options" :key="option.label" type="button" :class="[
      'flex-1 px-2.5 py-3 text-xs font-medium transition-colors cursor-pointer border-r border-r-gray-300 last:border-r-0',
      selectedValue === option.value
        ? 'bg-cyan-800 text-white cursor-default!'
        : 'bg-white text-gray-700 hover:bg-gray-50'
    ]" @click="selectOption(option.value)">
      {{ option.label }}
    </button>
  </div>
</template>
