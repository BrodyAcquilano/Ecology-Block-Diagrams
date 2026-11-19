// Mixer — a cross in the centre of a circle.
// Self-contained: its picture, its ink, its outline and its
// description all live here.
import { CircleOutline } from "../outlines/CircleOutline";

const INK = "#e8e8e8"; // white

export function MixerSymbol({ size = 64 }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
      <CircleOutline />
      <g fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="23" y1="23" x2="41" y2="41" />
        <line x1="41" y1="23" x2="23" y2="41" />
      </g>
    </svg>
  );
}

Object.assign(MixerSymbol, {
  kind: "mixer",
  label: "Mixer",
  group: "operator",
  sortOrder: 7,
  definition:
    "What it represents is one signal scaling another by multiplication: a transform carried out as a product. In this note the mixer is where the signal meets position: the exponential Q(t) runs through a transform that depends on the point, so the value of Q at point b is its value at point a reduced by the factor the move from a to b imposes — what comes out is the same signal, reduced by exactly that factor. The mixer does not add anything of its own; it applies one input to the other. (Addition is a different operation — the adder, ⊕, defined beside the difference operator above.)",
});
