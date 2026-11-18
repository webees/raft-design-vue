<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { Primitive } from "reka-ui";
import { saveStatus } from "./save-status.variants";

defineOptions({ name: "RaftSaveStatusError", inheritAttrs: false });

withDefaults(
  defineProps<{
    role?: string;
    as?: string;
    asChild?: boolean;
  }>(),
  {
    role: "alert",
    as: "span",
    asChild: false,
  },
);

const attrs = useAttrs();
const errorClass = computed(() =>
  saveStatus().error({ className: attrs.class as string }),
);
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    v-bind="{ ...attrs, class: undefined }"
    data-slot="save-status-error"
    :role="role"
    :class="errorClass"
  >
    <slot />
  </Primitive>
</template>
