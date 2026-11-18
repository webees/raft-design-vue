<script setup lang="ts">
import { PopoverContent, PopoverPortal } from "reka-ui";

import ScrollArea from "../scroll-area/ScrollArea.vue";
import { mobileNavServer } from "./mobile-nav-server.recipe";
import { useMobileNavServer } from "./mobile-nav-server-context";

defineOptions({ name: "RaftMobileNavServerPopoverContent", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    anchor?: HTMLElement;
    side?: "top" | "right" | "bottom" | "left";
    align?: "start" | "center" | "end";
    sideOffset?: number;
    collisionPadding?: number;
    keepOneRow?: boolean;
    initialFocus?: (openType: "touch" | "keyboard" | "mouse") => HTMLElement | true | false;
    class?: string;
  }>(),
  {
    side: "top",
    align: "center",
    sideOffset: 8,
    collisionPadding: 8,
    keepOneRow: true,
  },
);

const emit = defineEmits<{
  (event: "escapeKeyDown", value: KeyboardEvent): void;
  (event: "pointerDownOutside", value: Event): void;
  (event: "focusOutside", value: Event): void;
  (event: "interactOutside", value: Event): void;
}>();

const attrs = useAttrs();
const context = useMobileNavServer();
const contentRef = ref<HTMLElement | null>(null);

const tabBarAnchor = computed<HTMLElement | undefined>(() => {
  if (props.anchor) return props.anchor;
  const trigger = context?.triggerRef.value;
  return (
    (trigger?.closest("[data-slot=mobile-nav-root]") as HTMLElement | null) ?? trigger ?? undefined
  );
});

const contentClass = computed(() =>
  mobileNavServer().content({ class: [props.class, attrs.class as string | undefined] }),
);
const scrollClass = computed(() => mobileNavServer().scroll());
const portalTarget = computed(() => attrs.to as string | HTMLElement | undefined);

const LIST_SLOT = "mobile-nav-server-popover-list";
const GUTTERS_SLOT = "scroll-area-gutters";

function blockFrame(element: HTMLElement) {
  const style = getComputedStyle(element);
  return (
    parseFloat(style.paddingTop) +
    parseFloat(style.paddingBottom) +
    parseFloat(style.borderTopWidth) +
    parseFloat(style.borderBottomWidth)
  );
}

function measureOneRowFloor(area: HTMLElement) {
  const popup = area.parentElement;
  const measure = () => {
    if (!popup) return;
    let floor = blockFrame(popup) + blockFrame(area);
    for (const child of area.children) {
      if (!(child instanceof HTMLElement) || child.dataset.slot === GUTTERS_SLOT) continue;
      const style = getComputedStyle(child);
      if (style.display === "none" || style.position === "absolute" || style.position === "fixed")
        continue;
      floor += parseFloat(style.marginTop) + parseFloat(style.marginBottom);
      floor +=
        child.dataset.slot === LIST_SLOT
          ? parseFloat(style.minHeight) || 0
          : child.getBoundingClientRect().height;
    }
    popup.style.setProperty("--mobile-nav-server-popover-floor", `${floor}px`);
  };
  const resize = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(measure);
  const remeasure = () => {
    resize?.disconnect();
    for (const child of area.children) {
      if (child instanceof HTMLElement && child.dataset.slot !== LIST_SLOT) resize?.observe(child);
    }
    measure();
  };
  const mutation = typeof MutationObserver === "undefined" ? null : new MutationObserver(remeasure);
  mutation?.observe(area, { childList: true });
  remeasure();
  return () => {
    resize?.disconnect();
    mutation?.disconnect();
  };
}

let releaseKeepOneRow: (() => void) | undefined;

function findArea() {
  return contentRef.value?.querySelector<HTMLElement>("[data-slot=scroll-area]") ?? null;
}

watch(
  () => props.keepOneRow,
  (enabled) => {
    releaseKeepOneRow?.();
    releaseKeepOneRow = undefined;
    if (!enabled) return;
    nextTick(() => {
      const area = findArea();
      if (area) releaseKeepOneRow = measureOneRowFloor(area);
    });
  },
  { immediate: true },
);

onBeforeUnmount(() => releaseKeepOneRow?.());

function handleOpenAutoFocus(event: Event) {
  const handler = props.initialFocus;
  if (!handler) return;
  const next = handler("keyboard");
  if (next === false) {
    event.preventDefault();
    return;
  }
  if (next !== true) {
    event.preventDefault();
    next.focus({ preventScroll: true });
  }
}
</script>

<template>
  <PopoverPortal :to="portalTarget">
    <PopoverContent
      ref="contentRef"
      v-bind="{ ...attrs, class: undefined, to: undefined }"
      :reference="tabBarAnchor"
      :side="props.side"
      :align="props.align"
      :side-offset="props.sideOffset"
      :collision-padding="props.collisionPadding"
      data-slot="mobile-nav-server-popover-content"
      :class="contentClass"
      @escape-key-down="emit('escapeKeyDown', $event)"
      @pointer-down-outside="emit('pointerDownOutside', $event)"
      @focus-outside="emit('focusOutside', $event)"
      @interact-outside="emit('interactOutside', $event)"
      @open-auto-focus="handleOpenAutoFocus"
    >
      <ScrollArea :class="scrollClass">
        <slot />
      </ScrollArea>
    </PopoverContent>
  </PopoverPortal>
</template>
