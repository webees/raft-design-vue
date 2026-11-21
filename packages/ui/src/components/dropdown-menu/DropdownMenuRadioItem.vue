<script setup lang="ts">
import { DropdownMenuRadioItem } from "reka-ui";
import DropdownMenuItemIndicator from "./DropdownMenuItemIndicator.vue";
import { dropdownMenu } from "./dropdown-menu.variants";
import type { MenuItemProps } from "./menu-item-props";
import { omitAttrs } from "../../lib/attrs";

defineOptions({ name: "RaftDropdownMenuRadioItem", inheritAttrs: false });

const props = withDefaults(defineProps<{ value: string } & MenuItemProps>(), {
  disabled: false,
  textValue: undefined,
});

const attrs = useAttrs();
const itemClass = computed(() =>
  dropdownMenu().radioItem({ class: attrs.class as string | undefined }),
);
const itemAttrs = computed(() => omitAttrs(attrs, "class"));
</script>

<template>
  <DropdownMenuRadioItem
    v-bind="itemAttrs"
    :value="props.value"
    :disabled="props.disabled"
    :text-value="props.textValue"
    data-slot="dropdown-menu-radio-item"
    :class="itemClass"
  >
    <span data-slot="dropdown-menu-radio-item-label" :class="dropdownMenu().radioLabel()">
      <slot />
    </span>
    <slot name="indicator">
      <DropdownMenuItemIndicator />
    </slot>
  </DropdownMenuRadioItem>
</template>
