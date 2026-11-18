<script setup lang="ts">
import { computed, useAttrs } from "vue";

import { Button } from "../button";
import { cn } from "../../lib/cn";
import { useCoachMarkContext } from "./coach-mark-context";

defineOptions({ name: "RaftCoachMarkNext", inheritAttrs: false });

const props = defineProps<{ class?: string }>();
const attrs = useAttrs();
const { registerNext } = useCoachMarkContext("Next");
const classes = computed(() => cn(props.class, attrs.class as string | undefined));
const buttonAttrs = computed(() => {
  const { class: _class, ...rest } = attrs;
  return rest;
});

function setButton(element: unknown) {
  if (element instanceof HTMLElement) registerNext(element);
  else if (element && typeof element === "object" && "$el" in element) {
    const el = (element as { $el?: unknown }).$el;
    if (el instanceof HTMLElement) registerNext(el);
  }
}
</script>

<template>
  <Button
    :ref="setButton"
    v-bind="buttonAttrs"
    data-slot="coach-mark-next"
    variant="primary"
    :class="classes"
  >
    <slot />
  </Button>
</template>
