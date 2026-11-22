<script setup lang="ts">
import type { ToastData, ToastObject } from "./toast";
import { TOAST_PROVIDER_CONFIG_KEY } from "./toast-context";
import ToastRoot from "./ToastRoot.vue";
import ToastContent from "./ToastContent.vue";
import ToastIcon from "./ToastIcon.vue";
import ToastBody from "./ToastBody.vue";
import ToastTitle from "./ToastTitle.vue";
import ToastDescription from "./ToastDescription.vue";
import ToastActions from "./ToastActions.vue";
import ToastClose from "./ToastClose.vue";
import ToastAction from "./ToastAction.vue";
import ToastProgress from "./ToastProgress.vue";

defineOptions({ name: "RaftToastDefaultItem" });

const props = defineProps<{
  toast: ToastObject<ToastData>;
  limited?: boolean;
}>();

const config = inject(TOAST_PROVIDER_CONFIG_KEY, null);
const data = computed(() => props.toast.data);
const showDescription = computed(() => Boolean(props.toast.description));
const showAction = computed(
  () => data.value?.hasAction === true || Boolean(props.toast.actionProps?.label),
);
const showClose = computed(() => data.value?.hasClose === true);
const showIcon = computed(() => data.value?.leading !== undefined || data.value?.hasIcon !== false);
const progressDuration = computed(() => props.toast.duration ?? config?.timeout.value ?? 5000);
const showProgress = computed(
  () =>
    data.value?.hasProgress === true &&
    props.toast.status !== "loading" &&
    progressDuration.value > 0,
);
</script>

<template>
  <ToastRoot :toast="toast" :limited="limited">
    <ToastContent :class="data?.contentClassName">
      <ToastIcon v-if="showIcon" />
      <ToastBody>
        <ToastTitle />
        <ToastDescription v-if="showDescription" />
      </ToastBody>
      <ToastActions v-if="showAction || showClose">
        <ToastClose v-if="showClose" />
        <ToastAction v-if="showAction" />
      </ToastActions>
      <ToastProgress v-if="showProgress" :duration="progressDuration" />
    </ToastContent>
  </ToastRoot>
</template>
