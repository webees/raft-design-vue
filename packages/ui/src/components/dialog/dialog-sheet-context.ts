import {
  defineComponent,
  inject,
  provide,
  ref,
  toRef,
  type InjectionKey,
  type Ref,
} from "vue";

import { tv } from "../../lib/tv";
import { providePopupSheet } from "../../lib/popup-boundary";

/**
 * Whether the dialog's parts are drawn as a phone sheet now, and where its
 * head keeps the commit button. Set by `DialogSheetContent` below 768px; every
 * other dialog (and that one on a desktop) has no sheet, so the parts render
 * exactly as they always have.
 */
export type DialogSheetContextValue = {
  sheet: Ref<boolean>;
  commitSlot: Ref<HTMLElement | null>;
  /** The end of the body, where the footer's note or link moves. */
  bodyEndSlot: Ref<HTMLElement | null>;
};

export const dialogSheetContextKey: InjectionKey<DialogSheetContextValue> = Symbol("raft-dialog-sheet");
export const dialogSheetSurfaceKey: InjectionKey<Ref<boolean>> = Symbol("raft-dialog-sheet-surface");
export const dialogSheetHeadKey: InjectionKey<Ref<boolean>> = Symbol("raft-dialog-sheet-head");

export function useDialogSheet(): DialogSheetContextValue | null {
  return inject(dialogSheetContextKey, null);
}

export function useInDialogSheetHead() {
  return inject(dialogSheetHeadKey, null);
}

function createNoSheet(): DialogSheetContextValue {
  return { sheet: ref(false), commitSlot: ref(null), bodyEndSlot: ref(null) };
}

/**
 * Every dialog surface starts a fresh sheet scope: a dialog opened from inside
 * a phone sheet renders as a plain dialog, not as another sheet. The sheet
 * context is then provided again *inside* `DialogContent`, by
 * `DialogSheetProvider`.
 */
export function provideDialogSheetReset() {
  provide(dialogSheetSurfaceKey, ref(false));
  provide(dialogSheetContextKey, createNoSheet());
  provide(dialogSheetHeadKey, ref(false));
}

/** Re-establishes the sheet scope inside `DialogContent`'s slot. */
export const DialogSheetProvider = defineComponent({
  name: "RaftDialogSheetProvider",
  props: {
    sheet: { type: Boolean, required: true },
    popup: { type: Object as () => Element | null, default: null },
  },
  setup(props, { slots }) {
    const commitSlot = ref<HTMLElement | null>(null);
    const bodyEndSlot = ref<HTMLElement | null>(null);
    provide(dialogSheetContextKey, {
      sheet: toRef(props, "sheet"),
      commitSlot,
      bodyEndSlot,
    });
    provide(dialogSheetHeadKey, ref(false));
    provide(dialogSheetSurfaceKey, ref(false));
    // A popup opened in the sheet stays in it, under its head.
    providePopupSheet({
      head: () =>
        props.sheet
          ? (props.popup?.querySelector('[data-slot="dialog-header"]') ?? null)
          : null,
      surface: () => (props.sheet ? props.popup : null),
    });
    return () => slots.default?.();
  },
});

/**
 * A dialog drawn as a phone sheet (design: dialog.md "On a phone"). The
 * surface is DialogContent's frame docked to the bottom, 90% of the screen
 * tall, rounded on its top corners, sliding up as a bottom sheet does; its
 * head is a pushed page's head (× at the start, the title, the commit button
 * at the end); its body keeps the phone's 16px margin and the home indicator's
 * inset. Merged over DialogContent's classes, so these win.
 */
export const dialogSheet = tv({
  slots: {
    content: [
      "fixed inset-x-0 top-auto bottom-0 left-0 h-[90dvh] max-h-none w-full max-w-none translate-none",
      "rounded-none rounded-t-dialog",
      "pr-[env(safe-area-inset-right,0px)] pl-[env(safe-area-inset-left,0px)]",
      "transition-transform duration-240 ease-slide data-ending-style:duration-180",
      "data-starting-style:translate-y-full data-ending-style:translate-y-full",
      "motion-reduce:transition-none",
    ],
    overlay: [
      "transition-opacity duration-240 ease-slide data-ending-style:duration-180",
      "data-starting-style:opacity-0 data-ending-style:opacity-0",
      "motion-reduce:transition-none",
    ],
    header: [
      "flex h-(--header-height) shrink-0 items-center gap-2 px-4 pt-0",
      "border-b border-line-seam",
      "[&>[data-slot=dialog-close]]:order-first [&>[data-slot=dialog-sheet-back]]:order-first",
      "[&>[data-slot=dialog-title]]:min-w-0 [&>[data-slot=dialog-title]]:flex-1",
    ],
    title: ["min-w-0 flex-1 truncate"],
    commitSlot: ["flex shrink-0 items-center empty:hidden"],
    body: [
      "min-h-0 content-start",
      "px-4 pt-4 first:pt-4 pb-[max(16px,env(safe-area-inset-bottom,0px))]",
    ],
    barBody: ["block overflow-y-auto"],
    bodyEnd: [
      "mt-4 empty:hidden",
      "text-start font-sans text-footnote text-foreground-muted *:data-[slot=text-link]:text-footnote",
    ],
  },
});
