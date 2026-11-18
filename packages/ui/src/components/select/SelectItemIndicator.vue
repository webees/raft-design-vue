<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { SelectItemIndicator } from "reka-ui";
import { select } from "./select.variants";

defineOptions({ name: "RaftSelectItemIndicator", inheritAttrs: false });

const attrs = useAttrs();
const indicatorClass = computed(() => select().itemIndicator({ className: attrs.class as string }));
</script>

<template>
  <SelectItemIndicator
    v-bind="{ ...attrs, class: undefined }"
    :class="indicatorClass"
    data-slot="select-item-indicator"
  >
    <slot>
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path
          d="M4.5 10.5l3.5 3.5 7.5-8"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="square"
        />
      </svg>
    </slot>
  </SelectItemIndicator>
</template>
