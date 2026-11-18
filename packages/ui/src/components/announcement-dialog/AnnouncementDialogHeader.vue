<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { announcement } from "./announcement-dialog.variants";

defineOptions({ name: "RaftAnnouncementDialogHeader", inheritAttrs: false });

const attrs = useAttrs();
const headerClass = computed(() => announcement().header({ className: attrs.class as string }));
</script>

<template>
  <div
    v-bind="{ ...attrs, class: undefined }"
    :class="headerClass"
    data-slot="announcement-header"
  >
    <slot />
  </div>
</template>
