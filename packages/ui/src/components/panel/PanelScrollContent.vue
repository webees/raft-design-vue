<script setup lang="ts">
import { asChildProps } from "../../lib/part-props";
import { Primitive } from "reka-ui";
import { panel } from "./panel.variants";

defineOptions({ name: "RaftPanelScrollContent", inheritAttrs: false });

defineProps(asChildProps());
const attrs = useAttrs();
const rootClass = computed(() => panel().scrollContent({ className: attrs.class as string }));
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    v-bind="{ ...attrs, class: undefined }"
    :data-slot="(attrs['data-slot'] as string) ?? 'panel-scroll-content'"
    :class="rootClass"
  >
    <slot />
  </Primitive>
</template>
