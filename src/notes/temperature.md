# Temperature

Contents:

1. [The model](#1-the-model)
2. [The block diagram](#2-the-block-diagram)

## 1. The model

The terrarium heat study, simplified down to one thing: the thermostat control. The blocks in the diagram are components, and each component generates a signal. The signals are not drawn as blocks — a signal is what is measured on the line leaving a component, at its edges.

The thermostat is a control, the heat source is an environmental signal generator, and the thermodynamic filter generates a transform.

## 2. The block diagram

The thermostat generates the set temperature:

$$
T_s
$$

The setting splits two ways. One branch goes into the difference operator. The other runs along a parallel branch, over the top, to the addition operator further along the chain.

The output of the addition operator, T(t), is fed back to the difference operator along the loop below the chain. At the start it is:

$$
T(0) = T_o
$$

The difference operator measures the gap between the feedback and the setting:

$$
T(t) - T_s
$$

That gap is the heat source's input — the intermediate signal. The heat source applies the exponential decay from Newton's law of cooling:

$$
\frac{dT}{dt} = -k \left( T - T_s \right)
$$

so what leaves the heat source is that gap, decayed:

$$
\left( T(t) - T_s \right) e^{-kt}
$$

The addition operator adds the parallel branch of the setting to it, and that sum is T(t):

$$
T(t) = T_s + \left( T(t) - T_s \right) e^{-kt}
$$

T(t) is fed back to the difference operator, and it also proceeds to the mixer. The thermodynamic filter's signal is mixed in there — the attenuation over space:

$$
\alpha(x) = e^{-cx}
$$

Mixed with the attenuation, the temperature at position x is:

$$
T(t, x) = T_{end} + \left( T(t) - T_{end} \right) \alpha(x)
$$

What leaves the mixer is just a line. The signal measured on it is T(t, x): the temperature at that point, at that time.
