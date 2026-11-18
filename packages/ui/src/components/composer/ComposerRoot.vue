<script setup lang="ts">
import { cn } from "../../lib/cn";
import { composer } from "./composer.recipe";

defineOptions({ name: "RaftComposerRoot", inheritAttrs: false });

const props = defineProps<{ class?: string }>();
const attrs = useAttrs();
const classes = computed(() =>
  composer().root({ class: cn(attrs.class as string | undefined, props.class) }),
);
</script>

<template>
  <form v-bind="attrs" :class="classes" data-slot="composer-root">
    <slot />
  </form>
</template>
