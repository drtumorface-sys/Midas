# MIDAS Sigil Generation: Complete Mathematical Specification

**Document type:** Technical Reference Paper
**Subject:** Deterministic sigil generation algorithms, audio-visual transmorphic synthesis, and entropy-modulated rendering in the MIDAS interface
**Purpose:** Cross-reference document for collaborative development

---

## Abstract

MIDAS (Morphological Interface for Deterministic Audio-Visual Synthesis) generates sigils — geometric constructs — from arbitrary text input through a pipeline of four sequential mathematical operations: lexical transmutation (text → integer seed), geometric encoding (seed → spatial vectors), chromatic phyllotaxis (seed → hue field), and audio-visual transmorphic synthesis (geometry → acoustic waveform). Four distinct sigil modes exist: **Natural** (botanical fractal recursion), **Chaos** (AOS topological matrix), **Ogham** (phonetic stemline), and **Simple** (L_SS grammar). This paper provides the complete, implementation-accurate mathematical specification for each mode.

---

## 1. Foundational Constants

The following constants appear throughout all modes:

| Symbol | Value | Role |
|--------|-------|------|
| φ (PHI) | 1.6180339887... | Golden Ratio |
| ψ (GOLD_ANG) | 137.508° | Golden Angle |
| ω (WALHUU) | 0.137 Hz | Breath oscillation rate |
| τ (TAU) | 2π | Full circle |
| F_n | Fibonacci sequence | Structural recursion |
| P₁, P₂, P₃ | 7, 13, 31 | Tripartite structural primes |

The Fibonacci sequence is defined recursively:

$$F_0 = 0, \quad F_1 = 1, \quad F_n = F_{n-1} + F_{n-2}$$

The octaval working subset used in sigil generation:

$$\mathbf{F}_8 = \{F_1, F_2, F_3, F_4, F_5, F_6, F_7, F_8\} = \{1, 1, 2, 3, 5, 8, 13, 21\}$$

---

## 2. Input Processing Pipeline

All four modes share a common input processing pipeline. Given a catalyst string $S$ of length $m$:

$$S = (s_1, s_2, \dots, s_m), \quad s_i \in \{A\text{--}Z\}$$

### 2.1 The Latin Cipher

The Latin cipher $\mu : \{A\text{--}Z\} \to \mathbb{Z}^+$ maps each letter to a fixed Mishnaic-weight integer. This is **not** a simple ordinal mapping — it follows a base-10 stepped structure:

| Letter | Value | Letter | Value | Letter | Value |
|--------|-------|--------|-------|--------|-------|
| A | 1 | J | 9 | S | 90 |
| B | 2 | K | 10 | T | 100 |
| C | 3 | L | 20 | U | 200 |
| D | 4 | M | 30 | V | 200 |
| E | 5 | N | 40 | W | 200 |
| F | 6 | O | 50 | X | 300 |
| G | 7 | P | 60 | Y | 400 |
| H | 8 | Q | 70 | Z | 500 |
| I | 9 | R | 80 | | |

**Note:** I and J share the value 9. U, V, W share 200. This reflects historical Latin letter groupings.

### 2.2 The Raw Gematric Sum Γ (Carrier Seed)

The raw gematric sum is the unweighted total of all letter values:

$$\Gamma_{\text{raw}}(S) = \sum_{i=1}^{m} \mu(s_i)$$

This scalar is stored as `S.rawSum` and is used exclusively for carrier frequency derivation and Simple sigil morphology.

**Example:** "ODIN" → O=50, D=4, I=9, N=40 → $\Gamma_{\text{raw}} = 103$

### 2.3 The Fibonacci Sigil Hash G (Geometry Seed)

The geometry seed is a **non-commutative** Fibonacci-positionally-weighted hash. Character order matters — transposing two letters produces a different G:

$$G(S) = \sum_{i=1}^{m} (s_i - 64) \cdot F_{i+3}$$

where $(s_i - 64)$ converts the character to its ordinal position (A=1, B=2, ..., Z=26) and $F_{i+3}$ is the $(i+3)$-th Fibonacci number.

