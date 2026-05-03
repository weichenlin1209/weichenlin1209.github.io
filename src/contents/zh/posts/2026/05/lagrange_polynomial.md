---
title: Lagrange Polynomial
published: 2026-05-03
slug: "lagrange-polynomial"
tags: ["numerical"]
category: Math
licenseName: "CC-BY-SA 4.0"
author: Windson
draft: false
cover: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Lagrange_crop.jpg/960px-Lagrange_crop.jpg"
description: "This article will lead you explore Lagrange Polynomial"
---
> Tomorrow, I will have a mid-term exam including Lagrange polynomial. So, I summarize down these content. There won't be a Mandarin version, because I am so lazy to translate it. Besides, you may get better reading experience [here](https://hw.windson.cc/lagrange_polynomial).

## Lagrange Polynomial

The Lagrange polynomial is a method of polynomial interpolation that allows us to approximate a function $f(x)$ by a polynomial $P(x)$. Given the fucntion passthrough a set of points $(x_0, y_0), $ $(x_1, y_1),  \ldots,  (x_n, y_n)$, where $x_i$ are distinct. The main idea of the Lagrange Polynomial is to construct a polynomial directly using a linear combination of basis polynomials, denoted as $L_i(x)$ which are defined as follows:

$$
L_i(x_j) = \delta_{ij} = \begin{cases} 1 & \text{if } i = j \\ 0 & \text{if } i \neq j \end{cases}
$$

The core logic relies on the property of $L_i(x_j)$, which ensures that each basis polynomial contributes to the final interpolation only at its corresponding point. To ensure $L_i(x_j) = 0$ when $i \neq j$, the function $L_i(x)$ must contain the term $(x - x_j)$ for all $j \neq i$.

$$
L_i(x) = \prod_{j=0, j \neq i}^{n} x - x_j
$$

To satisfy the condition $L_i(x_i) = 1$, we need to normalize $L_i(x)$ by dividing it by its value at $x_i$. Hence the normalized basis polynomial is given by:

$$
L_{n,i}(x) = \prod_{j=0, j \neq i}^{n}
\frac{x - x_j}{x_i - x_j}
$$

Finally, we scale each basis polynomial by its corresponding $y_i$ value and sum them up to get the final Lagrange polynomial:

$$
\begin{equation}
P(x) = \sum_{i=0}^{n} f(x_i) L_i(x)
\end{equation}
$$

Besides, the Lagrange polynomial can also be expressed in another form. Let us define the nodal polynomial $Q(x)$ as the product of all linear factors associated with the data points:

$$
Q(x) = \prod_{j=0}^{n} (x - x_j)
$$

Taking the natural logarithm on both sides to simplify the differentiation of the product:

$$
\ln Q(x) = \sum_{j=0}^{n} \ln(x - x_j)
$$

Differentiating with respect to $x$ yields the logarithmic derivative:

