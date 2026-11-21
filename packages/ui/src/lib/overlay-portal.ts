import { type Component, type PropType, defineComponent, h, mergeProps } from "vue";

interface OverlayPortalOptions {
  name: string;
  portal: Component;
  dataSlot: string;
  to?: string;
}

/**
 * Wraps a Reka portal with the shared `display: contents` bridge that keeps
 * caller attributes on a real element while the teleport owns the position.
 */
export function createOverlayPortal({ name, portal, dataSlot, to }: OverlayPortalOptions) {
  return defineComponent({
    name,
    inheritAttrs: false,
    props: {
      to: { type: [String, Object] as PropType<string | HTMLElement>, default: to },
      disabled: { type: Boolean, default: undefined },
      forceMount: { type: Boolean, default: undefined },
    },
    setup:
      (props, { attrs, slots }) =>
      () =>
        h(
          portal,
          { to: props.to, disabled: props.disabled, forceMount: props.forceMount },
          {
            default: () =>
              h(
                "div",
                mergeProps(attrs, {
                  "data-slot": (attrs["data-slot"] as string | undefined) ?? dataSlot,
                  "data-raft-ui-overlay": "",
                  style: "display: contents",
                }),
                slots.default?.(),
              ),
          },
        ),
  });
}
