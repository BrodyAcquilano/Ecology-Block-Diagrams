// Symbol components — one component per symbol, kept in the
// assets so diagrams insert the symbol itself, not a name.
// Each one draws the shared glyph for its kind.
import type { ComponentType } from "react";
import { SymbolGlyph } from "../components/SymbolGlyph";

export function DifferenceSymbol({ size = 64 }: { size?: number }) {
  return <SymbolGlyph kind="difference" size={size} />;
}

export function AdditionSymbol({ size = 64 }: { size?: number }) {
  return <SymbolGlyph kind="addition" size={size} />;
}

export function MixerSymbol({ size = 64 }: { size?: number }) {
  return <SymbolGlyph kind="mixer" size={size} />;
}

export function BoltzmannSymbol({ size = 64 }: { size?: number }) {
  return <SymbolGlyph kind="boltzmann" size={size} />;
}

export function TemperatureSymbol({ size = 64 }: { size?: number }) {
  return <SymbolGlyph kind="temperature" size={size} />;
}

export function ThermostatSymbol({ size = 64 }: { size?: number }) {
  return <SymbolGlyph kind="thermostat" size={size} />;
}

export function ThermodynamicFilterSymbol({ size = 64 }: { size?: number }) {
  return <SymbolGlyph kind="transform" size={size} />;
}

export const SYMBOL_COMPONENTS: Record<string, ComponentType<{ size?: number }>> = {
  difference: DifferenceSymbol,
  addition: AdditionSymbol,
  mixer: MixerSymbol,
  boltzmann: BoltzmannSymbol,
  temperature: TemperatureSymbol,
  thermostat: ThermostatSymbol,
  transform: ThermodynamicFilterSymbol,
};
