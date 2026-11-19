<script setup lang="ts">
import { X } from "lucide-vue-next";
import { AlertDialogCancel } from "reka-ui";
import { Button } from "../button";
import { cn } from "../../lib/cn";
import type { ButtonSize, ButtonVariant } from "../button/button.variants";

defineOptions({ name: "RaftAlertDialogClose", inheritAttrs: false });

const props = withDefaults(
  defineProps<{ variant?: ButtonVariant; size?: ButtonSize; ariaLabel?: string }>(),
  { variant: "ghost", size: "icon-md", ariaLabel: "Close" },
);

const attrs = useAttrs();
const closeClass = cn("-my-1.5", attrs.class as string | undefined);
</script>

<template>
  <AlertDialogCancel as-child>
    <Button
      v-bind="{ ...attrs, class: undefined }"
      :variant="props.variant"
      :size="props.size"
      :class="closeClass"
      :aria-label="props.ariaLabel"
      data-slot="alert-dialog-close"
    >
      <slot>
        <X class="size-4.5" />
      </slot>
    </Button>
  </AlertDialogCancel>
</template>
