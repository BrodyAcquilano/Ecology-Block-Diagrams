// Symbol glyph — the picture of a symbol, drawn inside an
// outline that says what kind of thing it is:
// a white circle for normal signals and operators,
// a white diamond for environmental signal generators,
// a white square for transforms, a gear for controls.
// Inside lines are white for operators, red for transforms
// and thermodynamic signals.
import type { ReactNode } from "react";

export const INK = "#e8e8e8";
export const SIGNAL_INK = "#ff8c3a";
export const TRANSFORM_INK = "#e5484d";

// Gear outline (8 teeth) for control signals.
export const GEAR_PATH =
  "M55.7 28.2 L61.6 27.3 L61.6 36.7 L55.7 35.8 L51.4 46.1 L56.3 49.6 L49.6 56.3 L46.1 51.4 L35.8 55.7 L36.7 61.6 L27.3 61.6 L28.2 55.7 L17.9 51.4 L14.4 56.3 L7.7 49.6 L12.6 46.1 L8.3 35.8 L2.4 36.7 L2.4 27.3 L8.3 28.2 L12.6 17.9 L7.7 14.4 L14.4 7.7 L17.9 12.6 L28.2 8.3 L27.3 2.4 L36.7 2.4 L35.8 8.3 L46.1 12.6 L49.6 7.7 L56.3 14.4 L51.4 17.9 Z";

export const GLYPHS: Record<string, ReactNode> = {
  // Operators — a short minus in the centre
  difference: <line x1="24" y1="32" x2="40" y2="32" />,
  addition: (
    <>
      <line x1="24" y1="32" x2="40" y2="32" />
      <line x1="32" y1="24" x2="32" y2="40" />
    </>
  ),
  mixer: (
    <>
      <line x1="23" y1="23" x2="41" y2="41" />
      <line x1="41" y1="23" x2="23" y2="41" />
    </>
  ),
  // Heat Source — a flame: the heat source component's symbol
  heatsource: (
    <>
      <path d="M32 8 C36 16, 44 22, 44 36 A12 12 0 1 1 20 36 C20 28, 24 24, 27 19 C28 23, 30 25, 32 26 C31 20, 31 14, 32 8 Z" />
      <path d="M32 30 C34 34, 37 36, 37 40 A5 5 0 1 1 27 40 C27 36, 30 34, 32 30 Z" />
    </>
  ),
  // Control signals — thermostat: a dial. Tick lines in an arc
  // across the top, a small circle in the middle, a needle line.
  thermostat: (
    <>
      <line x1="17.9" y1="26.9" x2="14.1" y2="25.5" />
      <line x1="23.4" y1="19.7" x2="21.1" y2="16.4" />
      <line x1="32" y1="17" x2="32" y2="13" />
      <line x1="40.6" y1="19.7" x2="42.9" y2="16.4" />
      <line x1="46.1" y1="26.9" x2="49.9" y2="25.5" />
      <circle cx="32" cy="32" r="4.5" />
      <line x1="32" y1="32" x2="38.3" y2="23" />
    </>
  ),
  // Transforms — thermodynamic filter: three wavy radiation lines
  // centred in the square, gaps between them, not touching the edges
  transform: (
    <>
      <path d="M16 22 q 4 -5, 8 0 t 8 0 t 8 0 t 8 0" />
      <path d="M16 32 q 4 -5, 8 0 t 8 0 t 8 0 t 8 0" />
      <path d="M16 42 q 4 -5, 8 0 t 8 0 t 8 0 t 8 0" />
    </>
  ),
};

export const GLYPH_INK: Record<string, string> = {
  difference: INK,
  addition: INK,
  mixer: INK,
  heatsource: TRANSFORM_INK,
  thermostat: TRANSFORM_INK,
  transform: TRANSFORM_INK,
};

// The outline shape says the kind: circle for normal signals
// and operators, diamond for environmental signal generators,
// square for transforms, gear for controls.
export const GLYPH_SHAPE: Record<string, "circle" | "diamond" | "square" | "gear"> = {
  heatsource: "diamond",
  transform: "square",
  thermostat: "gear",
};

export function SymbolGlyph({ kind, size = 64 }: { kind: string; size?: number }) {
  const shape = GLYPH_SHAPE[kind] ?? "circle";
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
      {shape === "circle" && (
        <circle cx="32" cy="32" r="29" fill="none" stroke={INK} strokeWidth="2" />
      )}
      {shape === "diamond" && (
        <polygon points="32,3 61,32 32,61 3,32" fill="none" stroke={INK} strokeWidth="2" />
      )}
      {shape === "square" && (
        <rect x="5" y="5" width="54" height="54" fill="none" stroke={INK} strokeWidth="2" />
      )}
      {shape === "gear" && (
        <path d={GEAR_PATH} fill="none" stroke={INK} strokeWidth="2" strokeLinejoin="round" />
      )}
      <g
        fill="none"
        stroke={GLYPH_INK[kind] ?? INK}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {GLYPHS[kind] ?? null}
      </g>
    </svg>
  );
}
