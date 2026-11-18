<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { Primitive } from "reka-ui";
import { panelSplitAction } from "./panel.variants";

defineOptions({ name: "RaftPanelSplitAction", inheritAttrs: false });

withDefaults(defineProps<{ as?: string; asChild?: boolean }>(), { as: "div", asChild: false });
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
