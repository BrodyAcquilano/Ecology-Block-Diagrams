# Exponential — derivation of the solution

## Contents

- [1. The general form](#1-the-general-form)
- [2. Separating the variables](#2-separating-the-variables)
- [3. Integrating both sides](#3-integrating-both-sides)
- [4. The initial condition](#4-the-initial-condition)
- [5. Steady state](#5-steady-state)

## 1. The general form

A quantity A changes at a rate proportional to the gap between its current value and its target value B, with k as the constant of proportionality. Written as a differential equation, that is:

$$
\frac{dA}{dt} = -k(A - B)
$$

The minus sign is there because the change always acts to close the gap: when A is above B the change is negative, and when A is below B the change is positive. This is the general form of Newton's law of cooling, and it holds for any quantity whose rate of change is proportional to the gap that remains.

## 2. Separating the variables

To solve it, the variables are separated, with all the A terms on one side and all the t terms on the other:

$$
\frac{dA}{A - B} = -k\,dt
$$

## 3. Integrating both sides

Each side is then integrated:

$$
\int \frac{dA}{A - B} = \int -k\,dt
$$

$$
\ln|A - B| = -kt + C
$$

Raising e to both sides gives the gap itself as an exponential, with a single constant set by where the quantity starts:

$$
A - B = C_1 e^{-kt}
$$

## 4. The initial condition

The quantity starts at the value A(0) — the value of A at time zero — and substituting that in gives:

$$
A(0) - B = C_1
$$

So the full solution is:

$$
A(t) = B + (A(0) - B)e^{-kt}
$$

## 5. Steady state

As time grows, the exponential term dies away and the solution settles onto the target:

$$
\lim_{t \to \infty} A(t) = B
$$

The travel from A(0) to B is the transient. The value B that remains is the steady state.
