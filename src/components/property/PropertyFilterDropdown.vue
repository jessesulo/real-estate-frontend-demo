<script setup lang="ts">
import { Menu, MenuButton, MenuItems } from '@headlessui/vue';
import { ChevronDownIcon } from '@heroicons/vue/20/solid';

const props = defineProps<{
  title: string
}>();
</script>

<template>
  <Menu as="div" class="relative inline-block" v-slot="{ open }">
    <MenuButton
      class="inline-flex w-full justify-center gap-x-1 bg-white px-2.5 py-1 text-sm border border-neutral-300 rounded-full cursor-pointer">
      {{ props.title }}
      <ChevronDownIcon class="-mr-1 size-5.5 text-cyan-950 transition-transform duration-200"
        :class="{ 'rotate-180': open }" aria-hidden="true" />
    </MenuButton>

    <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform scale-100" leave-active-class="transition ease-in duration-75"
      leave-from-class="transform scale-100" leave-to-class="transform opacity-0 scale-95">
      <MenuItems
        class="absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg outline-1 outline-black/5"
        @click.stop>
        <slot />
      </MenuItems>
    </transition>
  </Menu>
</template>