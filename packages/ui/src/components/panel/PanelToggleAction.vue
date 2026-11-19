<script setup lang="ts">
import { Toggle } from "reka-ui";
import { useControlledState } from "../../lib/use-controlled-state";
import { panelToggleAction } from "./panel.variants";

defineOptions({ name: "RaftPanelToggleAction", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    pressed?: boolean;
    defaultPressed?: boolean;
    disabled?: boolean;
    as?: string;
    asChild?: boolean;
  }>(),
  { defaultPressed: false, disabled: false, as: "button", asChild: false },
);
const emit = defineEmits<{ "update:pressed": [value: boolean] }>();
const attrs = useAttrs();
const current = useControlledState(
  "pressed",
  () => props.pressed,
  props.defaultPressed,
  (value) => emit("update:pressed", value),
);
const rootClass = computed(() => panelToggleAction({ className: attrs.class as string }));
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
