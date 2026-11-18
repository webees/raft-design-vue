<script setup lang="ts">
import { Primitive } from "reka-ui";
import { Spinner } from "../spinner";
import {
  buttonVariants,
  FRAMELESS_VARIANTS,
  ICON_SIZES,
  type ButtonSize,
  type ButtonVariant,
} from "./button.variants";

defineOptions({ name: "RaftButton", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    variant?: ButtonVariant;
    size?: ButtonSize;
    loading?: boolean;
    loadingLabel?: string;
    disabled?: boolean;
    focusableWhenDisabled?: boolean;
    as?: string;
    asChild?: boolean;
  }>(),
  {
    variant: "default",
    size: "md",
    loading: false,
    loadingLabel: "Loading",
    disabled: false,
    focusableWhenDisabled: false,
    as: "button",
    asChild: false,
  },
);

const attrs = useAttrs();

const isNativeDisabled = computed(() => props.disabled);
const isAriaDisabled = computed(
  () => props.loading || (props.disabled && props.focusableWhenDisabled),
);
const buttonType = computed(() =>
  props.as === "button" ? ((attrs.type as string | undefined) ?? "button") : undefined,
);

const styles = computed(() => buttonVariants({ variant: props.variant, size: props.size }));
const rootClass = computed(() => styles.value.root({ className: attrs.class as string }));
const contentClass = computed(() => styles.value.content());
const loadingClass = computed(() => styles.value.loadingIndicator());

const hasIconInset = computed(
  () => FRAMELESS_VARIANTS.has(props.variant) && ICON_SIZES.has(props.size),
);

function onClick(event: MouseEvent) {
  if (props.loading || (props.disabled && props.focusableWhenDisabled)) {
    event.preventDefault();
    event.stopImmediatePropagation();
    return;
  }
  (attrs.onClick as ((event: MouseEvent) => void) | undefined)?.(event);
}
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    v-bind="{ ...attrs, class: undefined, onClick: undefined }"
    :class="rootClass"
    :data-slot="(attrs['data-slot'] as string | undefined) ?? 'button'"
    :data-icon-inset="hasIconInset ? '' : undefined"
    :data-loading="loading ? 'true' : undefined"
    :disabled="isNativeDisabled"
    :type="buttonType"
    :aria-disabled="isAriaDisabled ? 'true' : undefined"
    :data-focusable-when-disabled="focusableWhenDisabled && disabled ? '' : undefined"
    @click="onClick"
  >
    <span v-if="loading" data-slot="button-loading-indicator" :class="loadingClass">
      <Spinner :aria-label="loadingLabel" />
    </span>
    <span
      data-slot="button-content"
      :data-loading="loading ? 'true' : undefined"
      :class="contentClass"
    >
      <slot />
    </span>
  </Primitive>
</template>
