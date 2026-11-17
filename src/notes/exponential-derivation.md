# Temperature signal — derivation of the solution

Differential equation type: first-order linear (Newton's law of cooling), solved by separation of variables.

Function type of the solution: exponential.

Contents:

1. [The general form](#1-the-general-form)
2. [Separating the variables](#2-separating-the-variables)
3. [Integrating](#3-integrating)
4. [The starting condition](#4-the-starting-condition)
5. [The steady state](#5-the-steady-state)

## 1. The general form

A temperature signal is a temperature T settling from its previous temperature T_o toward the set temperature T_s. It closes at a rate proportional to the gap that remains — Newton's law of cooling:

$$
\frac{dT}{dt} = -k \left( T - T_s \right)
$$

The constant k is Boltzmann's constant: a fixed constant of the model, not a setting, so it has no slider.

## 2. Separating the variables

The equation is separable: all the T terms go on one side, all the t terms on the other:

$$
\frac{dT}{T - T_s} = -k \, dt
$$

## 3. Integrating

Integrating both sides gives the logarithm of the gap:

$$
\ln \left| T - T_s \right| = -kt + C
$$

Exponentiating removes the logarithm, and the constant of integration becomes a multiplicative constant:

$$
T - T_s = C_1 e^{-kt}
$$

## 4. The starting condition

At t = 0 the temperature is T_o, so the constant is the starting gap:

$$
T_o - T_s = C_1
$$

and the solution is:

$$
T(t) = T_s + \left( T_o - T_s \right) e^{-kt}
$$

## 5. The steady state

As t grows the exponential dies away and only the set temperature remains:

$$
\lim_{t \to \infty} T(t) = T_s
$$
