<script setup lang="ts">
defineSlots<{
  default(): unknown;
  label(): unknown;
}>();
</script>

<template>
  <div>
    <label class="block text-sm text-gray-600 bg-gray-100 p-3.5">
      <slot name="label" />
    </label>
    <div class="p-3.5 pb-3">
      <slot />
    </div>
  </div>
</template>
