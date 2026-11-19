// Difference operator — a short minus in the centre of a circle.
// Self-contained: its picture, its ink, its outline and its
// description all live here.
import { CircleOutline } from "../../outlines/CircleOutline";

const INK = "#e8e8e8"; // white

export function DifferenceSymbol({ size = 64 }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
      <CircleOutline />
      <g fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="24" y1="32" x2="40" y2="32" />
      </g>
    </svg>
  );
}

Object.assign(DifferenceSymbol, {
  kind: "difference",
  label: "Difference operator",
  group: "operator",
  sortOrder: 0,
  definition:
    "What it represents is a comparison between two steady values of a quantity Q: its previous steady value, A, and its new set value, B. Their difference, B − A, is the gap the whole rest of the chain has to close — its size says how far Q has to travel, and its sign says which way: up if B > A, down if B < A. Nothing has changed yet at this step; the difference operator only measures the change that has been asked for.",
});
