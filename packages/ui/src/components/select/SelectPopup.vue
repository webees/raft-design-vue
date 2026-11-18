<script setup lang="ts">
import { computed, useAttrs } from "vue";

import { select } from "./select.variants";

defineOptions({ name: "RaftSelectPopup", inheritAttrs: false });
const attrs = useAttrs();
const popupClass = computed(() => select().content({ className: attrs.class as string }));
</script>

<template>
  <div v-bind="{ ...attrs, class: undefined }" data-slot="select-content" :class="popupClass">
    <slot />
  </div>
</template>
