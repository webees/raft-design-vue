<script setup lang="ts">
import { cn } from "../../lib/cn";
import type { StatusStyleProps } from "../../lib/status-props";
import { Status } from "../status";
import { appRail } from "./app-rail.variants";

defineOptions({ name: "RaftAppRailItemIndicator", inheritAttrs: false });
const attrs = useAttrs();
withDefaults(defineProps<StatusStyleProps>(), { size: "sm", variant: "accent" });
</script>

<template>
  <Status
    aria-hidden="true"
    :size="size"
    :variant="variant"
    data-slot="app-rail-item-indicator"
    :class="cn(appRail().itemIndicator(), attrs.class as string | undefined)"
    v-bind="{ ...attrs, class: undefined }"
  />
</template>
