<script setup lang="ts">
import { computed, onBeforeUnmount, provide, ref, watch } from "vue";

import { toElement } from "../../lib/dom";
import { useMobileViewport } from "../../lib/use-mobile-viewport";
import { useSoftKeyboard } from "../../lib/use-soft-keyboard";
import DialogContent from "./DialogContent.vue";
import { DialogSheetProvider, dialogSheet, dialogSheetSurfaceKey } from "./dialog-sheet-context";

defineOptions({ name: "RaftDialogSheetContent", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    /** Draw as a sheet even on a desktop (tests, a tablet app). Defaults to the phone breakpoint. */
    sheet?: boolean;
  }>(),
  {},
);

const phone = useMobileViewport();
const sheet = computed(() => props.sheet ?? phone.value);
const popup = ref<unknown>(null);
const popupElement = computed(() => toElement(popup.value));

provide(
  dialogSheetSurfaceKey,
  computed(() => sheet.value),
);

const styles = dialogSheet();
const contentClass = computed(() => (sheet.value ? styles.content() : undefined));
const overlayClass = computed(() => (sheet.value ? styles.overlay() : undefined));

// The sheet is docked to the bottom of the visual viewport, so the on-screen
// keyboard pushes it up instead of covering the field being typed into.
const keyboard = useSoftKeyboard(sheet);
const sheetBox = computed(() => {
  const up = keyboard.value;
  if (!up) return undefined;
  const height = Math.round(Math.min(up.height, up.windowHeight * 0.9));
  return { top: `${up.top + up.height - height}px`, bottom: "auto", height: `${height}px` };
});

const PROBLEM_SELECTOR =
  "[role=alert], [data-slot=banner][data-status=warning], [data-slot=banner][data-status=destructive]";

let observer: MutationObserver | null = null;
watch(
  popup,
  () => {
    observer?.disconnect();
    observer = null;
    const element = toElement(popup.value);
    if (!sheet.value || !element || typeof MutationObserver === "undefined") return;
    observer = new MutationObserver((records) => {
      for (const record of records) {
        for (const node of record.addedNodes) {
          if (!(node instanceof Element)) continue;
          const problem = node.matches(PROBLEM_SELECTOR)
            ? node
            : node.querySelector(PROBLEM_SELECTOR);
          if (!problem) continue;
          problem.scrollIntoView?.({ block: "nearest" });
          return;
        }
      }
    });
    observer.observe(element, { childList: true, subtree: true });
  },
  { flush: "post" },
);
onBeforeUnmount(() => observer?.disconnect());
</script>

<template>
  <DialogContent
    ref="popup"
    v-bind="$attrs"
    :class="contentClass"
    :overlay-class="overlayClass"
    :overlay-cover="sheet"
    :placement="sheet ? undefined : ($attrs.placement as 'top' | 'center' | undefined)"
    :style="[$attrs.style as string | Record<string, string> | undefined, sheetBox]"
    :data-sheet="sheet ? '' : undefined"
  >
    <DialogSheetProvider :sheet="sheet" :popup="popupElement">
      <slot />
    </DialogSheetProvider>
  </DialogContent>
</template>
