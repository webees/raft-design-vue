<script setup lang="ts">
import { DropdownMenuItem } from "reka-ui";
import { dropdownMenu } from "./dropdown-menu.variants";
import type { MenuItemProps } from "./menu-item-props";
import { omitAttrs } from "../../lib/attrs";

defineOptions({ name: "RaftDropdownMenuItem", inheritAttrs: false });

const props = withDefaults(defineProps<MenuItemProps>(), {
  disabled: false,
  textValue: undefined,
});

const attrs = useAttrs();
const itemClass = computed(() => dropdownMenu().item({ class: attrs.class as string | undefined }));
const itemAttrs = computed(() => omitAttrs(attrs, "class"));
</script>

<template>
  <DropdownMenuItem
    v-bind="itemAttrs"
    :disabled="props.disabled"
    :text-value="props.textValue"
    data-slot="dropdown-menu-item"
    :class="itemClass"
  >
    <slot />
  </DropdownMenuItem>
</template>
