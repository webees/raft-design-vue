<script setup lang="ts">
import { MoreHorizontal } from "lucide-vue-next";

import Button from "../button/Button.vue";
import { useFitMore } from "../fit-toolbar/use-fit-more";
import { selectionToolbar } from "./selection-toolbar.recipe";

defineOptions({ name: "RaftSelectionToolbarMore", inheritAttrs: false });

/**
 * More, after the actions: a menu trigger whose menu opens upward. Wrap it in
 * a DropdownMenuTrigger and put the out-of-row actions in that menu.
 */
const props = defineProps<{
  /** Its accessible name, such as "More actions". */
  ariaLabel: string;
  class?: string;
}>();

const attrs = useAttrs();
const fit = useFitMore();
const moreClass = computed(() =>
  selectionToolbar().more({
    class: props.class,
  }),
);
</script>

<template>
  <Button
    v-bind="{ ...attrs, class: undefined, ...fit.props.value }"
    data-slot="button"
    data-selection-toolbar-more=""
    variant="ghost"
    size="md"
    :aria-label="ariaLabel"
    :class="moreClass"
  >
    <slot><MoreHorizontal aria-hidden="true" /></slot>
  </Button>
</template>
