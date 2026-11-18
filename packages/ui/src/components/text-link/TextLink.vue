<script setup lang="ts">
import { Primitive } from "reka-ui";
import { cn } from "../../lib/cn";
import { toElement } from "../../lib/dom";
import { textLinkVariants, type TextLinkVariant } from "./text-link.variants";

defineOptions({ name: "RaftTextLink", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    variant?: TextLinkVariant;
    nativeButton?: boolean;
    disabled?: boolean;
    as?: string;
    asChild?: boolean;
  }>(),
  { nativeButton: true },
);

const attrs = useAttrs();
const rootRef = ref<HTMLElement | null>(null);
const disabled = computed(() => props.disabled === true || attrs["aria-disabled"] === "true");
const rootClass = computed(() =>
  cn(
    textLinkVariants({
      variant: props.variant,
      inline: props.nativeButton ? undefined : true,
    }),
    attrs.class as string,
  ),
);

function activate(event: KeyboardEvent) {
  if (disabled.value) return;
  if (event.key !== "Enter" && event.key !== " ") return;
  event.preventDefault();
  (event.currentTarget as HTMLElement).click();
}

function setRootRef(element: unknown) {
  rootRef.value = toElement(element);
}

onMounted(() => {
  if (props.nativeButton) return;
  rootRef.value?.addEventListener("keydown", activate);
});

onBeforeUnmount(() => {
  rootRef.value?.removeEventListener("keydown", activate);
});
</script>

<template>
  <Primitive
    :ref="setRootRef"
    :as="as ?? (nativeButton ? 'button' : 'span')"
    :as-child="asChild"
    v-bind="{ ...attrs, class: undefined }"
    :type="nativeButton && !asChild ? 'button' : undefined"
    :disabled="nativeButton && disabled ? true : undefined"
    :role="nativeButton ? undefined : 'button'"
    :tabindex="nativeButton || disabled ? undefined : 0"
    :aria-disabled="!nativeButton && disabled ? 'true' : undefined"
    :class="rootClass"
    data-slot="text-link"
  >
    <slot />
  </Primitive>
</template>