$$
\frac{Q'(x)}{Q(x)} = \sum_{j=0}^{n} \frac{1}{x - x_j}
$$

Multiplying both sides by $Q(x)$, we obtain the general expression for the derivative $Q'(x)$:

$$
Q'(x) = \sum_{j=0}^{n} \frac{Q(x)}{x - x_j}
$$

When evaluating this derivative at a specific node $x = x_i$, the limit must be considered since $Q(x_i) = 0$. Applying the product rule isolates the non-zero term:

$$
Q'(x_i) = \sum_{j=0}^{n} \frac{Q(x_i)}{(x_i - x_j)} = 
\begin{cases} 
  0 & \text{if } i \neq j \\
  \prod_{\substack{j=0 \\ j \neq i}}^{n} (x_i - x_j) & \text{if } i = j 
\end{cases}
$$

Using this result, the Lagrange basis polynomial $L_{n,i}(x)$ can be elegantly rewritten in terms of $Q(x)$ and $Q'(x_i)$:

$$
L_{n, i}(x) = \frac{\frac{Q(x)}{x - x_i}}{Q'(x_i)} = \frac{Q(x)}{(x - x_i)Q'(x_i)}
$$

Finally, the interpolating polynomial $P(x)$ is constructed as a linear combination of these basis polynomials and the given function values $f(x_i)$:

$$
\begin{equation}
    P(x) = \sum_{i=0}^{n} \frac{Q(x)}{(x - x_i)Q'(x_i)} \cdot f(x_i)
\end{equation}
$$

## Uniqueness
Suppose there are two different polynomials $P(x)$ and $Q(x)$ that both interpolate the same set of points. Let 

$$
R(x) = P(x) - Q(x)
$$

Since both $P(x)$ and $Q(x)$ interpolate the same points, we have 

$$
R(x_i) = P(x_i) - Q(x_i) = 0 \quad \forall i = 0, 1, \ldots, n
$$

This means that $R(x)$ has at least $n+1$ distinct roots. However, a non-zero polynomial of degree at most $n$ can have at most $n$ distinct roots. Therefore, the only possibility is that $R(x)$ is the zero polynomial, which implies that $P(x) = Q(x)$ for all $x$. Hence, the Lagrange polynomial is unique.


## Error Analysis

Since we have known the points of interpolation, the error on $x_i$ is zero. However, for any other point $x$ that is not in the set of interpolation points, we construct a polynomial that vanishes at all the interpolation points, with a coefficient $c$ to be determined:

$$
f(x) = P(x) + c \prod_{j=0}^{n} (x - x_j)
$$

Since we do not know whether the error for all the points is linear or not, we cannot simply suppose that $c$ is a constant. Instead, we need to see $c$ as a function of $x$. Given $Q(x) = \prod_{j=0}^{n} (x - x_j)$, we can rewrite the above equation as:

$$
\begin{equation}
f(x) = P(x) + c(x) Q(x)
\end{equation}
$$

To analyze the error, we define a new auxiliary function $F(z)$ to assist our analysis:

$$
F(z) = f(z) - P(z) - c(x) Q(z)
$$

By construction, $F(z)$ has at least $n+2$ distinct roots $x_0, x_1, \ldots, x_n$, and it also trivially evaluates to zero at $z = x$ (since $F(x) = f(x) - P(x) - c(x)Q(x) = 0$ ). 
If we assume that $f(z)$ is sufficiently smooth (i.e., it has at least $n+1$ continuous derivatives), then by the repeated application of Rolle's theorem, there must exist a point $\xi$ in the interval containing both the interpolation points and $x$, such that the (n+1)-th derivative of $F(z)$ vanishes:

$$
F^{(n+1)}(\xi) = 0
$$

Calculating the (n+1)-th derivative of $F(z)$, we have:

$$
F^{(n+1)}(\xi) = f^{(n+1)}(\xi) - P^{(n+1)}(\xi) - c(x) Q^{(n+1)}(\xi)
$$

Since $P(z)$ is a polynomial of degree at most $n$, its (n+1)-th derivative is zero. Additionally, since $Q(z)$ is a product of $(n+1)$ linear factors, its (n+1)-th derivative is $(n+1)!$. Therefore, the above equation simplifies to:

$$
0 = f^{(n+1)}(\xi) - c(x) (n+1)!
$$

Solving for $c(x)$ gives us:

$$
c(x) = \frac{f^{(n+1)}(\xi)}{(n+1)!}
$$

Substituting this back into equation (3) yields the error formula for the Lagrange interpolation:

$$
\begin{equation}
f(x) = P(x) + \frac{f^{(n+1)}(\xi)}{(n+1)!} \prod_{j=0}^{n} (x - x_j)
\end{equation}
$$

## Derivative of Lagrange Polynomial
To find the derivative of the Lagrange polynomial $P(x)$, we need equation (1) and the expression for $L_{n,i}(x)$ in terms of $Q(x)$ and $Q'(x_i)$:

$$
\begin{equation}
P(x) = \sum_{i=0}^{n} f(x_i) L_{n,i}(x)
\end{equation}
$$

$$
\begin{equation}
L_{n, i}(x) = \frac{Q(x)}{(x - x_i)Q'(x_i)}
\end{equation}
$$

Differentiating $P(x)$ with respect to $x$ gives us:

$$
P'(x) = \sum_{i=0}^{n} f(x_i) L'_{n,i}(x)
$$

To compute $L'_{n,i}(x)$, we apply equation (6).

$$
Q(x) = (x - x_i)Q'(x_i) L_{n,i}(x)
$$

Differentiating both sides with respect to $x$ yields:

$$
Q'(x) = Q'(x_i) L_{n,i}(x) + (x - x_i) Q'(x_i) L'_{n,i}(x)
$$

- Case 1:

  If $x = x_j$ and $j \neq i$, the above equation simplifies to

  $$
  Q'(x_j) =  Q'(x_i) [L_{n, i}(x_j) + (x_j - x_i) L'_{n,i}(x_j)]
  $$

  where $L_{n, i}(x_j) = 0$ since $j \neq i$. Therefore, we can solve for $L'_{n,i}(x_j)$:

  $$
  L'_{n,i}(x_j) = \frac{Q'(x_j)}{(x_j - x_i) Q'(x_i)}
  $$

- Case 2:

  If $x = x_j$,and $j = i$, we need to do one more times of defferentiation to simplify the expression.
  
  $$
  Q''(x_j) = Q'(x_i) [L_{n,i}'(x_j) + L_{n,i}'(x_j) + (x_j - x_i) L''_{n,i}(x_j)]
  $$

  Since $x_i = x_j$, the above equation simplifies to

  $$
  L'_{n,i}(x_j) = \frac{Q''(x_j)}{2 Q'(x_i)}
  $$

## Error Analysis of the Derivative 
Recall the standard error formula for polynomial interpolation. For a sufficiently differentiable function $f(x)$ interpolated by a polynomial $P(x)$ of degree $n$ at distinct nodes $x_0, x_1, \dots, x_n$, the interpolation error is given by:

$$
    f(x) = P(x) + \frac{Q(x)}{(n+1)!} f^{(n+1)}(\xi_x)
$$

where $Q(x) = \prod_{i=0}^{n} (x - x_i)$ is the nodal polynomial, and $\xi_x$ is some point in the smallest interval containing $x$ and all nodes $x_i$. Crucially, $\xi_x$ depends on $x$, meaning it must be treated as a function $\xi(x)$ during differentiation.

To find the error of the derivative, we differentiate both sides with respect to $x$. Applying the product rule and the chain rule to the error term yields:

$$
    f'(x) = P'(x) + \frac{1}{(n+1)!} \underbrace{\left[ Q'(x) f^{(n+1)}(\xi(x)) + Q(x) f^{(n+2)}(\xi(x)) \cdot \xi'(x) \right]}_{R(x)}
$$

Let us define the bracketed term as $R(x)$.

The derivative of the nodal polynomial, $Q'(x)$, can be expanded using the product rule as follows:

$$
    Q'(x) = \sum_{j=0}^{n} \frac{Q(x)}{x - x_j} = \sum_{j=0}^{n} \prod_{\substack{k=0 \\ k \neq j}}^{n} (x - x_k)
$$

We are often interested in the derivative error precisely at the interpolation nodes, i.e., when $x = x_i$. Let us evaluate $R(x)$ at $x_i$:

$$
    R(x_i) = Q'(x_i) f^{(n+1)}(\xi(x_i)) + Q(x_i) f^{(n+2)}(\xi(x_i)) \cdot \xi'(x_i)
$$

Since $x_i$ is a root of the nodal polynomial, $Q(x_i) = 0$. This mathematical property conveniently eliminates the complex second term involving the unknown derivative $\xi'(x_i)$:

$$
    R(x_i) = Q'(x_i) f^{(n+1)}(\xi(x_i)) + 0
$$

By substituting $x = x_i$ into our expansion for $Q'(x)$, all terms in the summation vanish except the term where $j=i$, yielding:

$$
    Q'(x_i) = \prod_{\substack{k=0 \\ k \neq i}}^{n} (x_i - x_k)
$$

Therefore, the exact formulation for the derivative at an interpolation node $x_i$ simplifies to:

$$
    f'(x_i) = P'(x_i) + \frac{f^{(n+1)}(\xi(x_i))}{(n+1)!} \prod_{\substack{k=0 \\ k \neq i}}^{n} (x_i - x_k)
$$

## Integration of Lagrange Interpolation

Let the integration interval $[a, b]$ be partitioned into $n$ equal subintervals with step size $\Delta x = \frac{b-a}{n}$, where $n$ is an even integer. The grid points are defined as:

$$
\begin{equation*}
    x_i = a + i\Delta x
\end{equation*}
$$

To derive Simpson's rule, we approximate the integrand $f(x)$ over each subinterval $[x_{i-1}, x_{i+1}]$ using a quadratic polynomial $P_2(x) = ax^2 + bx + c$. This parabola is uniquely determined by passing through three adjacent points: $(x_{i-1}, f(x_{i-1}))$, $(x_i, f(x_i))$, and $(x_{i+1}, f(x_{i+1}))$.

Using Lagrange interpolation, this quadratic polynomial can be expressed as a linear combination of Lagrange basis polynomials:

$$
\begin{equation*}
    P_2(x) = L_0(x)f(x_{i-1}) + L_1(x)f(x_i) + L_2(x)f(x_{i+1})
\end{equation*}
$$

The basis polynomials $L_0(x)$, $L_1(x)$, and $L_2(x)$ are formulated as follows. We simplify the denominators by utilizing the uniform spacing constraint $x_k - x_{k-1} = \Delta x$:

$$
\begin{align*}
    L_0(x) &= \frac{(x-x_i)(x-x_{i+1})}{(x_{i-1}-x_i)(x_{i-1}-x_{i+1})} = \frac{(x-x_i)(x-x_{i+1})}{2(\Delta x)^2} \\[1em]
    L_1(x) &= \frac{(x-x_{i-1})(x-x_{i+1})}{(x_i-x_{i-1})(x_i-x_{i+1})} = \frac{(x-x_{i-1})(x-x_{i+1})}{-(\Delta x)^2} \\[1em]
    L_2(x) &= \frac{(x-x_{i-1})(x-x_i)}{(x_{i+1}-x_{i-1})(x_{i+1}-x_i)} = \frac{(x-x_{i-1})(x-x_i)}{2(\Delta x)^2}
\end{align*}
$$

To find the approximate area under $f(x)$, we integrate $P_2(x)$ over the sub-domain $[x_{i-1}, x_{i+1}]$. We then sum these local integrals over the $n/2$ sub-domains to cover the entire interval $[a, b]$:

$$
\begin{align*}
    \sum_{i=1, 3, 5\dots}^{n-1} \int_{x_{i-1}}^{x_{i+1}} P_2(x) \,dx &= \sum_{i=1, 3, 5\dots}^{n-1} \int_{x_{i-1}}^{x_{i+1}} \Big[ L_0(x)f(x_{i-1}) + L_1(x)f(x_i) + L_2(x)f(x_{i+1}) \Big] \,dx
\end{align*}
$$

To elegantly evaluate the integral of each basis polynomial, we apply the affine transformation $x = x_i + t\Delta x$, which implies $dx = \Delta x \,dt$. This standardizes the limits of integration from $[x_{i-1}, x_{i+1}]$ to $[-1, 1]$.

$$
\begin{align*}
\int_{x_{i-1}}^{x_{i+1}} L_0(x) \,dx &= \int_{x_{i-1}}^{x_{i+1}} \frac{(x-x_i)(x-x_{i+1})}{2(\Delta x)^2} \,dx \\
&= \int_{-1}^{1} \frac{(t\Delta x) \cdot (t-1)\Delta x}{2(\Delta x)^2} \Delta x \,dt \\
&= \frac{\Delta x}{2} \int_{-1}^{1} (t^2 - t) \,dt \\
&= \frac{\Delta x}{2} \left[ \frac{1}{3}t^3 - \frac{1}{2}t^2 \right]_{-1}^{1} = \frac{1}{3}\Delta x \\[1.5em]
\int_{x_{i-1}}^{x_{i+1}} L_1(x) \,dx &= \int_{x_{i-1}}^{x_{i+1}} \frac{(x-x_{i-1})(x-x_{i+1})}{-(\Delta x)^2} \,dx \\
&= \int_{-1}^{1} \frac{(t+1)\Delta x \cdot (t-1)\Delta x}{-(\Delta x)^2} \Delta x \,dt \\
&= -\Delta x \int_{-1}^{1} (t^2 - 1) \,dt \\
&= -\Delta x \left[ \frac{1}{3}t^3 - t \right]_{-1}^{1} = \frac{4}{3}\Delta x \\[1.5em]
\int_{x_{i-1}}^{x_{i+1}} L_2(x) \,dx &= \int_{x_{i-1}}^{x_{i+1}} \frac{(x-x_{i-1})(x-x_i)}{2(\Delta x)^2} \,dx \\
&= \int_{-1}^{1} \frac{(t+1)\Delta x \cdot (t\Delta x)}{2(\Delta x)^2} \Delta x \,dt \\
&= \frac{\Delta x}{2} \int_{-1}^{1} (t^2 + t) \,dt \\
&= \frac{\Delta x}{2} \left[ \frac{1}{3}t^3 + \frac{1}{2}t^2 \right]_{-1}^{1} = \frac{1}{3}\Delta x
\end{align*}
$$

Substituting these algebraically evaluated integrals back into the global summation yields the composite Simpson's Rule:

$$
\begin{align*}
    \int_a^b f(x) \,dx &\approx \sum_{i=1, 3, 5\dots}^{n-1} \left[ \frac{1}{3}\Delta x f(x_{i-1}) + \frac{4}{3}\Delta x f(x_i) + \frac{1}{3}\Delta x f(x_{i+1}) \right] \\
    &= \frac{\Delta x}{3} \sum_{i=1, 3, 5\dots}^{n-1} \Big[ f(x_{i-1}) + 4f(x_i) + f(x_{i+1}) \Big]
\end{align*}
$$



