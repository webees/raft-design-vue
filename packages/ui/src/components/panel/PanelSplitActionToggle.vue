<script setup lang="ts">
import { Toggle } from "reka-ui";
import { TOGGLE_PROPS, usePanelToggle } from "../../lib/use-collapsible";
import { panelSplitActionToggle } from "./panel.variants";

defineOptions({ name: "RaftPanelSplitActionToggle", inheritAttrs: false });

const props = defineProps(TOGGLE_PROPS);
const emit = defineEmits<{ "update:pressed": [value: boolean] }>();
const attrs = useAttrs();
const { current, rootClass } = usePanelToggle(
  props,
  (value) => emit("update:pressed", value),
  panelSplitActionToggle,
  attrs.class as string,
);
</script>

<template>
  <Toggle
    v-bind="{ ...attrs, class: undefined }"
    :as="as"
    :as-child="asChild"
    :model-value="current"
    :disabled="disabled"
    type="button"
    data-slot="panel-split-action-toggle"
    data-split-action-main=""
    data-icon-inset=""
    :data-pressed="current ? '' : undefined"
    :class="rootClass"
    @update:model-value="current = $event"
  >
    <slot />
  </Toggle>
</template>
