import { defineComponent, type PropType, type VNodeChild } from "vue";

export default defineComponent({
  name: "RaftToastNode",
  props: {
    node: {
      type: [String, Number, Object, Array] as PropType<VNodeChild>,
      default: undefined,
    },
  },
  setup(props) {
    return () => props.node as VNodeChild;
  },
});
