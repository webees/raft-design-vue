<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { Primitive } from "reka-ui";
import { cn } from "../../lib/cn";
import { banner, type BannerSize, type BannerStatus } from "./banner.variants";

defineOptions({ name: "RaftBanner", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    size?: BannerSize;
    status?: BannerStatus;
    as?: string;
    asChild?: boolean;
  }>(),
  { size: "md", status: "default" },
);

const emit = defineEmits<{ close: [] }>();
const attrs = useAttrs();
const rootClass = computed(() =>
  cn(banner({ size: props.size, status: props.status }).root(), attrs.class as string),
);
const role = computed(() => (props.status === "destructive" ? "alert" : "status"));

function emitClose() {
  emit("close");
}
</script>

<template>
  <Primitive
    :as="as ?? 'div'"
    :as-child="asChild"
    v-bind="{ ...attrs, class: undefined }"
    :class="rootClass"
    :data-size="size"
    :data-status="status"
    :role="role"
    data-slot="banner"
  >
    <slot :close="emitClose" />
  </Primitive>
</template>
