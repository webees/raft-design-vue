<script setup lang="ts">
import { CollapsibleRoot } from "reka-ui";
import { messageSystem } from "./system-message.variants";

defineOptions({ name: "RaftSystemMessageGroup", inheritAttrs: false });

const props = defineProps<{
  open?: boolean;
  defaultOpen?: boolean;
  disabled?: boolean;
}>();

const emit = defineEmits<{ "update:open": [open: boolean] }>();
const attrs = useAttrs();
const instance = getCurrentInstance();

const rootClass = computed(() => messageSystem().systemGroup({ className: attrs.class as string }));

const rootProps = computed(() => {
  const controlled = instance?.vnode.props?.open !== undefined;
  return {
    open: controlled ? props.open : undefined,
    defaultOpen: props.defaultOpen,
    disabled: props.disabled,
  };
});
</script>

<template>
  <CollapsibleRoot
    v-bind="{ ...attrs, class: undefined, ...rootProps }"
    data-slot="system-message-group"
    :class="rootClass"
    @update:open="emit('update:open', $event)"
  >
    <slot />
  </CollapsibleRoot>
</template>
