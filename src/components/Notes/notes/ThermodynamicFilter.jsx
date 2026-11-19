// Thermodynamic filter — reusable component
// (file: ThermodynamicFilter.jsx)
// A temperature that is constant in time and changes only in
// position: the thermodynamic distance filter. Its value at
// position x is T(x) = T_end + (T(0) - T_end) * e^(-cutoff * x),
// falling from the temperature at x = 0 toward the end
// temperature as x grows, at a rate set by the cutoff. There
// is no time component: the graph is a heat distribution
// along x, from x = 0 to x = n.
// Variable labels are set in LaTeX (MathText) — before the
// graph and on the graph itself, as overlays on the canvas.
import { useEffect, useRef, useState } from "react";
import { ThermodynamicFilterSymbol } from "../../../Symbols";
import { MathText } from "../MathText";

export function ThermodynamicFilter() {
  const [initial, setInitial] = useState(100);
  const [end, setEnd] = useState(10);
  const [cutoff, setCutoff] = useState(0.45);
  const canvasRef = useRef(null);

  // The graph's vertical scale, shared by the canvas drawing and
  // the LaTeX labels overlaid on it.
  const lo = Math.min(initial, end);
  const hi = Math.max(initial, end);
  const span = Math.max(hi - lo, 10);
  const yMin = lo - span * 0.25;
  const yMax = hi + span * 0.25;
  const yPx = (a) => 14 + (1 - (a - yMin) / (yMax - yMin)) * (280 - 14 - 28);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const X_MAX = 10;
    const W = canvas.width;
    const H = canvas.height;
    const padL = 44;
    const padR = 12;
    const padT = 14;
    const padB = 28;
    const x = (pos) => padL + (pos / X_MAX) * (W - padL - padR);
    const y = (a) =>
      padT + (1 - (a - yMin) / (yMax - yMin)) * (H - padT - padB);
    ctx.clearRect(0, 0, W, H);
    // Axes (labels are LaTeX overlays, not canvas text)
    ctx.strokeStyle = "#3a3d42";
    ctx.beginPath();
    ctx.moveTo(padL, padT);
    ctx.lineTo(padL, H - padB);
    ctx.lineTo(W - padR, H - padB);
    ctx.stroke();
    // End temperature line
    ctx.strokeStyle = "#e8e8e8";
    ctx.setLineDash([5, 4]);
    ctx.beginPath();
    ctx.moveTo(padL, y(end));
    ctx.lineTo(W - padR, y(end));
    ctx.stroke();
    ctx.setLineDash([]);
    // The distribution along x
    ctx.strokeStyle = "#e5484d";
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = 0; i <= 200; i++) {
      const pos = (i / 200) * X_MAX;
      const a = end + (initial - end) * Math.exp(-cutoff * pos);
      if (i === 0) ctx.moveTo(x(pos), y(a));
      else ctx.lineTo(x(pos), y(a));
    }
    ctx.stroke();
    ctx.lineWidth = 1;
  }, [initial, end, cutoff, yMin, yMax]);

  return (
    <div>
      <div className="component-header">
        <ThermodynamicFilterSymbol size={56} />
        <h2 className="component-title">Thermodynamic filter</h2>
      </div>
      <p className="component-intro">
        The thermodynamic filter: a temperature that is constant in time and
        falls off exponentially with distance <MathText tex="x" /> — the
        attenuation of heat as it travels through a medium. The signal it
        generates is that attenuation over space,{" "}
        <MathText tex="\alpha(x) = e^{-cx}" />: the factor a temperature
        signal is reduced by after travelling the distance{" "}
        <MathText tex="x" />. Used for temperature, thermodynamics, heat
        exchange. The equation along <MathText tex="x" /> is first-order
        linear; its solution is an exponential in position.
      </p>
      <div className="component-controls">
        <label>
          <span>
            Temperature at <MathText tex="x = 0" />: {initial}
          </span>
          <input
            type="range"
            min={0}
            max={100}
            step={1}
            value={initial}
            onChange={(e) => setInitial(Number(e.target.value))}
          />
        </label>
        <label>
          <span>End temperature: {end}</span>
          <input
            type="range"
            min={0}
            max={100}
            step={1}
            value={end}
            onChange={(e) => setEnd(Number(e.target.value))}
          />
        </label>
        <label>
          <span>Cutoff rate: {cutoff.toFixed(2)}</span>
          <input
            type="range"
            min={0.05}
            max={2}
            step={0.01}
            value={cutoff}
            onChange={(e) => setCutoff(Number(e.target.value))}
          />
        </label>
      </div>
      <div className="component-graph-wrap">
        <canvas ref={canvasRef} width={560} height={280} className="component-graph" />
        <span className="graph-label" style={{ left: 50, top: yPx(end) - 22 }}>
          end temperature = {end}
        </span>
        <span
          className="graph-label"
          style={{ left: 50, top: initial > end ? yPx(initial) - 22 : yPx(initial) + 6 }}
        >
          <MathText tex={`T(0) = ${initial}`} />
        </span>
        <span className="graph-label" style={{ left: 8, top: 8 }}>
          <MathText tex="T" />
        </span>
        <span className="graph-label" style={{ left: 40, bottom: 4 }}>
          0
        </span>
        <span className="graph-label" style={{ right: 14, bottom: 4 }}>
          <MathText tex="x = n" />
        </span>
      </div>
    </div>
  );
}
