<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { table } from "./table.variants";

defineOptions({ name: "RaftTableBody", inheritAttrs: false });

const attrs = useAttrs();
const bodyClass = computed(() => table().body({ className: attrs.class as string }));
</script>

<template>
  <tbody v-bind="{ ...attrs, class: undefined }" :class="bodyClass" data-slot="table-body">
    <slot />
  </tbody>
</template>
