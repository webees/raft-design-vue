<script setup lang="ts">
import ComposerDropOverlay from "./ComposerDropOverlay.vue";
import {
  ComposerDropOverlayIcon,
  ComposerDropOverlayIconCluster,
  ComposerDropOverlayLabel,
} from "./composer-drop-overlay-parts";

defineOptions({ name: "RaftComposerDropOverlayPrompt", inheritAttrs: false });

const attrs = useAttrs();
const overlayClass = computed(() => attrs.class as string | undefined);
</script>

<template>
  <ComposerDropOverlay :class="overlayClass">
    <ComposerDropOverlayLabel>
      <ComposerDropOverlayIconCluster>
        <slot name="icon">
          <ComposerDropOverlayIcon />
        </slot>
      </ComposerDropOverlayIconCluster>
      <span><slot /></span>
    </ComposerDropOverlayLabel>
  </ComposerDropOverlay>
</template>
