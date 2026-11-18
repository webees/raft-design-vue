<script setup lang="ts">
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  useAttrs,
  useSlots,
  watch,
  type VNode,
} from "vue";

import { cn } from "../../lib/cn";
import ScrollArea from "../scroll-area/ScrollArea.vue";
import { useFitItem } from "./use-fit-item";
import { fitToolbar } from "./fit-toolbar.recipe";

defineOptions({ name: "RaftFitToolbarGroup", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    /** When it moves to a line of its own (the `wrap` step), in a toolbar that allows it. */
    wrapOrder?: number;
    /** Stays on the first line, even when the toolbar wraps. */
    firstLine?: boolean;
    /** Groups with the same `wrapLine` share a line; any other takes one of its own. */
    wrapLine?: string;
    /** When it shows its one button instead of its items (the `collapse` step). */
    collapseOrder?: number;
    /** The group as one button (a Filter button for its filters), shown once it collapses. */
    collapsed?: VNode;
    /** When it moves into More (the `more` step). */
    moreOrder?: number;
    /** What it is in More's menu. */
    moreItem?: VNode;
    /**
     * `scroll`: the group takes the rest of its line and scrolls sideways,
     * showing one item whole, the side that hides more fading.
     */
    overflow?: "scroll";
  }>(),
  { wrapOrder: 0, firstLine: false },
);

const attrs = useAttrs();
const slots = useSlots();
const item = useFitItem({
  wrap: props.wrapOrder,
  collapse: props.collapsed === undefined ? undefined : (props.collapseOrder ?? 0),
  more: props.moreOrder,
  moreItem: props.moreItem,
});

const group = ref<HTMLElement | null>(null);
const scroller = ref<InstanceType<typeof ScrollArea> | null>(null);
const pinned = computed(() => props.overflow === "scroll" && slots.end !== undefined);
const rootStyles = computed(() =>
  fitToolbar({ scroll: props.overflow === "scroll", pinned: pinned.value }),
);
const rootClass = computed(() => cn(rootStyles.value.group(), attrs.class as string | undefined));
const scrollerClass = computed(() => rootStyles.value.scroller());
const scrollContentClass = computed(() => rootStyles.value.scrollContent());

function scrollerElement(): HTMLElement | null {
  const value = scroller.value as unknown;
  if (value instanceof HTMLElement) return value;
  return group.value?.querySelector<HTMLElement>("[data-slot=scroll-area]") ?? group.value;
}

