<script setup lang="ts">
import { Toggle } from "reka-ui";
import { TOGGLE_PROPS, usePanelToggle } from "../../lib/use-collapsible";
import { panelToggleAction } from "./panel.variants";

defineOptions({ name: "RaftPanelToggleAction", inheritAttrs: false });

const props = defineProps(TOGGLE_PROPS);
const emit = defineEmits<{ "update:pressed": [value: boolean] }>();
const attrs = useAttrs();
const { current, rootClass } = usePanelToggle(
  props,
  (value) => emit("update:pressed", value),
  panelToggleAction,
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
    data-slot="panel-toggle-action"
    data-icon-inset=""
    :data-pressed="current ? '' : undefined"
    :class="rootClass"
    @update:model-value="current = $event"
  >
    <slot />
  </Toggle>
</template>
