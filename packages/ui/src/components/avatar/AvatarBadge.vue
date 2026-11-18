<script setup lang="ts">
import { computed, useAttrs, type CSSProperties } from "vue";
import { Primitive } from "reka-ui";
import { avatarVariants } from "./avatar.variants";
import { PRESENCE_COLOR, type Presence } from "../../lib/presence";
import { cn } from "../../lib/cn";
import type { AvatarBadgeOffset } from "./avatar.types";

defineOptions({ name: "RaftAvatarBadge", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    presence?: Presence;
    offset?: AvatarBadgeOffset;
    as?: string;
    asChild?: boolean;
  }>(),
  { presence: "online", offset: undefined, as: "span", asChild: false },
);

const attrs = useAttrs();
const badgeClass = computed(() => avatarVariants().badge({ className: attrs.class as string }));
const dotClass = computed(() => cn(avatarVariants().dot(), PRESENCE_COLOR[props.presence]));
const toCssLength = (value: string | number) => (typeof value === "number" ? `${value}px` : value);
const badgeStyle = computed<CSSProperties | undefined>(() =>
  props.offset
    ? {
        top: toCssLength(props.offset[1]),
        left: toCssLength(props.offset[0]),
        right: "auto",
        bottom: "auto",
        translate: "-50% -50%",
      }
    : undefined,
);
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    v-bind="{ ...attrs, class: undefined, style: badgeStyle ?? attrs.style }"
    data-slot="avatar-badge"
    :class="badgeClass"
  >
    <slot>
      <span data-slot="avatar-badge-dot" :class="dotClass" />
    </slot>
  </Primitive>
</template>
