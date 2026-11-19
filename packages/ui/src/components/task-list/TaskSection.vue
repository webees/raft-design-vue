<script setup lang="ts">
import { CollapsibleRoot } from "reka-ui";
import { useControlledState } from "../../lib/use-controlled-state";
import { taskListSection } from "./task-list.variants";

defineOptions({ name: "RaftTaskSection", inheritAttrs: false });

const props = withDefaults(
  defineProps<{ open?: boolean; defaultOpen?: boolean; disabled?: boolean }>(),
  { defaultOpen: true },
);
const emit = defineEmits<{ "update:open": [value: boolean] }>();
const attrs = useAttrs();
const openState = useControlledState(
  "open",
  () => props.open,
  props.defaultOpen,
  (value) => emit("update:open", value),
);
const rootClass = computed(() => taskListSection().root({ className: attrs.class as string }));
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
