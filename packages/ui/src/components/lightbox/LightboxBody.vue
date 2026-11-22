<script setup lang="ts">
import type { CSSProperties } from "vue";

import ScrollArea from "../scroll-area/ScrollArea.vue";
import { cn } from "../../lib/cn";
import { lightbox } from "./lightbox.recipe";

defineOptions({ name: "RaftLightboxBody", inheritAttrs: false });

const props = defineProps<{
  class?: string;
  contentClass?: string;
  contentStyle?: string | CSSProperties;
}>();

const attrs = useAttrs();
const bodyClass = computed(() => lightbox().body({ class: props.class }));
const bodyContentClass = lightbox().bodyContent();
</script>

<template>
  <ScrollArea
    v-bind="attrs"
    data-slot="lightbox-body"
    :class="bodyClass"
    :content-class="bodyContentClass"
    :tabindex="0"
  >
    <div
      v-if="props.contentClass !== undefined || props.contentStyle !== undefined"
      data-slot="lightbox-body-content"
      :class="props.contentClass"
      :style="props.contentStyle"
    >
      <slot />
    </div>
    <slot v-else />
  </ScrollArea>
</template>
