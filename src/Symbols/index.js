// Every symbol, in one list. Each symbol is a self-contained
// component in glyphs/ — its picture, ink, outline and
// description — drawn inside one of the outlines in outlines/.
import { DifferenceSymbol } from "./glyphs/DifferenceSymbol";
import { AdditionSymbol } from "./glyphs/AdditionSymbol";
import { MixerSymbol } from "./glyphs/MixerSymbol";
import { HeatSourceSymbol } from "./glyphs/HeatSourceSymbol";
import { ThermostatSymbol } from "./glyphs/ThermostatSymbol";
import { ThermodynamicFilterSymbol } from "./glyphs/ThermodynamicFilterSymbol";

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
