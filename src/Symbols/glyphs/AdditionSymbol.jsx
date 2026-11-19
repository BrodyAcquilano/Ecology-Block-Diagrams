// Addition operator — a plus in the centre of a circle.
// Self-contained: its picture, its ink, its outline and its
// description all live here.
import { CircleOutline } from "../outlines/CircleOutline";

const INK = "#e8e8e8"; // white

export function AdditionSymbol({ size = 64 }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
      <CircleOutline />
      <g fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="24" y1="32" x2="40" y2="32" />
        <line x1="32" y1="24" x2="32" y2="40" />
      </g>
    </svg>
  );
}

Object.assign(AdditionSymbol, {
  kind: "addition",
  label: "Addition operator",
  group: "operator",
  sortOrder: 1,
  definition:
    "What it represents is two signals combined into one by adding them: the pair of the difference operator, for the places where a signal is genuinely the sum of two parts. Its place in this note is the system diagram, where a signal's position part — the value of Q at a point, constant at that point — adds with its time part, Q(t), an oscillator. Because the position part is constant, the output of the adding is an oscillator that just becomes Q(t) again: adding a constant to the oscillator does not change its kind. Adding is this operator; multiplying is the mixer, ⊗; subtracting is the difference operator.",
});
