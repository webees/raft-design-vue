<script setup lang="ts">
import { actionProps } from "../../lib/part-props";
import { Primitive } from "reka-ui";
import { panelSplitActionMain } from "./panel.variants";

defineOptions({ name: "RaftPanelSplitActionMain", inheritAttrs: false });

defineProps(actionProps());
const attrs = useAttrs();
const rootClass = computed(() => panelSplitActionMain({ className: attrs.class as string }));
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    v-bind="{ ...attrs, class: undefined }"
    type="button"
    data-slot="panel-split-action-main"
    data-split-action-main=""
    data-icon-inset=""
    :disabled="disabled"
    :class="rootClass"
  >
    <slot />
  </Primitive>
</template>
