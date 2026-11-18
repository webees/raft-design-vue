<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { ChevronRight } from "lucide-vue-next";
import { messageSystem } from "./system-message.variants";

defineOptions({ name: "RaftSystemMessageGroupChevron", inheritAttrs: false });

const attrs = useAttrs();
const rootClass = computed(() =>
  messageSystem().systemGroupChevron({ className: attrs.class as string }),
);
</script>

<template>
  <ChevronRight
    v-bind="{ ...attrs, class: undefined }"
    data-slot="system-message-group-chevron"
    aria-hidden="true"
    :class="rootClass"
  />
</template>
