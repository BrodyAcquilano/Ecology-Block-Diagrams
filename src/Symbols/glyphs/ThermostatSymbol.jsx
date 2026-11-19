// Thermostat — a thermometer inside the gear. A tube with a
// round bulb at the bottom, the mercury line inside it, and
// two ticks beside the tube.
// Self-contained: its picture, its ink, its outline and its
// description all live here.
import { GearOutline } from "../outlines/GearOutline";

const INK = "#e5484d"; // red

export function ThermostatSymbol({ size = 64 }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
      <GearOutline />
      <g fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M29.5 35.5 L29.5 14 A2.5 2.5 0 0 1 34.5 14 L34.5 35.5 A6.5 6.5 0 1 1 29.5 35.5 Z" />
        <line x1="32" y1="22" x2="32" y2="36" />
        <circle cx="32" cy="41.5" r="2.8" />
        <line x1="38.5" y1="20" x2="42" y2="20" />
        <line x1="38.5" y1="27" x2="42" y2="27" />
      </g>
    </svg>
  );
}

Object.assign(ThermostatSymbol, {
  kind: "thermostat",
  label: "Thermostat",
  group: "control",
  sortOrder: 10,
  definition:
    "What it represents is a component: the thermostat. It generates a control signal — the set temperature T_s, dialled in and held constant. The signal is not drawn as a block in a diagram; it is what is measured on the line leaving the thermostat, and everything else in the system chases it. Turn the dial and T_s takes a new value; between turns, it is constant. Function type: constant. It is drawn with a gear around the outside and a thermometer inside, so control components can be told apart at a glance.",
});
