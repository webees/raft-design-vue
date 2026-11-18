<script setup lang="ts">
import { computed, onBeforeUnmount, ref, useAttrs, watch } from "vue";

import { cn } from "../../lib/cn";
import { drag } from "./drag.recipe";
import { useDragEngine } from "./drag-context";
import { dragPointer } from "./drag-lift";
import { placeRefusalHint } from "./drag-refusal-hint";

defineOptions({ name: "RaftDragRefusalHint", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    container?: Element | DocumentFragment | null;
    class?: string;
    style?: string | Record<string, string | number>;
    /** Why the place under the hand won't take the item. Falls back to the live announcement. */
    message?: string;
    /** Render the chip in another element; the body by default. */
    to?: Element | DocumentFragment | null;
  }>(),
  { to: undefined },
);

const attrs = useAttrs();
const engine = useDragEngine();
const dragging = computed(() => engine?.active.value ?? null);
const announcement = computed(() => engine?.message.value ?? "");
const chip = ref<HTMLElement | null>(null);
const classes = computed(() =>
  drag().hint({ className: cn(attrs.class as string | undefined, props.class) }),
);

let frame = 0;
let observer: ResizeObserver | null = null;

function stop() {
  cancelAnimationFrame(frame);
  observer?.disconnect();
  observer = null;
  document.documentElement.removeAttribute("data-drag-refused");
}

watch(
  dragging,
  (session) => {
    stop();
    if (!session || typeof document === "undefined") return;
    const root = document.documentElement;
    root.setAttribute("data-drag-refused", "");
    const node = chip.value;
    const size = { width: node?.offsetWidth ?? 0, height: node?.offsetHeight ?? 0 };
    if (node && typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(() => {
        size.width = node.offsetWidth;
        size.height = node.offsetHeight;
      });
      observer.observe(node);
    }
    const tick = () => {
      if (node) {
        const lift = document
          .querySelector<HTMLElement>("[data-slot=drag-lift]")
          ?.getBoundingClientRect();
        let point = dragPointer();
        if ((session.keyboard || !point) && lift) {
          point = { x: lift.right, y: lift.top + lift.height / 2 };
        }
        if (point) {
          const at = placeRefusalHint(point, size, lift ?? null, {
            width: window.innerWidth,
            height: window.innerHeight,
          });
          node.style.transform = `translate(${at.x}px, ${at.y}px)`;
          node.style.visibility = "visible";
        }
      }
      frame = requestAnimationFrame(tick);
    };
    tick();
  },
  { immediate: true },
);

onBeforeUnmount(stop);
</script>

<template>
  <Teleport
    v-if="dragging"
    :to="props.to === undefined ? (props.container ?? 'body') : (props.to ?? 'body')"
  >
    <div
      ref="chip"
      v-bind="{ ...attrs, class: undefined, style: undefined }"
      data-slot="drag-refusal-hint"
      aria-hidden="true"
      :class="classes"
      :style="[{ visibility: 'hidden' }, props.style]"
    >
      <slot>{{ props.message ?? announcement }}</slot>
    </div>
  </Teleport>
</template>
