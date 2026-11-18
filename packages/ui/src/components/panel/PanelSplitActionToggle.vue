<script setup lang="ts">
import { computed, ref, useAttrs } from "vue";
import { Toggle } from "reka-ui";
import { panelSplitActionToggle } from "./panel.variants";

defineOptions({ name: "RaftPanelSplitActionToggle", inheritAttrs: false });

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
const internal = ref(props.defaultPressed);
const current = computed(() => props.pressed ?? internal.value);
const rootClass = computed(() =>
  panelSplitActionToggle({ className: attrs.class as string }),
);

function update(value: boolean) {
  internal.value = value;
  emit("update:pressed", value);
}
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
    @update:model-value="update"
  >
    <slot />
  </Toggle>
</template>
