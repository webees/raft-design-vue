<script setup lang="ts">
import { actionProps } from "../../lib/part-props";
import { ChevronDown } from "lucide-vue-next";
import { Primitive } from "reka-ui";
import { panelTitleTrigger, panelTitleTriggerLabel } from "./panel.variants";

defineOptions({ name: "RaftPanelTitleTrigger", inheritAttrs: false });

defineProps(actionProps());
const attrs = useAttrs();
const rootClass = computed(() => panelTitleTrigger({ className: attrs.class as string }));
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    v-bind="{ ...attrs, class: undefined }"
    type="button"
    data-slot="panel-title-trigger"
    data-icon-inset=""
    :disabled="disabled"
    :class="rootClass"
  >
    <span data-slot="panel-title-trigger-label" :class="panelTitleTriggerLabel">
      <slot />
    </span>
    <ChevronDown aria-hidden="true" />
  </Primitive>
</template>
