<script setup lang="ts">
import { measureContent, observeTruncation, readNow, type Truncation } from "../../lib/truncation";
import { cn } from "../../lib/cn";
import { omitAttrs } from "../../lib/attrs";
import { Tooltip, TooltipContent, TooltipTrigger } from "../tooltip";
import { ellipsis } from "./ellipsis.variants";
import { provideEllipsis } from "./ellipsis-context";

defineOptions({ name: "RaftEllipsis", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    lines?: number;
    tooltip?: boolean | string;
    expanded?: boolean;
    defaultExpanded?: boolean;
    expandOnClick?: boolean;
    onExpandedChange?: (expanded: boolean) => void;
  }>(),
  {
    lines: 1,
    tooltip: true,
    expanded: undefined,
    defaultExpanded: false,
    expandOnClick: false,
    onExpandedChange: undefined,
  },
);

const emit = defineEmits<{
  "update:expanded": [value: boolean];
}>();

const attrs = useAttrs();
const slots = useSlots();
const rootRef = ref<HTMLElement | null>(null);
const textRef = ref<HTMLElement | null>(null);
const contentRef = ref<HTMLElement | null>(null);
const afterRef = ref<HTMLElement | null>(null);
const textId = useId();
const expandedState = ref(props.defaultExpanded);
const expanded = computed(() => props.expanded ?? expandedState.value);
const truncation = ref<Truncation>(undefined);
const interactive = ref(false);
const open = ref(false);
const multiline = computed(() => props.lines > 1);
const hasAfter = computed(() => Boolean(slots.after));
const hasTooltip = computed(() => props.tooltip !== false && props.tooltip != null);

const clickable = computed(
  () =>
    props.expandOnClick &&
    !hasAfter.value &&
    !interactive.value &&
    (truncation.value === true || expanded.value),
);
const truncated = computed(() => truncation.value === true && !expanded.value);
const afterHidden = computed(() => !truncated.value && !expanded.value);
const rootClass = computed(() =>
  ellipsis({
    multiline: multiline.value,
    expanded: expanded.value,
    clickable: clickable.value,
  }).root({ class: attrs.class as string | undefined }),
);
const textClass = computed(() =>
  ellipsis({
    multiline: multiline.value,
    expanded: expanded.value,
    clickable: clickable.value,
  }).text({ class: hasTooltip.value ? "select-auto" : undefined }),
);
const contentClass = ellipsis().content();
const spacerClass = ellipsis().spacer();
const afterClass = ellipsis().after();
const rootStyle = computed(() => ({
  ...(attrs.style as Record<string, string> | undefined),
  "--ellipsis-lines": String(props.lines),
}));

function toggle() {
  const next = !expanded.value;
  if (props.expanded === undefined) expandedState.value = next;
  emit("update:expanded", next);
  props.onExpandedChange?.(next);
}

function closeTooltip() {
  open.value = false;
}

function measureNow() {
  const text = textRef.value;
  const content = contentRef.value;
  if (!text || !content) return undefined;
  const next = readNow({
    observe: () => [text, afterRef.value],
    watch: () => content,
    isolate: () => {
      rootRef.value?.setAttribute("data-measuring", "");
      return () => rootRef.value?.removeAttribute("data-measuring");
    },
    read: () => measureContent(text, content),
    commit: () => undefined,
  });
  commit(next);
  return next;
}

function commit(next: Truncation) {
  interactive.value = contentRef.value?.querySelector("a, button, input, select, textarea") != null;
  if (expanded.value) return;
  truncation.value = next;
  if (next !== true) open.value = false;
}

let cleanup: (() => void) | undefined;

watch(
  [textRef, contentRef, rootRef, expanded, () => props.lines, hasAfter, hasTooltip],
  () => {
    cleanup?.();
    cleanup = undefined;
    const text = textRef.value;
    const content = contentRef.value;
    const root = rootRef.value;
    if (!text || !content || !root) return;
    const target = {
      observe: () => [text, afterRef.value],
      watch: () => content,
      isolate: () => {
        root.setAttribute("data-measuring", "");
        return () => root.removeAttribute("data-measuring");
      },
      read: () => measureContent(text, content),
      commit,
    };
    cleanup = observeTruncation(target);
  },
  { immediate: true, flush: "post" },
);

