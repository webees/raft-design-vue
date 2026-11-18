<script setup lang="ts">
import { Button } from "../button";
import { announcement } from "./announcement-dialog.variants";

defineOptions({ name: "RaftAnnouncementDialogSecondaryAction", inheritAttrs: false });

const attrs = useAttrs();
const secondaryClass = computed(() =>
  announcement().secondary({ className: attrs.class as string }),
);
</script>

<template>
  <Button v-bind="{ ...attrs, class: undefined }" variant="ghost" :class="secondaryClass">
    <slot />
  </Button>
</template>
