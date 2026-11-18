<script setup lang="ts">
import { messageSystem } from "./system-message.variants";

defineOptions({ name: "RaftSystemMessageContent", inheritAttrs: false });

const props = defineProps<{ title?: string }>();
const attrs = useAttrs();
const slots = useSlots();

const rootClass = computed(() =>
  messageSystem().systemContent({ className: attrs.class as string }),
);

const resolvedTitle = computed(() => {
  const children = slots.default?.();
  if (props.title) return props.title;
  if (children?.length !== 1) return undefined;
  const child = children[0];
  if (typeof child === "string") return child;
  if (child && typeof child === "object" && "children" in child) {
    const text = (child as { children?: unknown }).children;
    return typeof text === "string" ? text : undefined;
  }
  return undefined;
});
</script>

<template>
  <span
    v-bind="{ ...attrs, class: undefined }"
    data-slot="system-message-item-content"
    :title="resolvedTitle"
    :class="rootClass"
  >
    <slot />
  </span>
</template>
