<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { X } from "lucide-vue-next";

import Button from "../button/Button.vue";
import { selectionToolbar } from "./selection-toolbar.recipe";

defineOptions({ name: "RaftSelectionToolbarClose", inheritAttrs: false });

defineProps<{ ariaLabel: string }>();

const attrs = useAttrs();
const rootClass = computed(() =>
  selectionToolbar().close({ class: attrs.class as string | undefined }),
);
</script>

<template>
  <Button
    v-bind="{ ...attrs, class: undefined }"
    variant="ghost"
    size="icon-md"
    data-slot="button"
    data-selection-toolbar-close=""
    :aria-label="ariaLabel"
    :class="rootClass"
  >
    <slot><X class="size-4" /></slot>
  </Button>
</template>
