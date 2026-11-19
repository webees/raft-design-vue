import {
  computed,
  defineComponent,
  h,
  inject,
  provide,
  type InjectionKey,
  type PropType,
  type Ref,
} from "vue";

import { provideDialogSheetReset } from "../components/dialog/dialog-sheet-context";

/**
 * A modal surface: a centred dialog (Dialog, AlertDialog, or an app's own
 * modal) or a sheet (Drawer). The stack is outermost first; a portal keeps
 * the context.
 */
export type OverlayLayerKind = "dialog" | "drawer";

const OVERLAY_STACK_KEY: InjectionKey<Ref<readonly OverlayLayerKind[]>> =
  Symbol("raft-overlay-stack");

function useOverlayStack() {
  return inject(OVERLAY_STACK_KEY, null);
}

/**
 * The kind of surface a popup is opened in, or null at the top level. raft-ui's
 * roots add themselves to the stack; an app's own modal can use
 * `OverlayLayer` the same way.
 */
export function useParentOverlayKind(): OverlayLayerKind | null {
  const stack = useOverlayStack()?.value;
  return stack && stack.length > 1 ? (stack[stack.length - 2] ?? null) : null;
}

/**
 * The surface a root is written in, before the root adds its own layer.
 * For a root that needs to know what it is stacked on.
 */
export function useEnclosingOverlayKind(): OverlayLayerKind | null {
  return useOverlayStack()?.value.at(-1) ?? null;
}

const OVERLAY_LAYER_PROPS = {
  kind: { type: String as PropType<OverlayLayerKind>, required: true },
  modal: { type: Boolean, required: true },
} as const;

/** Adds a modal surface to the stack for everything under it. */
export const OverlayLayer = defineComponent({
  name: "RaftOverlayLayer",
  props: OVERLAY_LAYER_PROPS,
  setup(props, { slots }) {
    const parent = useOverlayStack();
    provide(
      OVERLAY_STACK_KEY,
      computed(() =>
        props.modal ? [...(parent?.value ?? []), props.kind] : (parent?.value ?? []),
      ),
    );
    return () => slots.default?.();
  },
});

const PopupSheetReset = defineComponent({
  name: "RaftPopupSheetReset",
  setup(_, { slots }) {
    provideDialogSheetReset();
    return () => slots.default?.();
  },
});

/**
 * An app's own modal surface. raft-ui's roots already add themselves; use
 * this for a dialog-like surface the library does not own so the popups inside
 * it nest correctly.
 */
export const OverlayLayerProvider = defineComponent({
  name: "RaftOverlayLayerProvider",
  props: OVERLAY_LAYER_PROPS,
  setup(props, { slots }) {
    return () =>
      h(
        OverlayLayer,
        { kind: props.kind, modal: props.modal },
        { default: () => h(PopupSheetReset, null, { default: () => slots.default?.() }) },
      );
  },
});
