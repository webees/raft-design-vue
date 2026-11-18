<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { SelectScrollUpButton } from "reka-ui";
import { ChevronDown } from "lucide-vue-next";

import { select } from "./select.variants";

defineOptions({ name: "RaftSelectScrollUpArrow", inheritAttrs: false });
const attrs = useAttrs();
const arrowClass = computed(() => select().scrollArrow({ className: attrs.class as string }));
</script>

<template>
  <SelectScrollUpButton
    v-bind="{ ...attrs, class: undefined }"
    data-slot="select-scroll-up-arrow"
    data-direction="up"
    :class="arrowClass"
  >
    <slot>
      <ChevronDown aria-hidden class="size-3.5 shrink-0 rotate-180" />
    </slot>
  </SelectScrollUpButton>
</template>
