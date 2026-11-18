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

The setting splits two ways. One branch goes into the difference operator. The other runs along a parallel branch, over the top, to the second difference operator further along the chain.

The output of the second difference operator, $T(t)$, is fed back to the first difference operator along the loop below the chain. $T(t)$ is the live temperature — it changes as time passes. At the start it is:

$$
T(0) = T_o
$$

$T_o$ is not a separate signal on any line. It is only the starting value of $T(t)$.

The setting is never below the starting temperature. Heat flows from hot to cold; the heat source is a heating pad, with no cooling element, and nothing else heats the air — so the pad is at the air's temperature or hotter. The gap is therefore written setting minus temperature, and it is never negative.

The difference operator measures the live gap between the setting and the feedback:

$$
T_s - T(t)
$$

It is written with $T(t)$ because it is live: the gap shrinks as $T(t)$ climbs to $T_s$.

That gap is the heat source's input. The heat source applies the exponential decay from Newton's law of cooling:

$$
\frac{dT}{dt} = k \left( T_s - T \right)
$$

What leaves the heat source is the intermediate signal — its own signal, the starting gap decayed. In the derivation it is written with the constant $C_1$:

$$
C_1 e^{-kt}
$$

$C_1$ is a constant of the reaction, not an input. The starting condition fixes it once, to the starting gap:

$$
C_1 = T_s - T_o
$$

That is why there is no $T_o$ line in the diagram: $T_o$ is not an input either — it never travels on a line; it only sets the constant. The signal is written with $C_1$, not with the live $T(t)$: the decay is the heat source's own time course, applied once — applied to the live gap, it would decay a gap that is already closing, and decay it twice. The two writings meet at the start, when $t = 0$: there $T(t)$ is $T_o$, so the live gap is the starting gap:

$$
T_s - T(t) = T_s - T_o
$$

The second difference operator takes the signal away from the parallel branch of the setting, and that gives $T(t)$:

$$
T(t) = T_s - C_1 e^{-kt}
$$

The whole loop is already in that one equation. Move $T(t)$ to the left and the signal to the right:

$$
T_s - T(t) = C_1 e^{-kt}
$$

The left side is the heat source's input — the live gap the difference operator measures. The right side is its output — the heat signal. The equation says the two are equal: input equals output, one quantity written two ways. And taking the signal away from the setting gives $T(t)$ again, the air temperature — which is fed back to the beginning, to update the next state.

$T(t)$ is fed back to the difference operator, and it also proceeds to the mixer. The thermodynamic filter's signal is mixed in there — the attenuation over space:

$$
\alpha(x) = e^{-cx}
$$

Mixed with the attenuation, the temperature at position $x$ is:

$$
T(t, x) = T_{end} + \left( T(t) - T_{end} \right) \alpha(x)
$$

What leaves the mixer is just a line. The signal measured on it is $T(t, x)$: the temperature at that point, at that time.
