<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { ContextMenuRadioItem } from "reka-ui";

import { contextMenu } from "./context-menu.variants";

defineOptions({ name: "RaftContextMenuRadioItem", inheritAttrs: false });

withDefaults(defineProps<{ value: string; disabled?: boolean }>(), { disabled: false });

const attrs = useAttrs();
const rootClass = computed(() =>
  contextMenu().radioItem({ class: attrs.class as string | undefined }),
);
</script>

<template>
  <ContextMenuRadioItem
    v-bind="{ ...attrs, class: undefined }"
    :value="value"
    :disabled="disabled"
    data-slot="context-menu-radio-item"
    :class="rootClass"
  >
    <slot />
  </ContextMenuRadioItem>
</template>
