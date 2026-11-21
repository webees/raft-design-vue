<script setup lang="ts">
import { popover } from "./popover.variants";
import { omitAttrs } from "../../lib/attrs";

defineOptions({ name: "RaftPopoverActions", inheritAttrs: false });

const attrs = useAttrs();
const actionsClass = computed(() =>
  popover().actions({ class: attrs.class as string | undefined }),
);
const actionsAttrs = computed(() => omitAttrs(attrs, "class"));
</script>

<template>
  <div v-bind="actionsAttrs" data-slot="popover-actions" :class="actionsClass">
    <slot />
  </div>
</template>
