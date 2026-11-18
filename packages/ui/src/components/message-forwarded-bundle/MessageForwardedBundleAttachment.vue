<script setup lang="ts">
import { messageForwardedBundleItem } from "./message-forwarded-bundle.recipes";

defineOptions({ name: "RaftMessageForwardedBundleAttachment", inheritAttrs: false });

const props = withDefaults(defineProps<{ interactive?: boolean }>(), { interactive: false });
const attrs = useAttrs();
const rootClass = computed(() =>
  messageForwardedBundleItem({ action: props.interactive ? "interactive" : "static" }).attachment({
    class: attrs.class as string | undefined,
  }),
);
</script>

<template>
  <span
    v-bind="{ ...attrs, class: undefined }"
    data-slot="message-forwarded-bundle-attachment"
    :class="rootClass"
  >
    <slot />
  </span>
</template>
