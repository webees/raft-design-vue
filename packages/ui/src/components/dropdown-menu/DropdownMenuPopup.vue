<script setup lang="ts">
import { dropdownMenu } from "./dropdown-menu.variants";
import { omitAttrs } from "../../lib/attrs";

defineOptions({ name: "RaftDropdownMenuPopup", inheritAttrs: false });

const attrs = useAttrs();
const popupClass = computed(() =>
  dropdownMenu().content({ class: attrs.class as string | undefined }),
);
const popupAttrs = computed(() => omitAttrs(attrs, "class"));
</script>

<template>
  <div v-bind="popupAttrs" data-slot="dropdown-menu-popup" :class="popupClass">
    <slot />
  </div>
</template>
