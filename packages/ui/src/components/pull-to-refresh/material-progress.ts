export const MATERIAL_ARC_RADIUS = 7.5;
export const MATERIAL_STROKE_WIDTH = 2.5;
export const MATERIAL_MAX_ARC = 0.8;
export const MATERIAL_DISARMED_OPACITY = 0.3;

export const MATERIAL_CENTER = 20;
export const MATERIAL_CIRCUMFERENCE = 2 * Math.PI * MATERIAL_ARC_RADIUS;

const ARROW_WIDTH = 10;
const ARROW_HEIGHT = 5;

export type MaterialArc = {
  startAngle: number;
  endAngle: number;
  arrowScale: number;
};

export function materialArc(progress: number): MaterialArc {
  const adjusted = (Math.max(Math.min(1, progress) - 0.4, 0) * 5) / 3;
  const rotation = (-0.25 + 0.4 * adjusted) * 0.5;
  return {
    startAngle: rotation * 360,
    endAngle: (rotation + adjusted * MATERIAL_MAX_ARC) * 360,
    arrowScale: Math.min(1, adjusted),
  };
}

const point = (degrees: number) => {
  const radians = (degrees * Math.PI) / 180;
  return `${MATERIAL_CENTER + MATERIAL_ARC_RADIUS * Math.cos(radians)} ${MATERIAL_CENTER + MATERIAL_ARC_RADIUS * Math.sin(radians)}`;
};

export function materialArcPath({ startAngle, endAngle }: MaterialArc): string {
  const sweep = endAngle - startAngle;
  if (sweep <= 0.01) return "";
  const large = sweep > 180 ? 1 : 0;
  return `M ${point(startAngle)} A ${MATERIAL_ARC_RADIUS} ${MATERIAL_ARC_RADIUS} 0 ${large} 1 ${point(endAngle)}`;
}

export function materialArrowPoints(scale: number): string {
  const half = (ARROW_WIDTH * scale) / 2;
  const base = MATERIAL_CENTER - MATERIAL_STROKE_WIDTH;
  const x = MATERIAL_CENTER + MATERIAL_ARC_RADIUS;
  return `${x - half},${base} ${x + half},${base} ${x},${base + ARROW_HEIGHT * scale}`;
}

export const MATERIAL_PROGRESS_STYLE = `
@keyframes raft-ptr-material-rotate {
  to { transform: rotate(360deg); }
}

@keyframes raft-ptr-material-dash {
  0% { stroke-dasharray: 0.4 ${MATERIAL_CIRCUMFERENCE}; stroke-dashoffset: 0; }
  50% { stroke-dasharray: ${MATERIAL_CIRCUMFERENCE * 0.7} ${MATERIAL_CIRCUMFERENCE}; stroke-dashoffset: ${-MATERIAL_CIRCUMFERENCE * 0.1}; }
  100% { stroke-dasharray: ${MATERIAL_CIRCUMFERENCE * 0.7} ${MATERIAL_CIRCUMFERENCE}; stroke-dashoffset: ${-MATERIAL_CIRCUMFERENCE * 0.99}; }
}

[data-slot="pull-to-refresh-material-progress"][data-state="refreshing"] {
  animation: raft-ptr-material-rotate 1.4s linear infinite;
}

[data-slot="pull-to-refresh-material-progress"][data-state="refreshing"] [data-material-indeterminate] {
  animation: raft-ptr-material-dash 1.4s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  [data-slot="pull-to-refresh-material-progress"][data-state="refreshing"],
  [data-slot="pull-to-refresh-material-progress"][data-state="refreshing"] [data-material-indeterminate] {
    animation: none;
  }

  [data-slot="pull-to-refresh-material-progress"][data-state="refreshing"] [data-material-indeterminate] {
    stroke-dasharray: ${MATERIAL_CIRCUMFERENCE * 0.75} ${MATERIAL_CIRCUMFERENCE};
  }
}
`;
