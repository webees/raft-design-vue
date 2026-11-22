<script setup lang="ts">
import { cn } from "../../lib/cn";
import Button from "../button/Button.vue";
import type { ButtonSize } from "../button";
import { composer } from "./composer.recipe";

defineOptions({ name: "RaftComposerSubmit", inheritAttrs: false });

const props = withDefaults(
  defineProps<{ class?: string; size?: ButtonSize; type?: "button" | "submit" | "reset" }>(),
  { type: "submit" },
);

const attrs = useAttrs();
const classes = computed(() =>
  composer({ icon: props.size?.startsWith("icon") ?? false }).submit({
    class: props.class,
  }),
);
</script>

<template>
  <Button
    v-bind="attrs"
    :class="classes"
    data-slot="composer-submit"
    :size="props.size"
    :type="props.type"
    variant="accent"
  >
    <slot />
  </Button>
</template>
