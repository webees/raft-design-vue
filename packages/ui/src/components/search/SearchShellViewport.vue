<script setup lang="ts">
import { computed, useAttrs } from "vue";

import ScrollArea from "../scroll-area/ScrollArea.vue";
import { search } from "./search.recipe";

defineOptions({ name: "RaftSearchShellViewport", inheritAttrs: false });

const props = defineProps<{ class?: string }>();
const attrs = useAttrs();
const classes = computed(() => search().viewport({ class: props.class }));
</script>

<template>
  <ScrollArea
    v-bind="attrs"
    overscroll="contain"
    data-slot="search-shell-viewport"
    :class="classes"
  >
    <slot />
  </ScrollArea>
</template>
