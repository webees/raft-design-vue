<script setup lang="ts">
import { asChildProps } from "../../lib/part-props";
import { Primitive } from "reka-ui";
import { panelSplitAction } from "./panel.variants";

defineOptions({ name: "RaftPanelSplitAction", inheritAttrs: false });

defineProps(asChildProps());
const attrs = useAttrs();
const rootClass = computed(() => panelSplitAction({ className: attrs.class as string }));
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    v-bind="{ ...attrs, class: undefined }"
    role="group"
    data-slot="panel-split-action"
    :class="rootClass"
  >
    <slot />
  </Primitive>
</template>
