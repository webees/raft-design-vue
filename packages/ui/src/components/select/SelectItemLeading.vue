<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { select } from "./select.variants";

defineOptions({ name: "RaftSelectItemLeading", inheritAttrs: false });

const attrs = useAttrs();
const leadingClass = computed(() => select().itemLeading({ className: attrs.class as string }));
</script>

<template>
  <span
    v-bind="{ ...attrs, class: undefined }"
    :class="leadingClass"
    data-slot="select-item-leading"
  >
    <slot />
  </span>
</template>
