<script setup lang="ts">
import { computed, onBeforeUnmount, ref, useAttrs, useId } from "vue";
import { PopoverTrigger } from "reka-ui";

import { mobileNavServer } from "./mobile-nav-server.recipe";
import { useMobileNavServer } from "./mobile-nav-server-context";
import {
  TOUCH_DRAG_HOLD_MS,
  TOUCH_DRAG_TOLERANCE_PX,
} from "../../lib/touch-drag";

defineOptions({ name: "RaftMobileNavServerItem", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    selected?: boolean;
    disabled?: boolean;
    class?: string;
  }>(),
  { selected: false, disabled: false },
);

const attrs = useAttrs();
const context = useMobileNavServer();
const generatedId = useId();
const triggerId = computed(() => (attrs.id as string | undefined) ?? generatedId);
const classes = computed(() => mobileNavServer().item({ class: props.class }));
const holdTimer = ref<ReturnType<typeof setTimeout> | null>(null);
const holdStart = ref<{ x: number; y: number } | null>(null);
const held = ref(false);
const triggerEl = ref<HTMLElement | null>(null);
const setTrigger = (value: unknown) => {
  const el = value as { $el?: HTMLElement } | HTMLElement | null;
  triggerEl.value = el && "$el" in el ? (el.$el ?? null) : (el as HTMLElement | null);
  if (context) context.triggerRef.value = triggerEl.value;
};

function startHold(event: PointerEvent) {
  if (props.disabled) return;
  clearHold();
  held.value = false;
  if (event.button !== 0) return;
  holdStart.value = { x: event.clientX, y: event.clientY };
  holdTimer.value = setTimeout(() => {
    holdTimer.value = null;
    held.value = true;
    if (!context?.open.value) context?.setOpen(true);
  }, TOUCH_DRAG_HOLD_MS);
}

function moveHold(event: PointerEvent) {
  const start = holdStart.value;
  if (!start) return;
  if (Math.hypot(event.clientX - start.x, event.clientY - start.y) > TOUCH_DRAG_TOLERANCE_PX) {
    clearHold();
  }
}

function clearHold() {
  if (holdTimer.value) clearTimeout(holdTimer.value);
  holdTimer.value = null;
  holdStart.value = null;
}

function handleClick(event: MouseEvent) {
  if (!held.value) return;
  held.value = false;
  event.preventDefault();
  event.stopPropagation();
}

function handleContextMenu(event: MouseEvent) {
  event.preventDefault();
}

onBeforeUnmount(clearHold);
</script>

<template>
  <PopoverTrigger
    :id="triggerId"
    :ref="setTrigger"
    v-bind="{ ...attrs, class: undefined }"
    :class="classes"
    :disabled="disabled"
    data-slot="mobile-nav-server-item"
    :data-selected="selected ? 'true' : undefined"
    @pointerdown="startHold"
    @pointermove="moveHold"
    @pointerup="clearHold"
    @pointercancel="clearHold"
    @pointerleave="clearHold"
    @click="handleClick"
    @contextmenu="handleContextMenu"
  >
    <slot />
  </PopoverTrigger>
</template>
