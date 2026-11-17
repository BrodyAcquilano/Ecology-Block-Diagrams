// Symbols tab
// Symbol on the left, definition on the right.
// The picture shows how the symbol looks: a circle with the
// symbol drawn inside it, drawn the same way as in the Muse space.
// The outside circle is white for every symbol.
// Inside lines: white for operators, heat-orange for signals,
// red for transforms.
// Sorted into Operators, Signals and Transforms.
import symbols from "../data/symbols.json";
import { SymbolGlyph } from "../components/SymbolGlyph";

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
  { key: "transform", title: "Transforms" },
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
