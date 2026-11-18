<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { table } from "./table.variants";

defineOptions({ name: "RaftTableCaption", inheritAttrs: false });

const attrs = useAttrs();
const captionClass = computed(() => table().caption({ className: attrs.class as string }));
</script>

<template>
  <caption v-bind="{ ...attrs, class: undefined }" :class="captionClass" data-slot="table-caption">
    <slot />
  </caption>
</template>
