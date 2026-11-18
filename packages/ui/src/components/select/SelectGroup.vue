<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { SelectGroup } from "reka-ui";
import { select } from "./select.variants";

defineOptions({ name: "RaftSelectGroup", inheritAttrs: false });

const attrs = useAttrs();
const groupClass = computed(() => select().group({ className: attrs.class as string }));
</script>

<template>
  <SelectGroup v-bind="{ ...attrs, class: undefined }" :class="groupClass" data-slot="select-group">
    <slot />
  </SelectGroup>
</template>
