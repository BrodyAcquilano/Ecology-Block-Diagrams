// Symbol glyph — the picture of a symbol: a white circle with
// the symbol drawn inside it. Inside lines are white for
// operators, heat-orange for signals, red for transforms.
import type { ReactNode } from "react";

export const INK = "#e8e8e8";
export const SIGNAL_INK = "#ff8c3a";
export const TRANSFORM_INK = "#e5484d";

export const GLYPHS: Record<string, ReactNode> = {
  // Operators — a short minus in the centre
  difference: <line x1="24" y1="32" x2="40" y2="32" />,
  addition: (
    <>
      <line x1="24" y1="32" x2="40" y2="32" />
      <line x1="32" y1="24" x2="32" y2="40" />
    </>
  ),
  // Medium change — diagonal lines centred in the circle, 3 and 3 perpendicular
  medium: (
    <>
      <line x1="20" y1="20" x2="44" y2="44" />
      <line x1="26.4" y1="13.6" x2="50.4" y2="37.6" />
      <line x1="13.6" y1="26.4" x2="37.6" y2="50.4" />
      <line x1="20" y1="44" x2="44" y2="20" />
      <line x1="26.4" y1="50.4" x2="50.4" y2="26.4" />
      <line x1="13.6" y1="37.6" x2="37.6" y2="13.6" />
    </>
  ),
  // Envelope converter — a dashed diamond with its sides caved in,
  // inside a circle like every other symbol
  envelope: (
    <path
      d="M32 10 Q 39 25, 54 32 Q 39 39, 32 54 Q 25 39, 10 32 Q 25 25, 32 10 Z"
      strokeDasharray="4 3"
    />
  ),
  mixer: (
    <>
      <line x1="23" y1="23" x2="41" y2="41" />
      <line x1="41" y1="23" x2="23" y2="41" />
    </>
  ),
  // Piecewise — line at 2/3 height from the left to the middle,
  // a gap where it drops to 1/3 height, then a line to the right
  piecewise: (
    <>
      <line x1="9" y1="22" x2="32" y2="22" />
      <line x1="32" y1="42" x2="55" y2="42" />
    </>
  ),
  // Steady-state filter — hourglass, drawn big in its circle
  filter: <path d="M19 14 L45 14 L34.5 32 L45 50 L19 50 L29.5 32 Z" />,
  // Signals — one oscillator curve across the whole circle,
  // connected to the circumference at both ends
  oscillator: <path d="M3 32 C 12 4, 22 4, 32 32 C 42 60, 52 60, 61 32" />,
  // Boltzmann — a distribution curve, not letters
  boltzmann: (
    <path d="M10 48 C 16 47, 20 20, 27 16 C 34 12, 37 26, 42 38 C 46 46, 50 48, 54 48" />
  ),
  // Exponential — a curve climbing to the right and levelling off
  exponential: <path d="M10 50 C 24 49, 36 44, 43 33 C 48.5 24.5, 50.5 17, 50.5 11" />,
  // Constant — a line across the whole middle of the circle, through both edges
  constant: <line x1="3" y1="32" x2="61" y2="32" />,
  // Transforms — exponential transform: three wavy radiation lines
  // centred in the circle, gaps between them, not touching the edges
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
  medium: INK,
  envelope: INK,
  mixer: INK,
  piecewise: INK,
  filter: INK,
  oscillator: SIGNAL_INK,
  boltzmann: SIGNAL_INK,
  exponential: SIGNAL_INK,
  constant: SIGNAL_INK,
  transform: TRANSFORM_INK,
};

export function SymbolGlyph({ kind, size = 64 }: { kind: string; size?: number }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
      <circle cx="32" cy="32" r="29" fill="none" stroke={INK} strokeWidth="2" />
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
