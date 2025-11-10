<script setup lang="ts">
const navLinks = [
  { to: "/", label: "Foreclosure List" },
  { to: "/custom", label: "Custom List" },
  { to: "/contact", label: "Contact" },
];
</script>

<template>
  <div class="hidden md:flex">
    <ul class="flex mr-auto list-none gap-3.5 text-sm -mt-0.5">
      <li v-for="link in navLinks" :key="link.to">
        <RouterLink 
          v-if="link.to === '/'"
          v-bind="link" 
          class="text-neutral-600 border-b-4 border-b-transparent py-1.75 hover:text-cyan-950 hover:border-b-cyan-950 transition-colors" 
          activeClass="text-cyan-950! border-b-cyan-950!"
        >
            {{ link.label }}
        </RouterLink>
        <span 
          v-else
          class="text-neutral-600 border-b-4 border-b-transparent py-1.75 cursor-default"
        >
          {{ link.label }}
        </span>
      </li>
    </ul>
  </div>
</template>