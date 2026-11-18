<script setup lang="ts">
import { Primitive } from "reka-ui";
import { panel } from "./panel.variants";

defineOptions({ name: "RaftPanelSection", inheritAttrs: false });

withDefaults(defineProps<{ as?: string; asChild?: boolean }>(), { as: "section", asChild: false });
const attrs = useAttrs();
const rootClass = computed(() => panel().section({ className: attrs.class as string }));
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    v-bind="{ ...attrs, class: undefined }"
    :data-slot="(attrs['data-slot'] as string) ?? 'panel-section'"
    :class="rootClass"
  >
    <slot />
  </Primitive>
</template>
