<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { DialogClose } from "reka-ui";
import { Button } from "../button";
import { dialog } from "./dialog.variants";
import type { ButtonSize, ButtonVariant } from "../button/button.variants";

defineOptions({ name: "RaftDialogClose", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    variant?: ButtonVariant;
    size?: ButtonSize;
    ariaLabel?: string;
    asChild?: boolean;
  }>(),
  { variant: "ghost", size: "icon-md", asChild: false },
);

const attrs = useAttrs();
const closeClass = computed(() => dialog().close({ className: attrs.class as string }));
</script>

<template>
  <DialogClose v-if="asChild" as-child>
    <slot />
  </DialogClose>
  <DialogClose v-else as-child>
    <Button
      :variant="props.variant"
      :size="props.size"
      :class="closeClass"
      :aria-label="props.ariaLabel ?? 'Close'"
      data-slot="dialog-close"
    >
      <slot>
        <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" class="size-4.5">
          <path
            d="M5 5l10 10M15 5L5 15"
            stroke="currentColor"
            stroke-width="1.75"
            stroke-linecap="square"
          />
        </svg>
      </slot>
    </Button>
  </DialogClose>
</template>