onBeforeUnmount(() => cleanup?.());

function handleOpenChange(next: boolean) {
  if (!next) {
    open.value = false;
    return;
  }
  if (expanded.value) return;
  if (measureNow() === true) open.value = true;
}

function onClick(event: MouseEvent) {
  if (!clickable.value) return;
  const selection = window.getSelection();
  if (selection && !selection.isCollapsed && textRef.value?.contains(selection.anchorNode)) return;
  event.preventDefault();
  toggle();
}

function onKeyDown(event: KeyboardEvent) {
  if (!clickable.value || event.target !== event.currentTarget) return;
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    toggle();
  }
}

provideEllipsis({
  get expanded() {
    return expanded.value;
  },
  toggle,
  textId,
});

const forwardedAttrs = computed(() => omitAttrs(attrs, "class", "style"));
</script>

<template>
  <span
    ref="rootRef"
    data-slot="ellipsis"
    :class="rootClass"
    :style="rootStyle"
    v-bind="forwardedAttrs"
  >
    <Tooltip v-if="hasTooltip" :open="open && truncated" @update:open="handleOpenChange">
      <TooltipTrigger as-child>
        <span
          :id="textId"
          ref="textRef"
          data-slot="ellipsis-text"
          :data-truncated="truncated ? '' : undefined"
          :class="cn(textClass, clickable && 'cursor-pointer')"
          :role="clickable ? 'button' : undefined"
          :tabindex="clickable ? 0 : undefined"
          :aria-expanded="clickable ? expanded : undefined"
          @click="onClick"
          @keydown="onKeyDown"
        >
          <span
            v-if="multiline && hasAfter"
            aria-hidden="true"
            data-slot="ellipsis-spacer"
            :data-hidden="afterHidden ? '' : undefined"
            :class="spacerClass"
          />
          <span
            v-if="multiline && hasAfter"
            ref="afterRef"
            data-slot="ellipsis-after"
            :data-hidden="afterHidden ? '' : undefined"
            :inert="afterHidden || undefined"
            :class="afterClass"
            @pointerenter="closeTooltip"
          >
            <slot name="after" :truncated="truncated" :expanded="expanded" :toggle="toggle" />
          </span>
          <span ref="contentRef" data-slot="ellipsis-content" :class="contentClass">
            <slot />
          </span>
        </span>
      </TooltipTrigger>
      <TooltipContent>
        <slot v-if="tooltip === true" />
        <template v-else>{{ tooltip }}</template>
      </TooltipContent>
    </Tooltip>
    <span
      v-else
      :id="textId"
      ref="textRef"
      data-slot="ellipsis-text"
      :data-truncated="truncated ? '' : undefined"
      :class="textClass"
      @click="onClick"
      @keydown="onKeyDown"
    >
      <span
        v-if="multiline && hasAfter"
        aria-hidden="true"
        data-slot="ellipsis-spacer"
        :data-hidden="afterHidden ? '' : undefined"
        :class="spacerClass"
      />
      <span
        v-if="multiline && hasAfter"
        ref="afterRef"
        data-slot="ellipsis-after"
        :data-hidden="afterHidden ? '' : undefined"
        :inert="afterHidden || undefined"
        :class="afterClass"
        @pointerenter="closeTooltip"
      >
        <slot name="after" :truncated="truncated" :expanded="expanded" :toggle="toggle" />
      </span>
      <span ref="contentRef" data-slot="ellipsis-content" :class="contentClass">
        <slot />
      </span>
    </span>
    <span
      v-if="!multiline && hasAfter"
      ref="afterRef"
      data-slot="ellipsis-after"
      :data-hidden="afterHidden ? '' : undefined"
      :inert="afterHidden || undefined"
      :class="afterClass"
      @pointerenter="closeTooltip"
    >
      <slot name="after" :truncated="truncated" :expanded="expanded" :toggle="toggle" />
    </span>
  </span>
</template>
