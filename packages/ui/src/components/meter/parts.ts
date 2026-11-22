import { Primitive } from "reka-ui";
import { computed, defineComponent, h, inject, mergeProps } from "vue";

import { omitAttrs } from "../../lib/attrs";
import { recipePartFactory } from "../../lib/slot-part";
import { meterContextKey } from "./meter-context";
import { meter } from "./meter.variants";

type MeterSlot = "indicator" | "label" | "value";

const simple = recipePartFactory(meter);

export const MeterHeader = simple("MeterHeader", "header");
export const MeterTrack = simple("MeterTrack", "track");

const part = (name: string, slot: MeterSlot, tag: string, dataSlot: string) =>
  defineComponent({
    name,
    inheritAttrs: false,
    props: {
      as: { type: String, default: undefined },
      asChild: { type: Boolean, default: false },
    },
    setup(props, { attrs, slots }) {
      const context = inject(meterContextKey, undefined);
      const classes = computed(() =>
        meter()[slot]({ className: attrs.class as string | undefined }),
      );
      const style = computed(() =>
        slot === "indicator"
          ? [{ width: `${(context?.value.share ?? 0) * 100}%` }, attrs.style]
          : undefined,
      );
      return () =>
        h(
          Primitive,
          mergeProps(omitAttrs(attrs, "class", "style"), {
            as: (props.as ?? tag) as string,
            "as-child": props.asChild,
            "data-slot": dataSlot,
            id: slot === "label" ? (attrs.id ?? context?.value.labelId) : undefined,
            style: style.value,
            class: classes.value,
          }),
          slot === "value" ? (slots.default?.() ?? context?.value.valueText) : slots.default?.(),
        );
    },
  });

export const MeterIndicator = part("RaftMeterIndicator", "indicator", "div", "meter-indicator");
export const MeterLabel = part("RaftMeterLabel", "label", "span", "meter-label");
export const MeterValue = part("RaftMeterValue", "value", "span", "meter-value");
