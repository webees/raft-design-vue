<script setup lang="ts">
import { computed, ref, useAttrs } from "vue";
import { SelectItem } from "reka-ui";
import { select } from "./select.variants";
import { provideSelectItemParts, useSelectChrome } from "./select-context";

defineOptions({ name: "RaftSelectItem", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    value: string | number | bigint | Record<string, unknown>;
    disabled?: boolean;
    textValue?: string;
    asChild?: boolean;
  }>(),
  { disabled: false, textValue: undefined, asChild: false },
);

const attrs = useAttrs();
const chrome = useSelectChrome();
const textId = ref<string>();
const descriptionId = ref<string>();
provideSelectItemParts({ textId, descriptionId });
const itemClass = computed(() =>
  select({ chrome: chrome.value }).item({ className: attrs.class as string }),
);

const emit = defineEmits<{ select: [event: Event] }>();
</script>

<template>
  <SelectItem
    v-bind="{ ...attrs, class: undefined }"
    :class="itemClass"
    :value="props.value"
    :disabled="props.disabled"
    :text-value="props.textValue"
    :as-child="props.asChild"
    :data-slot="(attrs['data-slot'] as string) ?? 'select-item'"
    :aria-labelledby="textId"
    :aria-describedby="descriptionId"
    @select="emit('select', $event)"
  >
    <slot />
  </SelectItem>
</template>
