<script setup lang="ts">
import { cn } from "../../lib/cn";
import { STEPS_KEY } from "./context";
import type { StepStatus } from ".";

defineOptions({ name: "RaftStep", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    title?: string;
    description?: string;
    status?: StepStatus;
    icon?: unknown;
    disabled?: boolean;
    index?: number;
    class?: string;
  }>(),
  {
    title: undefined,
    description: undefined,
    status: undefined,
    icon: undefined,
    disabled: false,
    index: 0,
  },
);

const attrs = useAttrs();
const slots = useSlots();
const steps = inject(STEPS_KEY, {
  current: undefined,
  status: "process" as StepStatus,
  finishIcon: undefined,
  errorIcon: undefined,
  finishLabel: "Completed",
  errorLabel: "Failed",
  select: undefined,
});

const descriptionId = useId();
const index = computed(() => props.index);

const status = computed<StepStatus>(() => {
  if (props.status) return props.status;
  if (steps.current === undefined) return "process";
  if (index.value < steps.current) return "finish";
  if (index.value > steps.current) return "wait";
  return steps.status;
});

const isCurrent = computed(() => steps.current !== undefined && index.value === steps.current);
const clickable = computed(() => steps.select !== undefined && !props.disabled);
const body = computed(() => slots.default?.() ?? props.description);

const rootClass = computed(() =>
  cn(
    "r-step",
    `r-step--${status.value}`,
    clickable.value && "r-step--clickable",
    props.disabled && "r-step--disabled",
    props.class,
  ),
);

const handleClick = () => steps.select?.(index.value);

const resolveIcon = (icon: unknown) =>
  typeof icon === "function" ? (icon as () => unknown)() : icon;
</script>

<template>
  <li
    v-bind="{ ...attrs, class: undefined }"
    data-slot="step"
    :aria-current="isCurrent ? 'step' : undefined"
    :class="rootClass"
  >
    <div data-slot="step-main" class="r-step__main">
      <div aria-hidden="true" data-slot="step-indicator" class="r-step__indicator">
        <template v-if="status === 'finish'">
          <component :is="() => resolveIcon(steps.finishIcon)" v-if="steps.finishIcon" />
          <svg v-else aria-hidden="true" fill="none" viewBox="0 0 16 16">
            <path
              d="M3.5 8.5l3 3 6-7"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            />
          </svg>
        </template>
        <template v-else-if="status === 'error'">
          <component :is="() => resolveIcon(steps.errorIcon)" v-if="steps.errorIcon" />
          <svg v-else aria-hidden="true" fill="none" viewBox="0 0 16 16">
            <path
              d="M4.5 4.5l7 7M11.5 4.5l-7 7"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-width="2"
            />
          </svg>
        </template>
        <template v-else>
          <slot name="icon">
            <component :is="() => resolveIcon(icon)" v-if="icon" />
            <span v-else data-slot="step-index" class="r-step__index">{{ index }}</span>
          </slot>
        </template>
      </div>
      <div data-slot="step-content" class="r-step__content">
        <div v-if="steps.select === undefined" data-slot="step-title" class="r-step__title">
          <slot name="title">{{ title }}</slot>
          <span v-if="status === 'finish'" data-slot="step-status" class="r-step__status">{{
            " " + steps.finishLabel
          }}</span>
          <span v-else-if="status === 'error'" data-slot="step-status" class="r-step__status">{{
            " " + steps.errorLabel
          }}</span>
        </div>
        <button
          v-else
          type="button"
          data-slot="step-title"
          :aria-describedby="body == null ? undefined : descriptionId"
          class="r-step__title r-step__button"
          :disabled="disabled"
          @click="handleClick"
        >
          <slot name="title">{{ title }}</slot>
          <span v-if="status === 'finish'" data-slot="step-status" class="r-step__status">{{
            " " + steps.finishLabel
          }}</span>
          <span v-else-if="status === 'error'" data-slot="step-status" class="r-step__status">{{
            " " + steps.errorLabel
          }}</span>
        </button>
        <div
          v-if="body != null"
          data-slot="step-description"
          class="r-step__description"
          :id="descriptionId"
        >
          <slot>{{ description }}</slot>
        </div>
      </div>
    </div>
    <div aria-hidden="true" data-slot="step-connector" class="r-step__connector" />
  </li>
</template>
