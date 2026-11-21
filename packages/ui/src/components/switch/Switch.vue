<script setup lang="ts">
import { SwitchRoot } from "reka-ui";

import { switchRecipe } from "./switch.recipe";
import { SwitchThumb } from "./parts";

defineOptions({ name: "RaftSwitch", inheritAttrs: false });

withDefaults(defineProps<{ modelValue?: boolean; disabled?: boolean; name?: string }>(), {
  modelValue: false,
  disabled: false,
});
const emit = defineEmits<{ "update:modelValue": [value: boolean] }>();
const attrs = useAttrs();
const { root } = switchRecipe();
const rootClass = computed(() => root({ className: attrs.class as string }));
</script>

<template>
  <SwitchRoot
    v-bind="{ ...attrs, class: undefined }"
    :model-value="modelValue"
    :disabled="disabled"
    :name="name"
    data-slot="switch"
    :class="rootClass"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <slot>
      <SwitchThumb />
    </slot>
  </SwitchRoot>
</template>
