<script setup lang="ts">
import { Primitive } from "reka-ui";
import { panelNotice } from "./panel.variants";

defineOptions({ name: "RaftPanelNoticeContent", inheritAttrs: false });

withDefaults(defineProps<{ as?: string; asChild?: boolean }>(), { as: "div", asChild: false });
const attrs = useAttrs();
const rootClass = computed(() => panelNotice().content({ className: attrs.class as string }));
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    v-bind="{ ...attrs, class: undefined }"
    data-slot="panel-notice-content"
    :class="rootClass"
  >
    <slot />
  </Primitive>
</template>
