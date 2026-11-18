<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { table } from "./table.variants";

defineOptions({ name: "RaftTableHeader", inheritAttrs: false });

const attrs = useAttrs();
const headerClass = computed(() => table().header({ className: attrs.class as string }));
</script>

<template>
  <thead v-bind="{ ...attrs, class: undefined }" :class="headerClass" data-slot="table-header">
    <slot />
  </thead>
</template>
