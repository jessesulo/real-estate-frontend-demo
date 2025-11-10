<script setup lang="ts">
import { computed } from "vue";

interface Props {
  modelValue: number;
  total: number;
  perPage?: number;
  maxVisible?: number;
  showInfo?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  perPage: 10,
  maxVisible: 5,
  showInfo: true,
});

const emit = defineEmits<{
  (e: "update:modelValue", value: number): void;
  (e: "change", value: number): void;
}>();

const totalPages = computed(() => Math.max(1, Math.ceil(props.total / props.perPage)));

const setPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    emit("update:modelValue", page);
    emit("change", page);
  }
};

const pages = computed(() => {
  const total = totalPages.value;
  const current = props.modelValue;
  const delta = Math.floor(props.maxVisible / 2);
  const range: (number | string)[] = [];
  const rangeWithDots: (number | string)[] = [];
  let l: number | undefined;

  for (let i = 1; i <= total; i++) {
    if (i === 1 || i === total || (i >= current - delta && i <= current + delta)) {
      range.push(i);
    }
  }

  for (const i of range) {
    if (typeof l === "number") {
      if (Number(i) - l === 2) rangeWithDots.push(l + 1);
      else if (Number(i) - l !== 1) rangeWithDots.push("...");
    }
    rangeWithDots.push(i);
    l = Number(i);
  }

  return rangeWithDots;
});
</script>

<template>
  <div class="flex justify-between items-start text-sm text-neutral-600">
    <p v-if="showInfo" class="text-xs">
      Showing page <b>{{ modelValue }}</b> of <b>{{ totalPages }}</b> pages
    </p>
    <div class="flex items-center">
      <button
        class="px-2.5 h-8 bg-white hover:bg-neutral-100 border border-neutral-300 transition-colors rounded-l-sm disabled:text-neutral-400 cursor-pointer disabled:cursor-default disabled:bg-white"
        :disabled="modelValue === 1" @click="setPage(modelValue - 1)">
        Previous
      </button>
      <button v-for="page in pages" :key="page" :disabled="page === '...'" @click="setPage(Number(page))"
        class="px-2.75 h-8 min-w-6 bg-white hover:bg-neutral-100 text-center border border-neutral-300 border-l-0 transition-colors cursor-pointer"
        :class="[
          page === modelValue
            ? 'bg-cyan-800! border-cyan-800! text-white'
            : 'hover:bg-gray-100 text-neutral-700',
        ]">
        {{ page }}
      </button>
      <button
        class="px-2.5 h-8 bg-white hover:bg-neutral-100 border border-neutral-300 border-l-0 transition-colors rounded-r-sm disabled:text-neutral-400 cursor-pointer disabled:cursor-default disabled:bg-white"
        :disabled="modelValue === totalPages" @click="setPage(modelValue + 1)">
        Next
      </button>
    </div>
  </div>
</template>
