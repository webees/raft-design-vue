<script setup lang="ts">
import { computed, useAttrs } from "vue";

import { popover } from "./popover.variants";

defineOptions({ name: "RaftPopoverBackdrop", inheritAttrs: false });
const attrs = useAttrs();
const backdropClass = computed(() => popover().backdrop({ className: attrs.class as string }));
</script>

<template>
  <div
    v-bind="{ ...attrs, class: undefined }"
    data-slot="popover-backdrop"
    :class="backdropClass"
  />
</template>
