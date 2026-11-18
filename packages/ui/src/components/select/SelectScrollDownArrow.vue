<script setup lang="ts">
import { SelectScrollDownButton } from "reka-ui";
import { ChevronDown } from "lucide-vue-next";

import { select } from "./select.variants";

defineOptions({ name: "RaftSelectScrollDownArrow", inheritAttrs: false });
const attrs = useAttrs();
const arrowClass = computed(() => select().scrollArrow({ className: attrs.class as string }));
</script>

<template>
  <SelectScrollDownButton
    v-bind="{ ...attrs, class: undefined }"
    data-slot="select-scroll-down-arrow"
    data-direction="down"
    :class="arrowClass"
  >
    <slot>
      <ChevronDown aria-hidden class="size-3.5 shrink-0" />
    </slot>
  </SelectScrollDownButton>
</template>