function bindScrollGroup(): () => void {
  const element = scrollerElement();
  if (!element) return () => {};
  const edges = () => {
    const max = element.scrollWidth - element.clientWidth;
    const start = element.scrollLeft > 1;
    const end = max > 1 && element.scrollLeft < max - 1;
    const next = start && end ? "both" : start ? "start" : end ? "end" : null;
    if (next) element.setAttribute("data-overflow", next);
    else element.removeAttribute("data-overflow");
  };
  // Where it last scrolled itself: a scroll anywhere else is the person's,
  // and from then on a resize leaves it there.
  let placed = element.scrollLeft;
  let scrolledByPerson = false;
  const onScroll = () => {
    if (Math.abs(element.scrollLeft - placed) > 1) scrolledByPerson = true;
    edges();
  };
  const reveal = (item: Element | null) => {
    if (!(item instanceof HTMLElement) || !element.contains(item)) return;
    const fade = parseFloat(getComputedStyle(element).getPropertyValue("--fade-edge")) || 24;
    const left = item.getBoundingClientRect().left - element.getBoundingClientRect().left;
    const start = left + element.scrollLeft;
    const end = start + item.offsetWidth;
    if (start - fade < element.scrollLeft) element.scrollLeft = Math.max(0, start - fade);
    else if (end + fade > element.scrollLeft + element.clientWidth) {
      element.scrollLeft = end + fade - element.clientWidth;
    }
    placed = element.scrollLeft;
    edges();
  };
  // The item to keep in view: the one that last became active (on mount
  // the first active), never every active one, so a filter just applied
  // comes into view even when another is active before it.
  let target: Element | null = element.querySelector("[data-active]");
  const revealActive = () => {
    if (!target || !element.contains(target) || !target.hasAttribute("data-active")) {
      target = element.querySelector("[data-active]");
    }
    reveal(target);
  };
  const onWheel = (event: WheelEvent) => {
    if (element.scrollWidth <= element.clientWidth) return;
    if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
    const before = element.scrollLeft;
    element.scrollLeft += event.deltaY;
    if (element.scrollLeft !== before) event.preventDefault();
  };
  const onFocus = (event: FocusEvent) => reveal(event.target as Element);
  revealActive();
  edges();
  element.addEventListener("scroll", onScroll, { passive: true });
  element.addEventListener("wheel", onWheel, { passive: false });
  element.addEventListener("focusin", onFocus);
  const resize =
    typeof ResizeObserver === "undefined"
      ? null
      : new ResizeObserver(() => {
          // Its first layouts (the toolbar measuring, the group wrapping)
          // keep the active item in view, until the person scrolls it.
          if (!scrolledByPerson) revealActive();
          edges();
        });
  resize?.observe(element);
  // Only an item becoming active brings it back into view: a count or a
  // label changing inside the group leaves where the person scrolled it.
  const activated = (node: Node) =>
    node instanceof Element
      ? node.hasAttribute("data-active")
        ? node
        : node.querySelector("[data-active]")
      : null;
  const changes = new MutationObserver((records) => {
    const newly = records
      .flatMap((record) =>
        record.type === "attributes"
          ? [
              record.target instanceof Element && record.target.hasAttribute("data-active")
                ? record.target
                : null,
            ]
          : Array.from(record.addedNodes, activated),
      )
      .filter((node): node is Element => node !== null)
      .at(-1);
    if (newly) {
      target = newly;
      scrolledByPerson = false;
      revealActive();
    }
    edges();
  });
  changes.observe(element, {
    childList: true,
    subtree: true,
    characterData: true,
    attributes: true,
    attributeFilter: ["data-active"],
  });
  return () => {
    element.removeEventListener("scroll", onScroll);
    element.removeEventListener("wheel", onWheel);
    element.removeEventListener("focusin", onFocus);
    resize?.disconnect();
    changes.disconnect();
  };
}

let unbind: (() => void) | null = null;
function bind() {
  unbind?.();
  unbind = null;
  if (props.overflow !== "scroll") return;
  unbind = bindScrollGroup();
}

onMounted(() => {
  void nextTick(bind);
});

watch(
  () => props.overflow,
  () => void nextTick(bind),
);

onBeforeUnmount(() => {
  unbind?.();
  unbind = null;
});
</script>

<template>
  <div
    ref="group"
    v-bind="{ ...attrs, ...item.props.value, class: undefined }"
    role="group"
    data-slot="fit-toolbar-group"
    :data-fit-row="props.overflow === 'scroll' ? undefined : ''"
    :data-fit-scroll="props.overflow === 'scroll' ? '' : undefined"
    :data-fit-first-line="props.firstLine ? '' : undefined"
    :data-fit-wrap-line="props.wrapLine"
    :data-fit-id="item.props.value['data-fit-id']"
    :data-fit-steps="item.props.value['data-fit-steps']"
    :class="rootClass"
  >
    <template v-if="props.overflow === 'scroll'">
      <ScrollArea
        ref="scroller"
        orientation="horizontal"
        overscroll="contain"
        size="small"
        trigger="scroll"
        tabindex="-1"
        data-fit-scroller=""
        :class="scrollerClass"
        :content-class="scrollContentClass"
      >
        <slot />
      </ScrollArea>
      <span v-if="pinned" data-slot="fit-toolbar-group-end" :class="rootStyles.end()">
        <slot name="end" />
      </span>
    </template>
    <template v-else-if="props.collapsed === undefined">
      <slot />
    </template>
    <template v-else>
      <span data-slot="fit-toolbar-group-items" :class="rootStyles.full()">
        <slot />
      </span>
      <span data-slot="fit-toolbar-group-collapsed" :class="rootStyles.short()">
        {{ props.collapsed }}
      </span>
    </template>
  </div>
</template>
