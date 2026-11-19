<script setup lang="ts">
import { Download } from "lucide-vue-next";

import TextLinkIcon from "./TextLinkIcon.vue";

defineOptions({ name: "RaftTextLinkDownloadIcon" });
defineProps<{ label?: string }>();
</script>

<template>
  <TextLinkIcon :icon="Download" dataSlot="text-link-download-icon" :label="label" />
</template>
