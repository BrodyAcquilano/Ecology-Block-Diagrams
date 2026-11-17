# Temperature

Contents:

1. [The model](#1-the-model)
2. [The block diagram](#2-the-block-diagram)

## 1. The model

The terrarium heat study, simplified down to one thing: the thermostat control. A temperature starts where it is, the thermostat is set, and the temperature settles to the setting. On its way out, the signal passes through the thermodynamic filter, so what arrives at a point is the settled signal reduced by the distance it travelled.

## 2. The block diagram

The diagram reads left to right. The temperature at time zero:

$$
T(0) = T_o
$$

and the thermostat signal, T_s, go into the difference operator, which measures the gap between them:

$$
T_s - T_o
$$

The gap drives a temperature signal — Newton's law of cooling:

$$
\frac{dT}{dt} = -k \left( T - T_s \right)
$$

whose solution is the temperature signal itself:

$$
T(t) = T_s + \left( T_o - T_s \right) e^{-kt}
$$

At the mixer, that signal is multiplied by the thermodynamic filter — the fall-off of temperature with distance x:

$$
T(x) = T_{end} + \left( T(0) - T_{end} \right) e^{-cx}
$$

and what comes out is another temperature signal: the temperature at that point.
