<script setup lang="ts">
import { SidebarBody, SidebarRoot } from "../sidebar/parts";
import SidebarContent from "../sidebar/SidebarContent.vue";
import { activityInboxSidebar } from "./activity-inbox.recipes";

defineOptions({ name: "RaftActivityInboxSidebar", inheritAttrs: false });

const attrs = useAttrs();
const styles = activityInboxSidebar();
const sidebarClass = computed(() => styles.sidebar({ class: attrs.class as string | undefined }));
</script>

<template>
  <SidebarRoot
    v-bind="{ ...attrs, class: undefined }"
    data-slot="activity-inbox-sidebar"
    :class="sidebarClass"
  >
    <SidebarBody :class="styles.sidebarBody()">
      <SidebarContent :class="styles.sidebarContent()"><slot /></SidebarContent>
    </SidebarBody>
  </SidebarRoot>
</template>
