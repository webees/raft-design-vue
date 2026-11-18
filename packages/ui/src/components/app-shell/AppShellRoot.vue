<script setup lang="ts">
import { computed, provide, reactive, ref, useAttrs, watch, type StyleValue } from "vue";

import { cn } from "../../lib/cn";
import { appShell } from "./app-shell.variants";
import { appShellSidebarKey } from "./app-shell-context";

defineOptions({ name: "RaftAppShellRoot", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    defaultSidebarOpen?: boolean;
    sidebarCollapsible?: boolean;
    sidebarOpen?: boolean;
  }>(),
  {
    defaultSidebarOpen: true,
    sidebarCollapsible: false,
    sidebarOpen: undefined,
  },
);

const emit = defineEmits<{ sidebarOpenChange: [open: boolean] }>();

const attrs = useAttrs();

const uncontrolledOpen = ref(props.defaultSidebarOpen);
const controlled = computed(() => props.sidebarOpen !== undefined);
const open = computed(() => (controlled.value ? Boolean(props.sidebarOpen) : uncontrolledOpen.value));

watch(
  () => props.defaultSidebarOpen,
  (value) => {
    if (!controlled.value) uncontrolledOpen.value = value;
  },
);

const sidebarWidth = ref(0);
const sidebarId = ref<string | undefined>(undefined);

const setOpen = (next: boolean) => {
  if (!controlled.value) uncontrolledOpen.value = next;
  emit("sidebarOpenChange", next);
};

const setSidebarWidth = (width: number) => {
  if (width <= 0) return;
  if (Math.abs(sidebarWidth.value - width) < 1) return;
  sidebarWidth.value = width;
};

provide(appShellSidebarKey, reactive({
  collapsible: props.sidebarCollapsible,
  open,
  setOpen,
  sidebarId,
  setSidebarId: (id: string | undefined) => {
    sidebarId.value = id;
  },
  sidebarWidth,
  setSidebarWidth,
  toggle: () => setOpen(!open.value),
}) as unknown as import("./app-shell-context").AppShellSidebarContextValue);

const rootClass = computed(() => appShell().root({ className: cn("group/app-shell", attrs.class as string) }));

const rootStyle = computed<StyleValue>(() => {
  if (!props.sidebarCollapsible) return attrs.style as StyleValue;
  return {
    ...(attrs.style as Record<string, string> | undefined),
    "--app-shell-sidebar-width": `${sidebarWidth.value}px`,
  };
});
</script>

<template>
  <div
    v-bind="{ ...attrs, class: undefined, style: undefined }"
    data-slot="app-shell-root"
    :data-state="sidebarCollapsible ? (open ? 'expanded' : 'collapsed') : undefined"
    :class="rootClass"
    :style="rootStyle"
  >
    <slot />
  </div>
</template>
