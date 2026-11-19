<script setup lang="ts">
import { asChildProps } from "../../lib/part-props";
import { PanelSection } from "../panel";
import { profilePanel } from "./profile-panel.variants";

defineOptions({ name: "RaftProfilePanelSection", inheritAttrs: false });

defineProps(asChildProps("section"));
const attrs = useAttrs();
const rootClass = computed(() => profilePanel().section({ className: attrs.class as string }));
</script>

<template>
  <PanelSection
    :as="as"
    :as-child="asChild"
    v-bind="{ ...attrs, class: undefined }"
    data-slot="profile-panel-section"
    :class="rootClass"
  >
    <slot />
  </PanelSection>
</template>
