// Symbols tab
// Symbol on the left, definition on the right.
// The picture shows how the symbol looks.
// The definition says what it represents.
import symbols from "../data/symbols.json";

const GLYPHS: Record<string, string> = {
  difference: "−",
  addition: "⊕",
  oscillator: "∿",
  boltzmann: "f(E)",
  medium: "▦",
  envelope: "◇",
  exponential: "e",
  mixer: "⊗",
  attenuation: "α",
  piecewise: "⌐",
  filter: "⧗",
  constant: "—",
};

export function Symbols() {
  const ordered = [...symbols].sort((a, b) => a.sortOrder - b.sortOrder);
  return (
    <div className="symbol-list">
      {ordered.map((s) => (
        <div className="symbol-row" key={s.kind}>
          <div className="symbol-glyph">{GLYPHS[s.kind] ?? "?"}</div>
          <div>
            <div className="symbol-name">{s.name}</div>
            <div className="symbol-def">{s.definition}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
