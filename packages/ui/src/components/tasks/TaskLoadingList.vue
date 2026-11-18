<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { taskLoading } from "./task-loading.variants";

defineOptions({ name: "RaftTaskLoadingList", inheritAttrs: false });
const attrs = useAttrs();
const rootClass = computed(() => taskLoading().list({ className: attrs.class as string }));
</script>

<template>
  <div
    v-bind="{ ...attrs, class: undefined }"
    data-slot="task-loading-list"
    aria-busy="true"
    :class="rootClass"
  >
    <slot />
  </div>
</template>
