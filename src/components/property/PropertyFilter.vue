<script setup lang="ts">
import ProperyFilterDropdown from './PropertyFilterDropdown.vue';
import PropertyFilterSave from './PropertyFilterSave.vue';
import PropertyExportButton from './PropertyExportButton.vue';
import PropertyFilterValueDebt from './filters/PropertyFilterValueDebt.vue';
import ProperyFilterBedsBath from './filters/ProperyFilterBedsBath.vue';
import PropertyFilterMore from './filters/PropertyFilterMore.vue';
import PropertyFilterSorting from './filters/PropertyFilterSorting.vue';
</script>

<template>
	<div class="flex flex-wrap items-center justify-start gap-5 pb-5 mb-2">
		<ProperyFilterDropdown title="Beds & Baths">
			<ProperyFilterBedsBath />
		</ProperyFilterDropdown>
		<ProperyFilterDropdown title="Value & Debt">
			<PropertyFilterValueDebt />
		</ProperyFilterDropdown>
		<ProperyFilterDropdown title="More">
			<PropertyFilterMore />
		</ProperyFilterDropdown>
		<ProperyFilterDropdown title="Filter">
			<PropertyFilterSorting />
		</ProperyFilterDropdown>
		<div class="flex gap-0.5 pl-1">
			<PropertyFilterSave />
			<PropertyExportButton />
		</div>
	</div>
</template>