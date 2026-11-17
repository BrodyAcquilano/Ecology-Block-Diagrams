// Temperature tab
// The terrarium heat study as a simplified model: just the
// thermostat control. Up top, one thermostat slider and two
// graphs beside each other — the live temperature settling
// over time, and the temperature falling off over distance
// through the thermodynamic filter. Below them, the block
// diagram of the model, drawn with the reusable BlockDiagram
// container, and a short note introducing it.
import { useEffect, useRef, useState } from "react";
import {
  BlockDiagram,
  type DiagramLabel,
  type DiagramLink,
  type DiagramNode,
} from "../components/BlockDiagram";
import { MarkdownNote } from "../components/MarkdownNote";
import { MathText } from "../components/MathText";
import note from "../notes/temperature.md?raw";

// The chain, placed by x/y in the BlockDiagram: the
// temperature at t = 0 (T_o) and the thermostat setting (T_s)
// into the difference operator; the gap drives a temperature
// signal; the mixer multiplies it by the thermodynamic
// filter, feeding up from below; out comes the temperature
// signal at that point.
const NODES: DiagramNode[] = [
  { id: "tin", symbol: "temperature", x: 70, y: 90 },
  { id: "tstat", symbol: "thermostat", x: 70, y: 210 },
  { id: "diff", symbol: "difference", x: 250, y: 150 },
  { id: "sig", symbol: "temperature", x: 430, y: 150 },
  { id: "mix", symbol: "mixer", x: 610, y: 150 },
  { id: "filt", symbol: "transform", x: 610, y: 252 },
  { id: "out", symbol: "temperature", x: 790, y: 150 },
];

const LINKS: DiagramLink[] = [
  { from: "tin", to: "diff", fromAnchor: "right", toAnchor: 225 },
  { from: "tstat", to: "diff", fromAnchor: "right", toAnchor: 135 },
  { from: "diff", to: "sig", fromAnchor: "right", toAnchor: "left" },
  { from: "sig", to: "mix", fromAnchor: "right", toAnchor: "left" },
  { from: "filt", to: "mix", fromAnchor: "top", toAnchor: "bottom" },
  { from: "mix", to: "out", fromAnchor: "right", toAnchor: "left" },
];

const LABELS: DiagramLabel[] = [
  { x: 70, y: 134, tex: "T_o" },
  { x: 70, y: 254, tex: "T_s" },
  { x: 250, y: 198, text: "Difference operator" },
  { x: 430, y: 198, text: "Temperature signal" },
  { x: 610, y: 102, text: "Mixer" },
  { x: 610, y: 300, text: "Thermodynamic filter" },
  { x: 790, y: 198, text: "Temperature signal" },
];

// Both graphs share the fixed 0-100 scale (with padding) used
// by the other components.
const Y_MIN = -25;
const Y_MAX = 125;
const yPx = (a: number) => 14 + (1 - (a - Y_MIN) / (Y_MAX - Y_MIN)) * (240 - 14 - 28);

