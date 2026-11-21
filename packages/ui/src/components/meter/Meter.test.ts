import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import Meter from "./Meter.vue";
import MeterHeader from "./MeterHeader.vue";
import { MeterIndicator, MeterLabel, MeterValue } from "./parts";
import MeterTrack from "./MeterTrack.vue";

const Harness = defineComponent({
  components: {
    RaftMeter: Meter,
    MeterHeader,
    MeterLabel,
    MeterValue,
    MeterTrack,
    MeterIndicator,
  },
  props: { used: { type: Number, default: 62 }, valueText: { type: String, default: "62% used" } },
  template: `
    <RaftMeter :used="used" :value-text="valueText" aria-label="Daily usage">
      <MeterHeader>
        <MeterLabel>Daily usage</MeterLabel>
        <MeterValue />
      </MeterHeader>
      <MeterTrack><MeterIndicator /></MeterTrack>
    </RaftMeter>
  `,
});

describe("Meter", () => {
  it("exposes meter semantics and the provider's value text", () => {
    const wrapper = mount(Harness);
    expect(wrapper.attributes("role")).toBe("meter");
    expect(wrapper.attributes("aria-valuenow")).toBe("62");
    expect(wrapper.attributes("aria-valuemax")).toBe("100");
    expect(wrapper.attributes("aria-valuetext")).toBe("62% used");
    expect(wrapper.find("[data-slot='meter-value']").text()).toBe("62% used");
  });

  it("fills the track from the clamped share", () => {
    const wrapper = mount(Harness, { props: { used: 150 } });
    const indicator = wrapper.find("[data-slot='meter-indicator']");
    expect(indicator.attributes("style")).toContain("width: 100%");
    expect(wrapper.attributes("aria-valuenow")).toBe("100");
    expect(wrapper.attributes("data-level")).toBe("full");
  });

  it("takes the warning tone at warnAt", () => {
    const wrapper = mount(Harness, { props: { used: 80 } });
    expect(wrapper.attributes("data-level")).toBe("high");
    expect(wrapper.classes()).toContain("[--meter-indicator:var(--warning)]");
  });
});
