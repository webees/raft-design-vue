<script setup lang="ts">
import { computed, getCurrentInstance, ref, useAttrs } from "vue";
import { CollapsibleRoot } from "reka-ui";
import { taskListSection } from "./task-list.variants";

defineOptions({ name: "RaftTaskSection", inheritAttrs: false });

const props = withDefaults(
  defineProps<{ open?: boolean; defaultOpen?: boolean; disabled?: boolean }>(),
  { defaultOpen: true },
);
const emit = defineEmits<{ "update:open": [value: boolean] }>();
const attrs = useAttrs();
const internalOpen = ref(props.defaultOpen);
const instance = getCurrentInstance();
const isControlled = computed(() => instance?.vnode.props?.["open"] !== undefined);
const openState = computed({
  get: () => (isControlled.value ? (props.open as boolean) : internalOpen.value),
  set: (value: boolean) => {
    if (!isControlled.value) internalOpen.value = value;
    emit("update:open", value);
  },
});
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
