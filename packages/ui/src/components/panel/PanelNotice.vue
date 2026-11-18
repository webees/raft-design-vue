<script setup lang="ts">
import { Primitive } from "reka-ui";
import { panelNotice, type PanelNoticeStatus } from "./panel.variants";

defineOptions({ name: "RaftPanelNotice", inheritAttrs: false });

const props = withDefaults(
  defineProps<{ status?: PanelNoticeStatus; as?: string; asChild?: boolean }>(),
  { status: "warning", as: "div", asChild: false },
);
const attrs = useAttrs();
const rootClass = computed(() =>
  panelNotice({ status: props.status }).root({ className: attrs.class as string }),
);
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    v-bind="{ ...attrs, class: undefined }"
    data-slot="panel-notice"
    :data-status="status"
    :class="rootClass"
  >
    <slot />
  </Primitive>
</template>
