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

The heat source's own temperature, T(t), is fed back to the difference operator along the loop below the chain. At the start it is:

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

On its way out, that signal, T(t), reaches the mixer. The thermodynamic filter's signal is mixed in there too — the attenuation over space:

$$
\alpha(x) = e^{-cx}
$$

Mixed with the attenuation, the temperature at position x is:

$$
T(t, x) = T_{end} + \left( T(t) - T_{end} \right) \alpha(x)
$$

What leaves the mixer is just a line. The signal measured on it is T(t, x): the temperature at that point, at that time.
