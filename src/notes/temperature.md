# Temperature

Contents:

1. [The model](#1-the-model)
2. [The block diagram](#2-the-block-diagram)

## 1. The model

The terrarium heat study, simplified down to one thing: the thermostat control. The blocks in the diagram are components, and each component generates a signal. The signals are not drawn as blocks — a signal is what is measured on the line leaving a component, at its edges.

The thermostat generates a control signal, the heat source generates an environmental signal, and the thermodynamic filter generates a transform.

## 2. The block diagram

The thermostat and the heat source are both connected to the difference operator. The thermostat generates the set temperature:

$$
T_s
$$

The heat source's own temperature is fed back to the difference operator along the loop below the chain. At the start it is:

$$
T(0) = T_o
$$

The difference operator measures the gap between the setting and the feedback:

$$
T_s - T_o
$$

and that gap is what drives the heat source. Its temperature follows Newton's law of cooling:

$$
\frac{dT}{dt} = -k \left( T - T_s \right)
$$

whose solution is the signal the heat source generates:

$$
T(t) = T_s + \left( T_o - T_s \right) e^{-kt}
$$

On its way out, that signal reaches the mixer, where the thermodynamic filter's attenuation is mixed in — the fall-off of temperature with distance x:

$$
T(x) = T_{end} + \left( T(0) - T_{end} \right) e^{-cx}
$$

What leaves the mixer is just a line. The signal measured on it is the temperature at that point.
