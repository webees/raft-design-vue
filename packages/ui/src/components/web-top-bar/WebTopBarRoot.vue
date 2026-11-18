<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { webTopBar } from "./web-top-bar.variants";

defineOptions({ name: "RaftWebTopBarRoot", inheritAttrs: false });

const attrs = useAttrs();
const rootClass = computed(() =>
  webTopBar().root({ className: attrs.class as string }),
);
</script>

<template>
  <div
    v-bind="{ ...attrs, class: undefined }"
    data-slot="web-top-bar-root"
    :class="rootClass"
  >
    <slot />
  </div>
</template>
