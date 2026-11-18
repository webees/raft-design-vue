<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { SelectSeparator } from "reka-ui";
import { select } from "./select.variants";

defineOptions({ name: "RaftSelectSeparator", inheritAttrs: false });

const attrs = useAttrs();
const separatorClass = computed(() => select().separator({ className: attrs.class as string }));
</script>

<template>
  <SelectSeparator
    v-bind="{ ...attrs, class: undefined }"
    :class="separatorClass"
    data-slot="select-separator"
  />
</template>
