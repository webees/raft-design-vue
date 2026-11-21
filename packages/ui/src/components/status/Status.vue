<script setup lang="ts">
import { Primitive } from "reka-ui";
import { cn } from "../../lib/cn";
import { PRESENCE_COLOR, type Presence } from "../../lib/presence";
import {
  STATUS_SIZE_CLASSES,
  STATUS_VARIANT_COLORS,
  type StatusStyleProps,
} from "../../lib/status-props";

defineOptions({ name: "RaftStatus", inheritAttrs: false });

const props = withDefaults(
  defineProps<StatusStyleProps & { presence?: Presence; as?: string; asChild?: boolean }>(),
  { size: "md", variant: "default", as: "span", asChild: false },
);

const attrs = useAttrs();
const color = computed(() =>
  props.presence ? PRESENCE_COLOR[props.presence] : STATUS_VARIANT_COLORS[props.variant],
);

const rootClass = computed(() =>
  cn(
    "relative inline-block shrink-0 bg-(--status-color) rounded-[2px] border-[1.5px] border-sticker-ink",
    STATUS_SIZE_CLASSES[props.size],
    color.value,
    attrs.class as string,
  ),
);
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    v-bind="{ ...attrs, class: undefined }"
    :data-slot="(attrs['data-slot'] as string | undefined) ?? 'status'"
    :data-variant="variant"
    :data-size="size"
    :data-presence="presence"
    :class="rootClass"
  />
</template>
