<script setup lang="ts">
import { SelectIcon } from "reka-ui";
import { select } from "./select.variants";

defineOptions({ name: "RaftSelectIcon", inheritAttrs: false });

const attrs = useAttrs();
const iconClass = computed(() => select().icon({ className: attrs.class as string }));
</script>

<template>
  <SelectIcon
    v-bind="{ ...attrs, class: undefined }"
    :class="iconClass"
    data-slot="select-icon"
    data-picker-trigger-indicator=""
  >
    <slot>
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M6 8l4 4 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="square" />
      </svg>
    </slot>
  </SelectIcon>
</template>
