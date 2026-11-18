<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { Input } from "../input";
import { useFieldContext } from "./field-context";

defineOptions({ name: "RaftFieldControl", inheritAttrs: false });
const attrs = useAttrs();
const context = useFieldContext();

const describedBy = computed(() => (context?.invalid ? context.errorId : context?.descriptionId));
</script>

<template>
  <Input
    v-bind="{ ...attrs }"
    :id="context?.controlId"
    :disabled="context?.disabled || undefined"
    :invalid="context?.invalid"
    :aria-describedby="describedBy"
    data-slot="field-control"
  />
</template>
