// Components tab
// A list of reusable components, grouped the same way as the
// symbols: Signals, Operators and Transforms.
// Operators is empty for now.
import { useState } from "react";
import { Exponential } from "../components/Exponential";
import { ExponentialTransform } from "../components/ExponentialTransform";

const GROUPS: { title: string; items: string[] }[] = [
  { title: "Signals", items: ["Exponential", "Oscillator"] },
  { title: "Operators", items: [] },
  { title: "Transforms", items: ["Exponential transform"] },
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
                key={c}
                className={c === active ? "active" : ""}
                onClick={() => setActive(c)}
              >
                {c}
              </button>
            ))}
          </div>
        ))}
      </div>
      <div className="components-body">
        {active === "Exponential" && <Exponential />}
        {active === "Oscillator" && <p className="empty-note">Empty for now.</p>}
        {active === "Exponential transform" && <ExponentialTransform />}
      </div>
    </div>
  );
}