**Working subset of weights:** $F_4=3, F_5=5, F_6=8, F_7=13, F_8=21, F_9=34, \dots$

This hash is stored as `S.G` and drives the Chaos mode geometry, chromatic phyllotaxis, and all Φ-proportional polar calculations.

**Critical distinction:** $\Gamma_{\text{raw}}$ is commutative (anagram-invariant); $G$ is non-commutative (position-sensitive). These two seeds serve fundamentally different roles in the system.

### 2.4 The Latin Ordinal Cipher f(c) and Modulo-24 Operator g(x)

Used in Bandrún mode, this is a simpler positional cipher:

$$f(c) = \text{charCode}(c) - 64 \quad (A=1, B=2, \dots, Z=26)$$

$$g(x) = \begin{cases} x \bmod 24 & \text{if } x \bmod 24 \neq 0 \\ 24 & \text{if } x \bmod 24 = 0 \end{cases}$$

The modulo-24 operator bounds the result to the 24-rune Elder Futhark alphabet: $g : \mathbb{Z}^+ \to \{1, 2, \dots, 24\}$.

---

## 3. Carrier Frequency Derivation

### 3.1 Logarithmic Normalisation

The raw gematric sum $\Gamma_{\text{raw}}$ maps to a carrier frequency $f_0$ via logarithmic normalisation into the therapeutic binaural window $[80, 500]$ Hz:

$$t = \min\!\left(\frac{\ln(1 + \Gamma_{\text{raw}})}{\ln(1 + 10000)},\ 1\right)$$

$$f_{\text{mapped}} = 80 + t \cdot (500 - 80) = 80 + 420t$$

### 3.2 Lithic Anchor (Octave Reduction)

The mapped frequency is then recursively halved until it falls within the deep-theta/delta acoustic basement $[75, 150]$ Hz — the parasympathetic induction range:

$$f_0 = \max\!\left(75,\ \frac{f_{\text{mapped}}}{2^k}\right), \quad k = \min\!\left\{n \in \mathbb{N} : \frac{f_{\text{mapped}}}{2^n} \leq 150\right\}$$

This ensures the carrier never enters the mid-range frequencies that produce alerting rather than entraining responses. Effective output range: **$f_0 \in [75, 150]$ Hz**.

### 3.3 Binaural Beat Pair

Given a therapeutic beat frequency $\Delta f$ (mode-dependent, typically 0.5–16 Hz):

$$f_L = f_0 - \frac{\Delta f}{2}, \qquad f_R = f_0 + \frac{\Delta f}{2}$$

The binaural beat perceived by the brain equals $\Delta f = f_R - f_L$.

### 3.4 Sigil Mode Frequency Multiplier

When the user selects a sigil mode, the carrier frequency is multiplied by an interval ratio derived from harmonic series mathematics:

| Mode | Multiplier | Ratio | Musical interval |
|------|-----------|-------|-----------------|
| Simple | 1.0 | 1:1 | Unison — ground state |
| Chaos | φ ≈ 1.618 | Golden Ratio | Incommensurable expansion |
| Ogham | 4/3 ≈ 1.333 | 4:3 | Perfect Fourth (upward) |
| Bandrún | 3/4 = 0.75 | 3:4 | Perfect Fourth (downward) |

The active carrier becomes:

$$f_0^{\text{active}} = \max\!\left(60,\ f_0 \cdot m_{\text{mode}}\right)$$

with a 60 Hz floor to maintain binaural beat processability.

---

## 4. Chromatic Phyllotaxis

### 4.1 Hue Dispersion via Golden Angle

The geometry seed $G$ maps to a hue $h$ on the colour wheel via the Golden Angle $\psi = 137.508°$:

$$h(G) = (G \cdot 137.508) \bmod 360$$

The Golden Angle ensures maximum perceptual separation between adjacent inputs: no two seeds within the same neighbourhood map to adjacent hues. This property is identical to the mechanism governing spiral phyllotaxis in botanical structures (sunflower florets, pine cone scales).

