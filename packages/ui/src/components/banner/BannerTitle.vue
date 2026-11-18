<script setup lang="ts">
import { Primitive } from "reka-ui";
import { cn } from "../../lib/cn";
import { banner } from "./banner.variants";

defineOptions({ name: "RaftBannerTitle", inheritAttrs: false });
defineProps<{ as?: string; asChild?: boolean }>();
const attrs = useAttrs();
const { title } = banner();
const rootClass = computed(() => cn(title(), attrs.class as string));
</script>

<template>
  <Primitive
    :as="as ?? 'div'"
    :as-child="asChild"
    v-bind="{ ...attrs, class: undefined }"
    :class="rootClass"
    data-slot="banner-title"
  >
    <slot />
  </Primitive>
</template>
