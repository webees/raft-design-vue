<script setup lang="ts">
import { cn } from "../../lib/cn";
import { composerDropOverlay } from "./composer-drop-overlay.recipe";

defineOptions({ name: "RaftComposerDropOverlay", inheritAttrs: false });

const props = defineProps<{ class?: string }>();
const attrs = useAttrs();
const classes = computed(() =>
  composerDropOverlay().dropOverlay({
    class: cn(attrs.class as string | undefined, props.class),
  }),
);
</script>

<template>
  <div v-bind="attrs" :class="classes" data-slot="composer-drop-overlay">
    <slot />
  </div>
</template>
