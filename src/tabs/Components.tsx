// Components tab
// A list of reusable components. Most are empty for now;
// the Exponential is the first working one.
import { useState } from "react";
import { Exponential } from "../components/Exponential";

const COMPONENTS = ["Exponential", "Oscillator"] as const;

export function Components() {
  const [active, setActive] = useState<(typeof COMPONENTS)[number]>("Exponential");
  return (
    <div className="components-layout">
      <div className="components-list">
        {COMPONENTS.map((c) => (
          <button
            key={c}
            className={c === active ? "active" : ""}
            onClick={() => setActive(c)}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="components-body">
        {active === "Exponential" && <Exponential />}
        {active === "Oscillator" && <p className="empty-note">Empty for now.</p>}
      </div>
    </div>
  );
}
