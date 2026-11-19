<script setup lang="ts">
import { asChildProps } from "../../lib/part-props";
import { Primitive } from "reka-ui";
import { panelHeader } from "./panel.variants";

defineOptions({ name: "RaftPanelSectionHeader", inheritAttrs: false });

defineProps(asChildProps());
const attrs = useAttrs();
const rootClass = computed(() => panelHeader().sectionHeader({ className: attrs.class as string }));
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    v-bind="{ ...attrs, class: undefined }"
    :data-slot="(attrs['data-slot'] as string) ?? 'panel-section-header'"
    :class="rootClass"
  >
    <slot />
  </Primitive>
</template>
