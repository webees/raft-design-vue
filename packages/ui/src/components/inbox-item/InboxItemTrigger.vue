<script setup lang="ts">
import { inboxItemRecipe } from "./inbox-item.recipe";
import { inboxItemDisabledKey } from "./inbox-item-context";

defineOptions({ name: "RaftInboxItemTrigger", inheritAttrs: false });

const attrs = useAttrs();
const disabled = inject(inboxItemDisabledKey, undefined);
const rootClass = computed(() =>
  inboxItemRecipe().itemTrigger({ class: attrs.class as string | undefined }),
);
</script>

<template>
  <button
    v-bind="{ ...attrs, class: undefined }"
    type="button"
    :disabled="disabled"
    :aria-disabled="disabled || undefined"
    :data-disabled="disabled ? 'true' : undefined"
    data-slot="inbox-item-open"
    :class="rootClass"
  >
    <slot />
  </button>
</template>
