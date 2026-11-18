<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { AvatarRoot } from "reka-ui";
import { avatarVariants, type AvatarSize, type AvatarType } from "./avatar.variants";
import AvatarFallback from "./AvatarFallback.vue";

defineOptions({ name: "RaftAvatar", inheritAttrs: false });

const props = withDefaults(defineProps<{ size?: AvatarSize; type?: AvatarType }>(), {
  size: "md",
  type: "agent",
});

const attrs = useAttrs();
const rootClass = computed(() =>
  avatarVariants({ size: props.size, type: props.type }).root({
    className: attrs.class as string,
  }),
);
</script>

<template>
  <AvatarRoot
    v-bind="{ ...attrs, class: undefined }"
    data-slot="avatar"
    :data-size="size"
    :data-type="type"
    :class="rootClass"
  >
    <slot />
    <AvatarFallback v-if="!$slots.default" />
  </AvatarRoot>
</template>
