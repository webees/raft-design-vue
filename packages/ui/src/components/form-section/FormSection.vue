<script setup lang="ts">
import { cn } from "../../lib/cn";
import Badge from "../badge/Badge.vue";
import { formSection } from "./form-section.variants";

defineOptions({ name: "RaftFormSection", inheritAttrs: false });

const props = defineProps<{
  title?: string;
  status?: string;
  description?: string;
  class?: string;
}>();

const attrs = useAttrs();
const slots = formSection();

const rootClass = computed(() => cn(slots.root(), props.class, attrs.class as string));
</script>

<template>
  <section data-slot="form-section" :class="rootClass">
    <div data-slot="form-section-head" :class="slots.head()">
      <div :class="slots.titleRow()">
        <h3 data-slot="form-section-title" :class="slots.title()">
          <slot name="title">{{ title }}</slot>
        </h3>
        <Badge
          v-if="status || $slots.status"
          appearance="soft"
          variant="muted"
          class="shrink-0"
          data-slot="form-section-status"
        >
          <slot name="status">{{ status }}</slot>
        </Badge>
      </div>
      <p
        v-if="description || $slots.description"
        data-slot="form-section-description"
        :class="slots.description()"
      >
        <slot name="description">{{ description }}</slot>
      </p>
    </div>
    <slot />
  </section>
</template>
