<script setup lang="ts">
import { cn } from "../../lib/cn";
import { avatarVariants } from "./avatar.variants";

defineOptions({ name: "RaftAvatarGroupButton", inheritAttrs: false });
const attrs = useAttrs();
const { group, groupButton } = avatarVariants();
const rootClass = computed(() => group({ class: cn(groupButton(), attrs.class as string) }));
</script>

<template>
  <button
    v-bind="{ ...attrs, class: undefined, type: undefined }"
    type="button"
    data-slot="avatar-group-button"
    :class="rootClass"
  >
    <slot />
  </button>
</template>
