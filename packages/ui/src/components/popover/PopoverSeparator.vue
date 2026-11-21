<script setup lang="ts">
import { popover } from "./popover.variants";
import { omitAttrs } from "../../lib/attrs";

defineOptions({ name: "RaftPopoverSeparator", inheritAttrs: false });

const attrs = useAttrs();
const separatorClass = computed(() =>
  popover().separator({ class: attrs.class as string | undefined }),
);
const separatorAttrs = computed(() => omitAttrs(attrs, "class"));
</script>

<template>
  <div
    v-bind="separatorAttrs"
    role="separator"
    aria-orientation="horizontal"
    data-slot="popover-separator"
    :class="separatorClass"
  />
</template>
