<script setup lang="ts">
import { computed, getCurrentInstance, ref, useAttrs } from "vue";
import { PopoverRoot } from "reka-ui";
import { provideMobileNavServer } from "./mobile-nav-server-context";

defineOptions({ name: "RaftMobileNavServerPopover", inheritAttrs: false });

const props = withDefaults(defineProps<{ modal?: boolean; open?: boolean }>(), {
  modal: false,
});

const attrs = useAttrs();
const instance = getCurrentInstance();
const controlled = computed(
  () => instance?.vnode.props != null && "open" in instance.vnode.props,
);
const innerOpen = ref(false);
const isOpen = computed(() => (controlled.value ? props.open === true : innerOpen.value));
const triggerRef = ref<HTMLElement | null>(null);
const setOpen = (value: boolean) => {
  if (!controlled.value) innerOpen.value = value;
};

provideMobileNavServer({ open: isOpen, setOpen, triggerRef });

const rootProps = computed(() => {
  const { open: _open, ...rest } = attrs as Record<string, unknown>;
  return rest;
});
</script>

<template>
  <PopoverRoot
    v-bind="rootProps"
    :modal="modal"
    :open="isOpen"
    data-slot="mobile-nav-server-popover"
    @update:open="setOpen"
  >
    <slot />
  </PopoverRoot>
</template>
