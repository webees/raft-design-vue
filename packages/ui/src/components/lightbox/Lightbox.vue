<script setup lang="ts">
import { DialogRoot } from "reka-ui";

import { OverlayLayer } from "../../lib/overlay-depth";
import { useControlledState, useIsControlled } from "../../lib/use-controlled-state";
import { createLightboxDepth, provideLightboxModal, type LightboxModal } from "./lightbox-context";

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

const isOpen = useControlledState(
  "open",
  () => props.open,
  props.defaultOpen ?? false,
  (value) => emit("update:open", value),
);
const modal = computed(() => props.modal);
const controlled = useIsControlled("open");
const openProps = computed(() => (controlled.value ? { open: props.open === true } : {}));

provideLightboxModal(modal);
const depth = createLightboxDepth();

function handleOpenChange(value: boolean) {
  isOpen.value = value;
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
