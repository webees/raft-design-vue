<script setup lang="ts">
import { useAttrs } from "vue";
import { SelectArrow } from "reka-ui";

defineOptions({ name: "RaftSelectArrow", inheritAttrs: false });
const attrs = useAttrs();
</script>

<template>
  <SelectArrow
    v-bind="{ ...attrs, class: undefined }"
    data-slot="select-arrow"
    :class="attrs.class"
  />
</template>
