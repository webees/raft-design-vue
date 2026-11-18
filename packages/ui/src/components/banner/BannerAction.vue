<script setup lang="ts">
import { Primitive } from "reka-ui";
import { cn } from "../../lib/cn";
import { banner } from "./banner.variants";
import { useBannerWrap } from "./use-banner-wrap";

defineOptions({ name: "RaftBannerAction", inheritAttrs: false });
defineProps<{ as?: string; asChild?: boolean }>();
const attrs = useAttrs();
const { action } = banner();
const rootRef = ref<HTMLElement | null>(null);
const wraps = useBannerWrap(rootRef);
const rootClass = computed(() => cn(action(), attrs.class as string));
</script>

<template>
  <Primitive
    ref="rootRef"
    :as="as ?? 'div'"
    :as-child="asChild"
    v-bind="{ ...attrs, class: undefined }"
    :data-wrap="wraps ? '' : undefined"
    :class="rootClass"
    data-slot="banner-action"
  >
    <slot />
  </Primitive>
</template>
