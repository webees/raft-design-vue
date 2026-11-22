<script setup lang="ts">
import { cn } from "../../lib/cn";
import { workspaceButton } from "./workspace-button.variants";

defineOptions({ name: "RaftWorkspaceButtonName", inheritAttrs: false });

const props = defineProps<{ class?: string }>();
const nameClass = computed(() => cn(workspaceButton().name(), props.class));
</script>

<template>
  <span data-slot="workspace-button-name" :class="nameClass"><slot /></span>
</template>
