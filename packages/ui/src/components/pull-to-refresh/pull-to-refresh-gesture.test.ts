import { describe, expect, it } from "vitest";

import {
  DEFAULT_PULL_GESTURE_CONFIG,
  IDLE_PULL_GESTURE,
  PULL_TO_REFRESH_DAMPING,
  PULL_TO_REFRESH_HOLD_DISTANCE,
  PULL_TO_REFRESH_MAX_DISTANCE,
  PULL_TO_REFRESH_SNAP_BACK_MS,
  PULL_TO_REFRESH_THRESHOLD,
  pullDistance,
  pullProgress,
  pullState,
  pullStep,
  stepPullGesture,
  type PullGesture,
  type PullGestureEvent,
} from "./pull-to-refresh-gesture";

const start = (y = 100, extra: Record<string, unknown> = {}): PullGestureEvent =>
  ({
    type: "start",
    x: 50,
    y,
    fingers: 1,
    atTop: true,
    ignored: false,
    ...extra,
  }) as PullGestureEvent;
const move = (y: number, extra: Record<string, unknown> = {}): PullGestureEvent =>
  ({ type: "move", x: 50, y, fingers: 1, atTop: true, ...extra }) as PullGestureEvent;

const ANDROID = { ...DEFAULT_PULL_GESTURE_CONFIG, latch: false };
const PAST = Math.ceil(PULL_TO_REFRESH_THRESHOLD / PULL_TO_REFRESH_DAMPING) + 1;
const SHORT = Math.floor(PULL_TO_REFRESH_THRESHOLD / PULL_TO_REFRESH_DAMPING) - 2;

function run(
  events: PullGestureEvent[],
  from: PullGesture = IDLE_PULL_GESTURE,
  config = DEFAULT_PULL_GESTURE_CONFIG,
) {
  return events.reduce(
    (acc, event) => {
      const next = stepPullGesture(acc.gesture, event, config);
      return {
        gesture: next.gesture,
        refreshed: acc.refreshed + Number(next.refresh),
        prevented: acc.prevented + Number(next.preventDefault),
        armed: acc.armed + Number(next.armed),
      };
    },
    { gesture: from, refreshed: 0, prevented: 0, armed: 0 },
  );
}

describe("pull-to-refresh tuning", () => {
  it("matches the iOS app", () => {
    expect([
      PULL_TO_REFRESH_THRESHOLD,
      PULL_TO_REFRESH_HOLD_DISTANCE,
      PULL_TO_REFRESH_DAMPING,
      PULL_TO_REFRESH_MAX_DISTANCE,
      PULL_TO_REFRESH_SNAP_BACK_MS,
    ]).toEqual([100, 60, 0.55, 140, 300]);
  });
});

describe("pullDistance / pullProgress / pullStep", () => {
  it("damps travel by 0.55 and caps at the ceiling", () => {
    expect(pullDistance(-20)).toBe(0);
    expect(pullDistance(100)).toBeCloseTo(55);
    expect(pullDistance(181)).toBeLessThan(PULL_TO_REFRESH_THRESHOLD);
    expect(pullDistance(182)).toBeGreaterThanOrEqual(PULL_TO_REFRESH_THRESHOLD);
    expect(pullDistance(1000)).toBe(PULL_TO_REFRESH_MAX_DISTANCE);
  });

  it("maps distance to progress and to the lit-pixel step", () => {
    expect([pullProgress(0), pullProgress(50), pullProgress(100)]).toEqual([0, 0.5, 1]);
    expect([pullStep(0), pullStep(0.3), pullStep(0.6), pullStep(0.8), pullStep(1)]).toEqual([
      0, 1, 2, 3, 3,
    ]);
  });
});

describe("stepPullGesture", () => {
  it("refreshes past the threshold and holds the indicator", () => {
    const { gesture, refreshed } = run([start(), move(100 + PAST), { type: "end" }]);
    expect(refreshed).toBe(1);
    expect([gesture.phase, gesture.distance, pullState(gesture)]).toEqual([
      "refreshing",
      PULL_TO_REFRESH_HOLD_DISTANCE,
      "refreshing",
    ]);
  });

  it("latches on iOS but disarms on Android", () => {
    const ios = run([start(), move(100 + PAST), move(100 + SHORT), move(100 + 20)]);
    expect(ios.gesture.armed).toBe(true);
    expect(run([{ type: "end" }], ios.gesture).refreshed).toBe(1);

    const android = run([start(), move(100 + PAST), move(100 + SHORT)], IDLE_PULL_GESTURE, ANDROID);
    expect(android.gesture.armed).toBe(false);
    expect(run([{ type: "end" }], android.gesture, ANDROID).refreshed).toBe(0);
  });

  it("re-arms on every Android threshold crossing", () => {
    expect(
      run(
        [start(), move(100 + PAST), move(100 + SHORT), move(100 + PAST)],
        IDLE_PULL_GESTURE,
        ANDROID,
      ).armed,
    ).toBe(2);
  });

  it("starts only at the top, with one finger, outside ignored elements", () => {
    for (const extra of [{ atTop: false }, { fingers: 2 }, { ignored: true }]) {
      expect(run([start(100, extra), move(100 + PAST)]).gesture.phase).toBe("idle");
    }
  });

  it("lets the page scroll until the finger passes the slop", () => {
    expect(run([start(), move(104)]).prevented).toBe(0);
    const pulled = run([start(), move(120)]);
    expect([pulled.gesture.phase, pulled.prevented]).toEqual(["pulling", 1]);
  });

  it("ignores sideways and upward moves", () => {
    expect(run([start(), move(103, { x: 80 }), move(100 + PAST)]).gesture.phase).toBe("idle");
    expect(run([start(), move(90), move(100 + PAST)]).gesture.phase).toBe("idle");
  });

  it("cancels on a long press before the pull, not during it", () => {
    expect(run([start(), { type: "hold" }, move(100 + PAST)]).gesture.phase).toBe("idle");
    expect(run([start(), move(100 + PAST), { type: "hold" }, { type: "end" }]).refreshed).toBe(1);
  });

  it("ends the pull when the viewport leaves the top or a finger joins", () => {
    expect(run([start(), move(150), move(160, { atTop: false })]).gesture.phase).toBe("idle");
    expect(run([start(), move(150), move(160, { fingers: 2 })]).gesture.phase).toBe("idle");
  });

  it("drops an armed pull on cancel", () => {
    const { gesture, refreshed } = run([
      start(),
      move(100 + PAST),
      { type: "cancel" },
      { type: "end" },
    ]);
    expect([refreshed, gesture.phase]).toEqual([0, "idle"]);
  });

  it("ignores touches while refreshing until settle", () => {
    const refreshing = run([start(), move(100 + PAST), { type: "end" }]).gesture;
    const again = run([start(), move(100 + PAST), { type: "end" }], refreshing);
    expect([again.refreshed, again.gesture]).toEqual([0, refreshing]);
    expect(run([{ type: "settle" }], refreshing).gesture).toEqual(IDLE_PULL_GESTURE);
  });
});
