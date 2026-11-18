<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { SwitchThumb } from "reka-ui";

import { switchRecipe } from "./switch.recipe";

defineOptions({ name: "RaftSwitchThumb", inheritAttrs: false });
const attrs = useAttrs();
const { thumb } = switchRecipe();
const thumbClass = computed(() => thumb({ className: attrs.class as string }));
</script>

<template>
  <SwitchThumb v-bind="{ ...attrs, class: undefined }" data-slot="switch-thumb" :class="thumbClass">
    <slot />
  </SwitchThumb>
</template>
