<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { dropdownMenu } from "./dropdown-menu.variants";

defineOptions({ name: "RaftDropdownMenuPopup", inheritAttrs: false });

const attrs = useAttrs();
const popupClass = computed(() =>
  dropdownMenu().content({ class: attrs.class as string | undefined }),
);
const popupAttrs = computed(() => {
  const { class: _class, ...rest } = attrs;
  return rest;
});
</script>

<template>
  <div v-bind="popupAttrs" data-slot="dropdown-menu-popup" :class="popupClass">
    <slot />
  </div>
</template>
