<script setup lang="ts">
import { computed, useAttrs } from "vue";

import { activityInboxToolbar } from "./activity-inbox.recipes";

defineOptions({ name: "RaftActivityInboxControls", inheritAttrs: false });

const attrs = useAttrs();
const rootClass = computed(() =>
  activityInboxToolbar().controls({ class: attrs.class as string | undefined }),
);
</script>

<template>
  <div v-bind="{ ...attrs, class: undefined }" data-slot="activity-inbox-controls" :class="rootClass"><slot /></div>
</template>
