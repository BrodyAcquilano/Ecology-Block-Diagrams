# Heat Source — derivation of the solution

Differential equation type: first-order linear (Newton's law of cooling), solved by separation of variables.

Function type of the solution: exponential.

Contents:

1. [The general form](#1-the-general-form)
2. [Separating the variables](#2-separating-the-variables)
3. [Integrating](#3-integrating)
4. [The starting condition](#4-the-starting-condition)
5. [The steady state](#5-the-steady-state)
6. [The heat source's signal](#6-the-heat-sources-signal)

## 1. The general form

A temperature signal is a temperature $T$ climbing from its previous temperature $T_o$ toward the set temperature $T_s$. The set temperature is never below the previous temperature: heat flows from hot to cold, and the heat source — a heating pad — has no cooling element, and nothing else heats the air, so the heat source is at the air's temperature or hotter. The gap is written set minus current, and it is never negative. It closes at a rate proportional to the gap that remains — Newton's law of cooling:

$$
\frac{dT}{dt} = k \left( T_s - T \right)
$$

The constant $k$ is a rate constant. It is not a universal constant: it depends on the two mediums — the heat source and the medium it is heating — and on how fast heat is exchanged between them, which is tied to their heat capacities. A different pair of mediums gives a different $k$, so $k$ is set with a slider.

## 2. Separating the variables

The equation is separable: all the $T$ terms go on one side, all the $t$ terms on the other:

$$
\frac{dT}{T_s - T} = k \, dt
$$

## 3. Integrating

Integrating both sides gives the logarithm of the gap:

$$
-\ln \left| T_s - T \right| = kt + C
$$

Exponentiating removes the logarithm, and the constant of integration becomes a multiplicative constant:

$$
T_s - T = C_1 e^{-kt}
$$

## 4. The starting condition

At $t = 0$ the temperature is $T_o$, so the constant is the starting gap:

$$
T_s - T_o = C_1
$$

and the solution is:

$$
T(t) = T_s - \left( T_s - T_o \right) e^{-kt}
$$

## 5. The steady state

As $t$ grows the exponential dies away and only the set temperature remains:

$$
\lim_{t \to \infty} T(t) = T_s
$$

## 6. The heat source's signal

The solution $T(t)$ is the temperature of the air — it is not the heat source's output signal. The heat source's own signal is only the decaying part of the solution:

$$
\left( T_s - T_o \right) e^{-kt}
$$

In the block diagram, the signal is labelled with the constant from §3 and §4:

$$
C_1 e^{-kt}
$$

$C_1$ is a constant of the reaction, not an input — the starting condition fixes it once. $T_o$ has no line in the diagram for the same reason: it is not an input either; it only sets the constant. And because the gap is written set minus current, $C_1 = T_s - T_o$ is never negative.

Which variable each part uses: $T_o$ is the starting temperature. It enters the solution once, through the starting condition in §4, where it sets the constant — and the signal keeps it, because the signal is built from the starting gap. $T(t)$ is the running temperature of the air: it is what the solution gives, it is what gets fed back in the block diagram, and the difference operator's live gap is written with it, $T_s - T(t)$. The signal is not built from that live gap — its decay is applied once, to the starting gap. The two writings meet at the start, when $t = 0$: there $T(t)$ is $T_o$, so the live gap is the starting gap:

$$
T_s - T(t) = T_s - T_o
$$

The block diagram is the solution, rearranged. Move $T(t)$ to the left of the solution and the signal to the right, and it is the line from §3 again:

$$
T_s - T(t) = C_1 e^{-kt}
$$

The left side is the heat source's input: the live gap the difference operator measures. The right side is its output: the heat signal. Input equals output — one quantity, written two ways. Taking the signal away from the setting, at the second difference operator, gives $T(t)$, the air temperature, and that is what is fed back to the beginning, to update the next state.

The temperature of the air is the setting of the heating panel minus that signal:

$$
T(t) = T_s - \left( T_s - T_o \right) e^{-kt}
$$

The signal is the gap still to close — the heat still being pumped in. It starts at the full gap and weakens exponentially as the temperature of the air gets closer to the setting; when the air reaches $T_s$, the signal has faded away to nothing:

$$
\lim_{t \to \infty} \left( T_s - T_o \right) e^{-kt} = 0
$$

So the heat source's signal is the gap attenuating over time — the time counterpart of the thermodynamic filter's attenuation over distance. The temperature does not attenuate; it grows toward the setting as the gap fades — but the rate it grows at is attenuated over time.
