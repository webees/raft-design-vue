<script setup lang="ts">
import { DropdownMenuSubTrigger } from "reka-ui";
import MenuIndicator from "../context-menu/MenuIndicator.vue";
import { dropdownMenu } from "./dropdown-menu.variants";
import type { MenuItemProps } from "./menu-item-props";
import { omitAttrs } from "../../lib/attrs";

defineOptions({ name: "RaftDropdownMenuSubTrigger", inheritAttrs: false });

const props = withDefaults(defineProps<MenuItemProps>(), {
  disabled: false,
  textValue: undefined,
});

const attrs = useAttrs();
const triggerClass = computed(() =>
  dropdownMenu().submenuTrigger({ class: attrs.class as string | undefined }),
);
const triggerAttrs = computed(() => omitAttrs(attrs, "class"));
</script>

<template>
  <DropdownMenuSubTrigger
    v-bind="triggerAttrs"
    :disabled="props.disabled"
    :text-value="props.textValue"
    data-slot="dropdown-menu-submenu-trigger"
    :class="triggerClass"
  >
    <slot />
    <MenuIndicator
      data-slot="dropdown-menu-submenu-trigger-indicator"
      :class="dropdownMenu().indicator()"
    />
  </DropdownMenuSubTrigger>
</template>