export function Temperature() {
  const [Ts, setTs] = useState(25);
  const liveRef = useRef<HTMLCanvasElement>(null);
  const filtRef = useRef<HTMLCanvasElement>(null);
  const histRef = useRef<{ t: number; v: number }[]>([]);
  const valRef = useRef(25);

  // Live graph: the temperature chases the thermostat setting.
  // Moving the slider starts a new transient from wherever the
  // temperature currently is; the graph keeps the last 20 s.
  useEffect(() => {
    const canvas = liveRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const W = canvas.width;
    const H = canvas.height;
    const padL = 44;
    const padR = 12;
    const padT = 14;
    const padB = 28;
    const WINDOW = 20000;
    const y = (a: number) =>
      padT + (1 - (a - Y_MIN) / (Y_MAX - Y_MIN)) * (H - padT - padB);
    let raf = 0;
    let last = performance.now();
    const draw = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      valRef.current += (Ts - valRef.current) * (1 - Math.exp(-0.5 * dt));
      const h = histRef.current;
      h.push({ t: now, v: valRef.current });
      while (h.length && now - h[0].t > WINDOW) h.shift();
      ctx.clearRect(0, 0, W, H);
      // Axes (labels are LaTeX overlays, not canvas text)
      ctx.strokeStyle = "#3a3d42";
      ctx.beginPath();
      ctx.moveTo(padL, padT);
      ctx.lineTo(padL, H - padB);
      ctx.lineTo(W - padR, H - padB);
      ctx.stroke();
      // The setting, dashed
      ctx.strokeStyle = "#e8e8e8";
      ctx.setLineDash([5, 4]);
      ctx.beginPath();
      ctx.moveTo(padL, y(Ts));
      ctx.lineTo(W - padR, y(Ts));
      ctx.stroke();
      ctx.setLineDash([]);
      // The temperature history
      ctx.strokeStyle = "#e5484d";
      ctx.lineWidth = 2;
      ctx.beginPath();
      h.forEach((p, i) => {
        const xx = padL + ((p.t - (now - WINDOW)) / WINDOW) * (W - padL - padR);
        if (i === 0) ctx.moveTo(xx, y(p.v));
        else ctx.lineTo(xx, y(p.v));
      });
      ctx.stroke();
      ctx.lineWidth = 1;
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [Ts]);

  // Distance graph: the thermodynamic filter. The temperature
  // at x = 0 is the setting; it falls toward the end
  // temperature (10, the filter component's default) at the
  // component's default cutoff rate.
  useEffect(() => {
    const canvas = filtRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const W = canvas.width;
    const H = canvas.height;
    const padL = 44;
    const padR = 12;
    const padT = 14;
    const padB = 28;
    const T_END = 10;
    const CUTOFF = 0.45;
    const X_MAX = 10;
    const y = (a: number) =>
      padT + (1 - (a - Y_MIN) / (Y_MAX - Y_MIN)) * (H - padT - padB);
    const xx = (x: number) => padL + (x / X_MAX) * (W - padL - padR);
    ctx.clearRect(0, 0, W, H);
    ctx.strokeStyle = "#3a3d42";
    ctx.beginPath();
    ctx.moveTo(padL, padT);
    ctx.lineTo(padL, H - padB);
    ctx.lineTo(W - padR, H - padB);
    ctx.stroke();
    // End temperature, dashed
    ctx.strokeStyle = "#e8e8e8";
    ctx.setLineDash([5, 4]);
    ctx.beginPath();
    ctx.moveTo(padL, y(T_END));
    ctx.lineTo(W - padR, y(T_END));
    ctx.stroke();
    ctx.setLineDash([]);
    // T(x) = T_end + (T_s - T_end) * e^(-cutoff * x)
    ctx.strokeStyle = "#e5484d";
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = 0; i <= 100; i++) {
      const x = (i / 100) * X_MAX;
      const a = T_END + (Ts - T_END) * Math.exp(-CUTOFF * x);
      if (i === 0) ctx.moveTo(xx(x), y(a));
      else ctx.lineTo(xx(x), y(a));
    }
    ctx.stroke();
    ctx.lineWidth = 1;
  }, [Ts]);

  return (
    <div>
      <div className="component-controls">
        <label>
          <span>
            Thermostat setting <MathText tex="T_s" />: {Ts}
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
      <div className="temp-graphs">
        <div>
          <div className="components-group-title">Temperature over time</div>
          <div className="component-graph-wrap">
            <canvas ref={liveRef} width={400} height={240} className="component-graph" />
            <span className="graph-label" style={{ left: 50, top: yPx(Ts) - 22 }}>
              <MathText tex={`T_s = ${Ts}`} />
            </span>
            <span className="graph-label" style={{ left: 8, top: 8 }}>
              <MathText tex="T" />
            </span>
            <span className="graph-label" style={{ right: 14, bottom: 4 }}>
              <MathText tex="t" />
            </span>
          </div>
        </div>
        <div>
          <div className="components-group-title">Temperature over distance</div>
          <div className="component-graph-wrap">
            <canvas ref={filtRef} width={400} height={240} className="component-graph" />
            <span className="graph-label" style={{ left: 50, top: yPx(Ts) - 22 }}>
              <MathText tex={`T(0) = ${Ts}`} />
            </span>
            <span className="graph-label" style={{ left: 8, top: 8 }}>
              <MathText tex="T" />
            </span>
            <span className="graph-label" style={{ right: 14, bottom: 4 }}>
              <MathText tex="x" />
            </span>
          </div>
        </div>
      </div>
      <BlockDiagram width={860} height={330} nodes={NODES} links={LINKS} labels={LABELS} />
      <MarkdownNote source={note} />
    </div>
  );
}
