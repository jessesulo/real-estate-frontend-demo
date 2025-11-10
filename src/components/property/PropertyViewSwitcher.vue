<script setup lang="ts">
import { computed } from 'vue';
import { Switch } from '@headlessui/vue';

interface Props {
  modelValue: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();

const isList = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit('update:modelValue', value),
});
</script>

<template>
  <div class="flex items-center justify-end gap-2">
    <div class="text-gray-400 text-sm">View</div>
    <Switch v-model="isList"
      class="relative inline-flex h-3.5 w-6.5 items-center rounded-full bg-sky-600 cursor-pointer">
      <span class="sr-only">List or Tiles</span>
      <span :class="isList ? 'translate-x-0.5' : 'translate-x-3.5'"
        class="inline-block h-2.5 w-2.5 transform rounded-full bg-white transition" />
    </Switch>
    <div class="flex gap-2">
      <div class="text-neutral-700 text-sm cursor-pointer" :class="isList ? 'text-sky-600' : ''" @click="isList = true">
        List
      </div>
      <div class="text-neutral-700 text-sm cursor-pointer" :class="!isList ? 'text-sky-600' : ''"
        @click="isList = false">
        Tile
      </div>
    </div>
  </div>
</template>