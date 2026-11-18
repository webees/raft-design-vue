<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { ChevronDown } from "lucide-vue-next";
import { Primitive } from "reka-ui";
import { panelSplitActionMenu } from "./panel.variants";

defineOptions({ name: "RaftPanelSplitActionMenu", inheritAttrs: false });

withDefaults(defineProps<{ disabled?: boolean; as?: string; asChild?: boolean }>(), {
  disabled: false,
  as: "button",
  asChild: false,
});
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
