<script setup lang="ts">
import LogoArtwork from "./LogoArtwork.vue";
import LogoSvg from "./LogoSvg.vue";
import WordmarkArtwork from "./WordmarkArtwork.vue";

defineOptions({ name: "RaftLogoLockup" });
defineProps<{ class?: string }>();
</script>

<template>
  <LogoSvg view-box="0 0 422 104" :class="class">
    <LogoArtwork />
    <WordmarkArtwork />
  </LogoSvg>
</template>
