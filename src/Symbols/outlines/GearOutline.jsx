// Gear outline (8 teeth) — controls.
// Drawn inside a symbol's 64 x 64 SVG.
const INK = "#e8e8e8";

const GEAR_PATH =
  "M55.7 28.2 L61.6 27.3 L61.6 36.7 L55.7 35.8 L51.4 46.1 L56.3 49.6 L49.6 56.3 L46.1 51.4 L35.8 55.7 L36.7 61.6 L27.3 61.6 L28.2 55.7 L17.9 51.4 L14.4 56.3 L7.7 49.6 L12.6 46.1 L8.3 35.8 L2.4 36.7 L2.4 27.3 L8.3 28.2 L12.6 17.9 L7.7 14.4 L14.4 7.7 L17.9 12.6 L28.2 8.3 L27.3 2.4 L36.7 2.4 L35.8 8.3 L46.1 12.6 L49.6 7.7 L56.3 14.4 L51.4 17.9 Z";

export function GearOutline() {
  return <path d={GEAR_PATH} fill="none" stroke={INK} strokeWidth="2" strokeLinejoin="round" />;
}
