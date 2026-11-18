<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { cn } from "../../lib/cn";
import { descriptionList } from "./description-list.variants";

defineOptions({ name: "RaftDescriptionDetails", inheritAttrs: false });

const props = defineProps<{ class?: string }>();
const attrs = useAttrs();
const detailsClass = computed(() =>
  cn(descriptionList().value(), props.class, attrs.class as string),
);
</script>

<template>
  <dd v-bind="{ ...attrs, class: undefined }" data-slot="description-details" :class="detailsClass">
    <slot />
  </dd>
</template>
