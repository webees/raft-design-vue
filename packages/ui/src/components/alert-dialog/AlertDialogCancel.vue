<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { AlertDialogCancel } from "reka-ui";
import { Button } from "../button";
import type { ButtonSize, ButtonVariant } from "../button/button.variants";

defineOptions({ name: "RaftAlertDialogCancel", inheritAttrs: false });

const props = withDefaults(
  defineProps<{ variant?: ButtonVariant; size?: ButtonSize }>(),
  { variant: "ghost", size: "md" },
);

const attrs = useAttrs();
const cancelClass = computed(() => attrs.class as string);
</script>

<template>
  <AlertDialogCancel as-child>
    <Button
      v-bind="{ ...attrs, class: undefined }"
      :variant="props.variant"
      :size="props.size"
      :class="cancelClass"
      data-slot="alert-dialog-cancel"
    >
      <slot />
    </Button>
  </AlertDialogCancel>
</template>
