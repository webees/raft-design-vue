<script setup lang="ts">
import InboxItemSkeleton from "./InboxItemSkeleton.vue";
import { inboxItemSkeleton } from "./inbox-item-skeleton.variants";
import type { InboxItemDensity } from "./index";

defineOptions({ name: "RaftInboxItemSkeletonList", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    density?: InboxItemDensity;
    leading?: boolean;
    context?: boolean;
    line?: boolean;
    /** How many rows to show. About a screenful; ignored when there are children. */
    count?: number;
    /**
     * Milliseconds to wait before the rows appear, so a fast load doesn't
     * flash them (Feedback, "Empty, loading and failed"). The list is empty
     * until then. A list skeleton is only for a slow load, so it waits 1
     * second by default; pass `0` to show the rows at once.
     */
    delay?: number;
  }>(),
  { density: undefined, leading: false, context: false, line: false, count: 6, delay: 1000 },
);

const attrs = useAttrs();
const slots = computed(() => inboxItemSkeleton());
const listClass = computed(() =>
  slots.value.list({ className: attrs.class as string | undefined }),
);

const passed = ref(props.delay <= 0);
let timer: ReturnType<typeof setTimeout> | undefined;
watch(
  () => props.delay,
  (delay) => {
    clearTimeout(timer);
    passed.value = delay <= 0;
    if (!passed.value) timer = setTimeout(() => (passed.value = true), delay);
  },
  { immediate: true },
);
onBeforeUnmount(() => clearTimeout(timer));
</script>

<template>
  <div
    v-bind="{ ...attrs, class: undefined }"
    data-slot="inbox-item-skeleton-list"
    :data-waiting="passed ? undefined : ''"
    :class="listClass"
  >
    <template v-if="passed">
      <slot v-if="$slots.default" />
      <template v-else>
        <InboxItemSkeleton
          v-for="index in count"
          :key="index"
          :density="density"
          :leading="leading"
          :context="context"
          :line="line"
        />
      </template>
    </template>
  </div>
</template>
