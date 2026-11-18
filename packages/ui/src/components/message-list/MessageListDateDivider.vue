<script setup lang="ts">
import { messageList } from "./message-list.recipe";

defineProps<{ class?: string }>();
const slots = messageList();
</script>

<template>
  <div
    data-slot="message-list-date-divider"
    :class="slots.dateDividerRoot({ className: $props.class })"
  >
    <div aria-hidden :class="slots.dateDividerRule()" />
    <span :class="slots.dateDividerChip()"><slot /></span>
    <div aria-hidden :class="slots.dateDividerRule()" />
  </div>
</template>
