<script setup lang="ts">
import { select } from "./select.variants";
import { useSelectItemParts } from "./select-context";

defineOptions({ name: "RaftSelectItemDescription", inheritAttrs: false });

const attrs = useAttrs();
const parts = useSelectItemParts();
const generatedId = useId();
const descriptionId = computed(() => (attrs.id as string | undefined) ?? generatedId);

onMounted(() => {
  if (parts) parts.descriptionId.value = descriptionId.value;
});
onBeforeUnmount(() => {
  if (parts) parts.descriptionId.value = undefined;
});
const descriptionClass = computed(() =>
  select().itemDescription({ className: attrs.class as string }),
);
</script>

<template>
  <span
    v-bind="{ ...attrs, class: undefined }"
    :id="descriptionId"
    :class="descriptionClass"
    data-slot="select-item-description"
  >
    <slot />
  </span>
</template>
