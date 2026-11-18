// Label box — reusable component
// A small boxed label placed by its centre point (x, y).
// Font size, font colour, border colour and fill are all
// settable per box. The text is plain, or LaTeX when tex
// is given.
import { MathText } from "./MathText";

export function LabelBox({
  x,
  y,
  text,
  tex,
  fontSize = 13,
  color = "#e8e8e8",
  borderColor = "#34373c",
  fill = "#1f2226",
}) {
  return (
    <div
      className="label-box"
      style={{ left: x, top: y, fontSize, color, borderColor, background: fill }}
    >
      {tex ? <MathText tex={tex} /> : text}
    </div>
  );
}
