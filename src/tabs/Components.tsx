// Components tab
// A list of reusable components, grouped the same way as the
// symbols: Signals, Operators and Transforms.
// Operators is empty for now.
// Each entry in the list shows the component's symbol beside
// its name.
import { useState } from "react";
import { Exponential } from "../components/Exponential";
import { ExponentialTransform } from "../components/ExponentialTransform";
import { SymbolGlyph } from "../components/SymbolGlyph";

const GROUPS: { title: string; items: { name: string; kind: string }[] }[] = [
  {
    title: "Signals",
    items: [
      { name: "Exponential", kind: "exponential" },
      { name: "Oscillator", kind: "oscillator" },
    ],
  },
  { title: "Operators", items: [] },
  {
    title: "Transforms",
    items: [{ name: "Thermodynamic filter", kind: "transform" }],
  },
];

export function Components() {
  const [active, setActive] = useState("Exponential");
  return (
    <div className="components-layout">
      <div className="components-list">
        {GROUPS.map((g) => (
          <div key={g.title}>
            <div className="components-group-title">{g.title}</div>
            {g.items.length === 0 && <p className="empty-note">Empty for now.</p>}
            {g.items.map((c) => (
              <button
                key={c.name}
                className={c.name === active ? "active" : ""}
                onClick={() => setActive(c.name)}
              >
                <SymbolGlyph kind={c.kind} size={26} />
                {c.name}
              </button>
            ))}
          </div>
        ))}
      </div>
      <div className="components-body">
        {active === "Exponential" && <Exponential />}
        {active === "Oscillator" && <p className="empty-note">Empty for now.</p>}
        {active === "Thermodynamic filter" && <ExponentialTransform />}
      </div>
    </div>
  );
}
