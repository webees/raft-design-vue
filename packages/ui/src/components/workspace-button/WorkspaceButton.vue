<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { ChevronDown } from "lucide-vue-next";
import { cn } from "../../lib/cn";
import { Button } from "../button";
import { workspaceButton } from "./workspace-button.variants";

defineOptions({ name: "RaftWorkspaceButton", inheritAttrs: false });

const props = defineProps<{
  class?: string;
}>();

const attrs = useAttrs();
const styles = workspaceButton();
const rootClass = computed(() => cn(styles.root(), props.class, attrs.class as string));
</script>

<template>
  <Button
    variant="on-frame"
    size="md"
    data-slot="workspace-button"
    :class="rootClass"
    v-bind="attrs"
  >
    <slot />
    <ChevronDown
      data-slot="workspace-button-chevron"
      :class="styles.chevron()"
      aria-hidden="true"
    />
  </Button>
</template>
