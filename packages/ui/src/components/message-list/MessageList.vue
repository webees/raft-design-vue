<script setup lang="ts">
import { computed, ref, useAttrs, type StyleValue } from "vue";

import { toElement } from "../../lib/dom";
import { useMobileViewport } from "../../lib/use-mobile-viewport";
import PanelNativeScrollViewport from "../panel/PanelNativeScrollViewport.vue";
import ScrollArea from "../scroll-area/ScrollArea.vue";
import { messageList } from "./message-list.recipe";

defineOptions({ name: "RaftMessageList", inheritAttrs: false });

const props = defineProps<{
  as?: string;
  class?: string;
  rootClassName?: string;
  style?: StyleValue;
}>();

const attrs = useAttrs();
const slots = messageList();
const isMobile = useMobileViewport();
const viewportRef = ref<InstanceType<typeof ScrollArea> | null>(null);

const viewportStyle = computed<StyleValue>(() => ({
  ...((props.style as Record<string, unknown> | undefined) ?? {}),
  overflowX: "hidden",
}));

defineExpose({
  viewport: computed(() => toElement(viewportRef.value)),
});
</script>

<template>
  <div data-slot="message-list" :class="slots.root({ className: rootClassName })">
    <PanelNativeScrollViewport
      v-if="isMobile"
      v-bind="attrs"
      :as="as"
      data-slot="message-list-viewport"
      :class="slots.viewport({ className: props.class })"
      :style="viewportStyle"
    >
      <div :class="slots.content()">
        <slot />
      </div>
    </PanelNativeScrollViewport>
    <ScrollArea
      v-else
      ref="viewportRef"
      v-bind="attrs"
      :as="as"
      data-slot="message-list-viewport"
      trigger="scroll"
      :class="slots.viewport({ className: props.class })"
      :content-class="slots.content()"
      :style="props.style"
    >
      <slot />
    </ScrollArea>
  </div>
</template>
