<script setup lang="ts">
import { asChildProps } from "../../lib/part-props";
import { PanelHeader } from "../panel";
import { profilePanel } from "./profile-panel.variants";

defineOptions({ name: "RaftProfilePanelHeader", inheritAttrs: false });

defineProps(asChildProps());
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
