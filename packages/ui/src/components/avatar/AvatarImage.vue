<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { AvatarImage } from "reka-ui";
import { avatarVariants } from "./avatar.variants";

defineOptions({ name: "RaftAvatarImage", inheritAttrs: false });
defineProps<{ src: string }>();
const attrs = useAttrs();
const imageClass = computed(() =>
  avatarVariants().image({ className: attrs.class as string }),
);
</script>

<template>
  <AvatarImage
    v-bind="{ ...attrs, class: undefined }"
    :src="src"
    data-slot="avatar-image"
    :class="imageClass"
  />
</template>
