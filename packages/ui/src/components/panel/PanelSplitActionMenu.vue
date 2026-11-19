<script setup lang="ts">
import { actionProps } from "../../lib/part-props";
import { ChevronDown } from "lucide-vue-next";
import { Primitive } from "reka-ui";
import { panelSplitActionMenu } from "./panel.variants";

defineOptions({ name: "RaftPanelSplitActionMenu", inheritAttrs: false });

defineProps(actionProps());
const attrs = useAttrs();
const rootClass = computed(() => panelSplitActionMenu({ className: attrs.class as string }));
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    v-bind="{ ...attrs, class: undefined }"
    type="button"
    data-slot="panel-split-action-menu"
    data-icon-inset=""
    :disabled="disabled"
    :class="rootClass"
  >
    <slot>
      <ChevronDown aria-hidden="true" />
    </slot>
  </Primitive>
</template>
