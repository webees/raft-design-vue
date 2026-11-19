<script setup lang="ts">
import { DialogClose } from "reka-ui";
import { X } from "lucide-vue-next";

import { cn } from "../../lib/cn";
import { Button } from "../button";
import PanelAction from "../panel/PanelAction.vue";
import { barButtonDesktop } from "../../lib/head-edges";
import { useInDialogSheetHead } from "./dialog-sheet-context";
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
  { variant: "ghost", asChild: false },
);

const attrs = useAttrs();
const inSheetHead = useInDialogSheetHead();
const closeClass = computed(() =>
  cn(
    dialog().close({ className: attrs.class as string }),
    props.size ? undefined : barButtonDesktop,
  ),
);
</script>

<template>
  <DialogClose v-if="asChild" as-child v-bind="attrs">
    <slot />
  </DialogClose>
  <DialogClose
    v-else-if="inSheetHead"
    as-child
    v-bind="{ ...attrs, class: undefined }"
    data-slot="dialog-close"
  >
    <PanelAction
      activate-on-touch-end
      :aria-label="props.ariaLabel ?? 'Close'"
      :class="attrs.class as string"
    >
      <slot><X /></slot>
    </PanelAction>
  </DialogClose>
  <DialogClose v-else as-child>
    <Button
      v-bind="{ ...attrs, class: undefined }"
      :variant="props.variant"
      :size="props.size ?? 'icon-md'"
      :class="closeClass"
      :aria-label="props.ariaLabel ?? 'Close'"
      data-slot="dialog-close"
    >
      <slot>
        <X class="size-4.5" />
      </slot>
    </Button>
  </DialogClose>
</template>
