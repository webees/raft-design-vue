<script setup lang="ts">
import { omitAttrs } from "../../lib/attrs";
import { ScrollArea } from "../scroll-area";
import type { ScrollAreaOwnProps } from "../scroll-area/types";

defineOptions({ name: "RaftTableScroll", inheritAttrs: false });

const props = defineProps<Omit<ScrollAreaOwnProps, "orientation" | "class">>();

const attrs = useAttrs();
const forwarded = computed<Record<string, unknown>>(() => ({
  ...props,
  ...omitAttrs(attrs, "class", "data-slot"),
}));
</script>

<template>
  <ScrollArea
    v-bind="forwarded"
    :class="attrs.class"
    :data-slot="(attrs['data-slot'] as string | undefined) ?? 'table-scroll'"
    orientation="horizontal"
  >
    <slot />
  </ScrollArea>
</template>
