<script setup lang="ts">
import { ToastAction } from "reka-ui";

import Spinner from "../spinner/Spinner.vue";
import { toastAction as toastActionStyles } from "./toast.recipe";
import { TOAST_ITEM_CONTEXT_KEY } from "./toast-context";
import ToastNode from "./ToastNode";

defineOptions({ name: "RaftToastAction", inheritAttrs: false });

const props = defineProps<{
  class?: string;
  loading?: boolean;
  loadingLabel?: string;
  disabled?: boolean;
  altText?: string;
}>();

const attrs = useAttrs();
const item = inject(TOAST_ITEM_CONTEXT_KEY, null);

const actionProps = computed(() => item?.toast.value.actionProps);
const classes = computed(() => toastActionStyles().root({ class: props.class }));
const resolvedAltText = computed(
  () => props.altText ?? actionProps.value?.altText ?? actionProps.value?.label,
);
const label = computed(() => actionProps.value?.label);
</script>

<template>
  <ToastAction
    v-bind="attrs"
    :alt-text="resolvedAltText"
    :disabled="disabled || loading"
    :aria-disabled="loading || undefined"
    :data-loading="loading ? 'true' : undefined"
    :data-slot="(attrs['data-slot'] as string | undefined) ?? 'toast-action'"
    :class="classes"
  >
    <span data-slot="toast-action-content" :class="toastActionStyles().content()">
      <slot>
        <ToastNode v-if="label !== undefined" :node="label" />
      </slot>
    </span>
    <span
      v-if="loading"
      data-slot="toast-action-loading-indicator"
      :class="toastActionStyles().loadingIndicator()"
    >
      <Spinner aria-hidden="true" />
      <span v-if="loadingLabel" class="sr-only">{{ loadingLabel }}</span>
    </span>
  </ToastAction>
</template>
