<script setup lang="ts">
import { Button } from "../button";
import { announcement } from "./announcement-dialog.variants";

defineOptions({ name: "RaftAnnouncementDialogAction", inheritAttrs: false });

const attrs = useAttrs();
const actionClass = computed(() => announcement().action({ className: attrs.class as string }));
</script>

<template>
  <Button
    v-bind="{ ...attrs, class: undefined }"
    variant="accent"
    data-announcement-action
    :class="actionClass"
  >
    <slot />
  </Button>
</template>
