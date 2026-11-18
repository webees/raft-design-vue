<script setup lang="ts">
import { computed, useAttrs } from "vue";

import { tv } from "../../lib/tv";
import ScrollArea from "../scroll-area/ScrollArea.vue";

defineOptions({ name: "RaftDialogNav", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    as?: string;
  }>(),
  { as: "nav" },
);

const attrs = useAttrs();
const dialogNav = tv({
  slots: {
    root: ["shrink-0", "w-52 border-r border-line-seam py-2 max-md:hidden"],
    content: ["flex flex-col gap-0.5"],
  },
});
const nav = dialogNav();
const rootClass = computed(() => nav.root({ className: attrs.class as string }));
</script>

<template>
  <ScrollArea
    v-bind="{ ...attrs, class: undefined }"
    data-slot="dialog-nav"
    overscroll="contain"
    :tab-index="-1"
    :as="props.as"
    :class="rootClass"
    :content-class="nav.content()"
  >
    <slot />
  </ScrollArea>
</template>
