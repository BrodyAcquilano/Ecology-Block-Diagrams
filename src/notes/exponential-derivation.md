# Exponential — derivation of the solution

## Contents

- [1. The general form](#1-the-general-form)
- [2. Separating the variables](#2-separating-the-variables)
- [3. Integrating both sides](#3-integrating-both-sides)
- [4. The initial condition](#4-the-initial-condition)
- [5. Steady state](#5-steady-state)

## 1. The general form

A quantity Q changes at a rate proportional to the gap between its current value and its target value B, with k as the constant of proportionality. Written as a differential equation, that is:

$$\frac{dQ}{dt} = -k(Q - B)$$

The minus sign is there because the change always acts to close the gap: when Q is above B the change is negative, and when Q is below B the change is positive. This is the general form of Newton's law of cooling, and it holds for any quantity whose rate of change is proportional to the gap that remains.

## 2. Separating the variables

To solve it, the variables are separated, with all the Q terms on one side and all the t terms on the other:

$$\frac{dQ}{Q - B} = -k\,dt$$

## 3. Integrating both sides

Each side is then integrated:

$$\int \frac{dQ}{Q - B} = \int -k\,dt$$

$$\ln|Q - B| = -kt + C$$

Raising e to both sides gives the gap itself as an exponential, with a single constant set by where the quantity starts:

$$Q - B = C_1 e^{-kt}$$

## 4. The initial condition

The quantity starts at the value A at time zero, and substituting that in gives:

$$A - B = C_1$$

So the full solution is:

$$Q(t) = B + (A - B)e^{-kt}$$

## 5. Steady state

As time grows, the exponential term dies away and the solution settles onto the target:

$$\lim_{t \to \infty} Q(t) = B$$

The travel from A to B is the transient. The value B that remains is the steady state.
