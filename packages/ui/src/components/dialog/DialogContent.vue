<script setup lang="ts">
import type { StyleValue } from "vue";
import { DialogContent, DialogOverlay, DialogPortal, injectDialogRootContext } from "reka-ui";
import type { SoftKeyboardViewport } from "../../lib/use-soft-keyboard";
import { useParentOverlayKind } from "../../lib/overlay-depth";
import { usePresenceStyle } from "../../lib/presence-style";
import { dialog, type DialogVariants } from "./dialog.variants";
import { provideDialogContext } from "./dialog-context";
import { dialogSheetSurfaceKey, provideDialogSheetReset } from "./dialog-sheet-context";
import { providePopupSheet } from "../../lib/popup-boundary";
import DialogSoftKeyboardWatch from "./dialog-soft-keyboard-watch";

defineOptions({ name: "RaftDialogContent", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    size?: NonNullable<DialogVariants["size"]>;
    placement?: NonNullable<DialogVariants["placement"]>;
    bar?: boolean;
    layer?: 0 | 1;
    lifted?: boolean;
    nested?: boolean;
    /** `false` hides the scrim; an object styles it (upstream's `overlay`). */
    overlay?: boolean | { className?: string; class?: string };
    /** Extra classes for the scrim, after the frame's own. */
    overlayClass?: string;
    /** Props for the portal element, as upstream's `portalProps`. */
    portalProps?: { className?: string; class?: string } & Record<string, unknown>;
    /** Put a cover over the scrim so a tap above a sheet doesn't dismiss. */
    overlayCover?: boolean;
    portal?: boolean;
    forceMount?: boolean;
    asChild?: boolean;
    to?: string | HTMLElement;
    onOpenAutoFocus?: (event: Event) => void;
    onCloseAutoFocus?: (event: Event) => void;
    onEscapeKeyDown?: (event: KeyboardEvent) => void;
    onPointerDownOutside?: (event: Event) => void;
    onInteractOutside?: (event: Event) => void;
  }>(),
  {
    size: "md",
    placement: "center",
    bar: false,
    layer: 0,
    lifted: false,
    nested: false,
    overlay: true,
    overlayCover: false,
    portal: true,
    forceMount: false,
    asChild: false,
  },
);

const attrs = useAttrs();
const nested = computed(() => props.nested || useParentOverlayKind() !== null);
const sizeRef = toRef(props, "size");
const barRef = toRef(props, "bar");
provideDialogContext(
  () => sizeRef.value,
  () => barRef.value,
);

const inheritedSheetSurface = inject(dialogSheetSurfaceKey, null);
// Nested content inside a sheet (or a dialog) is not the phone sheet itself.
provideDialogSheetReset();
providePopupSheet(undefined);
const sheetSurface = computed(() => inheritedSheetSurface?.value ?? false);
const lifted = computed(() => props.layer === 1 || props.lifted);
const keyboard = ref<SoftKeyboardViewport | null>(null);
// A phone sheet has its own keyboard box: only a centred card lifts.
const raised = computed(() => !sheetSurface.value && keyboard.value !== null);

const contentEl = ref<Element | null>(null);
const overlayEl = ref<Element | null>(null);
const dialogRoot = injectDialogRootContext(null);
usePresenceStyle(() => sheetSurface.value && (dialogRoot?.open.value ?? false), contentEl);
usePresenceStyle(() => sheetSurface.value && (dialogRoot?.open.value ?? false), overlayEl);

const styles = computed(() =>
  dialog({
    size: props.size,
    placement: props.placement,
    bar: props.bar,
    layer: props.layer,
    lifted: lifted.value,
    nested: nested.value,
    keyboard: raised.value,
  }),
);
const contentClass = computed(() => styles.value.content({ className: attrs.class as string }));
const showOverlay = computed(() => props.overlay !== false);
const overlayClass = computed(() =>
  styles.value.overlay({
    className:
      typeof props.overlay === "object"
        ? [props.overlay.className, props.overlay.class].filter(Boolean).join(" ") || undefined
        : props.overlayClass,
  }),
);
const portalClassName = computed(
  () =>
    [props.portalProps?.className, props.portalProps?.class].filter(Boolean).join(" ") || undefined,
);
const portalClass = computed(() =>
  lifted.value ? styles.value.portal({ className: portalClassName.value }) : portalClassName.value,
);
const contentStyle = computed<StyleValue>(() => [
  attrs.style as StyleValue,
  raised.value && keyboard.value
    ? {
        "--dialog-visible-top": `${keyboard.value.top}px`,
        "--dialog-visible-height": `${keyboard.value.height}px`,
      }
    : undefined,
]);

/** Renders the surface in place, for the `portal: false` path. */
const InPlace = defineComponent({
  name: "RaftDialogInPlace",
  inheritAttrs: false,
  setup:
    (_, { slots }) =>
    () =>
      slots.default?.(),
});

/** Upstream puts the portal classes on the portalled element. */
const PortalFrame = defineComponent({
  name: "RaftDialogPortalFrame",
  props: {
    active: Boolean,
    frameClass: { type: [String, Array, Object], default: undefined },
    dataLayer: { type: [String, Number], default: undefined },
  },
  setup:
    (frameProps, { slots }) =>
    () =>
      frameProps.active
        ? h(
            "div",
            { class: frameProps.frameClass, "data-layer": frameProps.dataLayer },
            slots.default?.(),
          )
        : slots.default?.(),
});
</script>

<template>
  <component
    :is="portal ? DialogPortal : InPlace"
    :to="portal ? to : undefined"
    v-bind="portal ? props.portalProps : undefined"
  >
    <PortalFrame
      :active="portal"
      :frame-class="portalClass"
      :data-layer="portal && lifted ? 1 : undefined"
    >
      <DialogOverlay
        ref="overlayEl"
        v-if="showOverlay"
        :class="overlayClass"
        :data-nested="nested ? '' : undefined"
        data-slot="dialog-overlay"
        data-raft-ui-overlay=""
      >
        <span v-if="overlayCover" aria-hidden="true" class="absolute inset-0" />
      </DialogOverlay>
      <DialogContent
        ref="contentEl"
        v-bind="{ ...attrs, class: undefined }"
        :class="contentClass"
        :style="contentStyle"
        :force-mount="forceMount"
        :as-child="asChild"
        :data-placement="placement === 'top' ? 'top' : undefined"
        :data-soft-keyboard="raised ? '' : undefined"
        @open-auto-focus="onOpenAutoFocus"
        @close-auto-focus="onCloseAutoFocus"
        @escape-key-down="onEscapeKeyDown"
        @pointer-down-outside="onPointerDownOutside"
        @interact-outside="onInteractOutside"
        :data-slot="(attrs['data-slot'] as string) ?? 'dialog-content'"
      >
        <slot />
        <DialogSoftKeyboardWatch v-if="!sheetSurface" @change="keyboard = $event" />
      </DialogContent>
    </PortalFrame>
  </component>
</template>
