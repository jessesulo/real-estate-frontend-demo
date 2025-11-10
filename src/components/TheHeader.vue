<script setup lang="ts">
import { ref } from 'vue';
import HeaderLogo from './header/HeaderLogo.vue';
import HeaderNav from './header/HeaderNav.vue';
import HeaderUserNav from './header/HeaderUserNav.vue';
import { Bars3Icon } from '@heroicons/vue/24/outline';

const isMobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};
</script>

<template>
  <header
    class="sticky top-0 bg-white h-[theme(--header-height)] border-b-2 border-b-gray-100 shadow-md shadow-neutral-200 z-80">
    <nav class="flex flex-nowrap items-center gap-5.5 px-[theme(--container-padding)] pb-3 h-full">
      <div class="flex items-center gap-2 flex-1 md:flex-none">
        <button @click="toggleMobileMenu"
          class="md:hidden p-2 -ml-2 text-neutral-600 hover:text-cyan-950 transition-colors" aria-label="Toggle menu">
          <Bars3Icon class="w-6 h-6" />
        </button>
        <HeaderLogo />
      </div>

      <HeaderNav class="hidden md:flex flex-1" />

      <HeaderUserNav />
    </nav>

    <transition enter-active-class="transition ease-out duration-300"
      enter-from-class="transform -translate-y-full opacity-0" enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition ease-in duration-300" leave-from-class="transform translate-y-0 opacity-100"
      leave-to-class="transform -translate-y-full opacity-0">
      <div v-if="isMobileMenuOpen"
        class="md:hidden fixed inset-x-0 top-[theme(--header-height)] bottom-0 bg-white shadow-lg z-[60] overflow-y-auto">
        <div class="px-[theme(--container-padding)] py-4">
          <ul class="flex flex-col gap-3.5 text-sm">
            <li v-for="link in [
              { to: '/', label: 'Foreclosure List' },
              { to: '/custom', label: 'Custom List' },
              { to: '/contact', label: 'Contact' },
            ]" :key="link.to">
              <RouterLink v-if="link.to === '/'" :to="link.to" @click="closeMobileMenu"
                class="block text-neutral-600 py-2 hover:text-cyan-950 transition-colors border-b border-gray-100">
                {{ link.label }}
              </RouterLink>
              <span v-else class="block text-neutral-600 py-2 cursor-default border-b border-gray-100">
                {{ link.label }}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </transition>

    <transition enter-active-class="transition ease-out duration-300" enter-from-class="opacity-0"
      enter-to-class="opacity-100" leave-active-class="transition ease-in duration-300" leave-from-class="opacity-100"
      leave-to-class="opacity-0">
      <div v-if="isMobileMenuOpen" @click="closeMobileMenu"
        class="md:hidden fixed inset-x-0 top-[theme(--header-height)] bottom-0 bg-black bg-opacity-50 z-[55]">
      </div>
    </transition>
  </header>
</template>
