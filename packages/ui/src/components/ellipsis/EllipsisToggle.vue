<script setup lang="ts">
import { TextLink } from "../text-link";
import { useEllipsisContext } from "./ellipsis-context";

defineOptions({ name: "RaftEllipsisToggle", inheritAttrs: false });

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

const attrs = useAttrs();
const context = useEllipsisContext();

function onClick(event: MouseEvent) {
  emit("click", event);
  if (!event.defaultPrevented) context.toggle();
}
</script>

<template>
  <TextLink
    v-bind="attrs"
    :aria-expanded="context.expanded"
    :aria-controls="context.textId"
    @click="onClick"
  >
    <slot />
  </TextLink>
</template>
