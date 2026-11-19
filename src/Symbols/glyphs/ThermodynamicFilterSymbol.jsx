// Thermodynamic filter — three wavy radiation lines centred in
// the square, gaps between them, not touching the edges.
// Self-contained: its picture, its ink, its outline and its
// description all live here.
import { SquareOutline } from "../outlines/SquareOutline";

const INK = "#e5484d"; // red

export function ThermodynamicFilterSymbol({ size = 64 }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
      <SquareOutline />
      <g fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 22 q 4 -5, 8 0 t 8 0 t 8 0 t 8 0" />
        <path d="M16 32 q 4 -5, 8 0 t 8 0 t 8 0 t 8 0" />
        <path d="M16 42 q 4 -5, 8 0 t 8 0 t 8 0 t 8 0" />
      </g>
    </svg>
  );
}

Object.assign(ThermodynamicFilterSymbol, {
  kind: "transform",
  label: "Thermodynamic filter",
  group: "transform",
  sortOrder: 11,
  definition:
    "What it represents is a component: a filter. It generates a transform — temperature falling off with distance: a temperature that is constant in time at every point, but whose value falls exponentially as position x grows — the attenuation of heat as it travels through a medium. The signal it generates is the attenuation itself: α(x) = e^(−cx), the factor a temperature signal is reduced by after travelling the distance x. Its value at position x is set by three numbers: the temperature at x = 0, the end temperature it falls toward as x grows, and the cutoff rate, which sets how fast the fall happens — a large cutoff rate spends the heat quickly, a small one lets it reach far. The equation along x, dT/dx = −c(T − T_end), is first-order linear, and its solution is an exponential in position rather than in time, so nothing in it ever changes with time.",
});
