<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { cn } from "../../lib/cn";
import { useCopyToClipboard } from "../../lib/use-copy-to-clipboard";
import { provideCopyableCode, type CopyableCodeSize } from "./copyable-code-context";
import { copyableCode } from "./copyable-code.variants";

defineOptions({ name: "RaftCopyableCodeRoot", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    size?: CopyableCodeSize;
    copied?: boolean;
  }>(),
  { size: "md", copied: undefined },
);

const emit = defineEmits<{
  copy: [value: string];
  error: [error: Error];
}>();

const attrs = useAttrs();
const { copied: clipboardCopied, copyText } = useCopyToClipboard({ timeout: 1400 });
const effectiveCopied = computed(() => props.copied ?? clipboardCopied.value);
const size = computed(() => props.size);

async function copyValue(value: string) {
  try {
    await copyText(value);
  } catch (error) {
    emit("error", error instanceof Error ? error : new Error(String(error)));
    return;
  }
  emit("copy", value);
}

provideCopyableCode({
  copied: effectiveCopied,
  copyValue,
  size,
});

const rootClass = computed(() =>
  cn(copyableCode({ size: props.size }).root(), attrs.class as string),
);
</script>

<template>
  <div
    v-bind="{ ...attrs, class: undefined }"
    :class="rootClass"
    :data-size="props.size"
    :data-state="effectiveCopied ? 'copied' : 'idle'"
    data-slot="copyable-code-root"
  >
    <slot :copied="effectiveCopied" />
  </div>
</template>
