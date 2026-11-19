<script setup lang="ts">
import { asChildProps } from "../../lib/part-props";
import { Primitive } from "reka-ui";
import { panelHeader } from "./panel.variants";

defineOptions({ name: "RaftPanelActivity", inheritAttrs: false });

defineProps(asChildProps("span"));
const attrs = useAttrs();
const rootClass = computed(() => panelHeader().activity({ className: attrs.class as string }));
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    v-bind="{ ...attrs, class: undefined }"
    :data-slot="(attrs['data-slot'] as string) ?? 'panel-activity'"
    :class="rootClass"
  >
    <slot />
  </Primitive>
</template>
