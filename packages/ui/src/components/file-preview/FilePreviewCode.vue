<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { filePreview } from "./file-preview.variants";

defineOptions({ name: "RaftFilePreviewCode", inheritAttrs: false });

const attrs = useAttrs();
const {
  code,
  codeAttributeLine,
  codeGlyph,
  codeRow,
  codeRowIndent,
  codeSelfClosingLine,
  codeStack,
  codeTagLine,
  codeTextLine,
  codeTextRow,
} = filePreview();
const codeClass = computed(() => code({ className: attrs.class as string }));
</script>

<template>
  <span
    v-bind="{ ...attrs, class: undefined }"
    aria-hidden="true"
    :class="codeClass"
    data-slot="file-preview-code"
  >
    <span :class="codeStack()">
      <span :class="codeRow()">
        <span :class="codeGlyph()">&lt;</span>
        <span :class="codeTagLine()" />
        <span :class="codeGlyph()">&gt;</span>
      </span>
      <span :class="codeRowIndent()">
        <span :class="codeGlyph()">&lt;</span>
        <span :class="codeAttributeLine()" />
        <span :class="codeGlyph()">&gt;</span>
      </span>
      <span :class="codeTextRow()">
        <span :class="codeTextLine()" />
      </span>
      <span :class="codeRowIndent()">
        <span :class="codeGlyph()">&lt;/</span>
        <span :class="codeAttributeLine()" />
        <span :class="codeGlyph()">&gt;</span>
      </span>
      <span :class="codeRowIndent()">
        <span :class="codeGlyph()">&lt;</span>
        <span :class="codeSelfClosingLine()" />
        <span :class="codeGlyph()">/&gt;</span>
      </span>
      <span :class="codeRow()">
        <span :class="codeGlyph()">&lt;/</span>
        <span :class="codeTagLine()" />
        <span :class="codeGlyph()">&gt;</span>
      </span>
    </span>
    <slot />
  </span>
</template>
