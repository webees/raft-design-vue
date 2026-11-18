<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { Separator } from "reka-ui";
import { tv } from "../../lib/tv";

defineOptions({ name: "RaftSeparator", inheritAttrs: false });

const props = withDefaults(
  defineProps<{ orientation?: "horizontal" | "vertical"; decorative?: boolean }>(),
  { orientation: "horizontal", decorative: false },
);
const attrs = useAttrs();

const separator = tv({
  slots: {
    root: ["shrink-0 bg-line-hairline"],
    labeledRoot: "grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3 py-3",
    labeledLine: "h-px w-full shrink-0 bg-line-hairline",
    labeledContent: "min-w-0 font-sans text-footnote font-semibold text-foreground-hint",
  },
  variants: {
    orientation: {
      horizontal: { root: "h-px w-full" },
      vertical: { root: "w-px self-stretch" },
    },
  },
});

const styles = computed(() => separator({ orientation: props.orientation }));
</script>

<template>
  <Separator
    v-if="orientation === 'horizontal' && $slots.default"
    v-bind="{ ...attrs, class: undefined }"
    :orientation="orientation"
    :decorative="decorative"
    data-slot="separator"
    :class="styles.labeledRoot({ className: attrs.class as string })"
  >
    <span aria-hidden="true" :class="styles.labeledLine()" />
    <span data-slot="separator-content" :class="styles.labeledContent()">
      <slot />
    </span>
    <span aria-hidden="true" :class="styles.labeledLine()" />
  </Separator>
  <Separator
    v-else
    v-bind="{ ...attrs, class: undefined }"
    :orientation="orientation"
    :decorative="decorative"
    data-slot="separator"
    :class="styles.root({ className: attrs.class as string })"
  />
</template>
