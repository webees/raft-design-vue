<script setup lang="ts">
import { computed, getCurrentInstance, onBeforeUnmount, ref, watch } from "vue";
import { DialogRoot } from "reka-ui";

import { OverlayLayer } from "../../lib/overlay-depth";
import {
  createLightboxDepth,
  provideLightboxModal,
  type LightboxModal,
} from "./lightbox-context";

defineOptions({ name: "RaftLightbox", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    closeOnModW?: boolean;
    defaultOpen?: boolean;
    modal?: LightboxModal;
    open?: boolean;
  }>(),
  {
    closeOnModW: true,
    defaultOpen: undefined,
    modal: true,
    open: undefined,
  },
);

const emit = defineEmits<{ "update:open": [open: boolean] }>();

const instance = getCurrentInstance();
const controlled = computed(() => {
  const vnodeProps = instance?.vnode.props;
  return vnodeProps != null && "open" in vnodeProps;
});
const innerOpen = ref(props.defaultOpen ?? false);
const isOpen = computed(() => (controlled.value ? props.open === true : innerOpen.value));
const modal = computed(() => props.modal);
const openProps = computed(() => (controlled.value ? { open: props.open === true } : {}));

provideLightboxModal(modal);
const depth = createLightboxDepth();

function handleOpenChange(value: boolean) {
  if (!controlled.value) innerOpen.value = value;
  emit("update:open", value);
}

function onKeydown(event: KeyboardEvent) {
  if (!isOpen.value || !props.closeOnModW) return;
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "w") {
    event.preventDefault();
    event.stopPropagation();
    handleOpenChange(false);
  }
}

watch(
  isOpen,
  (open) => {
    if (typeof window === "undefined") return;
    if (open) window.addEventListener("keydown", onKeydown, true);
    else window.removeEventListener("keydown", onKeydown, true);
  },
  { immediate: true },
);

onBeforeUnmount(() => {
  if (typeof window !== "undefined") window.removeEventListener("keydown", onKeydown, true);
});

defineExpose({
  depth,
  close: () => handleOpenChange(false),
});
</script>

<template>
  <DialogRoot
    v-bind="{ ...$attrs, ...openProps }"
    :default-open="props.defaultOpen"
    :modal="modal === true"
    @update:open="handleOpenChange"
  >
    <OverlayLayer kind="dialog" :modal="true">
      <slot />
    </OverlayLayer>
  </DialogRoot>
</template>
