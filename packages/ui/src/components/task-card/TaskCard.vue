<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { taskCard } from "./task-card.variants";

defineOptions({ name: "RaftTaskCard", inheritAttrs: false });

const props = withDefaults(
  defineProps<{ busy?: boolean; disabled?: boolean; interactive?: boolean }>(),
  { busy: false, disabled: false },
);
const attrs = useAttrs();

const isInteractive = computed(() => props.interactive ?? attrs.onClick != null);
const rootClass = computed(() => taskCard().root({ className: attrs.class as string }));
</script>

<template>
  <article
    v-bind="{ ...attrs, class: undefined }"
    data-slot="task-card"
    :aria-busy="busy || undefined"
    :aria-disabled="disabled || undefined"
    :data-busy="busy ? 'true' : undefined"
    :data-disabled="disabled ? 'true' : undefined"
    :data-interactive="isInteractive ? 'true' : undefined"
    :class="rootClass"
  >
    <slot />
  </article>
</template>
