<script setup lang="ts">
import { computed, provide, toRef, useAttrs } from "vue";
import { TabsRoot } from "reka-ui";
import { tabs, type TabsPlacement, type TabsVariant } from "./tabs.variants";
import { tabsUiContextKey } from "./tabs-context";

defineOptions({ name: "RaftTabs", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    variant?: TabsVariant;
    placement?: TabsPlacement;
    modelValue?: string | number;
    defaultValue?: string | number;
    orientation?: "horizontal" | "vertical";
    activationMode?: "automatic" | "manual";
    as?: string;
    asChild?: boolean;
  }>(),
  {
    variant: "default",
    placement: "top",
    activationMode: "automatic",
    asChild: false,
  },
);

const emit = defineEmits<{
  "update:modelValue": [value: string | number];
}>();

const attrs = useAttrs();
const orientation = computed(
  () =>
    props.orientation ??
    (props.placement === "left" || props.placement === "right" ? "vertical" : "horizontal"),
);
const rootClass = computed(() =>
  tabs({ variant: props.variant, placement: props.placement }).root({
    className: attrs.class as string,
  }),
);

provide(tabsUiContextKey, {
  placement: props.placement,
  variant: props.variant,
});

const modelValue = toRef(props, "modelValue");
</script>

<template>
  <TabsRoot
    v-bind="{ ...attrs, class: undefined }"
    :model-value="modelValue"
    :default-value="defaultValue"
    :orientation="orientation"
    :activation-mode="activationMode"
    :as="as"
    :as-child="asChild"
    @update:model-value="emit('update:modelValue', $event)"
    data-slot="tabs"
    :data-placement="placement"
    :data-variant="variant"
    :class="rootClass"
  >
    <slot :model-value="modelValue" />
  </TabsRoot>
</template>
