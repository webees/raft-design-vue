<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { Button } from "../button";
import type { ButtonSize, ButtonVariant } from "../button/button.variants";

defineOptions({ name: "RaftAlertDialogAction", inheritAttrs: false });

const props = withDefaults(defineProps<{ variant?: ButtonVariant; size?: ButtonSize }>(), {
  variant: "primary",
  size: "md",
});

const attrs = useAttrs();
const actionClass = computed(() => attrs.class as string);
</script>

<template>
  <Button
    v-bind="{ ...attrs, class: undefined }"
    :variant="props.variant"
    :size="props.size"
    :class="actionClass"
    data-slot="alert-dialog-action"
  >
    <slot />
  </Button>
</template>
