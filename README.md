# 72-Phase Midas Edition

## Overview
72-Phase Midas Edition is a Progressive Web App (PWA) for binaural phase-locking and cognitive enhancement. It features:

- 3D Phyllotaxis visualization for planetary hour synchronization
- Kinetic (X), Coherence (Y), and Depth (Z) controls
- Preset matrix with Gnosis, Soma, Synthesis
- Offline capability with Service Worker
- Cross-platform support: iOS & Android
- Silent looping buffer for background audio on iOS
- Frequency readouts with precise scientific labeling

## Installation

### Android / Chrome:
1. Open in Chrome.
2. Tap the "Install" prompt to add to home screen.
3. Works offline after initial load thanks to `sw.js`.

### iOS / Safari:
1. Open in Safari.
2. Tap "Share" → "Add to Home Screen".
3. Background audio supported using silent looping buffer.

## Files
- **index.html** – Main PWA page with 3D visualizer and audio engine
- **sw.js** – Service Worker for offline caching
- **manifest.json** – PWA manifest for home screen integration
- **icons/** – App icons for iOS/Android
- **assets/** – Optional additional resources

## Usage
1. Adjust sliders for X (Kinetic), Y (Coherence), Z (Depth).
2. Click **INITIALIZE SIGNAL** to start audio.
3. Choose presets for rapid cognitive state changes.
4. Visualizer shows real-time planetary-phase 3D point cloud.
5. Session persists offline and in background.

## Technical Notes
- Base frequency: 144 Hz (φ scaling)
- Binaural beat: Derived from X/Y vector mapping
- Phase-locking ratio: R/L frequencies
- Planetary synchronization: Updated every hour
- iOS background trick: Silent looping buffer prevents AudioContext suspension

## License
MIT License – free for personal or research use.
