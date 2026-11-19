<script setup lang="ts">
import { Primitive } from "reka-ui";

import { cn } from "../../lib/cn";
import { useDragElement } from "./drag-context";

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
const { engine, root } = useDragElement((engine, element) =>
  engine.registerDroppable({
    accept: props.accept,
    data: props.data,
    disabled: props.disabled,
    element,
    id: props.id,
  }),
);
const over = computed(() => {
  const session = engine?.active.value;
  return session?.over?.id === props.id ? session.over : null;
});
const classes = computed(() => cn(attrs.class as string | undefined, props.class));
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
