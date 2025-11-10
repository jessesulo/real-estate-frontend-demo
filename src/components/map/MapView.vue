<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import MapFilter from './MapFilter.vue';
import { GoogleMap, CustomMarker, InfoWindow } from 'vue3-google-map';
import { usePropertiesStore } from '@/stores/properties';
import PropertyCard from '@/components/property/PropertyCard.vue';
import type { Property } from '@/models/property';

const store = usePropertiesStore();

const center = ref({ lat: 33.7490, lng: -84.3880 });
const selectedProperty = ref<Property | null>(null);
const infoWindowOpen = ref(false);
const hoveredPropertyId = ref<number | null>(null);

const displayedProperties = computed(() => {
  if (store.showFavoritesOnly) {
    return store.properties.filter(p => store.isFavorite(p.id));
  }
  return store.properties;
});

const formatARV = (value: number): string => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `${Math.round(value / 1000)}к`;
  }
  return value.toString();
};

const calculateCenter = () => {
  const props = displayedProperties.value;
  if (props.length === 0) {
    return { lat: 33.7490, lng: -84.3880 };
  }

  const validProperties = props.filter(p => p.lat && p.lng);
  if (validProperties.length === 0) {
    return { lat: 33.7490, lng: -84.3880 };
  }

  const avgLat = validProperties.reduce((sum, p) => sum + p.lat, 0) / validProperties.length;
  const avgLng = validProperties.reduce((sum, p) => sum + p.lng, 0) / validProperties.length;

  return { lat: avgLat, lng: avgLng };
};

const handleMarkerClick = (property: Property) => {
  selectedProperty.value = property;
  infoWindowOpen.value = true;
};

const closeInfoWindow = () => {
  infoWindowOpen.value = false;
  selectedProperty.value = null;
};


watch(() => [store.properties, store.showFavoritesOnly, store.favorites], () => {
  if (displayedProperties.value.length > 0) {
    center.value = calculateCenter();
  }
}, { immediate: true });
</script>

<template>
  <div class="map w-full h-full relative pt-8.5">
    <MapFilter />
    <div class="map-container bg-neutral-100 w-full h-full">
      <GoogleMap api-key="AIzaSyCnVCYJEWN_hoNdpu2AHy7jvvba1tTdTdU" language="en" class="w-full h-full" :center="center"
        :zoom="10">
        <template v-for="property in displayedProperties" :key="property.id">
          <CustomMarker v-if="property.lat && property.lng" :options="{
            position: { lat: property.lat, lng: property.lng },
            anchorPoint: 'BOTTOM_CENTER',
          }" @click="handleMarkerClick(property)" @mouseenter="hoveredPropertyId = property.id"
            @mouseleave="hoveredPropertyId = null">
            <div
              class="relative px-2 py-0.5 rounded-lg border border-white/50 font-bold text-xs whitespace-nowrap cursor-pointer shadow-md transition-colors duration-200 text-center"
              :class="hoveredPropertyId === property.id ? 'bg-white text-cyan-600' : 'bg-cyan-600 text-white'">
              <div>{{ formatARV(property.afterRepairValue) }}</div>
              <div
                class="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent transition-colors duration-200"
                :class="hoveredPropertyId === property.id ? 'border-t-white' : 'border-t-cyan-600'"></div>
            </div>
          </CustomMarker>
          <InfoWindow v-if="selectedProperty?.id === property.id && infoWindowOpen" :options="{
            position: { lat: property.lat, lng: property.lng },
          }" @closeclick="closeInfoWindow">
            <div class="w-70 pl-1.5" style="font-family: var(--font-display), 'Poppins', sans-serif;">
              <PropertyCard :property="property" />
            </div>
          </InfoWindow>
        </template>
      </GoogleMap>
    </div>
  </div>
</template>