<script setup lang="ts">
import { onMounted, onUpdated, ref, useAttrs } from "vue";

import { toast as toastStyles } from "./toast.recipe";

defineOptions({ name: "RaftToastContent", inheritAttrs: false });

const props = defineProps<{ class?: string }>();
const attrs = useAttrs();
const element = ref<HTMLElement | null>(null);
const hasIcon = ref(false);
const hasDescription = ref(false);
const hasActions = ref(false);

function measure() {
  const el = element.value;
  if (!el) return;
  hasIcon.value = Boolean(el.querySelector('[data-slot="toast-icon"]'));
  hasDescription.value = Boolean(el.querySelector('[data-slot="toast-description"]'));
  hasActions.value = Boolean(el.querySelector('[data-slot="toast-actions"]'));
}

onMounted(measure);
onUpdated(measure);
</script>

<template>
  <div
    ref="element"
    v-bind="attrs"
    data-slot="toast-content"
    :data-has-icon="hasIcon ? '' : undefined"
    :data-has-description="hasDescription ? '' : undefined"
    :data-has-actions="hasActions ? '' : undefined"
    :class="toastStyles().content({ class: props.class })"
  >
    <slot />
  </div>
</template>
