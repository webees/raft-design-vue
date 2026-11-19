<script setup lang="ts">
import { ArrowUpRight } from "lucide-vue-next";

import TextLinkIcon from "./TextLinkIcon.vue";

defineOptions({ name: "RaftTextLinkExternalIcon" });
defineProps<{ label?: string }>();
</script>

<template>
  <TextLinkIcon :icon="ArrowUpRight" dataSlot="text-link-external-icon" :label="label" />
</template>
