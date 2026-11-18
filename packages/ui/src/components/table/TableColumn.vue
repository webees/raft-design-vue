<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { table } from "./table.variants";

defineOptions({ name: "RaftTableColumn", inheritAttrs: false });

const attrs = useAttrs();
const columnClass = computed(() => table().column({ className: attrs.class as string }));
</script>

<template>
  <col v-bind="{ ...attrs, class: undefined }" :class="columnClass" data-slot="table-column" />
</template>
