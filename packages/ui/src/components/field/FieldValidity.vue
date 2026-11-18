<script setup lang="ts">
import { FieldValidity } from "reka-ui";

defineOptions({ name: "RaftFieldValidity" });
</script>

<template>
  <FieldValidity v-slot="scope">
    <slot v-bind="scope" />
  </FieldValidity>
</template>
