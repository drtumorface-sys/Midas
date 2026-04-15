# M · I · D · A · S

**Modulated Interval Drift & Acoustic Sanctuary**

A single-file therapeutic application — binaural beat entrainment, guided breath pacing, and live sigil rendering — built on the Web Audio API and Canvas. Runs in any browser. Installs as a phone or desktop app. Requires no internet connection after first load. Zero external dependencies.

---

## Table of Contents

1. [What MIDAS Does](#what-midas-does)
2. [The Mathematics, Explained](#the-mathematics-explained)
   - [I. The Binaural Illusion](#i-the-binaural-illusion)
   - [II. Finding the Root Tone](#ii-finding-the-root-tone)
   - [III. Latin Gematria — The Word as Frequency](#iii-latin-gematria--the-word-as-frequency)
   - [IV. The Golden Angle — Colour from the Seed](#iv-the-golden-angle--colour-from-the-seed)
   - [V. The Particle Field — Eighty-Nine Points of Light](#v-the-particle-field--eighty-nine-points-of-light)
   - [VI. The Resonance Lattice — Hidden Harmonics](#vi-the-resonance-lattice--hidden-harmonics)
   - [VII. Pink Noise — The Acoustic Field](#vii-pink-noise--the-acoustic-field)
   - [VIII. The Walhuu Constant — The Breath Beneath Everything](#viii-the-walhuu-constant--the-breath-beneath-everything)
   - [IX. Breath Pacing — Why These Rhythms](#ix-breath-pacing--why-these-rhythms)
   - [X. The Seven-Plus-Two Rule — Why the Selectors Are Sized This Way](#x-the-seven-plus-two-rule--why-the-selectors-are-sized-this-way)
3. [The Sound Architecture](#the-sound-architecture)
4. [The Visual Architecture](#the-visual-architecture)
5. [Therapy Modes](#therapy-modes)
6. [Breath Patterns](#breath-patterns)
7. [Timbres](#timbres)
8. [Deploying to GitHub Pages](#deploying-to-github-pages)
9. [PWA Installation](#pwa-installation)
10. [Technical Stack](#technical-stack)

---

## What MIDAS Does

You type a word or phrase. MIDAS converts it into a precise tone using an ancient letter-to-number system called Latin Gematria — then wraps a second tone around the first, slightly higher, slightly lower. Played through stereo headphones, these two tones cause your auditory cortex to perceive a third tone that does not physically exist. That phantom tone oscillates at exactly the frequency of the neurological state you are targeting.

Simultaneously, a breath-pacing animation draws you into a clinically-grounded respiratory rhythm. A sigil — a geometric encoding of your word — renders on the central canvas, mathematically downstream of the same seed that generated the sound.

The word you chose, the colour on screen, the geometry you are looking at, and the sound you are hearing are all four expressions of a single number. The session is sealed.

All computation happens on your device. Nothing is transmitted anywhere.

---

## The Mathematics, Explained

### I. The Binaural Illusion

When two pure tones are played simultaneously — one in the left ear, one in the right — and they are close in pitch but not identical, the brain perceives a third tone that is not physically present in either ear. This is called a binaural beat.

The phantom tone vibrates at exactly the *difference* between the two real tones. If the left ear hears 130 Hz and the right ear hears 136 Hz, the brain generates a perceived oscillation of 6 Hz — a Theta-band frequency associated with relaxed, receptive awareness.

```
Left ear:  f₀ − Δf/2
Right ear: f₀ + Δf/2
Phantom:   Δf
```

The root tone `f₀` is the anchor — derived from your word via Gematria (see §III). The beat frequency `Δf` is the target state, selected by therapy mode. The two real tones are split symmetrically around the root so neither ear carries the heavier load.

This effect only works through headphones. Speakers blend the two channels into one before they reach you, and the illusion collapses.

**The clinical reference:**

| Mode | Beat (Δf) | Band | Associated State |
|------|-----------|------|-----------------|
| Cohere | 0.5 Hz | Sub-delta | Cardiac resonance, 6 breaths/min |
| Delta | 2.5 Hz | Delta | Deep rest, trauma integration |
| Theta | 6 Hz | Theta | Relaxation, light trance |
| Sigh | 3.5 Hz | Delta-Theta | Physiological reset |
| Alpha | 10 Hz | Alpha | Calm focus, settled ease |
| Beta | 18 Hz | Beta | Cognitive engagement |
| Stasis | 6 Hz | Theta | Structural containment |
| Gamma | 40 Hz | Gamma | High-frequency binding |

---

### II. Finding the Root Tone

The Gematria sum for any given word can be a small number or an enormous one — a single letter yields a value of 1, a long phrase might yield thousands. Before this number becomes a tone, it must be mapped to a useful range of the audio spectrum.

**Step one — logarithmic compression:**

The mapping uses a logarithmic scale rather than a linear one because the human ear experiences pitch logarithmically. What we call an octave is a doubling of frequency — 220 Hz to 440 Hz feels the same distance to the ear as 440 Hz to 880 Hz, even though the second jump is twice the numerical size. By compressing the Gematria sum on a logarithmic curve, small words and large words both produce tones that fall somewhere across the full musical range, rather than clustering at one end.

```
t = ln(1 + G) / ln(1 + 10000)      ← maps any G to a value between 0 and 1
f₀ = 80 + t × 420                   ← lands between 80 Hz and 500 Hz
```

**Step two — the Lithic Anchor (octave descent):**

The mapped tone is then halved repeatedly — dropping down one octave at a time — until it falls into the range 75–150 Hz. Halving a frequency drops it one octave but does not change its musical character; the tone retains its identity at a lower register.

This basement range — below the register of most speech — is where binaural beat perception is most reliable, and where sub-bass resonance tends to activate the parasympathetic nervous system rather than the alert, focused state produced by mid-range frequencies.

```
While the tone is above 150 Hz: halve it.
Floor at 75 Hz.
```

---

### III. Latin Gematria — The Word as Frequency

Every letter of the Latin alphabet carries a numerical value. In MIDAS, the full classical weights are used — a base-10 stepped system reflecting the historical groupings of the alphabet:

| A–I | 1–9 | (units) |
|-----|-----|---------|
| J–R | 9–80 | (tens, with J sharing I's value of 9) |
| S–Z | 90–500 | (hundreds) |

The Gematria sum `G` is simply the total of all letter values in the input word. This single number cascades into three separate systems:

1. The **carrier frequency** — which tone the session is tuned to
2. The **sigil geometry** — the shape drawn on the canvas
3. The **chromatic hue** — the colour of the interface

A different word produces a different tone, a different shape, and a different colour. The same word always produces the same session — it is entirely deterministic. No randomness is introduced.

---

### IV. The Golden Angle — Colour from the Seed

The Gematria seed is converted to a colour using the *Golden Angle* — a specific rotation of approximately 137.5°, derived from the Golden Ratio.

The Golden Ratio (φ ≈ 1.618) is the proportion at which a line is divided so that the ratio of the whole to the larger part equals the ratio of the larger part to the smaller. It appears throughout natural growth: the spiral of a nautilus shell, the arrangement of seeds in a sunflower, the branching of veins. The Golden Angle is simply the rotational expression of this ratio: the angle at which successive elements are placed to achieve the most efficient possible distribution around a circle.

```
Golden Ratio: φ = (1 + √5) / 2 ≈ 1.618
Golden Angle: ψ = 360° × (2 − φ) ≈ 137.508°

Hue:        H = (G × 137.508) mod 360°
Saturation: S = 38 + (G mod 24)%      → centres near the φ proportion of the colour wheel
Lightness:  L = 15 + (G mod 10)%      → a subterranean luminosity, rich but not dominant
```

Because 137.5° is irrational with respect to 360°, no two Gematria values within an ordinary range will ever produce the same hue. Changing a single letter in your word yields a perceptually distant colour — not a neighbouring shade.

---

### V. The Particle Field — Eighty-Nine Points of Light

The background canvas is populated with 89 particles. 89 is the eleventh Fibonacci number (the sequence 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89...). The Fibonacci numbers govern the spiral packing of natural forms — the number of spirals you can count in a sunflower or a pine cone will always be adjacent Fibonacci numbers. 89 was chosen specifically for this structural kinship.

The particles are arranged on a Vogel spiral — the mathematical model for a sunflower seed head. Each particle's position is determined by two rules:

- **Angle:** Each successive particle is rotated by exactly the Golden Angle (137.5°) from the last. Because this angle is irrational, no two particles ever share an angular alignment — they distribute themselves without clustering.
- **Radius:** Each particle is placed at a radius proportional to the square root of its index. The square root ensures that equal numbers of particles appear in equal areas — outer zones are not sparse, inner zones are not crowded.

Each particle pulses — brightening and dimming — at a rate offset by an irrational multiple of its position index. Because the offset is irrational, no two particles ever pulse in synchrony. The field breathes, but never breathes as one.

---

### VI. The Resonance Lattice — Hidden Harmonics

Beneath the audible layer of the binaural tones, three additional sine oscillators are woven into the noise field at amplitudes below the threshold of conscious hearing. They are placed at the three most naturally consonant intervals above the root tone:

| Multiplier | Interval | Character |
|-----------|----------|-----------|
| 1× the root | Unison | The root tone itself, undisplaced |
| 1.5× the root | Perfect Fifth | The most stable harmonic relationship after the octave |
| 2× the root | Octave | The root tone one register higher |

These three ratios — 1:1, 3:2, and 2:1 — are the first three harmonics of the natural overtone series. They are consonant because their wave cycles align at short, regular intervals, producing periodic reinforcement rather than friction.

The principle at work is *stochastic resonance*: a small coherent signal embedded in a broadband field of noise can be more perceptible than the same signal in silence, because the noise raises weak sub-threshold signals to the point of detection. The lattice tones sit just below the level at which the ear would register them as discrete pitches — but the auditory system locks onto them as structure within the field.

The root tone used for the lattice is the same `f₀` derived from Gematria. The lattice and the binaural tones are downstream of the same seed.

---

### VII. Pink Noise — The Acoustic Field

All tones in MIDAS are suspended within a field of pink noise — a specific variety of broadband sound that carries equal energy across each octave of the frequency spectrum.

White noise, by contrast, carries equal energy at every frequency — which means far more energy in the higher registers (since there are vastly more high frequencies than low ones). White noise sounds harsh and bright. Pink noise sounds neutral, warm, and steady to the ear — what most people mean when they say "static" in a comfortable sense.

Pink noise in MIDAS serves two purposes: it masks environmental sounds that might interrupt concentration, and it provides the broadband field within which the stochastic resonance lattice and binaural tones operate.

The noise is generated in real-time using the Voss-McCartney algorithm — seven independent streams of random values, each updating at a different rate, their sum approximating the ideal 1/f power spectrum. It is amplitude-modulated at the Walhuu rate (§VIII), creating the slow oceanic breath beneath everything.

---

### VIII. The Walhuu Constant — The Breath Beneath Everything

`WALHUU = 0.137 Hz`

This is the fundamental oscillation rate of the application. At 0.137 cycles per second, one complete cycle takes approximately 7.3 seconds — close to the duration of a slow natural exhalation, and squarely in the zone where respiratory and cardiovascular rhythms naturally synchronise during deep relaxation.

The Walhuu rate governs:
- The slow amplitude breathing of the pink noise field
- The pulse timing of the background particle field
- The period of the glowing ring around the instrument panel

The value 0.137 is also notable as the approximate magnitude of the fine structure constant (α ≈ 1/137) — the dimensionless number that governs the strength of electromagnetic interaction in physics. Whether this is causal or correspondence, the temporal period it produces (7.3 seconds) is physiologically apt: it falls at the intersection of respiratory and cardiac low-frequency oscillation.

---

### IX. Breath Pacing — Why These Rhythms

Each breath pattern is expressed as a sequence of durations in seconds: inhale, hold, exhale — or inhale, hold, exhale, hold (for box patterns).

The timing of breath directly influences the autonomic nervous system through three mechanisms:

**Baroreflex entrainment:** The baroreflex is the body's moment-to-moment blood pressure regulation system — it naturally oscillates at approximately 0.1 Hz (one full cycle every ten seconds). When respiration is paced at exactly 6 breaths per minute (a 5-second inhale, 5-second exhale), breathing synchronises with the baroreflex, maximising *heart rate variability* — the measure of the heart's flexibility and responsiveness. This is the Cohere pattern.

**Vagal tone through extended exhale:** The vagus nerve — the primary parasympathetic nerve, connecting brain to heart, lungs, and gut — is more active during exhalation than inhalation. A longer exhale therefore produces a net increase in parasympathetic tone: heart rate decreases, cortisol falls. The Release pattern (6-2-10) maximises the exhale-to-inhale ratio.

**Physiological sigh:** A brief double-inhale followed by a long slow exhale deflates alveoli (the small air sacs of the lungs) that collapse during shallow breathing. The extended exhale activates parasympathetic pathways via the vagus. The pattern (4-0-8) replicates the body's natural reset mechanism.

**Box breathing:** Equal-duration phases (4-4-4-4) — inhale, hold, exhale, hold — create a symmetrical respiratory rhythm that dampens sympathetic activation by enforcing a pause at both the peak of inhalation and the trough of exhalation. Used in high-intensity performance contexts to restore cognitive clarity under pressure.

Breath patterns in MIDAS are fully independent of tone modes. Any pattern may be combined with any mode.

---

### X. The Seven-Plus-Two Rule — Why the Selectors Are Sized This Way

All selector grids are organised in groups of no more than four or five items, with never more than eight items visible in a single decision. This is not aesthetic convenience — it reflects a finding from cognitive psychology.

In 1956, George Miller demonstrated that human working memory can hold approximately 7 items simultaneously, with a range of ± 2 (hence "7 ± 2" or "Miller's Law"). Present more than nine options at once and decision quality degrades — the cognitive load of comparison exceeds the capacity available, and either paralysis or arbitrary choice results.

The therapy modes (8 items) are split into two labelled groups of 4: **DESCENT** and **ASCENT**. The breath patterns (8 items) are split into **SLOW** and **ACTIVE**. The timbres (6 items) into **TONAL** and **ORGANIC**.

The label names the *shared intent* of the group, reducing selection from a combinatorial search (which of these eight options?) to a two-step hierarchical decision (which direction? which instrument?). The cognitive cost of choosing MIDAS's mode is intentionally low — the attention saved at selection is available for the session itself.

---

## The Sound Architecture

Every sound you hear travels through the following chain, left to right:

```
Oscillator L (fL) ──┐
                    ├──► Stereo Merger ──► Pre-Shaper Filter ──► WaveShaper ──┐
Oscillator R (fR) ──┘                                                          │
                                                                               ▼
Sub-octave pair ────────────────────────────────────────────────► Same merger (pre-shaper)
                                                                               │
Pink Noise (L+R) ──────────────────────────────────────────────────────────►  ├──► Dry gain (72%) ──►┐
                                                                               │                       │
Resonance Lattice ─────────────────────────────────────────────────────────►  ┘                       │
                                                                                                       ▼
                                                                          Stone Chamber Reverb ──► Wet gain (28%) ──►┤
                                                                                                                     │
                                                                                                         Master Gain
                                                                                                                     │
                                                                                           Low-pass filter at 300 Hz
                                                                                                                     │
                                                                                              Sovereign Limiter (soft)
                                                                                                                     │
                                                                                                 Your headphones (DAC)
```

**Key stages:**

| Stage | Purpose |
|-------|---------|
| **WaveShaper** (k=25) | Adds a faint warmth — even harmonics that the ear reads as the glow of a tube amplifier, without distortion |
| **Stone Chamber Reverb** | A synthesised 1.8-second impulse response modelled on a subterranean stone enclosure — dense early reflections, a dark decaying tail, minimal high-frequency content |
| **Low-pass filter at 300 Hz** | Severs all frequencies above 300 Hz, leaving only sub-bass and low-mid weight. Nothing bright or harsh reaches the listener |
| **Sovereign Limiter** | A gentle compressor (threshold −3 dB, ratio 4:1) that catches any peaks where multiple waveforms briefly reinforce each other — preventing the sharp crack of digital clipping |
| **Pink noise LFO** | The noise field slowly swells and recedes at the Walhuu rate — 0.137 Hz — creating the oceanic quality beneath the tones |

---

## The Visual Architecture

MIDAS uses three canvases, each independent:

| Canvas | Role |
|--------|------|
| Background (faerie-canvas) | The F₁₁ Vogel particle field — 89 points of light, φ-drifting, always running |
| Centre (sigil-canvas) | The live sigil geometry — redraws every frame, responds to your word |
| Overlay (box-tracer) | A luminous point tracing the boundary of the instrument panel |

All three canvases scale automatically to match the pixel density of the display — a Retina screen or high-DPI phone will render with full sharpness, not the soft blur that appears when canvas dimensions are not matched to hardware pixels.

The interface holds at invisible opacity until fonts have fully loaded, eliminating the brief flash of wrong-font text that occurs on slower connections.

---

## Therapy Modes

### DESCENT — Deceleration, depth, release

| Mode | Beat (Δf) | Default Breath | Character |
|------|-----------|----------------|-----------|
| Cohere | 0.5 Hz | 5-0-5 | Cardiac resonance at 6 breaths/min |
| Delta | 2.5 Hz | 6-2-10 | Deep rest, integration |
| Theta | 6 Hz | 5-2-7 | Soft trance, receptivity |
| Sigh | 3.5 Hz | 4-0-8 | Physiological reset |

### ASCENT — Re-integration, engagement, return

| Mode | Beat (Δf) | Default Breath | Character |
|------|-----------|----------------|-----------|
| Alpha | 10 Hz | 4-1-6 | Calm focus, settled ease |
| Beta | 18 Hz | 4-0-5 | Grounded re-entry |
| Stasis | 6 Hz | 4-4-4-4 | Structural containment |
| Gamma | 40 Hz | 3-1-4 | High cognition, ignition |

---

## Breath Patterns

Independent of tone mode — any pattern may be paired with any mode.

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

Each timbre alters the harmonic character of the binaural tones.

### Tonal — Pitched resonance
| Timbre | Character |
|--------|-----------|
| **Pure** | Unmodified sine — no harmonics, complete phase clarity |
| **Crystal** | Bell-like overtones — thin metallic partials, still air |
| **Vessels** | Warm bowl resonance — fundamental with second harmonic emphasis |

### Organic — Environmental texture
| Timbre | Character |
|--------|-----------|
| **Yidaki** | Didgeridoo formant — wood, breath, earth |
| **Cave** | Dense stone reverb tail, minimal high-frequency content |
| **Pulse** | Amplitude-modulated at sub-breath frequencies — slow oceanic swell |

---

## Deploying to GitHub Pages

```bash
# 1. Create a new repository on github.com

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

Live at `https://yourname.github.io/midas/` within a few minutes.

- HTTPS is provided automatically — required for Web Audio and the Service Worker
- No build step — the app is a single `index.html`, nothing to compile
- `sw.js` enables full offline use after the first load

---

## PWA Installation

On supported browsers (Chrome, Edge, Safari 16.4+):

- **Desktop:** Click the install icon in the address bar
- **Android Chrome:** `⋮` menu → "Add to Home Screen"
- **iOS Safari:** Share sheet → "Add to Home Screen"

Once installed, MIDAS runs as a standalone app — no browser chrome, no address bar. The session shell is cached by the Service Worker. The application runs fully offline after first load: the audio engine and canvas have no network dependencies.

For a full native Android experience with guaranteed background audio, use the Capacitor APK path instead (see `BUILD-APK.md`).

---

## Android APK & Play Store

MIDAS can be built as a native Android APK using [Capacitor](https://capacitorjs.com). See `BUILD-APK.md` for the complete step-by-step guide.

Key notes:
- The APK bundles `index.html` locally — no internet connection required after install
- Background audio uses the Android foreground service mechanism (declared in `AndroidManifest.xml`)
- Minimum SDK: Android 7.0 (API 24)
- Target SDK: Android 14 (API 34) for Play Store compliance

---

## Technical Stack

| Concern | Technology |
|---------|-----------|
| Audio synthesis | Web Audio API — OscillatorNode, BiquadFilterNode, WaveShaperNode, ConvolverNode, DynamicsCompressorNode |
| Rendering | Canvas 2D API, hardware DPR scaling |
| Animation | `requestAnimationFrame` loop, 60 fps |
| State | Plain JavaScript object — no framework |
| Persistence | `localStorage` (palette, theme) |
| Offline | Service Worker, Cache API |
| Typography | Cinzel, Cormorant Garamond, Share Tech Mono |
| PWA | Web App Manifest, standalone display mode |

**Browser requirements:** Any modern browser with Web Audio API support (Chrome 66+, Firefox 76+, Safari 14.1+, Edge 79+). Binaural beats require stereo headphones — the effect is not perceivable on speakers or in mono.

---

---

## Supporting MIDAS

MIDAS is free to use. If the application has been of value — as a therapy tool, a sleep aid, or a focused work companion — a small donation is welcomed.

[Support MIDAS →](YOUR_DONATION_LINK_HERE)

All contributions go directly toward continued development and maintenance.

---

*M.I.D.A.S. — The sanctuary is holding.*
