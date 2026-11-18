<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { AlertDialogContent, AlertDialogOverlay, AlertDialogPortal } from "reka-ui";
import { alertDialog } from "./alert-dialog.variants";
import { useParentOverlayKind } from "../../lib/overlay-depth";
import { provideDialogSheetReset } from "../dialog/dialog-sheet-context";

defineOptions({ name: "RaftAlertDialogContent", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    nested?: boolean;
    overlay?: boolean;
    portal?: boolean;
    forceMount?: boolean;
    asChild?: boolean;
    to?: string | HTMLElement;
    onOpenAutoFocus?: (event: Event) => void;
    onCloseAutoFocus?: (event: Event) => void;
    onEscapeKeyDown?: (event: KeyboardEvent) => void;
  }>(),
  { nested: false, overlay: true, portal: true, forceMount: false, asChild: false },
);

const attrs = useAttrs();
const nested = computed(() => props.nested || useParentOverlayKind() !== null);
provideDialogSheetReset();
const contentClass = computed(() =>
  alertDialog().content({ className: attrs.class as string }),
);
const overlayClass = computed(() => alertDialog({ nested: nested.value }).overlay());
</script>

<template>
  <AlertDialogPortal v-if="portal" :to="to">
    <AlertDialogOverlay
      v-if="overlay"
      :class="overlayClass"
      :data-nested="nested ? '' : undefined"
      data-slot="alert-dialog-overlay"
      data-raft-ui-overlay=""
    />
    <AlertDialogContent
      v-bind="{ ...attrs, class: undefined }"
      :class="contentClass"
      :force-mount="forceMount"
      :as-child="asChild"
      role="alertdialog"
      data-slot="alert-dialog-content"
      @open-auto-focus="onOpenAutoFocus"
      @close-auto-focus="onCloseAutoFocus"
      @escape-key-down="onEscapeKeyDown"
    >
      <slot />
    </AlertDialogContent>
  </AlertDialogPortal>
  <template v-else>
    <AlertDialogOverlay
      v-if="overlay"
      :class="overlayClass"
      :data-nested="nested ? '' : undefined"
      data-slot="alert-dialog-overlay"
      data-raft-ui-overlay=""
    />
    <AlertDialogContent
      v-bind="{ ...attrs, class: undefined }"
      :class="contentClass"
      :force-mount="forceMount"
      :as-child="asChild"
      role="alertdialog"
      data-slot="alert-dialog-content"
      @open-auto-focus="onOpenAutoFocus"
      @close-auto-focus="onCloseAutoFocus"
      @escape-key-down="onEscapeKeyDown"
    >
      <slot />
    </AlertDialogContent>
  </template>
</template>
