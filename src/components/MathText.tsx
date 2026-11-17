// MathText — a small piece of LaTeX rendered inline with KaTeX.
// Used for variable labels in the components — on the graphs and
// before them — anywhere precise math formatting is needed
// (T_o, T_s, T(0), x, k...).
import { useMemo } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

export function MathText({ tex }: { tex: string }) {
  const html = useMemo(
    () => katex.renderToString(tex, { throwOnError: false }),
    [tex]
  );
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}
