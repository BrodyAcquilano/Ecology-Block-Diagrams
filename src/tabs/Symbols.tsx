// Symbols tab
// Symbol on the left, definition on the right.
// The picture shows how the symbol looks: a circle with the
// symbol drawn inside it, drawn the same way as in the Muse space.
// Sorted into Operators and Signals.
import type { ReactNode } from "react";
import symbols from "../data/symbols.json";

const INK = "#e8e8e8";

function Glyph({ circle = true, children }: { circle?: boolean; children: ReactNode }) {
  return (
    <svg viewBox="0 0 64 64" width="64" height="64" aria-hidden="true">
      {circle && (
        <circle cx="32" cy="32" r="29" fill="none" stroke={INK} strokeWidth="2" />
      )}
      <g fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {children}
      </g>
    </svg>
  );
}

const GLYPHS: Record<string, ReactNode> = {
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
};

// The envelope converter is the dashed diamond itself, not a circle.
const NO_CIRCLE: Record<string, boolean> = { envelope: true };
const ENVELOPE_PATH =
  "M32 6 Q 40 24, 58 32 Q 40 40, 32 58 Q 24 40, 6 32 Q 24 24, 32 6 Z";

type Sym = {
  kind: string;
  name: string;
  definition: string;
  group: string;
  sortOrder: number;
};

const GROUPS: { key: string; title: string }[] = [
  { key: "operator", title: "Operators" },
  { key: "signal", title: "Signals" },
];

export function Symbols() {
  const ordered = [...(symbols as unknown as Sym[])].sort(
    (a, b) => a.sortOrder - b.sortOrder
  );
  return (
    <div>
      {GROUPS.map((g) => (
        <div key={g.key}>
          <div className="symbol-group-title">{g.title}</div>
          <div className="symbol-list">
            {ordered
              .filter((s) => s.group === g.key)
              .map((s) => (
                <div className="symbol-row" key={s.kind}>
                  <div className="symbol-glyph">
                    <Glyph circle={!NO_CIRCLE[s.kind]}>
                      {s.kind === "envelope" ? (
                        <path d={ENVELOPE_PATH} strokeDasharray="4 3" />
                      ) : (
                        GLYPHS[s.kind] ?? null
                      )}
                    </Glyph>
                  </div>
                  <div>
                    <div className="symbol-name">{s.name}</div>
                    <div className="symbol-def">{s.definition}</div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
