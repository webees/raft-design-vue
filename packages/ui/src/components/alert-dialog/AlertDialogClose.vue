<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { AlertDialogCancel } from "reka-ui";
import { Button } from "../button";
import type { ButtonSize, ButtonVariant } from "../button/button.variants";

defineOptions({ name: "RaftAlertDialogClose", inheritAttrs: false });

const props = withDefaults(
  defineProps<{ variant?: ButtonVariant; size?: ButtonSize; ariaLabel?: string }>(),
  { variant: "ghost", size: "icon-md", ariaLabel: "Close" },
);

const attrs = useAttrs();
const closeClass = computed(() => attrs.class as string);
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
  </AlertDialogCancel>
</template>
