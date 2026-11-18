<script setup lang="ts">
import { computed, h, useAttrs, useSlots, type VNode } from "vue";
import { ChevronDown } from "lucide-vue-next";

import Button from "../button/Button.vue";
import DropdownMenuItem from "../dropdown-menu/DropdownMenuItem.vue";
import { useFitItem } from "../fit-toolbar/use-fit-item";
import Tooltip from "../tooltip/Tooltip.vue";
import TooltipContent from "../tooltip/TooltipContent.vue";
import TooltipTrigger from "../tooltip/TooltipTrigger.vue";
import { selectionToolbar } from "./selection-toolbar.recipe";
import { warnMenuWithoutMoreItem } from "./selection-toolbar-warning";

defineOptions({ name: "RaftSelectionToolbarAction", inheritAttrs: false });

const LABEL_STEP = 30;
const SECONDARY_STEP = 20;
const MORE_STEP = 40;

const props = withDefaults(
  defineProps<{
    /** A secondary action goes into More first. */
    secondary?: boolean;
    /** The action opens a menu; draw the chevron and keep its label. */
    menu?: boolean;
    /** What More shows for this action; `null` contributes nothing. */
    moreItem?: VNode | null;
    /** Position where its label gives way, relative to other fit steps. */
    labelOrder?: number;
    /** Position where the action itself gives way. */
    moreOrder?: number;
    disabled?: boolean;
    class?: string;
  }>(),
  {
    secondary: false,
    menu: false,
    moreItem: undefined,
    labelOrder: LABEL_STEP,
    moreOrder: undefined,
    disabled: false,
    class: undefined,
  },
);

const attrs = useAttrs();
const slots = useSlots();
const styles = computed(() => selectionToolbar({ menu: props.menu }));

const moreItem = computed(() =>
  props.moreItem !== undefined
    ? props.moreItem
    : props.menu
      ? (() => {
          warnMenuWithoutMoreItem();
          return null;
        })()
      : h(
          DropdownMenuItem,
          {
            disabled: props.disabled,
            onClick: attrs.onClick as ((event: Event) => void) | undefined,
          },
          () => [slots.icon?.(), slots.default?.()],
        ),
);

const item = useFitItem({
  label: props.labelOrder,
  more: props.moreOrder ?? (props.secondary ? SECONDARY_STEP : MORE_STEP),
  moreItem: () => moreItem.value ?? undefined,
});

const labelTaken = computed(() => item.taken("label"));
const buttonClass = computed(() =>
  styles.value.action({
    class: [
      attrs.class as string | undefined,
      props.class,
      item.taken("more") ? "hidden" : undefined,
    ],
  }),
);
</script>

<template>
  <Tooltip :disabled="!labelTaken">
    <TooltipTrigger as-child>
      <Button
        v-bind="{ ...attrs, class: undefined, ...item.props.value }"
        data-slot="button"
        data-selection-toolbar-action=""
        :data-secondary="secondary ? '' : undefined"
        variant="ghost"
        size="md"
        :disabled="disabled"
        :class="buttonClass"
      >
        <slot name="icon" />
        <span
          data-slot="selection-toolbar-action-label"
          :class="styles.actionLabel()"
        >
          <slot />
        </span>
        <ChevronDown v-if="menu" aria-hidden="true" :class="styles.actionChevron()" />
      </Button>
    </TooltipTrigger>
    <TooltipContent><slot /></TooltipContent>
  </Tooltip>
</template>
