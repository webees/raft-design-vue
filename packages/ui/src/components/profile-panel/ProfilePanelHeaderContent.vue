<script setup lang="ts">
import { asChildProps } from "../../lib/part-props";
import { PanelHeaderContent } from "../panel";
import { profilePanel } from "./profile-panel.variants";

defineOptions({ name: "RaftProfilePanelHeaderContent", inheritAttrs: false });

defineProps(asChildProps());
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
