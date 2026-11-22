<script setup lang="ts">
import { Primitive } from "reka-ui";

import { cn } from "../../lib/cn";
import { lightbox } from "./lightbox.recipe";

defineOptions({ name: "RaftLightboxThumbnail", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    active?: boolean;
    as?: string;
    class?: string;
    type?: "button" | "submit" | "reset";
  }>(),
  { active: false, as: "button", type: "button" },
);

const attrs = useAttrs();
const classes = computed(() => lightbox().thumbnail({ class: props.class }));
const overlayClasses = lightbox().thumbnailOverlay();
</script>

<template>
  <Primitive
    :as="props.as"
    v-bind="attrs"
    :class="classes"
    :data-active="props.active ? 'true' : undefined"
    data-slot="lightbox-thumbnail"
    :type="props.as === 'button' ? props.type : undefined"
  >
    <slot />
    <span aria-hidden="true" data-slot="lightbox-thumbnail-overlay" :class="overlayClasses" />
  </Primitive>
</template>
