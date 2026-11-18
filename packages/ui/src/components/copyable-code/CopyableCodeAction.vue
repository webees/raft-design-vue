<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { Check, Copy } from "lucide-vue-next";
import Button from "../button/Button.vue";
import type { ButtonSize, ButtonVariant } from "../button";
import { useCopyableCode } from "./copyable-code-context";
import { copyableCode } from "./copyable-code.variants";

defineOptions({ name: "RaftCopyableCodeAction", inheritAttrs: false });

const props = defineProps<{
  buttonClassName?: string;
  class?: string;
  label?: string;
  size?: ButtonSize;
  variant?: ButtonVariant;
}>();

const emit = defineEmits<{ click: [event: MouseEvent] }>();

const attrs = useAttrs();
const { copied: copiedRef, copyValue } = useCopyableCode("CopyableCodeAction");
const copied = computed(() => copiedRef.value);
const actionClass = computed(() => copyableCode().action({ className: props.class }));
const iconSwapClass = computed(() => copyableCode().iconSwap());

const accessibleLabel = computed(() =>
  props.label ?? (copied.value ? "Copied code" : "Copy code"),
);

async function handleClick(event: MouseEvent) {
  const root = (event.currentTarget as HTMLElement).closest(
    '[data-slot="copyable-code-root"]',
  );
  const value =
    root?.querySelector('[data-slot="copyable-code"]')?.textContent ?? "";
  await copyValue(value);
  emit("click", event);
}
</script>

<template>
  <span :class="actionClass" data-slot="copyable-code-action">
    <Button
      v-bind="attrs"
      type="button"
      :variant="props.variant ?? 'ghost'"
      :size="props.size ?? 'icon-md'"
      :class="props.buttonClassName"
      :aria-label="accessibleLabel"
      aria-live="polite"
      @click="handleClick"
    >
      <slot :copied="copied">
        <span
          :class="iconSwapClass"
          :data-state="copied ? 'copied' : 'idle'"
          aria-hidden="true"
          data-slot="copyable-code-icon-swap"
        >
          <Copy
            data-slot="copyable-code-icon"
            data-icon="copy"
            class="size-3"
            :stroke-width="1.75"
          />
          <Check
            data-slot="copyable-code-icon"
            data-icon="check"
            class="size-3"
            :stroke-width="1.75"
          />
        </span>
      </slot>
    </Button>
  </span>
</template>
