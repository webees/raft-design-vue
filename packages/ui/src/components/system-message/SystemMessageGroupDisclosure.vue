<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { CollapsibleTrigger } from "reka-ui";
import { messageSystem } from "./system-message.variants";

defineOptions({ name: "RaftSystemMessageGroupDisclosure", inheritAttrs: false });

const attrs = useAttrs();
const rootClass = computed(() =>
  messageSystem().systemGroupDisclosure({ className: attrs.class as string }),
);
</script>

<template>
  <CollapsibleTrigger
    v-bind="{ ...attrs, class: undefined }"
    type="button"
    data-slot="system-message-group-disclosure"
    :class="rootClass"
  >
    <slot />
  </CollapsibleTrigger>
</template>
