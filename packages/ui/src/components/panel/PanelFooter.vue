<script setup lang="ts">
import { asChildProps } from "../../lib/part-props";
import { Primitive } from "reka-ui";
import { panel } from "./panel.variants";

defineOptions({ name: "RaftPanelFooter", inheritAttrs: false });

defineProps(asChildProps());
const attrs = useAttrs();
const rootClass = computed(() => panel().footer({ className: attrs.class as string }));
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    v-bind="{ ...attrs, class: undefined }"
    :data-slot="(attrs['data-slot'] as string) ?? 'panel-footer'"
    :class="rootClass"
  >
    <slot />
  </Primitive>
</template>
