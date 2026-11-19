<script setup lang="ts">
import { panelRootProps } from "../../lib/part-props";
import { Panel } from "../panel";
import { profilePanel } from "./profile-panel.variants";

defineOptions({ name: "RaftProfilePanel", inheritAttrs: false });

defineProps(panelRootProps());
const attrs = useAttrs();
const rootClass = computed(() => profilePanel().root({ className: attrs.class as string }));
</script>

<template>
  <Panel
    :edge="edge"
    :as="as"
    :as-child="asChild"
    v-bind="{ ...attrs, class: undefined }"
    data-slot="profile-panel"
    :class="rootClass"
  >
    <slot />
  </Panel>
</template>
