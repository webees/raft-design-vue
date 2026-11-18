<script setup lang="ts">
import { PanelHeaderContent } from "../panel";
import { profilePanel } from "./profile-panel.variants";

defineOptions({ name: "RaftProfilePanelHeaderContent", inheritAttrs: false });

withDefaults(defineProps<{ as?: string; asChild?: boolean }>(), {
  as: "div",
  asChild: false,
});
const attrs = useAttrs();
const rootClass = computed(() =>
  profilePanel().headerContent({ className: attrs.class as string }),
);
</script>

<template>
  <PanelHeaderContent
    :as="as"
    :as-child="asChild"
    v-bind="{ ...attrs, class: undefined }"
    data-slot="profile-panel-header-content"
    :class="rootClass"
  >
    <slot />
  </PanelHeaderContent>
</template>
