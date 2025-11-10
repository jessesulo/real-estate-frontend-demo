<script setup lang="ts">
import { ref } from 'vue';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
import { ChevronDownIcon } from '@heroicons/vue/20/solid';

interface MapFilter {
  title: string
  items: Array<MapFilterItem>
}

interface MapFilterItem {
  value: string
  label: string
}

const props = defineProps<{
  filter: Array<MapFilter>,
  title: string
  modelValue?: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'change', value: string): void;
}>();

const selectedValue = ref(props.modelValue);

const handleSelect = (value: string) => {
  selectedValue.value = value;
  emit('update:modelValue', value);
  emit('change', value);
};
</script>

<template>
  <Menu as="div" class="relative inline-block group" v-slot="{ open }">
    <MenuButton
      class="inline-flex justify-between px-3 py-0 text-sm w-35 border-r group-last:border-r-0 border-r-neutral-200 cursor-pointer">
      {{ props.title }}
      <ChevronDownIcon class="-mr-1 size-5.5 text-cyan-950 transition-transform duration-200"
        :class="{ 'rotate-180': open }" aria-hidden="true" />
    </MenuButton>

    <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform scale-100" leave-active-class="transition ease-in duration-75"
      leave-from-class="transform scale-100" leave-to-class="transform opacity-0 scale-95">
      <MenuItems
        class="absolute left-0 z-10 mt-4 w-56 origin-top-left rounded-md bg-white shadow-lg outline-1 outline-black/5 max-h-50 overflow-y-auto">
        <div class="py-1">
          <div v-for="group in props.filter" :key="group.title">
            <div class="text-xs text-cyan-850 opacity-80 px-3.5 py-2">{{ group.title }}</div>
            <MenuItem v-for="item in group.items" :key="item.value" v-slot="{ active }">
            <a href="#" :class="[
              active ? 'bg-gray-100 text-gray-900 outline-hidden' : 'text-gray-700',
              selectedValue === item.value ? 'bg-cyan-50 text-cyan-800 font-medium' : '',
              'block px-4 py-2 text-sm cursor-pointer'
            ]" @click.prevent="handleSelect(item.value)">
              {{ item.label }}
            </a>
            </MenuItem>
          </div>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>