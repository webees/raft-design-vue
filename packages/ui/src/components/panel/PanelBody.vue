<script setup lang="ts">
import { Primitive } from "reka-ui";
import { panel } from "./panel.variants";

defineOptions({ name: "RaftPanelBody", inheritAttrs: false });

withDefaults(defineProps<{ as?: string; asChild?: boolean }>(), { as: "div", asChild: false });
const attrs = useAttrs();
const rootClass = computed(() => panel().body({ className: attrs.class as string }));
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    v-bind="{ ...attrs, class: undefined }"
    :data-slot="(attrs['data-slot'] as string) ?? 'panel-body'"
    :class="rootClass"
  >
    <slot />
  </Primitive>
</template>
