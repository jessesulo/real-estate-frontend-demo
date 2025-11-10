<script setup lang="ts">
import { QuestionMarkCircleIcon } from '@heroicons/vue/24/outline';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue';
</script>

<template>
  <div class="relative flex">
    <button
      class="flex px-3 py-1.25 rounded-full bg-white text-cyan-900 text-xs cursor-pointer underline underline-offset-4 hover:no-underline">
      Save Search
    </button>
    <Popover class="relative">
      <PopoverButton>
        <QuestionMarkCircleIcon class="w-4 h-4 text-neutral-700 relative -top-0.5 -left-3 cursor-pointer" />
      </PopoverButton>
      <transition enter-active-class="transition duration-200 ease-out" enter-from-class="translate-y-1 opacity-0"
        enter-to-class="translate-y-0 opacity-100" leave-active-class="transition duration-150 ease-in"
        leave-from-class="translate-y-0 opacity-100" leave-to-class="translate-y-1 opacity-0">
        <PopoverPanel
          class="absolute -left-1/2 -translate-x-1/2 z-10 bg-white mt-0 w-50 p-2 rounded-md shadow-lg text-xs text-neutral-500 border border-neutral-100 text-center">
          Save filters for Custom List
        </PopoverPanel>
      </transition>
    </Popover>
  </div>
</template>