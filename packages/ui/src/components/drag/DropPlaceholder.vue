<script setup lang="ts">
import { cn } from "../../lib/cn";
import { drag } from "./drag.recipe";

defineOptions({ name: "RaftDropPlaceholder", inheritAttrs: false });

const props = withDefaults(defineProps<{ class?: string; opaque?: boolean }>(), { opaque: false });
const attrs = useAttrs();
const classes = computed(() =>
  drag({ opaque: props.opaque }).placeholder({
    class: props.class,
  }),
);
</script>

<template>
  <div
    v-bind="{ ...attrs, class: undefined }"
    aria-hidden="true"
    :class="classes"
    data-slot="drop-placeholder"
  />
</template>
