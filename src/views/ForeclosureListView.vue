<script setup lang="ts">
import MapView from '@/components/map/MapView.vue';
import PropertyView from '@/components/property/PropertyView.vue';
</script>

<template>
  <section class="foreclosure-list flex flex-col md:flex-row w-full h-full pt-2.5 px-[theme(--container-padding)] pb-[theme(--container-padding)] min-h-[calc(100vh-theme(--header-height))]">
    <div class="h-screen md:h-auto mb-4 md:mb-0 md:w-1/2 md:pr-[theme(--container-padding)]">
      <MapView />
    </div>
    <div class="md:w-1/2 md:pl-[theme(--container-padding)]">
      <PropertyView />
    </div>
  </section>
</template>
