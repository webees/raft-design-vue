<script setup lang="ts">
import { cn } from "../../lib/cn";
import { descriptionList } from "./description-list.variants";

defineOptions({ name: "RaftDescriptionItem", inheritAttrs: false });

const props = defineProps<{ class?: string }>();
const attrs = useAttrs();
const itemClass = computed(() => cn(descriptionList().item(), props.class));
</script>

<template>
  <div v-bind="{ ...attrs, class: undefined }" data-slot="description-item" :class="itemClass">
    <slot />
  </div>
</template>
