<script setup lang="ts">
import { popover } from "./popover.variants";
import { omitAttrs } from "../../lib/attrs";

defineOptions({ name: "RaftPopoverDescription", inheritAttrs: false });

const attrs = useAttrs();
const descriptionClass = computed(() =>
  popover().description({ class: attrs.class as string | undefined }),
);
const descriptionAttrs = computed(() => omitAttrs(attrs, "class"));
</script>

<template>
  <p v-bind="descriptionAttrs" data-slot="popover-description" :class="descriptionClass">
    <slot />
  </p>
</template>
