<script setup lang="ts">
import { computed, useAttrs, useSlots, type VNode } from "vue";
import { Plus } from "lucide-vue-next";

import { cn } from "../../lib/cn";
import Button from "../button/Button.vue";
import Tooltip from "../tooltip/Tooltip.vue";
import TooltipContent from "../tooltip/TooltipContent.vue";
import TooltipTrigger from "../tooltip/TooltipTrigger.vue";
import { fitToolbar } from "./fit-toolbar.recipe";
import { useFitItem } from "./use-fit-item";
import type { ButtonSize, ButtonVariant } from "../button/button.variants";

defineOptions({ name: "RaftFitToolbarButton", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    /** Its label: its accessible name and, once it has given way, its tooltip. */
    label?: string;
    /** When its label gives way (the `label` step). */
    labelOrder?: number;
    /**
     * When it shows as + alone, its icon and label gone (the `plus` step):
     * for the primary action, after the groups have wrapped.
     */
    plusOrder?: number;
    /** When it moves into More (the `more` step). */
    moreOrder?: number;
    /** What it is in More's menu. */
    moreItem?: VNode;
    variant?: ButtonVariant;
    size?: ButtonSize;
  }>(),
  { variant: "ghost", size: "md" },
);

const attrs = useAttrs();
const slots = useSlots();
const styles = fitToolbar();
const item = useFitItem({
  label: props.labelOrder,
  more: props.moreOrder,
  plus: props.plusOrder,
  moreItem: props.moreItem,
});

const labelTaken = computed(() => item.taken("label"));
const plusTaken = computed(() => item.taken("plus"));
const moreTaken = computed(() => item.taken("more"));
const showTooltip = computed(() => labelTaken.value || plusTaken.value);

const rootClass = computed(() =>
  cn(styles.button(), attrs.class as string | undefined),
);

const content = computed(() => {
  if (slots.default) return undefined;
  return props.label;
});
</script>

<template>
  <Tooltip :disabled="!showTooltip">
    <TooltipTrigger as-child>
      <Button
        v-bind="{ ...attrs, class: undefined }"
        :variant="props.variant"
        :size="props.size"
        :aria-label="props.label"
        data-fit-needs-icon=""
        :data-slot="(attrs['data-slot'] as string | undefined) ?? 'fit-toolbar-button'"
        :data-fit-id="item.props.value['data-fit-id']"
        :data-fit-steps="item.props.value['data-fit-steps']"
        :data-fit-label="labelTaken ? '' : undefined"
        :data-fit-plus="plusTaken ? '' : undefined"
        :data-fit-more="moreTaken ? '' : undefined"
        :class="rootClass"
      >
        <template v-if="props.plusOrder !== undefined">
          <span data-slot="fit-toolbar-button-icon" :class="styles.icon()">
            <template v-if="slots['collapsed-icon']">
              <span
                v-if="slots.icon"
                data-slot="fit-toolbar-button-full-icon"
                :class="styles.fullIcon()"
              >
                <slot name="icon" />
              </span>
              <span data-slot="fit-toolbar-button-collapsed-icon" :class="styles.collapsedIcon()">
                <slot name="collapsed-icon" />
              </span>
            </template>
            <slot v-else name="icon" />
          </span>
          <Plus data-slot="fit-toolbar-button-plus" aria-hidden :class="styles.plus()" />
        </template>
        <template v-else>
          <template v-if="slots['collapsed-icon']">
            <span
              v-if="slots.icon"
              data-slot="fit-toolbar-button-full-icon"
              :class="styles.fullIcon()"
            >
              <slot name="icon" />
            </span>
            <span data-slot="fit-toolbar-button-collapsed-icon" :class="styles.collapsedIcon()">
              <slot name="collapsed-icon" />
            </span>
          </template>
          <slot v-else name="icon" />
        </template>
        <span data-slot="fit-toolbar-button-label" :class="styles.label()">
          <slot>{{ content }}</slot>
        </span>
      </Button>
    </TooltipTrigger>
    <TooltipContent>{{ props.label }}</TooltipContent>
  </Tooltip>
</template>