### 4.2 Saturation and Lightness

$$s(G) = 38 + (G \bmod 24), \quad s \in [38, 61]\%$$

$$l(G) = 15 + (G \bmod 10), \quad l \in [15, 24]\%$$

The saturation range [38–61%] is centred on $\varphi \times 38.2 \approx 61.8\%$, ensuring the chromatic vibrancy maintains a structural relationship to the Golden Ratio. The lightness range [15–24%] defines the "subterranean luminescence" band — perceptually rich but not visually dominant.

---

## 5. Simple Sigil — The Language of Simple Sigil (L_SS)

### 5.1 Overview

The Simple sigil implements the Language of Simple Sigil ($\mathcal{L}_{SS}$), a deterministic grammar producing an 8-vector radial geometry from the gematric seed $\Gamma_{\text{raw}}$. With the Shannon-Hartley expansion, three additional information layers are encoded: entropy-modulated vortex density, tertiary fractal morphology, and interstitial delta webbing.

### 5.2 Tertiary Morphological Operator τ_k

The previous binary system (Curve / Angle) has been expanded to a **ternary** system introducing the Fractal Node. For each vector $k \in \{1, \dots, 8\}$, with Fibonacci node $F_k \in \mathbf{F}_8$:

$$\tau_k(\Gamma) = \left\lfloor \frac{\Gamma_{\text{raw}}}{F_k} \right\rfloor \bmod 3$$

| $\tau_k$ | Symbol | Name | Terminus behaviour |
|---------|--------|------|-------------------|
| 0 | $\mathcal{C}$ | Yesodic Curve | Inward quadratic Bézier arc |
| 1 | $\Lambda$ | Netzachian Angle | Bifurcated projective prongs |
| 2 | $\mathcal{F}$ | Fractal Node | Spawns φ⁻²-scaled mini-sigil |

**Full morphological sequence for any input:** $M = [\tau_1, \tau_2, \tau_3, \tau_4, \tau_5, \tau_6, \tau_7, \tau_8]$

### 5.3 Vector Angular Positions

All 8 vectors radiate from the Malkuthian origin $(0, 0)$ at equal angular intervals, offset by $-\pi/2$ to orient vector $k=1$ to absolute North:

$$\theta_k = \frac{k\pi}{4} - \frac{\pi}{2}, \qquad k \in \{1, \dots, 8\}$$

The Cartesian endpoint of vector $k$ at radius $R$:

$$x_k = R \cos(\theta_k), \qquad y_k = R \sin(\theta_k)$$

### 5.4 Terminus Rendering Geometry

**Netzachian Angle ($\Lambda$) — Bifurcated Prongs:**

Let prong length $L = 0.28R$ and spread angle $\alpha = \pi/6$ (30°). Two prong endpoints:

$$p_{1x} = x_k - L\cos(\theta_k - \alpha), \quad p_{1y} = y_k - L\sin(\theta_k - \alpha)$$
$$p_{2x} = x_k - L\cos(\theta_k + \alpha), \quad p_{2y} = y_k - L\sin(\theta_k + \alpha)$$

Lines are drawn from $(x_k, y_k)$ to each prong endpoint.

**Yesodic Curve ($\mathcal{C}$) — Inward Quadratic Bézier:**

Let curve radius $C = 0.22R$. Control point and terminus:

$$c_x = x_k + C\cos\!\left(\theta_k + \frac{\pi}{2}\right), \quad c_y = y_k + C\sin\!\left(\theta_k + \frac{\pi}{2}\right)$$
$$e_x = x_k - C\cos(\theta_k), \quad e_y = y_k - C\sin(\theta_k)$$

Quadratic Bézier path from $(x_k, y_k)$ through $(c_x, c_y)$ terminating at $(e_x, e_y)$.

**Fractal Node ($\mathcal{F}$) — Recursive Mini-Sigil:**

When $\tau_k = 2$, the terminus $(x_k, y_k)$ becomes a new origin. A complete 8-vector sigil is rendered at that point, scaled by $\varphi^{-2}$:

