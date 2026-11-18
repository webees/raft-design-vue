<script setup lang="ts">
import { computed, useAttrs } from "vue";

import { activityInboxShell } from "./activity-inbox.recipes";

defineOptions({ name: "RaftActivityInboxLoadingMore", inheritAttrs: false });

const attrs = useAttrs();
const rootClass = computed(() =>
  activityInboxShell().loadingMore({ class: attrs.class as string | undefined }),
);
</script>

<template>
  <div
    v-bind="{ ...attrs, class: undefined }"
    data-slot="activity-inbox-loading-more"
    :class="rootClass"
  >
    <slot />
  </div>
</template>
