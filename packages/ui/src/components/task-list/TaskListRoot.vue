<script setup lang="ts">
import { taskList } from "./task-list.variants";

defineOptions({ name: "RaftTaskListRoot", inheritAttrs: false });
const attrs = useAttrs();
const rootClass = computed(() => taskList().root({ className: attrs.class as string }));
</script>

<template>
  <div v-bind="{ ...attrs, class: undefined }" data-slot="task-list-root" :class="rootClass">
    <slot />
  </div>
</template>
