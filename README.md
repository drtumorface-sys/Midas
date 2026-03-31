# M · I · D · A · S

**Modulated Interval Drift & Acoustic Sanctuary**

A single-file therapeutic application combining binaural beat entrainment, guided breath pacing, and live sigil rendering — built on the Web Audio API and Canvas 2D, deployable as a Progressive Web App with zero dependencies.

---

## Table of Contents

1. [Overview](#overview)
2. [The Mathematics](#the-mathematics)
   - [I. Binaural Beat Generation](#i-binaural-beat-generation)
   - [II. Carrier Normalisation — Octave Transposition](#ii-carrier-normalisation--octave-transposition)
   - [III. Latin Gematria — Frequency Seeding](#iii-latin-gematria--frequency-seeding)
   - [IV. Golden Angle — Phyllotactic Chromatics](#iv-golden-angle--phyllotactic-chromatics)
   - [V. F₁₁ Particle Field — Vogel's Disk](#v-f-particle-field--vogels-disk)
   - [VI. Stochastic Resonance Lattice](#vi-stochastic-resonance-lattice)
   - [VII. Pink Noise — Voss-McCartney Algorithm](#vii-pink-noise--voss-mcCartney-algorithm)
   - [VIII. Walhuu Constant — 0.137 Hz LFO](#viii-walhuu-constant--0137-hz-lfo)
   - [IX. Breath Pacing — Physiological Rationale](#ix-breath-pacing--physiological-rationale)
   - [X. Miller's Law — Cognitive Load Architecture](#x-millers-law--cognitive-load-architecture)
3. [Audio Signal Chain](#audio-signal-chain)
4. [Visual Architecture](#visual-architecture)
5. [Therapy Modes](#therapy-modes)
6. [Breath Patterns](#breath-patterns)
7. [Timbres](#timbres)
8. [Deploying to GitHub Pages](#deploying-to-github-pages)
9. [PWA Installation](#pwa-installation)
10. [Technical Stack](#technical-stack)

---

## Overview

MIDAS converts a word or phrase into a carrier frequency via Latin Gematria, then generates a precisely tuned binaural beat around that carrier. The beat frequency is selected from a clinical reference table corresponding to the chosen neurological state (Delta, Theta, Alpha, Beta, Gamma). A breath-pacing animation derived from cardiac resonance research runs concurrently but independently of the acoustic selection, and a live sigil renders the encoded word as geometry on a Canvas 2D surface.

All computation occurs client-side. No audio, text, or personal data is transmitted anywhere.

---

## The Mathematics

### I. Binaural Beat Generation

Binaural beats arise when two pure sine tones of slightly different frequencies are presented separately to each ear. The auditory cortex perceives the arithmetic difference as a phantom oscillation at frequency `Δf`.

```
fL = f₀ − Δf / 2
fR = f₀ + Δf / 2
```

Where:
- `f₀` — carrier frequency (Hz), derived from Gematria or selected from the Lithic grid
- `Δf` — beat frequency (Hz), corresponding to the target brainwave band
- `fL` — frequency presented to left ear
- `fR` — frequency presented to right ear

The perceived beat oscillates at exactly `Δf` Hz, provided both tones are below ~1500 Hz and headphones maintain channel separation. MIDAS constrains `f₀` to the 75–150 Hz range via octave transposition (see §II) to maximise binaural effectiveness.

**Clinical Δf Reference:**

| Mode | Δf (Hz) | Band | Effect |
|------|---------|------|--------|
| Cohere | 0.5 | Sub-delta | Cardiac resonance, 6 breaths/min |
| Delta | 2.5 | Delta (0.5–4 Hz) | Deep sleep, trauma processing |
| Theta | 6 | Theta (4–8 Hz) | Relaxation, light trance |
| Sigh | 3.5 | Delta-Theta | Physiological reset |
| Alpha | 10 | Alpha (8–12 Hz) | Calm focus, stress reduction |
| Beta | 18 | Beta (13–30 Hz) | Cognitive engagement |
| Stasis | 6 | Theta | Structural containment |
| Gamma | 40 | Gamma (30–100 Hz) | High-frequency processing |

---

### II. Carrier Normalisation — Octave Transposition

Raw Gematria sums span several orders of magnitude. A logarithmic map compresses this range into the audio spectrum, after which recursive octave transposition forces `f₀` into the therapeutic basement window.

**Step 1 — Logarithmic compression:**

```
t = min( ln(1 + G) / ln(1 + 10000), 1 )
f₀ = CARRIER_MIN + t × (CARRIER_MAX − CARRIER_MIN)
   = 80 + t × 420
```

Logarithmic mapping is chosen over linear because the perceptual scale of pitch is itself logarithmic (the musical octave is a 2:1 frequency ratio). Without log compression, moderate inputs would cluster at the low end of the range and extreme inputs would rarely reach the upper band.

**Step 2 — Lithic Anchor (octave transposition):**

```
while f₀ > 150:
    f₀ = f₀ / 2
f₀ = max(75, f₀)
```

This recursively halves the carrier until it falls within [75, 150] Hz — the "acoustic basement" where:
- Binaural beat perception is most reliable (both tones well below the 1500 Hz limit)
- Sub-bass resonance supports parasympathetic nervous system activation
- The tone pair sits below the intelligibility threshold, so the carrier does not distract

The octave relationship is musically neutral — halving a frequency preserves its harmonic identity while shifting it down one octave.

---

### III. Latin Gematria — Frequency Seeding

The input word is converted to a scalar `G` by summing the positional values of its Latin letters:

```
LATIN = { A:1, B:2, C:3, D:4, E:5, F:6, G:7, H:8, I:9, J:10,
          K:11, L:12, M:13, N:14, O:15, P:16, Q:17, R:18, S:19,
          T:20, U:21, V:22, W:23, X:24, Y:25, Z:26 }

G = Σ LATIN[c] for each character c in the uppercase input
```

`G` seeds three downstream systems:
1. **Carrier frequency** — via `normaliseCarrier(G)` → `f₀`
2. **Phyllotaxis hue** — via `phyllotaxisHSL(G)` → HSL colour
3. **Sigil geometry** — `G` modulates line weights, radii, and angular positions in all four geometry modes

This ensures that the visual, chromatic, and acoustic outputs are all mathematically downstream of the same input — the entire session is encoded into a single scalar.

---

### IV. Golden Angle — Phyllotactic Chromatics

The **Golden Angle** ψ ≈ 137.508° is the irrational angular increment that produces maximum equidistribution of points on a circle. It is derived from the Golden Ratio φ:

```
φ = (1 + √5) / 2 ≈ 1.6180339887

ψ = 360° × (1 − 1/φ²)
  = 360° × (2 − φ)
  ≈ 137.5077640500...°
```

In botanical phyllotaxis (sunflower seed heads, pinecone scales, fern fronds) this angle prevents any two successive elements from being angularly adjacent — maximising solar exposure for each element. In MIDAS it is used for two purposes:

**Chromatic seeding:**
```
H = (G × 137.508) mod 360
S = 38 + (G mod 24)     → range 38–62%, centred on φ×38.2 ≈ 61.8%
L = 15 + (G mod 10)     → range 15–25% (subterranean luminescence)
```

Because 137.508 is irrational relative to 360, successive Gematria values produce hues that never cluster or repeat in a predictable cycle. A single character change in the input word yields a perceptually distant colour.

**Saturation at φ×38.2%:** The Golden Ratio proportion 61.8% / 38.2% appears throughout natural growth patterns. Anchoring saturation near this proportion ensures chromatic vibrancy is structurally coherent across all palette rotations.

---

### V. F₁₁ Particle Field — Vogel's Disk

The sigil canvas renders 89 particles (F₁₁ in the Fibonacci sequence) arranged on a Vogel spiral — the mathematical model for a sunflower seed head.

**Angular position (Golden Angle dispersion):**
```
θₙ = n × ψ   (mod 2π)
   = n × (137.508 × π/180)
```

**Radial position (uniform-area distribution):**
```
rₙ = √(n / 89) × R
```

The square-root radial formula ensures equal density per unit area — without it, points would crowd at the centre and thin out at the periphery. With it, each particle occupies the same angular sector area as every other.

**Temporal phase offset (irrational drift):**
```
Δtₙ = n × φ
pulse_n(t) = 0.5 + 0.5 × sin(2π × WALHUU × t + Δtₙ)
```

Multiplying by φ (an irrational number) ensures no two particles ever pulse in unison at any rational time. The phase offsets are incommensurable — the field never "breathes together" as a uniform flash.

89 is chosen specifically because it is F₁₁ (the 11th Fibonacci number). The Fibonacci sequence governs the number of clockwise and counter-clockwise spirals visible in a Vogel disk — biological systems use Fibonacci numbers because they are adjacent to the limit of the ratio `Fₙ/Fₙ₋₁ → φ`.

---

### VI. Stochastic Resonance Lattice

The resonance lattice injects three sine oscillators into the pink noise field at rational multiples of the carrier frequency, bypassing the waveshaper and lowpass filter:

```
f₁ = f₀ × 1     (Absolute Unity)       amplitude: 0.055
f₂ = f₀ × 3/2   (Sovereign Dominant)   amplitude: 0.038
f₃ = f₀ × 2     (Lithic Anchor)        amplitude: 0.028
```

The multipliers 1, 3/2, and 2 correspond to the **unison**, **perfect fifth**, and **octave** — the three most consonant intervals in Western harmonic theory, arising from small integer ratios of string length. They are also the first three terms of the harmonic series above the fundamental.

**Stochastic resonance** is the phenomenon where adding a small amount of noise to a sub-threshold signal can make the signal detectable. Here the principle is inverted — coherent tones are embedded in the broadband pink noise at amplitudes below conscious perception, providing a subliminal harmonic scaffold that the auditory system can lock onto without the brain consciously registering discrete pitches.

---

### VII. Pink Noise — Voss-McCartney Algorithm

Pink noise (1/f noise) is generated using the Voss-McCartney algorithm, which approximates the 1/f power spectrum using a bank of seven independent white noise generators updated at different rates:

```
For each sample i:
  b₀ += white × 0.99886 − b₀ × 0.99886
  b₁ += white × 0.99332 − b₁ × 0.99332
  b₂ += white × 0.96900 − b₂ × 0.96900
  b₃ += white × 0.86650 − b₃ × 0.86650
  b₄ += white × 0.55000 − b₄ × 0.55000
  b₅ += white × −0.7616
  output = (b₀+b₁+b₂+b₃+b₄+b₅+b₆ + white×0.5362) × 0.11
```

Pink noise is perceptually "warmer" than white noise (which is uniform across all frequencies) because it has equal energy per octave rather than equal energy per Hz. Human perception is logarithmic in frequency — we hear octaves as equal intervals — so pink noise sounds flat and neutral, while white noise sounds high-pitched and harsh.

In MIDAS, pink noise serves as the acoustic field within which the binaural tones and resonance lattice operate — providing a broadband carrier that masks environmental noise and prevents the ear from fatiguing on the pure tones.

---

### VIII. Walhuu Constant — 0.137 Hz LFO

`WALHUU = 0.137 Hz` is the fundamental modulation rate of the application. It governs:

- Pink noise amplitude envelope
- Particle pulse animation in the F₁₁ field
- Polyrhythm tremolo phase reference
- Glow-orb CSS animation period (`1000 / 0.137 ≈ 7299 ms`)

0.137 Hz corresponds to a period of approximately **7.3 seconds** — close to the average duration of a slow exhalation (6–10 seconds) and within the range of the body's natural low-frequency oscillations:

```
WALHUU period = 1 / 0.137 ≈ 7.299 seconds
```

The value also appears in the **fine structure constant** α ≈ 1/137, which governs the strength of electromagnetic coupling between charged particles and photons. Whether or not this correspondence is physically meaningful, 7.3 seconds falls in the crossover region between respiratory and cardiovascular rhythms — the temporal scale at which the breath, heart rate variability, and baroreceptor reflex naturally synchronise during deep relaxation.

---

### IX. Breath Pacing — Physiological Rationale

Breath patterns are expressed as `[inhale, hold, exhale]` in seconds. Each pattern is grounded in published research on respiratory physiology:

**Coherence breathing (5-0-5):**
At 6 breaths per minute, breathing entrains with the baroreflex — the natural ~10-second oscillation in blood pressure regulation (Mayer waves). This maximises heart rate variability (HRV) and activates the parasympathetic branch of the autonomic nervous system.

**Extended exhale (any pattern where exhale > inhale):**
The vagus nerve is more active during exhalation than inhalation. A longer exhale therefore produces a net increase in vagal tone, reducing heart rate and cortisol. The Release pattern (6-2-10) maximises this ratio.

**Physiological sigh (4-0-8):**
A brief double-inhale followed by a long slow exhale deflates alveoli that have partially collapsed during shallow breathing. The extended exhale activates the parasympathetic nervous system via vagal afferents.

**Box breathing (4-4-4-4):**
Equal-duration phases create a symmetrical respiratory pattern that dampens sympathetic activation by forcing a controlled pause on both the inhale peak and the exhale trough. Used in high-stress performance contexts (military, surgery).

Breath selection in MIDAS is **fully independent** of tone selection — any breath pattern may be paired with any therapy mode, allowing the user to decouple the cognitive depth target from the physical pacing preference.

---

### X. Miller's Law — Cognitive Load Architecture

All selector grids in MIDAS are organised according to Miller's Law (1956): human working memory can hold `7 ± 2` items simultaneously. Exceeding this causes cognitive overload and decision paralysis.

Implementation:
- **Therapy modes** — 8 modes split into two labelled groups of 4 (DESCENT / ASCENT)
- **Breath patterns** — 8 patterns split into two groups of 4 (SLOW / ACTIVE)
- **Timbres** — 6 timbres split into two groups of 3 (TONAL / ORGANIC)
- **Lithic frequencies** — displayed 3 per row in a grid

Each group carries a semantic label that names the shared intent of its members, reducing the selection from a combinatorial search to a two-step hierarchical decision: first choose the group, then choose within it.

---

## Audio Signal Chain

```
Oscillator L (fL) ──┐
                    ├──► Channel Merger ──► BiquadFilter (HPF) ──► WaveShaper ──┐
Oscillator R (fR) ──┘                                                            │
                                                                                 ▼
Sub-octave L ───────────────────────────────────────────────────────► Channel Merger (pre-shaper)
Sub-octave R ──────────────────────────────────────────────────────────────────┘
                                                                                 │
Pink Noise L ──────────────────────────────────────────────────────────────────►├──► dryGain (0.72) ──►┐
Pink Noise R ──────────────────────────────────────────────────────────────────►│                       │
                                                                                 │                       ▼
Resonance Lattice (f₀, f₀×3/2, f₀×2) ─────────────────────────────────────────┘              master GainNode
                                                                                                       │
                                                                              ConvolverNode (IR 1.8s) ──► wetGain (0.28) ──►┘
                                                                                                       │
                                                                                              VelvetLPF (BiquadFilter, 300 Hz)
                                                                                                       │
                                                                                            SovereignLimiter (DynamicsCompressor)
                                                                                              threshold −3 dB, ratio 4:1
                                                                                                       │
                                                                                              ac.destination (DAC)
```

**Key nodes:**

| Node | Purpose |
|------|---------|
| `WaveShaperNode` (k=25) | Thermal saturation — soft tube-glow warmth via `f(x) = ((1+k)x)/(1+k|x|)` |
| `ConvolverNode` | Lithic stone chamber reverb — 1.8s IR with exponential decay and heavy HF smoothing |
| `BiquadFilter` (lowpass, 300 Hz) | Velvet Curtain — severs all upper-frequency artifacts, constraining output to somatic sub-bass |
| `DynamicsCompressor` | Sovereign Limiter — prevents DAC clipping when multiple waveforms constructively interfere |
| Pink noise LFO (0.137 Hz) | Amplitude-modulates the noise field at the Walhuu rate — oceanic breath beneath the fundamental |
| Resonance lattice oscillators | Harmonic anchors in 1:1, 3:2, 2:1 ratio to f₀, injected below the shaper for uncoloured consonance |

---

## Visual Architecture

MIDAS uses three independent canvases, each on its own GPU compositor layer:

| Canvas | Role | Layer |
|--------|------|-------|
| `#faerie-canvas` | Fixed background — F₁₁ phyllotaxis particle field, φ-drift animation | `z-index: 0` |
| `#sigil-canvas` | Instrument panel — live sigil geometry + inner F₁₁ particle ring | `z-index: 2` (inside `.instrument`) |
| `#box-tracer` | Fixed overlay — luminous tracer orbiting the instrument panel boundary | `z-index: 2` |

All canvases use hardware DPR scaling to eliminate sub-pixel blur on high-density displays:

```javascript
canvas.width  = Math.round(cssWidth  × devicePixelRatio)
canvas.height = Math.round(cssHeight × devicePixelRatio)
ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0)
```

**Section compositing isolation:** Each `<section>` element uses a `::before` pseudo-element to carry its `backdrop-filter` and background. This decouples the glassmorphic blur from the element's `border-radius`, preventing the browser compositing collision that causes jagged radius edges when `backdrop-filter`, `border-radius`, and `overflow: hidden` are applied to the same node.

**Font-loading gate:** The entire UI is held at `opacity: 0` until `document.fonts.ready` resolves, eliminating Flash Of Unstyled Text (FOUT) and the layout reflow that occurs when the browser substitutes system fonts before custom fonts arrive.

---

## Therapy Modes

### DESCENT — Deceleration, depth, release

| Mode | Δf | Default Breath | Carrier Note |
|------|----|----------------|--------------|
| Cohere | 0.5 Hz | 5-0-5 | Cardiac resonance at 6/min |
| Delta | 2.5 Hz | 6-2-10 | Deep sleep, trauma processing |
| Theta | 6 Hz | 5-2-7 | Relaxation, creativity |
| Sigh | 3.5 Hz | 4-0-8 | Physiological reset |

### ASCENT — Re-integration, engagement, return

| Mode | Δf | Default Breath | Carrier Note |
|------|----|----------------|--------------|
| Alpha | 10 Hz | 4-1-6 | Calm focus, settled ease |
| Beta | 18 Hz | 4-0-5 | Grounded re-entry |
| Stasis | 6 Hz | 4-4-4-4 | Structural containment |
| Gamma | 40 Hz | 3-1-4 | High cognition, ignition |

---

## Breath Patterns

Breath patterns are independently selectable from therapy modes.

| Pattern | Cycle | Group | Physiological Basis |
|---------|-------|-------|---------------------|
| Cohere | 5-0-5 | Slow | Cardiac resonance, HRV maximisation |
| Release | 6-2-10 | Slow | Extended exhale, maximum vagal activation |
| Drift | 5-2-7 | Slow | Gentle descent, warm stillness |
| Sigh | 4-0-8 | Slow | Double-inhale physiological reset |
| Settle | 4-1-6 | Active | Soft clarity, settled ease |
| Return | 4-0-5 | Active | Grounded re-entry |
| Box | 4-4-4-4 | Active | Structural boundary, sympathetic dampening |
| Ignite | 3-1-4 | Active | Activation, flow entry |

---

## Timbres

Each timbre modifies the `WaveShaperNode` configuration and oscillator layering.

### Tonal (pitched resonance)
| Timbre | Character |
|--------|-----------|
| **Pure** | Clean unmodified sine — zero harmonic content, maximum phase purity |
| **Crystal** | Bell-like partials — thin metallic overtones, still air |
| **Vessels** | Warm bowl resonance — fundamental + 2nd harmonic emphasis |

### Organic (environmental texture)
| Timbre | Character |
|--------|-----------|
| **Yidaki** | Didgeridoo formant — wood, breath, and low-earth resonance |
| **Cave** | Stone enclosure — dense IR reverb tail, minimal high-frequency content |
| **Pulse** | Slow oceanic swell — amplitude-modulated at sub-breath frequencies |

---

## Deploying to GitHub Pages

```bash
# 1. Create a new repository on github.com
#    e.g. github.com/yourname/midas

# 2. Clone it locally
git clone https://github.com/yourname/midas.git
cd midas

# 3. Copy the deploy files into the repository root
cp path/to/MIDAS-deploy/* .

# 4. Commit and push
git add .
git commit -m "Initial MIDAS deploy"
git push origin main

# 5. Enable GitHub Pages
#    Repository → Settings → Pages → Source: Deploy from branch → main / (root)
```

The application will be live at `https://yourname.github.io/midas/` within a few minutes.

**GitHub Pages notes:**
- HTTPS is served automatically — required for Web Audio API and Service Worker
- No build step needed — the app is a single `index.html` with no bundler dependencies
- `sw.js` enables offline use after the first load

---

## PWA Installation

On supported browsers (Chrome, Edge, Safari 16.4+):

- **Desktop:** Click the install icon in the address bar
- **Android Chrome:** `⋮` menu → "Add to Home Screen"
- **iOS Safari:** Share sheet → "Add to Home Screen"

Once installed, MIDAS launches as a standalone app without browser chrome, stores the shell in the Service Worker cache, and remains fully functional offline (the audio engine and canvas renderer have no network dependencies after initial font load).

---

## Technical Stack

| Concern | Technology |
|---------|-----------|
| Audio synthesis | Web Audio API (`AudioContext`, `OscillatorNode`, `BiquadFilterNode`, `WaveShaperNode`, `ConvolverNode`, `DynamicsCompressorNode`) |
| Rendering | Canvas 2D API with hardware DPR scaling |
| Animation | `requestAnimationFrame` loop, 60 fps |
| State | Plain JavaScript object `S` — no framework |
| Persistence | `localStorage` (palette, theme) |
| Offline | Service Worker, Cache API |
| Typography | Cinzel (titling), Cormorant Garamond (body), Share Tech Mono (data) |
| Fonts | Google Fonts, loaded via `document.fonts.ready` gate |
| PWA | Web App Manifest, standalone display mode |

**Browser requirements:** Any modern browser with Web Audio API support (Chrome 66+, Firefox 76+, Safari 14.1+, Edge 79+). Binaural beats require stereo headphones — the effect is not perceivable on speakers or in mono.

---

*M.I.D.A.S. — The sanctuary is holding.*
