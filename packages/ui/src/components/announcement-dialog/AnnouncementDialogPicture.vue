<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { announcement } from "./announcement-dialog.variants";

defineOptions({ name: "RaftAnnouncementDialogPicture", inheritAttrs: false });

const attrs = useAttrs();
const pictureClass = computed(() => announcement().picture({ className: attrs.class as string }));
</script>

<template>
  <div
    v-bind="{ ...attrs, class: undefined }"
    :class="pictureClass"
    data-slot="announcement-picture"
  >
    <slot />
  </div>
</template>
