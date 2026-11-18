import { cloneVNode, defineComponent, mergeProps, type VNode } from "vue";
import {
  injectTooltipProviderContext,
  injectTooltipRootContext,
  useId,
} from "reka-ui";

/**
 * Reka's `TooltipTrigger` writes `data-state` on its child, which would clobber
 * the radio item's own checked state. This behavior-only trigger wires the same
 * listeners and keeps the rendered radio untouched.
 */
export default defineComponent({
  name: "RaftSegmentedControlItemTrigger",
  inheritAttrs: false,
  setup(_, { slots }) {
    const provider = injectTooltipProviderContext();
    const root = injectTooltipRootContext();
    root.contentId ||= useId(undefined, "reka-tooltip-content");

    let pointerDown = false;
    let pointerMoveOpened = false;

    function onPointerUp() {
      window.setTimeout(() => {
        pointerDown = false;
      }, 1);
    }
    function onPointerDown() {
      if (root.open && !root.disableClosingTrigger.value) root.onClose();
      pointerDown = true;
      document.addEventListener("pointerup", onPointerUp, { once: true });
    }
    function onPointerMove(event: PointerEvent) {
      if (event.pointerType === "touch") return;
      if (!pointerMoveOpened && !provider.isPointerInTransitRef.value) {
        root.onTriggerEnter();
        pointerMoveOpened = true;
      }
    }
    function onPointerLeave() {
      root.onTriggerLeave();
      pointerMoveOpened = false;
    }
    function onFocus(event: FocusEvent) {
      if (pointerDown) return;
      if (root.ignoreNonKeyboardFocus.value && !(event.target as HTMLElement).matches?.(":focus-visible")) {
        return;
      }
      root.onOpen();
    }
    function onBlur() {
      root.onClose();
    }
    function onClick() {
      if (!root.disableClosingTrigger.value) root.onClose();
    }

    return () => {
      const node: VNode | undefined = slots.default?.()[0];
      if (!node) return null;
      const handlers = root.disabled.value
        ? {}
        : {
            onClick,
            onFocus,
            onPointerdown: onPointerDown,
            onPointerleave: onPointerLeave,
            onPointermove: onPointerMove,
            onBlur,
          };
      return cloneVNode(
        node,
        mergeProps(
          {
            ref: (value: unknown) => {
              const inner = (value as { $el?: unknown } | null)?.$el;
              const element = (value ?? inner) as HTMLElement | null;
              root.onTriggerChange(element ?? undefined);
            },
            "aria-describedby": root.open.value ? root.contentId : undefined,
            "data-grace-area-trigger": "",
          },
          handlers,
        ),
      );
    };
  },
});
