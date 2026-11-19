<script setup lang="ts">
import LogoSvg from "./LogoSvg.vue";
import WordmarkArtwork from "./WordmarkArtwork.vue";

defineOptions({ name: "RaftWordmark" });
defineProps<{ class?: string }>();
</script>

<template>
  <LogoSvg view-box="128 0 294 104" :class="class">
    <WordmarkArtwork />
  </LogoSvg>
</template>
