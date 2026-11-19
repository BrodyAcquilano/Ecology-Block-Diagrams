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
import { TemperatureSignal } from "../components/Notes/notes/TemperatureSignal";
import { Thermostat } from "../components/Notes/notes/Thermostat";
import { ThermodynamicFilter } from "../components/Notes/notes/ThermodynamicFilter";
import {
  HeatSourceSymbol,
  ThermodynamicFilterSymbol,
  ThermostatSymbol,
} from "../Symbols";

const GROUPS = [
  {
    title: "Controls",
    items: [{ name: "Thermostat", symbol: ThermostatSymbol }],
  },
  {
    title: "Environmental signal generators",
    items: [
      { name: "Heat Source", symbol: HeatSourceSymbol },
    ],
  },
  {
    title: "Transforms",
    items: [{ name: "Thermodynamic filter", symbol: ThermodynamicFilterSymbol }],
  },
];

// The selected component is held in App, so it is remembered
// when switching to another tab and back.
export function Components({ active, setActive }) {
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
                <c.symbol size={26} />
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
