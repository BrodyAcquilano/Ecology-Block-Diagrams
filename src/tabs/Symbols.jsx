// Symbols tab
// Symbol on the left, definition on the right.
// The outline of the picture says what kind of thing it is:
// a white circle for normal signals and operators, a white
// diamond for environmental signal generators, a white
// square for transforms, a gear for controls.
// Inside lines: white for operators,
// red for transforms and thermodynamic signals.
// Order: Controls first (they are the inputs), then
// Environmental signal generators, then Transforms, Operators last.
import symbols from "../data/symbols.json";
import { SymbolGlyph } from "../components/SymbolGlyph";

const GROUPS = [
  { key: "control", title: "Controls" },
  { key: "environmental", title: "Environmental signal generators" },
  { key: "transform", title: "Transforms" },
  { key: "operator", title: "Operators" },
];

export function Symbols() {
  const ordered = [...symbols].sort(
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
                    <SymbolGlyph kind={s.kind} />
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
