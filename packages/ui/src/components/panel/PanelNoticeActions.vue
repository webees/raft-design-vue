<script setup lang="ts">
import { asChildProps } from "../../lib/part-props";
import { Primitive } from "reka-ui";
import { panelNotice } from "./panel.variants";

defineOptions({ name: "RaftPanelNoticeActions", inheritAttrs: false });

defineProps(asChildProps());
const attrs = useAttrs();
const rootClass = computed(() => panelNotice().actions({ className: attrs.class as string }));
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    v-bind="{ ...attrs, class: undefined }"
    data-slot="panel-notice-actions"
    :class="rootClass"
  >
    <slot />
  </Primitive>
</template>
