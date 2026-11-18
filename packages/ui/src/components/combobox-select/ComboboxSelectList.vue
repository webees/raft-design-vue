<script setup lang="ts">
defineProps<{ listId: string }>();
</script>

<template>
  <div :id="listId" role="listbox"><slot /></div>
</template>
