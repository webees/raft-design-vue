import { ChevronDown } from "lucide-vue-next";
import { defineComponent, h, mergeProps } from "vue";

import { cn } from "../../lib/cn";
import Button from "./Button.vue";
import { buttonSplitMain, buttonSplitMenu } from "./button-split.recipe";
import { BUTTON_SPLIT_PART_PROPS, useButtonSplitPart } from "./use-button-split-part";

const splitPart = (name: string, part: "main" | "menu") =>
  defineComponent({
    name,
    inheritAttrs: false,
    props: BUTTON_SPLIT_PART_PROPS,
    setup(props, { attrs, slots }) {
      const { isDisabled, isSticker } = useButtonSplitPart(props, part === "main");
      return () =>
        h(
          Button,
          mergeProps(
            { ...attrs, class: undefined },
            {
              "data-split-part": part,
              "data-split-sticker": isSticker.value ? "" : undefined,
              variant: props.variant,
              size: props.size,
              disabled: isDisabled.value,
              loading: props.loading,
              class:
                part === "main"
                  ? cn(buttonSplitMain(), attrs.class as string | undefined)
                  : cn(
                      buttonSplitMenu({ variant: props.variant, size: props.size }),
                      attrs.class as string | undefined,
                    ),
            },
          ),
          {
            default: () =>
              slots.default?.() ??
              (part === "menu" ? h(ChevronDown, { "aria-hidden": true }) : undefined),
          },
        );
    },
  });

export const ButtonSplitMain = splitPart("RaftButtonSplitMain", "main");
export const ButtonSplitMenu = splitPart("RaftButtonSplitMenu", "menu");
