// Heat Source — a flame inside a diamond: the heat source
// component's symbol.
// Self-contained: its picture, its ink, its outline and its
// description all live here.
import { DiamondOutline } from "../../outlines/DiamondOutline";

const INK = "#e5484d"; // red

export function HeatSourceSymbol({ size = 64 }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
      <DiamondOutline />
      <g fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M32 8 C36 16, 44 22, 44 36 A12 12 0 1 1 20 36 C20 28, 24 24, 27 19 C28 23, 30 25, 32 26 C31 20, 31 14, 32 8 Z" />
        <path d="M32 30 C34 34, 37 36, 37 40 A5 5 0 1 1 27 40 C27 36, 30 34, 32 30 Z" />
      </g>
    </svg>
  );
}

Object.assign(HeatSourceSymbol, {
  kind: "heatsource",
  label: "Heat Source",
  group: "environmental",
  sortOrder: 6,
  definition:
    "What it represents is a component: a heat source, like the terrarium's heating pad. It generates an environmental signal — a temperature signal, or a heat signal, depending on which quantity we track. The signal is not drawn as a block in a diagram; it is what is measured on the lines leaving the component. Its temperature T settles from its previous value T_o toward the set value T_s that drives it, closing at a rate proportional to the gap that remains. The differential equation is Newton's law of cooling, dT/dt = −k(T − T_s) — first-order linear, solved by separation of variables — and its solution is T(t) = T_s + (T_o − T_s)·e^(−kt), where k is a rate constant that depends on the heat source and the medium it is heating — how fast heat is exchanged between them — so it is set with a slider. Function type of the solution: exponential. Whether it climbs or falls is set by the sign of T_o − T_s: if T_o is above T_s it falls, if T_o is below T_s it climbs — heating and cooling are the same signal, closing the gap from opposite sides. Normally heat flows from the heat source to the medium and the medium warms; set the thermostat below the temperature the medium is already at, and the flow reverses — through the feedback loop the medium itself becomes the heat source, and it cools.",
});
