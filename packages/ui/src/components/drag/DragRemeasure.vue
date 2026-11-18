<script setup lang="ts">
defineOptions({ name: "RaftDragRemeasure", inheritAttrs: false });
const attrs = useAttrs();

const props = defineProps<{ version?: unknown }>();

function remeasure() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event("resize"));
}

onMounted(remeasure);
watch(
  () => props.version,
  () => nextTick(remeasure),
);
</script>

<template>
  <span aria-hidden="true" data-slot="drag-remeasure" style="display: none" v-bind="attrs" />
</template>
