<script setup lang="ts">
import SidebarBody from "../sidebar/SidebarBody.vue";
import SidebarContent from "../sidebar/SidebarContent.vue";
import SidebarRoot from "../sidebar/SidebarRoot.vue";
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
