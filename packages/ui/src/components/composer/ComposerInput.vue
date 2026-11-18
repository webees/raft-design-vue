<script setup lang="ts">
import { cn } from "../../lib/cn";
import ScrollAreaTextarea from "../scroll-area/ScrollAreaTextarea.vue";
import { composer } from "./composer.recipe";

defineOptions({ name: "RaftComposerInput", inheritAttrs: false });

const props = defineProps<{ class?: string; frameClass?: string; rows?: number }>();
const attrs = useAttrs();
const inputClass = computed(() =>
  composer().input({ class: cn(attrs.class as string | undefined, props.class) }),
);
const frameClass = computed(() => composer().inputFrame({ class: props.frameClass }));
</script>

<template>
  <ScrollAreaTextarea
    v-bind="attrs"
    :class="inputClass"
    :rows="props.rows ?? 1"
    :wrapper-class="frameClass"
    data-slot="composer-input"
  />
</template>
