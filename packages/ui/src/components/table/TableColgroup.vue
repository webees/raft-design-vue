<script setup lang="ts">
import { table } from "./table.variants";

defineOptions({ name: "RaftTableColgroup", inheritAttrs: false });

const attrs = useAttrs();
const colgroupClass = computed(() => table().colgroup({ className: attrs.class as string }));
</script>

<template>
  <colgroup
    v-bind="{ ...attrs, class: undefined }"
    :class="colgroupClass"
    data-slot="table-colgroup"
  >
    <slot />
  </colgroup>
</template>
