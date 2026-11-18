<script setup lang="ts">
import { Plus } from "lucide-vue-next";

import { cn } from "../../lib/cn";
import ButtonSplit from "../button/ButtonSplit.vue";
import ButtonSplitMain from "../button/ButtonSplitMain.vue";
import ButtonSplitMenu from "../button/ButtonSplitMenu.vue";
import Tooltip from "../tooltip/Tooltip.vue";
import TooltipContent from "../tooltip/TooltipContent.vue";
import TooltipTrigger from "../tooltip/TooltipTrigger.vue";
import { fitToolbar } from "./fit-toolbar.recipe";
import { useFitItem } from "./use-fit-item";

defineOptions({ name: "RaftFitToolbarSplitButton", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    /** Its label ("Create agent"), the accessible name of the pair. */
    label?: string;
    /** The pair's accessible name, when the label alone doesn't say it. */
    groupLabel?: string;
    /** The menu part's accessible name and tooltip ("More ways to create an agent"). */
    menuLabel?: string;
    /** When its label gives way (the `label` step); needs an `icon`. */
    labelOrder?: number;
    /** When it shows as + alone (the `plus` step). */
    plusOrder?: number;
    disabled?: boolean;
  }>(),
  {},
);

const emit = defineEmits<{ menu: [event: MouseEvent] }>();

const attrs = useAttrs();
const slots = useSlots();
const styles = fitToolbar();
const item = useFitItem({
  label: slots.icon === undefined ? undefined : props.labelOrder,
  plus: props.plusOrder,
});

const labelTaken = computed(() => item.taken("label"));
const plusTaken = computed(() => item.taken("plus"));
const showTooltip = computed(() => labelTaken.value || plusTaken.value);
const rootClass = computed(() => cn(styles.split(), attrs.class as string | undefined));
</script>

<template>
  <ButtonSplit
    v-bind="{ ...attrs, class: undefined, ...item.props.value }"
    :aria-label="props.groupLabel ?? props.label"
    :disabled="props.disabled"
    data-fit-split=""
    :class="rootClass"
  >
    <Tooltip :disabled="!showTooltip">
      <TooltipTrigger as-child>
        <ButtonSplitMain
          variant="default"
          size="md"
          data-slot="fit-toolbar-split-main"
          :class="styles.splitMain()"
        >
          <template v-if="props.plusOrder !== undefined">
            <span data-slot="fit-toolbar-button-icon" :class="styles.icon()">
              <slot name="icon" />
            </span>
            <Plus data-slot="fit-toolbar-button-plus" aria-hidden :class="styles.plus()" />
          </template>
          <slot v-else name="icon" />
          <span data-slot="fit-toolbar-button-label" :class="styles.label()">
            <slot>{{ props.label }}</slot>
          </span>
        </ButtonSplitMain>
      </TooltipTrigger>
      <TooltipContent>{{ props.label }}</TooltipContent>
    </Tooltip>
    <Tooltip>
      <TooltipTrigger as-child>
        <ButtonSplitMenu
          variant="default"
          size="md"
          :aria-label="props.menuLabel"
          data-slot="fit-toolbar-split-menu"
          @click="emit('menu', $event)"
        >
          <slot name="menu-trigger" />
        </ButtonSplitMenu>
      </TooltipTrigger>
      <TooltipContent>{{ props.menuLabel }}</TooltipContent>
    </Tooltip>
  </ButtonSplit>
</template>
