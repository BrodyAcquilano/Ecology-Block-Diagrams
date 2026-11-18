// Components tab
// A list of reusable components, grouped the same way as the
// symbols: Controls first (the inputs), then
// Environmental signal generators, then Transforms.
// Operators are not components, so they are not listed here —
// they live in the Symbols tab.
// Gear for controls, diamond for environmental signal
// generators, square for transforms.
// Each entry in the list shows the component's symbol beside
// its name.
import { useState } from "react";
import { TemperatureSignal } from "../components/TemperatureSignal";
import { Thermostat } from "../components/Thermostat";
import { ThermodynamicFilter } from "../components/ThermodynamicFilter";
import { SymbolGlyph } from "../components/SymbolGlyph";

const GROUPS: { title: string; items: { name: string; kind: string }[] }[] = [
  {
    title: "Controls",
    items: [{ name: "Thermostat", kind: "thermostat" }],
  },
  {
    title: "Environmental signal generators",
    items: [
      { name: "Heat Source", kind: "heatsource" },
    ],
  },
  {
    title: "Transforms",
    items: [{ name: "Thermodynamic filter", kind: "transform" }],
  },
];

export function Components() {
  const [active, setActive] = useState("Heat Source");
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
        {active === "Heat Source" && <TemperatureSignal />}
        {active === "Thermostat" && <Thermostat />}
        {active === "Thermodynamic filter" && <ThermodynamicFilter />}
      </div>
    </div>
  );
}
