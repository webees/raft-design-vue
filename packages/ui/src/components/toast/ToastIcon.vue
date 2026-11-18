<script setup lang="ts">
import type { VNodeChild } from "vue";
import { CircleCheck, Info, TriangleAlert, type LucideIcon } from "lucide-vue-next";

import { toast as toastStyles } from "./toast.recipe";
import { TOAST_ITEM_CONTEXT_KEY } from "./toast-context";
import ToastNode from "./ToastNode";

defineOptions({ name: "RaftToastIcon", inheritAttrs: false });

const props = defineProps<{
  class?: string;
  icon?: LucideIcon;
}>();

const attrs = useAttrs();
const item = inject(TOAST_ITEM_CONTEXT_KEY, null);
const intent = computed(() => item?.intent.value ?? "info");
const leading = computed(() => item?.toast.value.data?.leading as VNodeChild | undefined);
const defaultIcon = computed<LucideIcon>(() => {
  if (props.icon) return props.icon;
  if (intent.value === "success") return CircleCheck;
  if (intent.value === "warning" || intent.value === "error") return TriangleAlert;
  return Info;
});
</script>

<template>
  <span v-bind="attrs" data-slot="toast-icon" :class="toastStyles().icon({ class: props.class })">
    <slot>
      <ToastNode v-if="leading !== undefined" :node="leading" />
      <component :is="defaultIcon" v-else aria-hidden="true" />
    </slot>
  </span>
</template>
