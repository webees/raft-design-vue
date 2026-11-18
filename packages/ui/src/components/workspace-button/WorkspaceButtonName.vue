<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { cn } from "../../lib/cn";
import { workspaceButton } from "./workspace-button.variants";

defineOptions({ name: "RaftWorkspaceButtonName", inheritAttrs: false });

const props = defineProps<{ class?: string }>();
const attrs = useAttrs();
const nameClass = computed(() => cn(workspaceButton().name(), props.class, attrs.class as string));
</script>

<template>
  <span data-slot="workspace-button-name" :class="nameClass"><slot /></span>
</template>