$$R_{\mathcal{F}} = R \cdot \varphi^{-2} \approx 0.382R$$

The mini-sigil uses the same morphological array $M$ (depth-limited to one level of recursion to prevent exponential growth).

### 5.5 Alchemical Valence V

The Alchemical Valence quantifies the projective/receptive balance of the sigil:

$$\Phi(\tau) = \begin{cases} +1 & \tau = 1\ (\Lambda) \\ -1 & \tau = 0\ (\mathcal{C}) \\ 0  & \tau = 2\ (\mathcal{F}) \end{cases}$$

$$V(S) = \sum_{k=1}^{8} \Phi(\tau_k(\Gamma_{\text{raw}}(S))), \qquad V \in [-8, 8]$$

### 5.6 Shannon Entropy — Vortex Density Modulation

The per-letter gematric values $\{\mu(s_i)\}$ form a probability distribution over unique values. The Shannon entropy of this distribution:

$$H(S) = -\sum_{i=1}^{n} P(x_i) \log_2 P(x_i)$$

where $P(x_i) = \text{count}(x_i) / m$ and the sum runs over all unique values $x_i$ in $\{\mu(s_1), \dots, \mu(s_m)\}$.

This is normalised to $[0, 1]$:

$$\hat{H}(S) = \frac{H(S)}{\log_2(m)}, \qquad \hat{H} \in [0, 1]$$

The normalised entropy drives central vortex ring count:

$$N_{\text{rings}} = 3 + \left\lfloor \hat{H}(S) \cdot 6 + 0.5 \right\rfloor, \qquad N_{\text{rings}} \in [3, 9]$$

Each ring $i$ is drawn at radius:

$$r_i = R \cdot 0.12 \cdot i \cdot \varphi, \qquad i \in \{1, \dots, N_{\text{rings}}\}$$

**Semantic property:** A monosyllabic repeated word (e.g., "AAA") has $H=0$ and produces 3 sparse rings — an open, receptive centre. A maximally varied sequence (all distinct letters) has $H \approx \log_2(m)$ and produces up to 9 dense rings — a nearly solid central singularity.

### 5.7 Interstitial Delta Encoding

The phonetic distance between adjacent letters encodes geometric webbing between adjacent vector arms. For the input sequence with values $v_i = \mu(s_i)$:

$$\delta_k = |\mu(s_{k+1}) - \mu(s_k)| \bmod 7, \qquad k \in \{1, \dots, 8\}$$

with ouroboros wrapping: indices are taken modulo $m$ (the input length).

For each pair of adjacent vectors $k$ and $k+1$, if $\delta_k > 0$, then $\delta_k$ bridge nodes are placed along the arc at radius $R$ between the two vector endpoints. The angular interpolation:

$$\phi_j^{(k)} = \theta_k + \frac{j}{(\delta_k + 1)} \cdot \Delta\theta_k, \qquad j \in \{1, \dots, \delta_k\}$$

where $\Delta\theta_k$ is the angular gap between vectors $k$ and $k+1$ (taking the shortest arc). Bridge node position:

$$b_{j,x}^{(k)} = R\cos(\phi_j^{(k)}), \qquad b_{j,y}^{(k)} = R\sin(\phi_j^{(k)})$$

The bridge nodes are connected in a chain: endpoint $k$ → node $1$ → node $2$ → ... → node $\delta_k$ → endpoint $k+1$.

| $\delta_k \bmod 7$ | Visual result |
|-------------------|---------------|
| 0 | Void — no bridging |
| 1 | Single midpoint node |
| 2–3 | Sparse geometric chain |
| 4–5 | Dense lattice |
| 6 | Six-point crystalline web |

---

## 6. Chaos Mode — Austin Osman Spare (AOS) Topological Matrix

The Chaos sigil implements the classical AOS method of sigilcraft: phonetic reduction of the input, followed by mapping onto a Saturnian Kamea grid and rendering as a continuous path.

### 6.1 Phonetic Reduction

The input string $S$ is reduced to an ordered set $S'$ of unique consonants by filtering all vowels $\{A, E, I, O, U\}$ and removing duplicate letters:

