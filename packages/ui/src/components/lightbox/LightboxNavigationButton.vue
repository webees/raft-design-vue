<script setup lang="ts">
import { cn } from "../../lib/cn";
import Button from "../button/Button.vue";
import { lightbox } from "./lightbox.recipe";

defineOptions({ name: "RaftLightboxNavigationButton", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    class?: string;
    direction: "next" | "previous";
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
  }>(),
  { disabled: false, type: "button" },
);

const emit = defineEmits<{ click: [event: MouseEvent] }>();

const attrs = useAttrs();
const sideClass = computed(() => (props.direction === "previous" ? "left-8" : "right-8"));
const classes = computed(() =>
  lightbox().navigationButton({
    class: cn(sideClass.value, attrs.class as string | undefined, props.class),
  }),
);

function handleClick(event: MouseEvent) {
  if (props.disabled) {
    event.preventDefault();
    event.stopPropagation();
    return;
  }
  emit("click", event);
}
</script>

<template>
  <Button
    v-bind="attrs"
    :aria-disabled="props.disabled || undefined"
    :class="classes"
    :data-direction="props.direction"
    :data-disabled="props.disabled ? 'true' : undefined"
    data-slot="lightbox-navigation-button"
    size="icon-lg"
    :type="props.type"
    variant="outline"
    @click="handleClick"
  >
    <slot />
  </Button>
</template>
