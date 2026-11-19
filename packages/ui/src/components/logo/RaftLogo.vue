<script setup lang="ts">
import LogoArtwork from "./LogoArtwork.vue";
import LogoSvg from "./LogoSvg.vue";

defineOptions({ name: "RaftLogo" });
defineProps<{ class?: string }>();
</script>

<template>
  <LogoSvg view-box="0 0 113 104" :class="class">
    <LogoArtwork />
  </LogoSvg>
</template>
