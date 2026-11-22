<script setup lang="ts">
import { ToggleGroupItem } from "reka-ui";
import type { ItemProps } from "../../lib/item-props";
import { useItemBindings } from "../../lib/item-bindings";
import { toggleGroup } from "./toggle-group.variants";

defineOptions({ name: "RaftToggleGroupItem", inheritAttrs: false });

const props = withDefaults(defineProps<ItemProps>(), { disabled: false, asChild: false });

const { tapRef, rootAttrs } = useItemBindings(props, (className) =>
  toggleGroup().item({ className }),
);
</script>

<template>
  <ToggleGroupItem
    :ref="tapRef"
    v-bind="rootAttrs"
    data-slot="toggle-group-item"
  >
    <slot />
  </ToggleGroupItem>
</template>
