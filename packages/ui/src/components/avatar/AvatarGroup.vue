<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { avatarVariants } from "./avatar.variants";

defineOptions({ name: "RaftAvatarGroup", inheritAttrs: false });
const attrs = useAttrs();
const groupClass = computed(() => avatarVariants().group({ className: attrs.class as string }));
</script>

<template>
  <div v-bind="{ ...attrs, class: undefined }" data-slot="avatar-group" :class="groupClass">
    <slot />
  </div>
</template>
