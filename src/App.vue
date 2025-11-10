<script setup lang="ts">
import TheHeader from './components/TheHeader.vue';
import { RouterView } from 'vue-router'
</script>

<template>
  <TheHeader />
  <main>
    <RouterView />
  </main>
</template>
