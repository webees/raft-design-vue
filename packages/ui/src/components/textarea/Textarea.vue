<script setup lang="ts">
import { computed, useAttrs } from "vue";

import { textarea } from "./textarea.variants";

defineOptions({ name: "RaftTextarea", inheritAttrs: false });
withDefaults(defineProps<{ invalid?: boolean }>(), { invalid: false });
const attrs = useAttrs();

const { root } = textarea();
const rootClass = computed(() => root({ className: attrs.class as string }));
</script>

<template>
  <textarea
    v-bind="{ ...attrs, class: undefined }"
    data-slot="textarea"
    :data-invalid="invalid ? '' : undefined"
    :aria-invalid="invalid ? 'true' : undefined"
    :class="rootClass"
  />
</template>
