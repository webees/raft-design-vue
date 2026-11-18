import { defineComponent } from "vue";

/**
 * Deprecated upstream: a setting that saves itself says nothing while saving.
 * Kept as a named export so call sites can drop the component without changing
 * their layout.
 */
export const SaveStatusSaved = defineComponent({
  name: "RaftSaveStatusSaved",
  setup: () => () => null,
});
