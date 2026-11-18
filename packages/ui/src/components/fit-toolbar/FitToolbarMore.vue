<script setup lang="ts">
import { MoreHorizontal } from "lucide-vue-next";

import { cn } from "../../lib/cn";
import Button from "../button/Button.vue";
import Tooltip from "../tooltip/Tooltip.vue";
import TooltipContent from "../tooltip/TooltipContent.vue";
import TooltipTrigger from "../tooltip/TooltipTrigger.vue";
import { useFitToolbar } from "./fit-toolbar-context";
import { fitToolbar } from "./fit-toolbar.recipe";

defineOptions({ name: "RaftFitToolbarMore", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    /** Its accessible name and tooltip, in the page's language: "More" by default. */
    label?: string;
  }>(),
  { label: "More" },
);

const attrs = useAttrs();
const context = useFitToolbar();
const styles = fitToolbar();
const shown = computed(() => context.moreShown());
const rootClass = computed(() => cn(styles.more(), attrs.class as string | undefined));
</script>

<template>
  <Tooltip>
    <TooltipTrigger as-child>
      <Button
        v-bind="{ ...attrs, class: undefined }"
        variant="ghost"
        size="icon-md"
        :aria-label="props.label"
        data-slot="fit-toolbar-more"
        data-fit-more-trigger=""
        aria-haspopup="menu"
        :data-fit-shown="shown ? '' : undefined"
        :class="rootClass"
      >
        <slot>
          <MoreHorizontal />
        </slot>
      </Button>
    </TooltipTrigger>
    <TooltipContent>{{ props.label }}</TooltipContent>
  </Tooltip>
</template>
