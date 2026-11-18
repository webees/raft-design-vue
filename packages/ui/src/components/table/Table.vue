<script setup lang="ts">
import { table } from "./table.variants";

defineOptions({ name: "RaftTable", inheritAttrs: false });

const attrs = useAttrs();
const tableClass = computed(() => table().root({ className: attrs.class as string }));
</script>

<template>
  <table v-bind="{ ...attrs, class: undefined }" :class="tableClass" data-slot="table">
    <slot />
  </table>
</template>
