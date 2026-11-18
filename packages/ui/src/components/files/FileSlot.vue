<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { Primitive } from "reka-ui";
import { files } from "./files.variants";

defineOptions({ name: "RaftFileSlot", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    part:
      | "panel"
      | "list"
      | "row"
      | "rowOpen"
      | "thumbnail"
      | "content"
      | "name"
      | "meta"
      | "metaItem"
      | "actions";
    dataSlot: string;
    as?: string;
    asChild?: boolean;
  }>(),
  { as: "div", asChild: false },
);

const attrs = useAttrs();
const rootClass = computed(() => files()[props.part]());
</script>

<template>
  <Primitive :as="as" :as-child="asChild" v-bind="attrs" :data-slot="dataSlot" :class="rootClass">
    <slot />
  </Primitive>
</template>
