<script setup lang="ts">
import { Button } from "../button";
import { omitAttrs } from "../../lib/attrs";
import { useCoachMarkContext } from "./coach-mark-context";

defineOptions({ name: "RaftCoachMarkNext", inheritAttrs: false });

const props = defineProps<{ class?: string }>();
const attrs = useAttrs();
const { registerNext } = useCoachMarkContext("Next");
const buttonAttrs = computed(() => omitAttrs(attrs, "class"));

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
    :class="props.class"
  >
    <slot />
  </Button>
</template>
