<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, useAttrs, useId, watch } from "vue";
import { Primitive } from "reka-ui";

import { cn } from "../../lib/cn";
import { toElement } from "../../lib/dom";
import { appShell } from "./app-shell.variants";
import { useOptionalAppShellSidebar } from "./app-shell-context";

defineOptions({ name: "RaftAppShellSidebarSlot", inheritAttrs: false });

const props = withDefaults(defineProps<{ as?: string; asChild?: boolean; id?: string }>(), {
  as: "aside",
  asChild: false,
  id: undefined,
});

const attrs = useAttrs();
const sidebar = useOptionalAppShellSidebar();
const elementRef = ref<HTMLElement | null>(null);
const generatedId = useId();

const isCollapsible = computed(() => sidebar?.collapsible ?? false);
const collapsed = computed(() => isCollapsible.value && !sidebar?.open);
const id = computed(() => props.id ?? (isCollapsible.value ? generatedId : undefined));

let observer: ResizeObserver | null = null;

const observe = () => {
  const element = elementRef.value;
  if (!isCollapsible.value || !sidebar || !element) return;
  const measure = () => sidebar.setSidebarWidth(element.getBoundingClientRect().width);
  measure();
  if (typeof ResizeObserver !== "undefined") {
    observer = new ResizeObserver(measure);
    observer.observe(element);
  }
};

const unobserve = () => {
  observer?.disconnect();
  observer = null;
};

onMounted(observe);
onBeforeUnmount(unobserve);

watch(
  () => [props.id, isCollapsible.value],
  ([, collapsible]) => {
    unobserve();
    if (sidebar && collapsible) sidebar.setSidebarId(id.value);
    else sidebar?.setSidebarId(undefined);
    observe();
  },
  { immediate: true, flush: "post" },
);

onBeforeUnmount(() => sidebar?.setSidebarId(undefined));

const rootClass = computed(() =>
  appShell().sidebarSlot({
    className: cn(
      attrs.class as string,
      sidebar?.collapsible && [
        "group-data-[state=expanded]/app-shell:relative group-data-[state=expanded]/app-shell:z-raised",
        "group-data-[state=collapsed]/app-shell:pointer-events-none",
        "group-data-[state=collapsed]/app-shell:opacity-0",
      ],
    ),
  }),
);

const setElementRef = (element: unknown) => {
  elementRef.value = toElement(element);
};
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :ref="setElementRef"
    v-bind="{ ...attrs, class: undefined }"
    :id="id"
    :inert="collapsed ? true : undefined"
    :aria-hidden="collapsed ? true : undefined"
    data-slot="app-shell-sidebar-slot"
    :class="rootClass"
  >
    <slot />
  </Primitive>
</template>
