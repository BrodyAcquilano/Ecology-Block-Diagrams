// Symbol components — one component per symbol, kept in the
// assets so diagrams insert the symbol itself, not a name.
// Each one draws the shared glyph for its kind.
import { SymbolGlyph } from "../components/SymbolGlyph";

export function DifferenceSymbol({ size = 64 }) {
  return <SymbolGlyph kind="difference" size={size} />;
}

export function AdditionSymbol({ size = 64 }) {
  return <SymbolGlyph kind="addition" size={size} />;
}

export function MixerSymbol({ size = 64 }) {
  return <SymbolGlyph kind="mixer" size={size} />;
}

export function HeatSourceSymbol({ size = 64 }) {
  return <SymbolGlyph kind="heatsource" size={size} />;
}

export function ThermostatSymbol({ size = 64 }) {
  return <SymbolGlyph kind="thermostat" size={size} />;
}

export function ThermodynamicFilterSymbol({ size = 64 }) {
  return <SymbolGlyph kind="transform" size={size} />;
}

export const SYMBOL_COMPONENTS = {
  difference: DifferenceSymbol,
  addition: AdditionSymbol,
  mixer: MixerSymbol,
  heatsource: HeatSourceSymbol,
  thermostat: ThermostatSymbol,
  transform: ThermodynamicFilterSymbol,
};
