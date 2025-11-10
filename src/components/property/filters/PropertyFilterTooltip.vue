<script setup lang="ts">
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue';

defineProps<{
  text: string;
}>();
</script>

<template>
  <Popover class="relative inline-block">
    <PopoverButton class="focus:outline-none">
      <span
        class="inline-block w-4 h-4 rounded-full bg-gray-200 text-gray-500 text-xs text-center ml-1 cursor-pointer">?</span>
    </PopoverButton>
    <transition enter-active-class="transition duration-200 ease-out" enter-from-class="translate-y-1 opacity-0"
      enter-to-class="translate-y-0 opacity-100" leave-active-class="transition duration-150 ease-in"
      leave-from-class="translate-y-0 opacity-100" leave-to-class="translate-y-1 opacity-0">
      <PopoverPanel
        class="absolute left-0 z-10 bg-white mt-1 w-50 p-2 rounded-md shadow-lg text-xs text-neutral-500 border border-neutral-100 text-center">
        {{ text }}
      </PopoverPanel>
    </transition>
  </Popover>
</template>
