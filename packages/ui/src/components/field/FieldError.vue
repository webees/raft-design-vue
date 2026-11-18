<script setup lang="ts">
import { fieldVariants } from "./field.variants";
import { useFieldContext } from "./field-context";

defineOptions({ name: "RaftFieldError", inheritAttrs: false });
withDefaults(defineProps<{ role?: "alert" | "status"; forceShow?: boolean }>(), {
  role: "alert",
  forceShow: false,
});
const attrs = useAttrs();
const context = useFieldContext();
const rootClass = computed(() => fieldVariants().error({ className: attrs.class as string }));
</script>

<template>
  <div
    v-if="context?.invalid || forceShow"
    v-bind="{ ...attrs, class: undefined }"
    data-slot="field-error"
    :id="context?.errorId"
    :role="role"
    :class="rootClass"
  >
    <slot />
  </div>
</template>
