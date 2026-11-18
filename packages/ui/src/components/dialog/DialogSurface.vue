<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { Primitive } from "reka-ui";

import { tv } from "../../lib/tv";
import { provideDialogSheetReset } from "./dialog-sheet-context";

defineOptions({ name: "RaftDialogSurface", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    as?: string;
    asChild?: boolean;
  }>(),
  { as: "div", asChild: false },
);

const attrs = useAttrs();
provideDialogSheetReset();
const surface = tv({
  slots: {
    root: [
      "flex min-w-0 flex-col outline-none",
      "overflow-clip rounded-dialog bg-layer-popover text-foreground",
      "shadow-float ring-1 ring-line-seam",
    ],
  },
});
const rootClass = computed(() => surface().root({ className: attrs.class as string }));
</script>

<template>
  <Primitive
    v-bind="{ ...attrs, class: undefined }"
    :as="props.as"
    :as-child="props.asChild"
    :class="rootClass"
    data-slot="dialog-surface"
  >
    <slot />
  </Primitive>
</template>
