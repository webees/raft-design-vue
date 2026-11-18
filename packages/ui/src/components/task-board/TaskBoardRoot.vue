<script setup lang="ts">
import { taskBoard } from "./task-board.variants";

defineOptions({ name: "RaftTaskBoardRoot", inheritAttrs: false });
const attrs = useAttrs();
const rootClass = computed(() => taskBoard().root({ className: attrs.class as string }));
</script>

<template>
  <div v-bind="{ ...attrs, class: undefined }" data-slot="task-board-root" :class="rootClass">
    <slot />
  </div>
</template>
