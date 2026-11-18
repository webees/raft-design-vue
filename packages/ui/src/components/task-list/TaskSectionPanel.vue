<script setup lang="ts">
import { CollapsibleContent } from "reka-ui";
import { taskListSection } from "./task-list.variants";

defineOptions({ name: "RaftTaskSectionPanel", inheritAttrs: false });
withDefaults(defineProps<{ forceMount?: boolean }>(), { forceMount: false });
const attrs = useAttrs();
const panelClass = computed(() => taskListSection().panel({ className: attrs.class as string }));
</script>

<template>
  <CollapsibleContent
    v-bind="{ ...attrs, class: undefined }"
    :force-mount="forceMount"
    data-slot="task-section-panel"
    :class="panelClass"
  >
    <slot />
  </CollapsibleContent>
</template>
