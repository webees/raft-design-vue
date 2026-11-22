<script setup lang="ts">
import { cn } from "../../lib/cn";
import { tv } from "../../lib/tv";

defineOptions({ name: "RaftComposerRoot", inheritAttrs: false });

const props = defineProps<{ class?: string }>();
const attrs = useAttrs();
const composerRoot = tv({ base: ["relative flex w-full flex-col", "gap-2"] });
const classes = computed(() => composerRoot({ className: props.class }));
</script>

<template>
  <form v-bind="attrs" :class="classes" data-slot="composer-root">
    <slot />
  </form>
</template>