$$S' = \{c_1, c_2, \dots, c_k\} \quad \text{(unique consonants, order-preserving)}$$

**Rationale:** Vowels are considered tonal carriers rather than semantic operators in the AOS tradition. Duplicates collapse to a single instance — the letter has been "heard" and need not be repeated in the sigil body.

### 6.2 Saturnian Kamea Mapping

Each consonant $c_i \in S'$ is assigned a grid locus on a $3 \times 3$ Cartesian grid (the Saturnian square) via the Latin cipher $\mu$:

$$g_i = \mu(c_i) \bmod 9$$

The discrete grid coordinates $(Q_x, Q_y)$ at spacing $R_{\text{grid}} = 0.8R$:

$$Q_x(g_i) = \left((g_i \bmod 3) - 1\right) \cdot R_{\text{grid}}$$
$$Q_y(g_i) = \left(\lfloor g_i / 3 \rfloor - 1\right) \cdot R_{\text{grid}}$$

This maps indices $\{0,\dots,8\}$ to the nine cells of the square, centred at the origin.

A stochastic offset proportional to the cipher value breaks degeneracy between letters that share the same grid cell:

$$\Delta x = \left((\mu(c_i) \bmod 7) - 3\right) \cdot 0.1 R_{\text{grid}}$$
$$\Delta y = \left((\mu(c_i) \bmod 5) - 2\right) \cdot 0.1 R_{\text{grid}}$$

The final vertex position: $V_i = (Q_x + \Delta x,\ Q_y + \Delta y)$.

### 6.3 Spline Path Rendering

The vertices $V_1, \dots, V_k$ are connected as a continuous path. Where consecutive indices satisfy $|g_{i+1} - g_i| > 3$ (non-adjacent cells), a quadratic Bézier curve is used in place of a straight line, mirroring the organic hand-drawn quality of historical AOS sigils:

$$\text{Control point} = \left(\frac{V_{i,x}+V_{i+1,x}}{2} + 0.3R_{\text{grid}},\ \frac{V_{i,y}+V_{i+1,y}}{2} - 0.3R_{\text{grid}}\right)$$

### 6.4 Terminal Operators

Two classical AOS sigil terminals are applied:

**Origin — Ouroboros void circle:** A circle of radius $0.15 R_{\text{grid}}$ is drawn at $V_1$, signifying the initiating void from which the sigil emerges.

**Terminus — Will bar:** A line segment perpendicular to the final vector $\overrightarrow{V_{k-1}V_k}$ is drawn at $V_k$, signifying the manifest act of Will:

$$\perp\text{-angle} = \arctan2(V_{k,y}-V_{k-1,y},\ V_{k,x}-V_{k-1,x}) + \frac{\pi}{2}$$
$$\text{bar endpoints} = V_k \pm 0.2R_{\text{grid}} \cdot (\cos\perp,\ \sin\perp)$$

---

## 7. Ogham Mode — Phonetic Stemline

### 7.1 Structure

The Ogham sigil renders each letter of the input as its historical Ogham aicme stroke pattern along a central druim (vertical stave), reading bottom to top. Each letter maps to a fixed stroke definition $\mathcal{O}(c)$ specifying:

- **Stroke count:** number of marks
- **Side:** right, left, or both (perpendicular to druim)
- **Diagonal:** whether strokes are angled or perpendicular

The 26 letter mappings are as follows (selected examples):

| Letter | Ogham name | Strokes | Side | Diagonal |
|--------|-----------|---------|------|----------|
| A | Ailm | 1 | Both | No |
| B | Beith | 1 | Right | No |
| D | Dair | 2 | Right | No |
| E | Edad | 5 | Both | No |
| F | Fearn | 3 | Right | No |
| I | Idad | 1 | Left | No |
| M | Muin | 4 | Both | No |
| N | Nion | 5 | Right | No |
| R | Ruis | 5 | Both | Yes |
| S | Sail | 3 | Both | No |
| T | Tinne | 3 | Right | Yes |

