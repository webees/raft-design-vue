<script setup lang="ts">
import { table } from "./table.variants";

defineOptions({ name: "RaftTableScroll", inheritAttrs: false });

withDefaults(defineProps<{ orientation?: "horizontal" }>(), { orientation: "horizontal" });

const attrs = useAttrs();
const scrollClass = computed(() => table().scroll({ className: attrs.class as string }));
</script>

<template>
  <div
    v-bind="{ ...attrs, class: undefined }"
    :class="scrollClass"
    tabindex="0"
    role="region"
    aria-label="Table, scrollable horizontally"
    :data-slot="(attrs['data-slot'] as string | undefined) ?? 'table-scroll'"
  >
    <slot />
  </div>
</template>
