<script setup lang="ts">
import { DropdownMenuSubTrigger } from "reka-ui";
import MenuIndicator from "../context-menu/MenuIndicator.vue";
import { dropdownMenu } from "./dropdown-menu.variants";

defineOptions({ name: "RaftDropdownMenuSubTrigger", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    disabled?: boolean;
    textValue?: string;
  }>(),
  {
    disabled: false,
    textValue: undefined,
  },
);

const attrs = useAttrs();
const triggerClass = computed(() =>
  dropdownMenu().submenuTrigger({ class: attrs.class as string | undefined }),
);
const triggerAttrs = computed(() => {
  const { class: _class, ...rest } = attrs;
  return rest;
});
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
