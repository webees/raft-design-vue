<script setup lang="ts">
import { Button } from "../button";
import type { ButtonSize, ButtonVariant } from "../button";

defineOptions({ name: "RaftFileAction" });
withDefaults(
  defineProps<{
    variant?: ButtonVariant;
    size?: ButtonSize;
    disabled?: boolean;
  }>(),
  { variant: "ghost", size: "icon-md", disabled: false },
);
</script>

<template>
  <Button :variant="variant" :size="size" :disabled="disabled">
    <slot />
  </Button>
</template>
