<script setup lang="ts">
import { computed, useAttrs } from "vue";

import { cn } from "../../lib/cn";
import Button from "../button/Button.vue";
import { composer } from "./composer.recipe";

defineOptions({ name: "RaftComposerIconButton", inheritAttrs: false });

const props = defineProps<{ class?: string }>();
const attrs = useAttrs();
const classes = computed(() =>
  composer().iconButton({ class: cn(attrs.class as string | undefined, props.class) }),
);
</script>

<template>
  <Button
    v-bind="attrs"
    :class="classes"
    data-slot="composer-icon-button"
    size="icon-sm"
    type="button"
    variant="ghost"
  >
    <slot />
  </Button>
</template>