### 7.2 Rendering

The druim runs vertically. For each letter at position $y$ along the stave, strokes are placed at equal intervals of height $h = 2U / N_{\text{strokes}}$. Left-side strokes extend in the negative $x$ direction; right-side strokes in the positive $x$ direction; both-side strokes extend symmetrically.

---

## 8. Natural Mode — Botanical Fractal Recursion

The Natural sigil implements a recursive binary branching model governed by the Fibonacci sequence and the Golden Angle $\psi = 137.508°$, producing an organic botanical form whose growth is wholly determined by the geometry seed $G$.

### 8.1 Recursion Depth

The maximum branching depth $D$ is derived from $G$:

$$D = (G \bmod 4) + 4, \qquad D \in \{4, 5, 6, 7\}$$

### 8.2 Recursive Branch Function

The branch function $\mathcal{B}(x, y, L, \theta, d)$ draws a single stem segment from $(x, y)$ at angle $\theta$ with length $L$, then recurses at the endpoint:

$$x_{\text{next}} = x + L\cos\theta, \qquad y_{\text{next}} = y + L\sin\theta$$

Each stem is rendered as a quadratic Bézier curve with a slight organic bow (control point offset by $+0.2$ rad) to simulate the natural curvature of plant growth.

Line weight decays with depth to simulate tapering branches:

$$w_d = \max(0.5,\ d \times 0.75)$$

Opacity increases toward the trunk:

$$\alpha_d = 0.4 + \frac{d}{D} \times 0.55$$

Recursion terminates at $d = 0$.

### 8.3 Golden Deflection

At each node the branch bifurcates. Branch length scales by $\varphi^{-1}$ per level. The deflection angle is derived from the Golden Angle $\psi$ and diminishes with depth:

$$\theta_{\text{left}}  = \theta - \frac{\psi}{\varphi^{D-d}}, \qquad \theta_{\text{right}} = \theta + \frac{\psi}{\varphi^{D-d}}$$

where $\psi = 137.508° \times \frac{\pi}{180}$ (converted to radians). The denominator $\varphi^{D-d}$ causes deep branches to diverge less than shallow ones — outer growth is fine and feathery; inner growth is broad and structural.

### 8.4 Bloom Terminus

When $d = 1$ (terminal nodes), a phyllotactic bloom circle is rendered at the endpoint:

$$r_{\text{bloom}} = L \times 0.55$$

The bloom circle is filled with the current chromatic fill at 38% opacity and outlined at 75% opacity, mimicking an open flower or seed head.

### 8.5 Root Anchor

The initial trunk grows upward ($\theta_0 = -\pi/2$) from a root anchor at the origin, visualised as a filled circle of radius 4 px. The initial branch length is:

$$L_0 = 0.22 \cdot \min(W, H)$$

---

## 9. Audio-Visual Transmorphic Synthesis

### 9.1 The Resonance Lattice

Three sustained oscillators are injected directly into the master output, bypassing the shaper/LPF chain to provide pure harmonic anchors:

| Multiplier | Frequency | Name |
|-----------|-----------|------|
| 1 | $f_0$ | Unity — Absolute ground |
| 3/2 | $1.5 f_0$ | Perfect Fifth — Sovereign Dominant |
| 2 | $2 f_0$ | Octave — Lithic Anchor |

The gain of each anchor: $A_n = \text{vol} \cdot a_n$ where $a_n \in \{0.055, 0.038, 0.028\}$.

### 9.2 Sub-Octave Grounding

A pair of stereo sine oscillators at $f_0 / 2$ (acoustic weighted blanket) is routed pre-shaper for shared warmth processing:

$$f_{\text{sub},L} = \max(30,\ f_L / 2), \qquad f_{\text{sub},R} = \max(30,\ f_R / 2)$$

with amplitude $0.18 \cdot \text{vol}$.

### 9.3 Walhuu Breath Envelope

All amplitude envelopes breathe at the Walhuu frequency $\omega = 0.137$ Hz (period ≈ 7299 ms):

