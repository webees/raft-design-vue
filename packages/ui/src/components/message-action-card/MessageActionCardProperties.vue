<script setup lang="ts">
import { ref, useAttrs } from "vue";

import { cn } from "../../lib/cn";
import { useLabelValueFit } from "../../lib/label-value-fit";
import { messageActionCardContent } from "./message-action-card.recipes";

defineOptions({ name: "RaftMessageActionCardProperties", inheritAttrs: false });

const attrs = useAttrs();
const list = ref<HTMLElement | null>(null);
useLabelValueFit(list, () => true, {
  label:
    ":scope > [data-slot=message-action-card-property] > [data-slot=message-action-card-property-label]",
  value:
    ":scope > [data-slot=message-action-card-property] > [data-slot=message-action-card-property-value]",
});
</script>

<template>
  <dl
    ref="list"
    v-bind="{ ...attrs, class: undefined }"
    :data-slot="(attrs['data-slot'] as string | undefined) ?? 'message-action-card-properties'"
    :class="cn(messageActionCardContent().properties(), attrs.class as string | undefined)"
  >
    <slot />
  </dl>
</template>
