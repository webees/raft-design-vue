<script setup lang="ts">
import { select } from "./select.variants";

defineOptions({ name: "RaftSelectEmpty", inheritAttrs: false });

const attrs = useAttrs();
const emptyClass = computed(() => select().empty({ className: attrs.class as string }));
</script>

<template>
  <div v-bind="{ ...attrs, class: undefined }" :class="emptyClass" data-slot="select-empty">
    <slot />
  </div>
</template>
