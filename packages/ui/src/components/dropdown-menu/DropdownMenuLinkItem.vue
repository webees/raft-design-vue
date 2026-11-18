<script setup lang="ts">
import { DropdownMenuItem } from "reka-ui";
import DropdownMenuItemIndicator from "./DropdownMenuItemIndicator.vue";
import { dropdownMenu } from "./dropdown-menu.variants";

defineOptions({ name: "RaftDropdownMenuLinkItem", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    href?: string;
    target?: string;
    rel?: string;
    current?: boolean;
    disabled?: boolean;
  }>(),
  { href: undefined, target: undefined, rel: undefined, current: false, disabled: false },
);

const attrs = useAttrs();
const styles = dropdownMenu();
const itemClass = computed(() => styles.radioItem({ class: attrs.class as string | undefined }));
const linkAttrs = computed(() => {
  const { class: _class, ...rest } = attrs;
  return rest;
});
</script>

<template>
  <DropdownMenuItem as-child :disabled="props.disabled">
    <a
      v-bind="linkAttrs"
      data-slot="dropdown-menu-link-item"
      :href="props.href"
      :target="props.target"
      :rel="props.rel"
      :aria-current="props.current ? 'page' : undefined"
      :aria-disabled="props.disabled || undefined"
      :data-checked="props.current ? '' : undefined"
      :class="itemClass"
      @click="props.disabled && $event.preventDefault()"
    >
      <span :class="styles.radioLabel()">
        <slot />
      </span>
      <DropdownMenuItemIndicator v-if="props.current" :class="styles.indicator()" />
    </a>
  </DropdownMenuItem>
</template>
