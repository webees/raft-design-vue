<script setup lang="ts">
import { DialogClose } from "reka-ui";

import { cn } from "../../lib/cn";
import Button from "../button/Button.vue";
import type { ButtonSize, ButtonVariant } from "../button";
import { lightbox } from "./lightbox.recipe";

defineOptions({ name: "RaftLightboxClose", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    class?: string;
    size?: ButtonSize;
    variant?: ButtonVariant;
  }>(),
  { size: "icon-lg", variant: "outline" },
);

const attrs = useAttrs();
const classes = computed(() => lightbox().close({ class: props.class }));
</script>

<template>
  <DialogClose as-child>
    <Button
      v-bind="attrs"
      :class="classes"
      data-lightbox-close=""
      data-slot="lightbox-close"
      :size="props.size"
      type="button"
      :variant="props.variant"
    >
      <slot />
    </Button>
  </DialogClose>
</template>
