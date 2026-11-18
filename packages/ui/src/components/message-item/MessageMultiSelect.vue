<script setup lang="ts">
import { messageMultiSelect } from "./message-multi-select.recipe";

const props = defineProps<{ class?: string }>();
const classes = computed(() => messageMultiSelect().root({ className: props.class }));
</script>

<template>
  <div data-slot="message-multi-select" :class="classes"><slot /></div>
</template>
