<script setup lang="ts">
import { CollapsibleRoot } from "reka-ui";
import { useControlledState } from "../../lib/use-controlled-state";
import { taskBoardColumn } from "./task-board.variants";

defineOptions({ name: "RaftTaskBoardColumn", inheritAttrs: false });

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
const rootClass = computed(() => taskBoardColumn().root({ className: attrs.class as string }));
</script>

<template>
  <CollapsibleRoot
    v-bind="{ ...attrs, class: undefined }"
    as="section"
    v-model:open="openState"
    data-slot="task-board-column"
    :data-panel-open="openState ? '' : undefined"
    :disabled="disabled"
    :class="rootClass"
  >
    <slot />
  </CollapsibleRoot>
</template>
