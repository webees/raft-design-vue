<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { taskLoading } from "./task-loading.variants";

defineOptions({ name: "RaftTaskLoadingRow", inheritAttrs: false });
const attrs = useAttrs();
const rootClass = computed(() =>
  taskLoading().row({ className: attrs.class as string }),
);
</script>

<template>
  <div
    v-bind="{ ...attrs, class: undefined }"
    data-slot="task-loading-row"
    aria-hidden="true"
    :class="rootClass"
  />
</template>
