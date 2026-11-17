// Thermodynamic filter — reusable component
// (file: ExponentialTransform.tsx)
// A temperature that is constant in time and changes only in
// position: the thermodynamic distance filter. Its value at
// position x is T(x) = T_end + (T(0) - T_end) * e^(-cutoff * x),
// falling from the temperature at x = 0 toward the end
// temperature as x grows, at a rate set by the cutoff. There
// is no time component: the graph is a heat distribution
// along x, from x = 0 to x = n.
import { useEffect, useRef, useState } from "react";
import { SymbolGlyph } from "./SymbolGlyph";

export function ExponentialTransform() {
  const [initial, setInitial] = useState(100);
  const [end, setEnd] = useState(10);
  const [cutoff, setCutoff] = useState(0.45);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
    const lo = Math.min(initial, end);
    const hi = Math.max(initial, end);
    const span = Math.max(hi - lo, 10);
    const yMin = lo - span * 0.25;
    const yMax = hi + span * 0.25;
    const x = (pos: number) => padL + (pos / X_MAX) * (W - padL - padR);
    const y = (a: number) =>
      padT + (1 - (a - yMin) / (yMax - yMin)) * (H - padT - padB);
    ctx.clearRect(0, 0, W, H);
    // Axes
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
    ctx.fillStyle = "#e8e8e8";
    ctx.font = "12px system-ui";
    ctx.fillText("end temperature = " + end, padL + 6, y(end) - 6);
    ctx.fillText("T(0) = " + initial, padL + 6, y(initial) + (initial > end ? -6 : 14));
    ctx.fillText("0", padL - 3, H - 10);
    ctx.fillText("x = n", W - padR - 26, H - 10);
    ctx.fillText("T", 8, padT + 4);
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
  }, [initial, end, cutoff]);

  return (
    <div>
      <div className="component-header">
        <SymbolGlyph kind="transform" size={56} />
        <h2 className="component-title">Thermodynamic filter</h2>
      </div>
      <p className="component-intro">
        The thermodynamic filter: a temperature that is constant in time and
        falls off exponentially with distance x — the attenuation of heat as
        it travels through a medium. Used for temperature, thermodynamics,
        heat exchange. The equation along x is first-order linear; its
        solution is an exponential in position.
      </p>
      <div className="component-controls">
        <label>
          Temperature at x = 0: {initial}
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
          End temperature: {end}
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
          Cutoff rate: {cutoff.toFixed(2)}
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
      <canvas ref={canvasRef} width={560} height={280} className="component-graph" />
    </div>
  );
}