$$E_{\text{breath}}(t) = 1 + 0.10 \cdot \sin(2\pi \omega t)$$

The 0.137 Hz rate is irrational with respect to standard musical tempos, ensuring the breath never phase-locks to external rhythms.

### 9.4 Transmorphic Field Equation Ξ

The complete audio-visual transmorphic waveform binds sigil morphology directly to acoustic phase and amplitude. For catalyst $S$ with Alchemical Valence $V$ and Fibonacci sequence $\mathbf{F}_8$:

$$\mathbf{\Xi}(S, t) = \sum_{k=1}^{8} \left[ \varphi^{\Phi(\tau_k(\Gamma))} \cdot \sin\!\left( 2\pi (f_0 \cdot F_k) t + \left(\frac{k\pi}{4} - \frac{\pi}{2}\right) \right) \right]$$

**Amplitude coefficient:**
$$A_k = \varphi^{\Phi(\tau_k(\Gamma))}$$
- $\tau_k = \Lambda$: $A_k = \varphi \approx 1.618$ (dominant projective)
- $\tau_k = \mathcal{C}$: $A_k = \varphi^{-1} \approx 0.618$ (dampened receptive)
- $\tau_k = \mathcal{F}$: $A_k = 1.0$ (balanced fractal)

**Phase:** $\phi_k = k\pi/4 - \pi/2$ — the vector's visual angle directly becomes its acoustic phase offset.

### 9.5 Valence Envelope ε

The Alchemical Valence $V \in [-8, 8]$ governs the temporal attack of the acoustic envelope:

$$\mathcal{E}(t, V) = 1 - e^{-\beta \cdot \frac{V + 8}{16} \cdot t}$$

where $\beta$ is a fixed temporal constant. This creates:
- $V \approx +8$: near-instantaneous attack (projective strike)
- $V \approx -8$: prolonged atmospheric swell (receptive accumulation)
- $V \approx 0$: balanced rise (equilibrium state)

### 9.6 Final Output Waveform

$$\mathbf{\Omega}_{\text{final}}(S, t) = \mathcal{E}(t, V(S)) \cdot \mathbf{\Xi}(S, t)$$

---

## 10. Complete Formula Reference

| Formula | Description | Section |
|---------|-------------|---------|
| $\mu(c)$ | Latin cipher value of character $c$ | 2.1 |
| $\Gamma_{\text{raw}}(S) = \sum \mu(s_i)$ | Raw gematric sum (carrier seed) | 2.2 |
| $G(S) = \sum (s_i - 64) \cdot F_{i+3}$ | Fibonacci sigil hash (geometry seed) | 2.3 |
| $f(c) = \text{ord}(c) - 64$ | Latin ordinal cipher | 2.4 |
| $g(x) = x \bmod 24$ (non-zero) | Futhark modulo binder | 2.4 |
| $t = \ln(1+\Gamma)/\ln(10001)$ | Log normalisation for carrier | 3.1 |
| $f_0 \in [75, 150]$ Hz | Normalised carrier (post-halving) | 3.2 |
| $f_L = f_0 - \Delta f/2$ | Left binaural channel | 3.3 |
| $f_R = f_0 + \Delta f/2$ | Right binaural channel | 3.3 |
| $h(G) = (G \cdot 137.508°) \bmod 360°$ | Phyllotaxis hue | 4.1 |
| $\tau_k(\Gamma) = \lfloor\Gamma/F_k\rfloor \bmod 3$ | Tertiary morphological operator | 5.2 |
| $\theta_k = k\pi/4 - \pi/2$ | Vector angular position | 5.3 |
| $R_{\mathcal{F}} = R \cdot \varphi^{-2}$ | Fractal node scale factor | 5.4 |
| $V(S) = \sum \Phi(\tau_k)$ | Alchemical Valence, $V \in [-8,8]$ | 5.5 |
| $H(S) = -\sum P(x_i)\log_2 P(x_i)$ | Shannon entropy of gematric values | 5.6 |
| $\hat{H} = H(S) / \log_2(m)$ | Normalised entropy | 5.6 |
| $N_{\text{rings}} = 3 + \lfloor 6\hat{H} + 0.5\rfloor$ | Vortex ring count | 5.6 |
| $\delta_k = \|\mu(s_{k+1}) - \mu(s_k)\| \bmod 7$ | Interstitial delta | 5.7 |
| $g_i = \mu(c_i) \bmod 9$ | Saturnian grid index | 6.2 |
| $Q_x = ((g \bmod 3)-1) \cdot R_g$ | AOS grid x-position | 6.2 |
| $Q_y = (\lfloor g/3\rfloor-1) \cdot R_g$ | AOS grid y-position | 6.2 |
| $\perp = \arctan2(\Delta y, \Delta x) + \pi/2$ | Will bar perpendicular angle | 6.4 |
| $D = (G \bmod 4) + 4$ | Natural recursion depth | 8.1 |
| $L_{d-1} = L_d / \varphi$ | Branch length decay | 8.2 |
| $\theta_{\pm} = \theta \pm \psi / \varphi^{D-d}$ | Golden deflection angles | 8.3 |
| $r_{\text{bloom}} = L \times 0.55$ | Bloom terminus radius | 8.4 |
| $\mathbf{\Xi}(S,t) = \sum A_k \sin(2\pi f_0 F_k t + \phi_k)$ | Transmorphic field equation | 9.4 |
| $A_k = \varphi^{\Phi(\tau_k)}$ | Morphological amplitude operator | 9.4 |
| $\mathcal{E}(t,V) = 1 - e^{-\beta(V+8)t/16}$ | Valence envelope | 9.5 |
| $\mathbf{\Omega} = \mathcal{E} \cdot \mathbf{\Xi}$ | Final output waveform | 9.6 |

