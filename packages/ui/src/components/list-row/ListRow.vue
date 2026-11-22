<script setup lang="ts">
import { cn } from "../../lib/cn";
import { listRow, type ListRowTone, type ListRowVariant } from "./list-row.variants";

defineOptions({ name: "RaftListRow", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    variant?: ListRowVariant;
    tone?: ListRowTone;
    selected?: boolean;
    interactive?: boolean;
    cell?: boolean;
    attached?: boolean;
    wrap?: boolean;
    class?: string;
  }>(),
  {
    variant: "default",
    tone: "default",
    selected: false,
    interactive: true,
    cell: false,
    attached: false,
    wrap: false,
  },
);

const attrs = useAttrs();
const styles = listRow();
const rowClass = computed(() =>
  cn(
    styles.root({
      variant: props.variant,
      interactive: props.interactive,
      cell: props.cell,
      attached: props.attached,
      wrap: props.wrap,
    }),
    props.class,
  ),
);
const tag = computed(() => (props.interactive ? "button" : "div"));
</script>

<template>
  <component
    :is="tag"
    v-bind="{ ...attrs, class: undefined }"
    :type="interactive ? 'button' : undefined"
    data-slot="list-row"
    :data-variant="variant"
    :data-interactive="interactive ? '' : undefined"
    :data-tone="tone !== 'default' ? tone : undefined"
    :data-selected="selected ? '' : undefined"
    :data-attached="attached ? '' : undefined"
    :class="rowClass"
  >
    <slot />
  </component>
</template>
