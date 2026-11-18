<script setup lang="ts">
import { Primitive } from "reka-ui";

import { cn } from "../../lib/cn";
import { toElement } from "../../lib/dom";
import { useDragEngine } from "./drag-context";

defineOptions({ name: "RaftDroppable", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    accept?: (active: Record<string, unknown>) => boolean;
    as?: string;
    class?: string;
    data?: Record<string, unknown>;
    disabled?: boolean;
    id: string | number;
  }>(),
  { as: "div", data: () => ({}), disabled: false },
);

const attrs = useAttrs();
const engine = useDragEngine();
const root = ref<HTMLElement | null>(null);
const over = computed(() => {
  const session = engine?.active.value;
  return session?.over?.id === props.id ? session.over : null;
});
const classes = computed(() => cn(attrs.class as string | undefined, props.class));

let unregister: (() => void) | null = null;

const elementOf = toElement;

onMounted(() => {
  const node = elementOf(root.value);
  if (!node || !engine) return;
  unregister = engine.registerDroppable({
    accept: props.accept,
    data: props.data,
    disabled: props.disabled,
    element: node,
    id: props.id,
  });
});

onBeforeUnmount(() => unregister?.());
</script>

<template>
  <Primitive
    :as="props.as"
    ref="root"
    v-bind="attrs"
    :class="classes"
    :data-drop-id="props.id"
    :data-over="over ? '' : undefined"
    :data-placement="over?.placement"
    data-drag-droppable=""
    data-slot="droppable"
  >
    <slot :over="over" />
  </Primitive>
</template>
