<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { Primitive } from "reka-ui";
import { panelHeader } from "./panel.variants";

defineOptions({ name: "RaftPanelHeaderIcon", inheritAttrs: false });

withDefaults(defineProps<{ kind?: "icon" | "avatar"; as?: string; asChild?: boolean }>(), {
  kind: "icon",
  as: "div",
  asChild: false,
});
const attrs = useAttrs();
const rootClass = computed(() => panelHeader().headerIcon({ className: attrs.class as string }));
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    v-bind="{ ...attrs, class: undefined }"
    :data-slot="(attrs['data-slot'] as string) ?? 'panel-header-icon'"
    :data-icon-kind="kind"
    :class="rootClass"
  >
    <slot />
  </Primitive>
</template>
