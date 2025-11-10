<script setup lang="ts">
import { HeartIcon } from '@heroicons/vue/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/vue/24/solid';
import type { Property } from '@/models/property';
import { formatCurrency, formatDate } from '@/utils/format';
import { usePropertiesStore } from '@/stores/properties';

interface Props {
  property: Property;
}

const props = defineProps<Props>();

const store = usePropertiesStore();

const toggleFavorite = (event: Event) => {
  event.stopPropagation();
  store.toggleFavorite(props.property.id);
};
</script>

<template>
  <div class="shadow-md rounded-sm overflow-hidden border border-neutral-100">
    <div class="relative h-50 bg-neutral-300">
      <img v-if="property.image" :src="property.image" :alt="property.address" class="w-full h-full object-cover" />
      <div class="absolute left-2.5 top-2.5 bg-white rounded-full text-cyan-800 px-3 py-1 text-xs">{{ property.county }}
      </div>
      <component :is="store.isFavorite(property.id) ? HeartIconSolid : HeartIcon" :class="[
        'absolute right-2.5 top-2.5 w-5 h-5 cursor-pointer transition-colors',
        store.isFavorite(property.id) ? 'text-red-500' : 'text-white'
      ]" @click="toggleFavorite" />
    </div>
    <div class="flex flex-col justify-between p-2 pb-3">
      <h3 class="text-cyan-800 text-[.9rem] font-semibold tracking-[-0.001em] mb-3.5 line-clamp-2 min-h-10">{{
        property.address }}</h3>
      <div class="flex justify-between gap-2.5">
        <div class="bg-cyan-800 text-white text-center rounded-sm flex-1 p-0.75 font-medium">
          <div class="text-[13px] tracking-[-0.035em] -mb-0.75">After Repair Value</div>
          <div class="text-[18px] font-semibold -mb-0.5">{{ formatCurrency(property.afterRepairValue) }}</div>
        </div>
        <div class="w-0.5 bg-neutral-200 h-auto"></div>
        <div class="bg-neutral-200 text-cyan-800 text-center rounded-sm flex-1 p-0.75 font-medium">
          <div class="text-[13px] tracking-[-0.035em] -mb-0.75">Foreclosure AMT</div>
          <div class="text-[18px] font-semibold -mb-0.5">{{ formatCurrency(property.foreclosureAmount) }}</div>
        </div>
      </div>
    </div>
    <div class="flex justify-center flex-nowrap whitespace-nowrap bg-neutral-100 border-t border-t-neutral-300">
      <div class="flex flex-1 flex-col justify-center text-center border-r border-r-neutral-300 p-1.5 text-sm">
        <div>Beds</div>
        <div>{{ property.beds }}</div>
      </div>
      <div class="flex flex-1 flex-col justify-center text-center border-r border-r-neutral-300 p-1.5 text-sm">
        <div>Baths</div>
        <div>{{ property.baths }}</div>
      </div>
      <div class="flex flex-1 flex-col justify-center text-center border-r border-r-neutral-300 p-1.5 text-sm">
        <div>Sq. Ft.</div>
        <div>{{ property.square.toLocaleString() }}</div>
      </div>
      <div class="flex flex-1 flex-col justify-center text-center p-1.5 text-sm">
        <div>Built</div>
        <div>{{ formatDate(property.builtDate) }}</div>
      </div>
    </div>
  </div>
</template>