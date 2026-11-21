<script setup lang="ts">
import type { ComponentPublicInstance } from "vue";
import { cn } from "../../lib/cn";
import DialogBodyScrollArea from "./DialogBodyScrollArea.vue";
import { dialog } from "./dialog.variants";
import { dialogSheet, useInDialogSheet } from "./dialog-sheet-context";
import { useDialogContext } from "./dialog-context";

defineOptions({ name: "RaftDialogBody", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    /**
     * Puts the body in a ScrollArea with absolute gutters: nothing is added to
     * the body, so its own grid or flex layout holds only the caller's children.
     */
    unstableScrollArea?: boolean;
    wrapperClassName?: string;
  }>(),
  { unstableScrollArea: false },
);

const attrs = useAttrs();
const ctx = useDialogContext();
const { sheet, inSheet } = useInDialogSheet();
const scrollMode = computed(() => props.unstableScrollArea && !ctx.bar());
const contentClass = computed(() => attrs.class as string | undefined);
const bodyEndSlot = sheet?.bodyEndSlot ?? ref<HTMLElement | null>(null);
const setBodyEndSlot = (node: Element | ComponentPublicInstance | null) => {
  bodyEndSlot.value = node instanceof HTMLElement ? node : null;
};
const bodyClass = computed(() => {
  if (!inSheet.value) return dialog({ bar: ctx.bar() }).body({ className: attrs.class as string });
  const styles = dialogSheet();
  const sheetBody = cn(ctx.bar() ? styles.barBody() : undefined, styles.body());
  return dialog({ bar: ctx.bar() }).body({
    className: cn(sheetBody, attrs.class as string | undefined),
  });
});
</script>

<template>
  <DialogBodyScrollArea
    v-if="scrollMode"
    v-bind="{ ...attrs, class: undefined }"
    :class="contentClass"
    :wrapper-class-name="props.wrapperClassName"
    :tab-index="typeof attrs.tabindex === 'number' ? attrs.tabindex : undefined"
  >
    <slot />
    <div
      v-if="inSheet"
      :ref="setBodyEndSlot"
      :class="dialogSheet().bodyEnd()"
      data-slot="dialog-sheet-body-end"
    />
  </DialogBodyScrollArea>
  <div
    v-else
    v-bind="{ ...attrs, class: undefined }"
    :class="bodyClass"
    data-slot="dialog-body"
    :data-sheet="inSheet ? '' : undefined"
  >
    <slot />
    <div
      v-if="inSheet"
      :ref="setBodyEndSlot"
      :class="dialogSheet().bodyEnd()"
      data-slot="dialog-sheet-body-end"
    />
  </div>
</template>
