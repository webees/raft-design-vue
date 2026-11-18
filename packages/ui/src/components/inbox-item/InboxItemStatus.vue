<script setup lang="ts">
import { computed, useAttrs, useSlots, type VNode } from "vue";

import type { TaskStatusId } from "../../lib/task-status";
import TaskStatusBadge from "../tasks/TaskStatusBadge.vue";
import TaskStatusIcon from "../tasks/TaskStatusIcon.vue";
import Tooltip from "../tooltip/Tooltip.vue";
import TooltipContent from "../tooltip/TooltipContent.vue";
import TooltipTrigger from "../tooltip/TooltipTrigger.vue";
import { InboxItemHoverTarget } from "./inbox-item-parts";
import { inboxItemRecipe } from "./inbox-item.recipe";

defineOptions({ name: "RaftInboxItemStatus", inheritAttrs: false });

defineProps<{
  status: TaskStatusId;
  id?: string;
}>();

defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const slots = useSlots();
const { itemStatusPixel, itemStatusWord } = inboxItemRecipe();

function textOf(nodes: VNode[]): string {
  return nodes
    .map((node) => {
      if (typeof node.children === "string") return node.children;
      if (Array.isArray(node.children)) return textOf(node.children as VNode[]);
      return "";
    })
    .join("");
}

const label = computed(() => textOf(slots.default?.() ?? []));
</script>

<template>
  <TaskStatusBadge
    v-bind="{ ...attrs, class: undefined }"
    :id="id"
    :status="status"
    size="sm"
    :class="itemStatusWord({ class: attrs.class as string | undefined })"
  >
    <slot />
  </TaskStatusBadge>
  <Tooltip>
    <TooltipTrigger as-child role="img" :aria-label="label" data-slot="inbox-item-status-pixel">
      <InboxItemHoverTarget :class="itemStatusPixel()">
        <TaskStatusIcon :status="status" />
      </InboxItemHoverTarget>
    </TooltipTrigger>
    <TooltipContent><slot /></TooltipContent>
  </Tooltip>
</template>
