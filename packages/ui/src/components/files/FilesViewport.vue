<script setup lang="ts">
import ScrollArea from "../scroll-area/ScrollArea.vue";
import type {
  ScrollAreaOrientation,
  ScrollAreaOverscroll,
  ScrollAreaSize,
  ScrollAreaTrigger,
} from "../scroll-area/types";
import { files } from "./files.variants";

defineOptions({ name: "RaftFilesViewport", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    as?: string;
    fade?: boolean;
    hideDelay?: number;
    orientation?: ScrollAreaOrientation;
    overscroll?: ScrollAreaOverscroll;
    size?: ScrollAreaSize;
    tabIndex?: number;
    trigger?: ScrollAreaTrigger;
  }>(),
  {
    as: "div",
    fade: false,
    hideDelay: 600,
    orientation: "vertical",
    overscroll: "contain",
    size: "medium",
    trigger: "hover",
  },
);

const attrs = useAttrs();
const rootClass = computed(() => files().viewport({ className: attrs.class as string }));
const viewport = ref<InstanceType<typeof ScrollArea> | null>(null);

defineExpose({
  get element() {
    return viewport.value?.$el as HTMLElement | undefined;
  },
  scrollToElement: (...args: Parameters<InstanceType<typeof ScrollArea>["scrollToElement"]>) =>
    viewport.value?.scrollToElement(...args),
  scrollable: () => viewport.value?.scrollable(),
  measure: () => viewport.value?.measure(),
});
</script>

<template>
  <ScrollArea
    v-bind="{ ...attrs, class: undefined }"
    ref="viewport"
    data-slot="files-viewport"
    :as="props.as"
    :class="rootClass"
    :fade="props.fade"
    :hide-delay="props.hideDelay"
    :orientation="props.orientation"
    :overscroll="props.overscroll"
    :size="props.size"
    :tab-index="props.tabIndex"
    :trigger="props.trigger"
  >
    <slot />
  </ScrollArea>
</template>
