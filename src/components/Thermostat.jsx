// Thermostat — reusable component
// The thermostat: it generates a control signal — the set
// temperature T_s, held constant. Its symbol carries a gear
// around the outside so control components can be told apart
// at a glance. One slider sets T_s. The graph is a live feed:
// the last 30 time steps of the signal, drawn as a square
// wave — the value holds flat through each step, and when
// the slider moves, the next step jumps to the new value
// while the old steps stay on screen behind it.
// The short note is below the graph.
import { useEffect, useRef, useState } from "react";
import { MarkdownNote } from "./MarkdownNote";
import { ThermostatSymbol } from "../Symbols";
import { MathText } from "./MathText";
import note from "../notes/thermostat.md?raw";

export function Thermostat() {
  const [Ts, setTs] = useState(25);
  const canvasRef = useRef(null);
  const tsRef = useRef(Ts);
  tsRef.current = Ts;
  // The step history: one value per time step. It starts full
  // of the opening value, so the feed opens with a flat line.
  const stepsRef = useRef(
    Array.from({ length: 31 }, (_, i) => ({ step: i - 30, v: 25 }))
  );

  // Fixed 0-100 scale with the same padding as the other graphs.
  const yMin = -25;
  const yMax = 125;
  const yPx = (a) => 14 + (1 - (a - yMin) / (yMax - yMin)) * (280 - 14 - 28);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const W = canvas.width;
    const H = canvas.height;
    const padL = 44;
    const padR = 12;
    const padT = 14;
    const padB = 28;
    const STEP_MS = 500;
    const STEPS = 30;
    const start = performance.now();
    const y = (a) =>
      padT + (1 - (a - yMin) / (yMax - yMin)) * (H - padT - padB);
    let raf = 0;
    const draw = (now) => {
      const nowSteps = (now - start) / STEP_MS;
      const cur = Math.floor(nowSteps);
      const steps = stepsRef.current;
      // Fill in any steps that have closed since the last frame
      // with the slider's current value: a change of setting
      // takes effect at the next step, never mid-step.
      let last = steps[steps.length - 1];
      while (last.step < cur) {
        const s = { step: last.step + 1, v: tsRef.current };
        steps.push(s);
        last = s;
      }
      while (steps.length && steps[0].step < cur - STEPS - 1) steps.shift();
      // The window runs from t - 30 steps (left) to t (right).
      const x = (s) =>
        padL + ((s - (nowSteps - STEPS)) / STEPS) * (W - padL - padR);
      ctx.clearRect(0, 0, W, H);
      // Axes (labels are LaTeX overlays, not canvas text)
      ctx.strokeStyle = "#3a3d42";
      ctx.beginPath();
      ctx.moveTo(padL, padT);
      ctx.lineTo(padL, H - padB);
      ctx.lineTo(W - padR, H - padB);
      ctx.stroke();
      // The square wave: each step's value held flat until the
      // next step, with a vertical jump at the boundary.
      ctx.strokeStyle = "#e5484d";
      ctx.lineWidth = 2;
      ctx.beginPath();
      steps.forEach((s, i) => {
        const x0 = Math.max(x(s.step), padL);
        const x1 = x(s.step + 1);
        if (i === 0) ctx.moveTo(x0, y(s.v));
        else ctx.lineTo(x(s.step), y(s.v));
        ctx.lineTo(x1, y(s.v));
      });
      ctx.stroke();
      ctx.lineWidth = 1;
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [yMin, yMax]);

  return (
    <div>
      <div className="component-header">
        <ThermostatSymbol size={56} />
        <h2 className="component-title">Thermostat</h2>
      </div>
      <p className="component-intro">
        The thermostat generates a control signal: the set temperature{" "}
        <MathText tex="T_s" />, held constant. It is the value the heat
        source's temperature settles to — turn the dial and the line moves;
        between turns it does not change. Function type: constant.
      </p>
      <div className="component-controls">
        <label>
          <span>
            Set temperature <MathText tex="T_s" />: {Ts}
          </span>
          <input
            type="range"
            min={0}
            max={100}
            step={1}
            value={Ts}
            onChange={(e) => setTs(Number(e.target.value))}
          />
        </label>
      </div>
      <div className="component-graph-wrap">
        <canvas ref={canvasRef} width={560} height={280} className="component-graph" />
        <span className="graph-label" style={{ left: 50, top: yPx(Ts) - 22 }}>
          <MathText tex={`T_s = ${Ts}`} />
        </span>
        <span className="graph-label" style={{ left: 8, top: 8 }}>
          <MathText tex="T" />
        </span>
        <span className="graph-label" style={{ left: 50, bottom: 4 }}>
          <MathText tex="t - 30" />
        </span>
        <span className="graph-label" style={{ right: 14, bottom: 4 }}>
          <MathText tex="t" />
        </span>
      </div>
      <MarkdownNote source={note} />
    </div>
  );
}
