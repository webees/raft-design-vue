<script setup lang="ts">
import Panel from "../panel/Panel.vue";
import { activityInboxShell } from "./activity-inbox.recipes";

defineOptions({ name: "RaftActivityInboxPanel", inheritAttrs: false });

const attrs = useAttrs();
const rootClass = computed(() =>
  activityInboxShell().panel({ class: attrs.class as string | undefined }),
);
</script>

<template>
  <Panel
    edge="inset"
    v-bind="{ ...attrs, class: undefined }"
    data-slot="activity-inbox-root"
    :class="rootClass"
  >
    <slot />
  </Panel>
</template>
