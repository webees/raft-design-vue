<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { CollapsibleTrigger } from "reka-ui";
import { taskListSection } from "./task-list.variants";

defineOptions({ name: "RaftTaskSectionTrigger", inheritAttrs: false });
withDefaults(defineProps<{ asChild?: boolean }>(), { asChild: false });
const attrs = useAttrs();
const triggerClass = computed(() =>
  taskListSection().trigger({ className: attrs.class as string }),
);
</script>

<template>
  <CollapsibleTrigger
    v-bind="{ ...attrs, class: undefined }"
    :as-child="asChild"
    data-slot="task-section-trigger"
    :class="triggerClass"
  >
    <slot />
  </CollapsibleTrigger>
</template>
