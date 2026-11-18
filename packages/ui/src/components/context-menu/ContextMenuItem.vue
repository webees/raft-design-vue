<script setup lang="ts">
import { ContextMenuItem } from "reka-ui";

import { contextMenu } from "./context-menu.variants";

defineOptions({ name: "RaftContextMenuItem", inheritAttrs: false });

withDefaults(
  defineProps<{ disabled?: boolean; textValue?: string; as?: string; asChild?: boolean }>(),
  {
    disabled: false,
    textValue: undefined,
    as: undefined,
    asChild: false,
  },
);

const attrs = useAttrs();
const itemClass = computed(() => contextMenu().item({ class: attrs.class as string | undefined }));
</script>

<template>
  <ContextMenuItem
    v-bind="{ ...attrs, class: undefined }"
    :disabled="disabled"
    :text-value="textValue"
    :as="as"
    :as-child="asChild"
    data-slot="context-menu-item"
    :class="itemClass"
  >
    <slot />
  </ContextMenuItem>
</template>
