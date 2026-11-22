<script setup lang="ts">
import Spinner from "../spinner/Spinner.vue";
import { cn } from "../../lib/cn";
import { tv } from "../../lib/tv";
import { pullStep } from "./pull-to-refresh-gesture";
import PullToRefreshMaterialProgress from "./PullToRefreshMaterialProgress.vue";
import type { PullToRefresh } from "./use-pull-to-refresh";

defineOptions({ name: "RaftPullToRefreshIndicator", inheritAttrs: false });

const props = defineProps<{
  pull: PullToRefresh;
  label: string;
  class?: string;
  style?: Record<string, string | number>;
}>();

const attrs = useAttrs();

const indicator = tv({
  slots: {
    root: ["flex w-full shrink-0 justify-center", "text-foreground-muted"],
    surface: ["flex items-center justify-center"],
    spinner: [
      "transition-opacity duration-300 ease-slide motion-reduce:transition-none",
      "in-data-[state=pulling]:transition-none",
      "in-data-[state=pulling]:opacity-(--pull-progress) in-data-[state=idle]:opacity-0",
    ],
    status: ["sr-only"],
  },
  variants: {
    platform: {
      default: {
        root: [
          "relative items-center overflow-hidden",
          "transition-[height] duration-300 ease-slide motion-reduce:transition-none",
          "data-[state=pulling]:transition-none",
        ],
        surface: ["size-full"],
      },
      android: {
        root: ["sticky top-0 z-sticky h-0 overflow-visible"],
        surface: [
          "absolute inset-x-0 top-0 mx-auto size-10 rounded-full bg-layer-popover shadow-float",
          "translate-y-[calc(var(--pull-distance)-100%)]",
          "transition-[translate,opacity,scale] duration-300 ease-slide motion-reduce:transition-none",
          "data-[state=idle]:opacity-0",
          "data-[exit=finish]:scale-0 data-[exit=finish]:duration-150 data-[exit=finish]:ease-out",
        ],
      },
    },
  },
  defaultVariants: { platform: "default" },
});

const android = computed(() => props.pull.platform === "android");
const previous = ref(props.pull.state);
const heldDistance = ref(props.pull.distance);
const exitKind = ref<"cancel" | "finish" | "gone">("cancel");
const exitDistance = ref(0);

watch(
  () => props.pull.state,
  (state, old) => {
    if (state === "refreshing") {
      heldDistance.value = props.pull.distance;
      return;
    }
    if (state === "idle" && old === "refreshing") {
      exitKind.value = "finish";
      exitDistance.value = heldDistance.value;
    } else if (state === "idle") {
      exitKind.value = "cancel";
      exitDistance.value = 0;
    }
    previous.value = state;
  },
);

const finishing = computed(
  () => android.value && props.pull.state === "idle" && exitKind.value !== "cancel",
);
const rootClass = computed(() =>
  cn(indicator({ platform: props.pull.platform }).root({ class: props.class })),
);
const styleVars = computed(() => ({
  ...(props.style ?? {}),
  height: android.value ? undefined : `${props.pull.distance}px`,
  "--pull-progress": props.pull.progress,
  "--pull-distance": `${finishing.value ? exitDistance.value : props.pull.distance}px`,
}));
const displayState = computed(() =>
  finishing.value && exitKind.value === "finish" ? "refreshing" : props.pull.state,
);
</script>

<template>
  <div
    v-bind="attrs"
    data-slot="pull-to-refresh-indicator"
    :data-state="pull.state"
    :data-platform="pull.platform"
    :data-pull-step="!android && pull.state === 'pulling' ? pullStep(pull.progress) : undefined"
    :class="rootClass"
    :style="styleVars"
  >
    <div
      data-slot="pull-to-refresh-surface"
      :data-state="pull.state"
      :data-exit="finishing ? 'finish' : undefined"
      :class="indicator({ platform: pull.platform }).surface()"
      @transitionend="
        (event: TransitionEvent) => {
          if (
            event.target === event.currentTarget &&
            event.propertyName === 'scale' &&
            exitKind === 'finish'
          )
            exitKind = 'gone';
        }
      "
    >
      <PullToRefreshMaterialProgress
        v-if="android"
        :state="displayState"
        :progress="pull.progress"
      />
      <Spinner
        v-else
        aria-hidden="true"
        :class="indicator({ platform: pull.platform }).spinner()"
      />
    </div>
    <span role="status" aria-live="polite" :class="indicator({ platform: pull.platform }).status()">
      {{ pull.state === "refreshing" ? label : "" }}
    </span>
  </div>
</template>
