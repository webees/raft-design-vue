<script setup lang="ts">
import { X } from "lucide-vue-next";
import { cn } from "../../lib/cn";
import Button from "../button/Button.vue";
import { banner } from "./banner.variants";

defineOptions({ name: "RaftBannerClose", inheritAttrs: false });
withDefaults(
  defineProps<{
    label?: string;
  }>(),
  { label: "Dismiss" },
);
const emit = defineEmits<{ click: [event: MouseEvent] }>();
const attrs = useAttrs();
const { close } = banner();
const rootClass = computed(() => cn(close(), attrs.class as string));
</script>

<template>
  <Button
    v-bind="{ ...attrs, class: undefined }"
    type="button"
    variant="ghost"
    size="icon-md"
    :aria-label="label"
    :class="rootClass"
    data-banner-close=""
    @click="emit('click', $event)"
  >
    <slot>
      <X aria-hidden="true" />
    </slot>
  </Button>
</template>
