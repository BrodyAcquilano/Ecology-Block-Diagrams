# Thermostat

Function type: constant.

Contents:

1. [What it is](#1-what-it-is)
2. [The equation](#2-the-equation)

## 1. What it is

The thermostat is a component: it generates a control signal — the set temperature $T_s$, dialled in on the thermostat and held. It is the value the rest of the system is told to reach. The heat source's temperature settles to it; the dial is what sets it.

## 2. The equation

While it is set, it does not change with time:

$$
T(t) = T_s
$$

Turn the dial and $T_s$ takes a new value; between turns, the signal is constant.
