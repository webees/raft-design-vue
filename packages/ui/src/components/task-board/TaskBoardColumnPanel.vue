<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { CollapsibleContent } from "reka-ui";
import { taskBoardColumn } from "./task-board.variants";

defineOptions({ name: "RaftTaskBoardColumnPanel", inheritAttrs: false });
withDefaults(defineProps<{ forceMount?: boolean }>(), { forceMount: false });
const attrs = useAttrs();
const panelClass = computed(() => taskBoardColumn().panel({ className: attrs.class as string }));
</script>

<template>
  <CollapsibleContent
    v-bind="{ ...attrs, class: undefined }"
    :force-mount="forceMount"
    data-slot="task-board-column-panel"
    :class="panelClass"
  >
    <slot />
  </CollapsibleContent>
</template>
