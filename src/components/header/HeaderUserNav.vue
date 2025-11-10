<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
import { ChevronDownIcon } from '@heroicons/vue/20/solid';
</script>

<template>
  <Menu as="div" class="relative inline-block" v-slot="{ open }">
    <MenuButton class="inline-flex justify-center items-center gap-x-0.5 px-3.5 py-1.5 text-sm cursor-pointer">
      <div class="username mr-1">Professional Plan</div>
      <div class="usericon flex justify-center items-center bg-cyan-950 text-white rounded-full w-7.5 h-7.5 text-xs">PP
      </div>
      <ChevronDownIcon class="-mr-1 size-5.5 text-cyan-950 transition-transform duration-200"
        :class="{ 'rotate-180': open }" aria-hidden="true" />
    </MenuButton>

    <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform scale-100" leave-active-class="transition ease-in duration-75"
      leave-from-class="transform scale-100" leave-to-class="transform opacity-0 scale-95">
      <MenuItems
        class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg outline-1 outline-black/5">
        <div class="py-1">
          <MenuItem v-slot="{ active }">
          <a href="#"
            :class="[active ? 'bg-gray-100 text-gray-900 outline-hidden' : 'text-gray-700', 'block px-4 py-2 text-sm']">Account
            settings</a>
          </MenuItem>
          <MenuItem v-slot="{ active }">
          <a href="#"
            :class="[active ? 'bg-gray-100 text-gray-900 outline-hidden' : 'text-gray-700', 'block px-4 py-2 text-sm']">Support</a>
          </MenuItem>
          <MenuItem v-slot="{ active }">
          <a href="#"
            :class="[active ? 'bg-gray-100 text-gray-900 outline-hidden' : 'text-gray-700', 'block px-4 py-2 text-sm']">License</a>
          </MenuItem>
          <form method="POST" action="javascript:void(0)">
            <MenuItem v-slot="{ active }">
            <button type="submit"
              :class="[active ? 'bg-gray-100 text-gray-900 outline-hidden' : 'text-gray-700', 'block w-full px-4 py-2 text-left text-sm cursor-pointer']">Sign
              out</button>
            </MenuItem>
          </form>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>