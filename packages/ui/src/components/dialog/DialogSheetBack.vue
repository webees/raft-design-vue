<script setup lang="ts">
import { computed, inject, useAttrs } from "vue";
import { ArrowLeft } from "lucide-vue-next";

import PanelAction from "../panel/PanelAction.vue";
import { dialogSheetHeadKey } from "./dialog-sheet-context";

defineOptions({ name: "RaftDialogSheetBack", inheritAttrs: false });

withDefaults(
  defineProps<{
    ariaLabel?: string;
    disabled?: boolean;
  }>(),
  { disabled: false },
);

const attrs = useAttrs();
const inSheetHead = inject(dialogSheetHeadKey, null);
const visible = computed(() => !!inSheetHead?.value);
</script>

<template>
  <PanelAction
    v-if="visible"
    activate-on-touch-end
    data-slot="dialog-sheet-back"
    :aria-label="ariaLabel ?? 'Back'"
    :disabled="disabled"
    v-bind="{ ...attrs, class: undefined }"
    :class="attrs.class as string"
  >
    <slot>
      <ArrowLeft />
    </slot>
  </PanelAction>
</template>
