<script setup lang="ts">
import { computed, inject, ref, watch } from "vue";
import type { ButtonHTMLAttributes } from "vue";

import Button from "../button/Button.vue";
import type { ButtonSize, ButtonVariant } from "../button/button.variants";
import { dialogSheetContextKey } from "./dialog-sheet-context";

defineOptions({ name: "RaftDialogCommit" });

const props = withDefaults(
  defineProps<{
    variant?: ButtonVariant;
    size?: ButtonSize;
    form?: string;
    type?: ButtonHTMLAttributes["type"];
    disabled?: boolean;
    loading?: boolean;
  }>(),
  { type: "button" },
);

const emit = defineEmits<{ click: [event: MouseEvent] }>();

const context = inject(dialogSheetContextKey, null);
const anchor = ref<HTMLElement | null>(null);
const writtenIn = ref<HTMLFormElement | null>(null);

const inSheet = computed(() => !!context?.sheet.value && !!context.commitSlot.value);

watch(
  [() => context?.commitSlot.value, anchor],
  () => {
    writtenIn.value = anchor.value?.closest("form") ?? null;
    if (!inSheet.value || props.form || props.type !== "submit") return;
    if (writtenIn.value && !writtenIn.value.id) {
      console.warn(
        "raft-ui: a submit DialogCommit is drawn in a phone sheet's head, outside its form, and the form has no id, so Enter in a field doesn't submit it (a click still does). Give the form an id, or pass `form` to DialogCommit.",
      );
    }
  },
  { flush: "post", immediate: true },
);

const linkedForm = computed(() => props.form ?? (writtenIn.value?.id || undefined));

function onClick(event: MouseEvent) {
  emit("click", event);
  const form = writtenIn.value;
  if (event.defaultPrevented || !inSheet.value || props.type !== "submit" || !form || form.id) return;
  event.preventDefault();
  form.requestSubmit();
}
</script>

<template>
  <span v-if="inSheet" ref="anchor" hidden />
  <Teleport v-if="inSheet && context?.commitSlot.value" :to="context.commitSlot.value">
    <Button
      size="md"
      :variant="variant"
      :form="linkedForm"
      :type="type"
      :disabled="disabled"
      :loading="loading"
      @click="onClick"
    >
      <slot />
    </Button>
  </Teleport>
  <Button
    v-else
    :size="size"
    :variant="variant"
    :form="form"
    :type="type"
    :disabled="disabled"
    :loading="loading"
    @click="onClick"
  >
    <slot />
  </Button>
</template>
