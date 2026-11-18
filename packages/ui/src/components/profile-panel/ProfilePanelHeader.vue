<script setup lang="ts">
import { PanelHeader } from "../panel";
import { profilePanel } from "./profile-panel.variants";

defineOptions({ name: "RaftProfilePanelHeader", inheritAttrs: false });

withDefaults(defineProps<{ as?: string; asChild?: boolean }>(), {
  as: "div",
  asChild: false,
});
const attrs = useAttrs();
const rootClass = computed(() => profilePanel().header({ className: attrs.class as string }));
</script>

<template>
  <PanelHeader
    :as="as"
    :as-child="asChild"
    v-bind="{ ...attrs, class: undefined }"
    data-slot="profile-panel-header"
    :class="rootClass"
  >
    <slot />
  </PanelHeader>
</template>
