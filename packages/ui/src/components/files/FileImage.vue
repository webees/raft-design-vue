<script setup lang="ts">
import { files } from "./files.variants";

defineOptions({ name: "RaftFileImage", inheritAttrs: false });
const props = withDefaults(defineProps<{ fit?: "contain" | "cover"; class?: string }>(), {
  fit: "cover",
});
const attrs = useAttrs();
const rootClass = computed(() => files().image({ class: props.class }));
</script>

<template>
  <img
    v-bind="{ ...attrs, class: undefined }"
    data-slot="file-image"
    :data-fit="fit"
    :class="rootClass"
  />
</template>
