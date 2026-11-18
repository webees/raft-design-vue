<script setup lang="ts">
import { useAttrs } from "vue";
import { CollapsibleContent } from "reka-ui";

defineOptions({ name: "RaftSystemMessageGroupPanel", inheritAttrs: false });

const attrs = useAttrs();
</script>

<template>
  <CollapsibleContent
    v-bind="attrs"
    data-slot="system-message-group-panel"
  >
    <slot />
  </CollapsibleContent>
</template>
