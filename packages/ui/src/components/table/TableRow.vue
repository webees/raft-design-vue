<script setup lang="ts">
import { table } from "./table.variants";

defineOptions({ name: "RaftTableRow", inheritAttrs: false });

const attrs = useAttrs();
const rowClass = computed(() => table().row({ className: attrs.class as string }));
</script>

<template>
  <tr v-bind="{ ...attrs, class: undefined }" :class="rowClass" data-slot="table-row">
    <slot />
  </tr>
</template>
