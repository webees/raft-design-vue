<script setup lang="ts">
import { computed, useAttrs } from "vue";

import Panel from "../panel/Panel.vue";
import { search } from "./search.recipe";

defineOptions({ name: "RaftSearchShellRoot", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    edge?: "attached" | "inset";
    as?: string;
    class?: string;
  }>(),
  { edge: "inset", as: "div" },
);

const attrs = useAttrs();
const classes = computed(() => search().frame({ class: props.class }));
</script>

<template>
  <Panel
    v-bind="attrs"
    :as="as"
    :edge="edge"
    data-slot="search-shell-root"
    :class="classes"
  >
    <slot />
  </Panel>
</template>
