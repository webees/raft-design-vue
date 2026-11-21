<script setup lang="ts">
import Skeleton from "../skeleton/Skeleton.vue";
import InboxItem from "./InboxItem.vue";
import { InboxItemLine } from "./parts";
import {
  InboxItemBody,
  InboxItemContent,
  InboxItemContext,
  InboxItemHeading,
  InboxItemLeading,
  InboxItemTimestamp,
  InboxItemTitle,
  InboxItemTrailing,
} from "./inbox-item-parts";
import { inboxItemSkeleton } from "./inbox-item-skeleton.variants";
import type { InboxItemDensity } from "./index";

defineOptions({ name: "RaftInboxItemSkeleton", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    /** The density of the rows it stands for. */
    density?: InboxItemDensity;
    /** A 35px block where the rows have an `InboxItemLeading` avatar or tile. */
    leading?: boolean;
    /** A context line above the title, where the rows have an `InboxItemContext`. */
    context?: boolean;
    /**
     * In `density="compact"`, where the rows have an `InboxItemLine`: no trailing
     * column, the time at the end of the heading.
     */
    line?: boolean;
  }>(),
  { density: undefined, leading: false, context: false, line: false },
);

const attrs = useAttrs();
const slots = computed(() => inboxItemSkeleton());
const fullWidth = computed(() => props.line && props.density === "compact");
const rowClass = computed(() => slots.value.row({ className: attrs.class as string | undefined }));
const leadingClass = computed(() => slots.value.leading());
const lineClass = computed(() => slots.value.line());
const titleClass = computed(() => slots.value.title());
const contextBarClass = computed(() => slots.value.bar({ className: slots.value.contextBar() }));
const titleBarClass = computed(() => slots.value.bar({ className: slots.value.titleBar() }));
const bodyBarClass = computed(() => slots.value.bar({ className: slots.value.bodyBar() }));
const timestampBarClass = computed(() =>
  slots.value.bar({ className: slots.value.timestampBar() }),
);
</script>

<template>
  <InboxItem
    v-bind="{ ...attrs, class: undefined }"
    aria-hidden="true"
    data-skeleton=""
    :density="density"
    disabled
    :class="rowClass"
  >
    <InboxItemLeading v-if="leading">
      <Skeleton :class="leadingClass" />
    </InboxItemLeading>
    <InboxItemContent>
      <InboxItemContext v-if="context">
        <span :class="lineClass">
          <Skeleton variant="line" :class="contextBarClass" />
        </span>
      </InboxItemContext>
      <InboxItemHeading>
        <InboxItemTitle :class="titleClass">
          <Skeleton variant="line" :class="titleBarClass" />
        </InboxItemTitle>
        <InboxItemTimestamp v-if="fullWidth">
          <Skeleton variant="line" :class="timestampBarClass" />
        </InboxItemTimestamp>
      </InboxItemHeading>
      <InboxItemLine v-if="fullWidth">
        <InboxItemBody>
          <Skeleton variant="line" :class="bodyBarClass" />
        </InboxItemBody>
      </InboxItemLine>
      <InboxItemBody v-else>
        <Skeleton variant="line" :class="bodyBarClass" />
      </InboxItemBody>
    </InboxItemContent>
    <InboxItemTrailing v-if="!fullWidth">
      <InboxItemTimestamp>
        <Skeleton variant="line" :class="timestampBarClass" />
      </InboxItemTimestamp>
    </InboxItemTrailing>
  </InboxItem>
</template>
