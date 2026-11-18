<script setup lang="ts">
import { messageForwardedBundle } from "./message-forwarded-bundle.recipes";
import { useForwardedBundleFold } from "./message-forwarded-bundle-fold";

defineOptions({ name: "RaftMessageForwardedBundleFooterAction", inheritAttrs: false });

const fold = useForwardedBundleFold();
const attrs = useAttrs();
const expanded = computed(() => Boolean(fold?.auto && !fold.collapsed));
const rootClass = computed(() =>
  messageForwardedBundle().footerAction({ class: attrs.class as string | undefined }),
);

function onClick(event: MouseEvent) {
  if (!event.defaultPrevented) fold?.toggle();
}
</script>

<template>
  <button
    v-bind="{ ...attrs, class: undefined }"
    type="button"
    data-slot="message-forwarded-bundle-footer-action"
    :aria-expanded="fold?.auto ? expanded : undefined"
    :class="rootClass"
    @click="onClick"
  >
    <slot v-if="expanded" name="expanded" />
    <slot v-else />
  </button>
</template>
