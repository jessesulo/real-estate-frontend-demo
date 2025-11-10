import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import type { Property, PropertiesResponse, PropertyFilters } from '@/models/property';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

export const usePropertiesStore = defineStore('properties', () => {
  const properties = ref<Property[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const totalCount = ref(0);
  const filters = ref<PropertyFilters>({});
  const favorites = ref<number[]>([]);
  const showFavoritesOnly = ref(false);

  const currentPage = ref(1);
  const itemsPerPage = ref(12);

  const totalPages = computed(() => {
    const count = showFavoritesOnly.value ? filteredProperties.value.length : totalCount.value;
    return Math.ceil(count / itemsPerPage.value);
  });

  const filteredProperties = computed(() => {
    if (showFavoritesOnly.value) {
      return properties.value.filter(p => isFavorite(p.id));
    }
    return properties.value;
  });

  const paginatedProperties = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    return filteredProperties.value.slice(start, end);
  });

  const hasNextPage = computed(() => {
    return currentPage.value < totalPages.value;
  });

  const hasPreviousPage = computed(() => {
    return currentPage.value > 1;
  });

  async function fetchProperties(newFilters?: PropertyFilters) {
    loading.value = true;
    error.value = null;

    if (newFilters) {
      const mergedFilters = { ...filters.value, ...newFilters };
      Object.keys(mergedFilters).forEach(key => {
        if (mergedFilters[key as keyof PropertyFilters] == null) {
          delete mergedFilters[key as keyof PropertyFilters];
        }
      });
      filters.value = mergedFilters;
    }

    try {
      const queryParams = new URLSearchParams(
        Object.entries(filters.value)
          .filter(([, v]) => v != null && v !== '')
          .map(([k, v]) => [k, v!.toString()])
      );

      const url = `${API_BASE_URL}/properties${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: PropertiesResponse = await response.json();

      properties.value = data.results;
      totalCount.value = data.count;

      if (newFilters) {
        currentPage.value = 1;
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch properties';
      properties.value = [];
      totalCount.value = 0;
    } finally {
      loading.value = false;
    }
  }

  function setPage(page: number) {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page;
    }
  }

  function nextPage() {
    if (hasNextPage.value) {
      currentPage.value++;
    }
  }

  function previousPage() {
    if (hasPreviousPage.value) {
      currentPage.value--;
    }
  }

  function setItemsPerPage(items: number) {
    itemsPerPage.value = items;
    currentPage.value = 1;
  }

  function resetFilters() {
    filters.value = {};
    currentPage.value = 1;
  }

  function toggleFavorite(propertyId: number) {
    const index = favorites.value.indexOf(propertyId);
    if (index > -1) {
      favorites.value.splice(index, 1);
    } else {
      favorites.value.push(propertyId);
    }
  }

  function isFavorite(propertyId: number): boolean {
    return favorites.value.includes(propertyId);
  }

  return {
    properties,
    loading,
    error,
    totalCount,
    filters,
    currentPage,
    itemsPerPage,
    favorites,
    showFavoritesOnly,

    totalPages,
    paginatedProperties,
    filteredProperties,
    hasNextPage,
    hasPreviousPage,

    fetchProperties,
    setPage,
    nextPage,
    previousPage,
    setItemsPerPage,
    resetFilters,
    toggleFavorite,
    isFavorite,
  };
});

