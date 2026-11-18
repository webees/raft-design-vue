<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { filePreview } from "./file-preview.variants";

defineOptions({ name: "RaftFilePreviewFile", inheritAttrs: false });

const attrs = useAttrs();
const {
  file,
  fileZip,
  fileZipDark,
  fileZipLight,
  fileZipPull,
  fileZipRow,
  fileZipStack,
  fileZipTeeth,
} = filePreview();
const fileClass = computed(() => file({ className: attrs.class as string }));
</script>

<template>
  <span
    v-bind="{ ...attrs, class: undefined }"
    aria-hidden="true"
    :class="fileClass"
    data-slot="file-preview-file"
  >
    <span :class="fileZip()">
      <span :class="fileZipStack()">
        <span :class="fileZipTeeth()">
          <span v-for="row in 5" :key="row" :class="fileZipRow()">
            <span v-if="row % 2 === 1" :class="fileZipDark()" />
            <span v-else :class="fileZipLight()" />
            <span v-if="row % 2 === 1" :class="fileZipLight()" />
            <span v-else :class="fileZipDark()" />
          </span>
        </span>
        <span :class="fileZipPull()" />
      </span>
    </span>
    <slot />
  </span>
</template>
