<script setup lang="ts">
import { CollapsibleRoot } from "reka-ui";
import { COLLAPSIBLE_SECTION_PROPS, useCollapsibleSection } from "../../lib/use-collapsible";
import { taskListSection } from "./task-list.variants";

defineOptions({ name: "RaftTaskSection", inheritAttrs: false });

const props = defineProps(COLLAPSIBLE_SECTION_PROPS);
const emit = defineEmits<{ "update:open": [value: boolean] }>();
const attrs = useAttrs();
const { openState, rootClass } = useCollapsibleSection(
  props,
  (value) => emit("update:open", value),
  taskListSection,
  attrs.class as string,
);
</script>

<template>
  <CollapsibleRoot
    v-bind="{ ...attrs, class: undefined }"
    as="section"
    v-model:open="openState"
    data-slot="task-section"
    :data-panel-open="openState ? '' : undefined"
    :disabled="disabled"
    :class="rootClass"
  >
    <slot />
  </CollapsibleRoot>
</template>
