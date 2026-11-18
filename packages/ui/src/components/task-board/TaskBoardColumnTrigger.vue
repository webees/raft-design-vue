<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { CollapsibleTrigger } from "reka-ui";
import { taskBoardColumn } from "./task-board.variants";

defineOptions({ name: "RaftTaskBoardColumnTrigger", inheritAttrs: false });
withDefaults(defineProps<{ asChild?: boolean }>(), { asChild: false });
const attrs = useAttrs();
const triggerClass = computed(() =>
  taskBoardColumn().trigger({ className: attrs.class as string }),
);
</script>

<template>
  <CollapsibleTrigger
    v-bind="{ ...attrs, class: undefined }"
    :as-child="asChild"
    data-slot="task-board-column-trigger"
    :class="triggerClass"
  >
    <slot />
  </CollapsibleTrigger>
</template>