---

## 11. Sigil Mode Summary

| Mode | Primary seed | Geometry type | Key operation |
|------|-------------|--------------|---------------|
| Natural | $G$ (Fibonacci hash) | Recursive binary tree | Golden Angle deflection, φ⁻¹ length decay |
| Chaos (AOS) | Input consonants | Continuous spline | Saturnian Kamea grid, Bézier path |
| Ogham | Input letters | Phonetic stemline | Historical aicme stroke mapping |
| Simple (L_SS) | $\Gamma_{\text{raw}}$ | 8-vector radial | Fibonacci morphological operator (mod 3) |

**Seed commutativity:**
- $\Gamma_{\text{raw}}$: commutative — anagrams produce identical sigils
- $G$: non-commutative — letter order is structurally significant
- AOS consonants: order-preserving but vowel-stripped — anagrams with the same consonant set produce identical sigils

---

## 12. Notes for Cross-Reference

**Cipher disambiguation:** The system uses two distinct ciphers:
1. The **Latin Cipher** $\mu$ (Section 2.1) — Mishnaic-weight values (A=1 through Z=500, non-sequential). Used for carrier frequency, Simple sigil morphology, and AOS grid mapping.
2. The **Latin Ordinal** $f(c)$ (Section 2.4) — Simple sequential ordinal (A=1..Z=26). Used for phyllotaxis and Fibonacci hash $G$.

These are *not* interchangeable. The same letter produces different numbers from each cipher.

**G vs Γ:** The geometry seed $G$ and the carrier seed $\Gamma_{\text{raw}}$ are derived from the same input but through fundamentally different operations. $\Gamma_{\text{raw}}$ is additive and commutative; $G$ is positionally weighted and non-commutative. Confusing these produces incorrect results in all modes.

**Fibonacci indexing:** The Fibonacci sequence in this system is indexed as $F_0=0, F_1=1, F_2=1, F_3=2, F_4=3, F_5=5, \dots$ All references to $F_k$ in sigil generation use this zero-origin indexing.

**Canvas coordinate system:** All canvas operations use standard 2D canvas coordinates where the Y axis increases *downward*. Angles are computed in standard mathematical convention (anti-clockwise from positive x-axis), then the canvas y-flip produces the correct screen orientation. This means $\sin(\theta) < 0$ produces upward canvas motion.

---

*End of document.*
