// Every symbol, in one list. Each symbol is a self-contained
// component — its picture, ink, outline and description —
// drawn inside one of the outlines in outlines/. The symbols
// live in glyphs/, sorted by group into operators/,
// environmental-signal-generators/, transforms/ and controls/.
import { DifferenceSymbol } from "./glyphs/operators/DifferenceSymbol";
import { AdditionSymbol } from "./glyphs/operators/AdditionSymbol";
import { MixerSymbol } from "./glyphs/operators/MixerSymbol";
import { HeatSourceSymbol } from "./glyphs/environmental-signal-generators/HeatSourceSymbol";
import { ThermostatSymbol } from "./glyphs/controls/ThermostatSymbol";
import { ThermodynamicFilterSymbol } from "./glyphs/transforms/ThermodynamicFilterSymbol";

export {
  DifferenceSymbol,
  AdditionSymbol,
  MixerSymbol,
  HeatSourceSymbol,
  ThermostatSymbol,
  ThermodynamicFilterSymbol,
};

export const SYMBOLS = [
  DifferenceSymbol,
  AdditionSymbol,
  MixerSymbol,
  HeatSourceSymbol,
  ThermostatSymbol,
  ThermodynamicFilterSymbol,
];

// Look a symbol up by its kind, e.g. SYMBOLS_BY_KIND.thermostat
export const SYMBOLS_BY_KIND = Object.fromEntries(SYMBOLS.map((s) => [s.kind, s]));
