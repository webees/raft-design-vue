<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { DialogContent } from "../dialog";
import { announcement } from "./announcement-dialog.variants";

defineOptions({ name: "RaftAnnouncementDialogContent", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    onOpenAutoFocus?: (event: Event) => void;
    onCloseAutoFocus?: (event: Event) => void;
    onEscapeKeyDown?: (event: KeyboardEvent) => void;
    onPointerDownOutside?: (event: Event) => void;
    onInteractOutside?: (event: Event) => void;
    size?: "sm" | "md" | "lg" | "wide";
    placement?: "center" | "top";
    bar?: boolean;
    layer?: 0 | 1;
    nested?: boolean;
    overlay?: boolean;
    portal?: boolean;
    forceMount?: boolean;
  }>(),
  {
    size: "md",
    placement: "center",
    bar: false,
    layer: 0,
    nested: false,
    overlay: true,
    portal: true,
    forceMount: false,
  },
);

const attrs = useAttrs();
const contentClass = computed(() =>
  announcement().content({ className: attrs.class as string }),
);

function focusAction(event: Event) {
  if (props.onOpenAutoFocus) return props.onOpenAutoFocus(event);
  const action = document.querySelector<HTMLElement>("[data-announcement-action]:not(:disabled)");
  if (!action) return;
  event.preventDefault();
  action.focus();
}
</script>

<template>
  <DialogContent
    v-bind="{ ...attrs, class: undefined }"
    :size="size"
    :placement="placement"
    :bar="bar"
    :layer="layer"
    :nested="nested"
    :overlay="overlay"
    :portal="portal"
    :force-mount="forceMount"
    :class="contentClass"
    :on-open-auto-focus="focusAction"
    :on-close-auto-focus="onCloseAutoFocus"
    :on-escape-key-down="onEscapeKeyDown"
    :on-pointer-down-outside="onPointerDownOutside"
    :on-interact-outside="onInteractOutside"
  >
    <slot />
  </DialogContent>
</template>
