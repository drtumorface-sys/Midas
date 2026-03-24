// Canvas & Context Setup
const canvas = document.getElementById('yggdrasilCanvas');
const ctx = canvas.getContext('2d');

// Slider Elements
const axisX = document.getElementById('axisX');
const axisY = document.getElementById('axisY');
const axisZ = document.getElementById('axisZ');
const statusDiv = document.getElementById('bindruneStatus');
const initSignalBtn = document.getElementById('initSignalBtn');

const goldenAngle = 137.5 * (Math.PI / 180);
const totalNodes = 144;

// Audio Context for binaural beat sync
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let beatFreq = 5; // Default binaural beat frequency

// Hebrew to Elder Futhark mapping
const hebrewToFuthark = {
  'א': 'ᚨ', 'ב': 'ᛒ', 'ג': 'ᚷ', 'ד': 'ᛞ', 'ה': 'ᚼ',
  'ו': 'ᚹ', 'ז': 'ᛉ', 'ח': 'ᚺ', 'י': 'ᛃ', 'כ': 'ᚲ',
  'ל': 'ᛚ', 'מ': 'ᛗ', 'נ': 'ᚾ', 'ס': 'ᛊ', 'ע': 'ᛟ',
  'פ': 'ᛈ', 'צ': 'ᛏ', 'ק': 'ᚲ', 'ר': 'ᚱ', 'ש': 'ᛋ', 'ת': 'ᚦ'
};

// Hebrew roots mapped by index, repeated to fill 72 steps
const roots = [
  "אמת", "חסד", "דין", "נצח", "הוד", "יסוד", "מלכות",
  "אמת", "חסד", "דין", "נצח", "הוד", "יסוד", "מלכות",
  "אמת", "חסד", "דין", "נצח", "הוד", "יסוד", "מלכות",
  "אמת", "חסד", "דין", "נצח", "הוד", "יסוד", "מלכות",
  "אמת", "חסד", "דין", "נצח", "הוד", "יסוד", "מלכות",
  "אמת", "חסד", "דין", "נצח", "הוד", "יסוד", "מלכות",
  "אמת", "חסד", "דין", "נצח", "הוד", "יסוד", "מלכות",
  "אמת", "חסד"
];

// Helper to get root from index [0-71]
function getHebrewRoot(index) {
  const idx = index % roots.length;
  return roots[idx];
}

// Bindrune rendering logic: vertical bind with glow and pulse
function renderBindrune(ctx, x, y, index, pulse) {
  const root = getHebrewRoot(index);
  const runes = [...root].map(char => hebrewToFuthark[char] || '');

  ctx.save();
  ctx.textAlign = 'center';
  ctx.fillStyle = `rgba(212, 175, 55, ${pulse})`;
  ctx.shadowColor = `rgba(212, 175, 55, ${pulse})`;
  ctx.shadowBlur = 10 + pulse * 20;

  runes.forEach((rune, i) => {
    ctx.font = 'bold 48px "Courier New"';
    ctx.fillText(rune, x, y - i * 25);
  });

  ctx.restore();
}

// Draw the Yggdrasil trunk and branches with node points
function drawYggdrasil(trunkVal, branchDist, branchDisp, pulse) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw trunk (Axis Z)
  const trunkHeight = (trunkVal / 72) * (canvas.height * 0.8);
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, canvas.height);
  ctx.lineTo(canvas.width / 2, canvas.height - trunkHeight);
  ctx.lineWidth = 4 + (trunkVal / 10);
  ctx.strokeStyle = 'rgba(212, 175, 55, 0.5)';
  ctx.stroke();

  // Draw branches (Axis X & Y)
  for (let i = 0; i < totalNodes; i++) {
    const theta = i * goldenAngle + (branchDisp * 0.1);
    const radius = (Math.sqrt(i) / Math.sqrt(totalNodes)) * (branchDist + 10);
    const yNode = (canvas.height - trunkHeight) + (i * (trunkHeight / totalNodes));
    const xNode = (canvas.width / 2) + radius * Math.cos(theta);

    ctx.beginPath();
    ctx.arc(xNode, yNode, 2, 0, 2 * Math.PI);
    ctx.fillStyle = i % 2 === 0 ? '#d4af37' : 'rgba(120,120,150,0.6)';
    ctx.fill();
  }

  // Render Bindrune at top of trunk, pulse synced
  renderBindrune(ctx, canvas.width / 2, canvas.height - trunkHeight, trunkVal, pulse);
}

// Update UI labels showing current Hebrew root and Futhark runes
function updateUILabels(zValue) {
  const root = getHebrewRoot(zValue);
  const runes = [...root].map(c => hebrewToFuthark[c]).join(' ');
  statusDiv.innerHTML = `<span>${root}</span> | <span>${runes}</span>`;
}

// Binaural beat frequency calculation from sliders (example mapping)
function calculateBeatFrequency(xVal, yVal) {
  // Map X and Y sliders to frequencies for left and right ears
  const fL = 200 + xVal; // Base low freq + X slider
  const fR = 200 + yVal; // Base low freq + Y slider
  return Math.abs(fL - fR) / 10; // Scale to 0-10 Hz
}

// Main render loop
function renderLoop() {
  const trunkVal = parseInt(axisZ.value);
  const branchDist = parseInt(axisX.value);
  const branchDisp = parseInt(axisY.value);

  beatFreq = calculateBeatFrequency(branchDist, branchDisp);

  const time = audioCtx.currentTime;
  const pulse = 0.4 + 0.6 * Math.abs(Math.sin(Math.PI * beatFreq * time));

  drawYggdrasil(trunkVal, branchDist, branchDisp, pulse);
  updateUILabels(trunkVal);

  requestAnimationFrame(renderLoop);
}

// Initialize button interaction
initSignalBtn.addEventListener('click', () => {
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
});

// Start rendering
renderLoop();
