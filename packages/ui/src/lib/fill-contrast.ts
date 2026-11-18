const FILL_RING_CONTRAST = 1.5;

export type Rgb = [number, number, number];

export function parseHexColor(value: string): Rgb | null {
  const match = /^#([0-9a-f]{6})$/i.exec(value.trim());
  if (!match) return null;
  const hex = match[1]!;
  return [
    Number.parseInt(hex.slice(0, 2), 16) / 255,
    Number.parseInt(hex.slice(2, 4), 16) / 255,
    Number.parseInt(hex.slice(4, 6), 16) / 255,
  ];
}

function oklchToLinearSrgb(lightness: number, chroma: number, hue: number): Rgb {
  const h = (hue * Math.PI) / 180;
  const a = chroma * Math.cos(h);
  const b = chroma * Math.sin(h);

  const l = (lightness + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (lightness - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (lightness - 0.0894841775 * a - 1.291485548 * b) ** 3;

  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ];
}

function linearToSrgb(value: number): number {
  return value <= 0.0031308 ? 12.92 * value : 1.055 * value ** (1 / 2.4) - 0.055;
}

export function oklchToRgb(lightness: number, chroma: number, hue: number): Rgb {
  return oklchToLinearSrgb(lightness, chroma, hue).map((channel) =>
    Math.min(1, Math.max(0, linearToSrgb(channel))),
  ) as Rgb;
}

function luminance([red, green, blue]: Rgb): number {
  const channel = (value: number) =>
    value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  return 0.2126 * channel(red) + 0.7152 * channel(green) + 0.0722 * channel(blue);
}

function contrastRatio(a: Rgb, b: Rgb): number {
  const [high, low] = [luminance(a), luminance(b)].sort((x, y) => y - x) as [number, number];
  return (high + 0.05) / (low + 0.05);
}

export function fillOnSurface(fill: Rgb, surface: Rgb): { text: "black" | "white"; ring: boolean } {
  const black: Rgb = [0, 0, 0];
  const white: Rgb = [1, 1, 1];
  const onBlack = contrastRatio(black, fill);
  const onWhite = contrastRatio(white, fill);
  return {
    text: onBlack >= onWhite ? "black" : "white",
    ring: contrastRatio(fill, surface) < FILL_RING_CONTRAST,
  };
}
