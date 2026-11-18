<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { DropdownMenuSubTrigger } from "reka-ui";
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
    <span
      aria-hidden
      data-slot="dropdown-menu-submenu-trigger-indicator"
      :class="dropdownMenu().indicator()"
    >
      <svg viewBox="0 0 12 12" fill="none" class="size-3 shrink-0">
        <path
          d="m4.5 2.5 3.5 3.5-3.5 3.5"
          stroke="currentColor"
          stroke-width="1"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </span>
  </DropdownMenuSubTrigger>
</template>
