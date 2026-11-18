<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { Primitive } from "reka-ui";
import { saveStatus } from "./save-status.variants";

defineOptions({ name: "RaftSaveStatus", inheritAttrs: false });

defineProps<{
  as?: string;
  asChild?: boolean;
}>();

const attrs = useAttrs();
const rootClass = computed(() => saveStatus().root({ className: attrs.class as string }));
</script>

<template>
  <Primitive
    :as="as ?? 'span'"
    :as-child="asChild"
    v-bind="{ ...attrs, class: undefined }"
    data-slot="save-status"
    :class="rootClass"
  >
    <slot />
  </Primitive>
</template>
