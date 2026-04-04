// ── MIDAS Icon Generator ─────────────────────────────────────────────
// Pure Node.js — no dependencies. Uses zlib (built-in) to write
// valid PNG files for icon-192.png and icon-512.png.
//
// Run: node build-icons.js
// ─────────────────────────────────────────────────────────────────────
const fs   = require('fs');
const path = require('path');
const zlib = require('zlib');

// ── Minimal PNG writer ────────────────────────────────────────────────
function crc32(buf) {
  const table = (() => {
    const t = new Uint32Array(256);
    for (let n = 0; n < 256; n++) {
      let c = n;
      for (let k = 0; k < 8; k++) c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
      t[n] = c;
    }
    return t;
  })();
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = table[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function u32be(n) {
  return Buffer.from([(n>>>24)&0xff,(n>>>16)&0xff,(n>>>8)&0xff,n&0xff]);
}

function chunk(type, data) {
  const t   = Buffer.from(type, 'ascii');
  const td  = Buffer.concat([t, data]);
  return Buffer.concat([u32be(data.length), t, data, u32be(crc32(td))]);
}

function writePNG(size, pixels) {
  // pixels: Uint8Array of RGBA, row-major
  const sig  = Buffer.from([137,80,78,71,13,10,26,10]);
  const ihdr = chunk('IHDR', Buffer.concat([
    u32be(size), u32be(size),
    Buffer.from([8, 2, 0, 0, 0])   // 8-bit, RGB, no alpha (we pre-blend onto black)
  ]));

  // Build raw scanlines (filter byte 0 = None per row)
  const raw = Buffer.alloc(size * (1 + size * 3));
  for (let y = 0; y < size; y++) {
    raw[y * (1 + size * 3)] = 0; // filter byte
    for (let x = 0; x < size; x++) {
      const src = (y * size + x) * 4;
      const dst = y * (1 + size * 3) + 1 + x * 3;
      // Alpha-composite onto #09090c background
      const a   = pixels[src + 3] / 255;
      const bg  = [9, 9, 12];
      raw[dst]     = Math.round(pixels[src]   * a + bg[0] * (1 - a));
      raw[dst + 1] = Math.round(pixels[src+1] * a + bg[1] * (1 - a));
      raw[dst + 2] = Math.round(pixels[src+2] * a + bg[2] * (1 - a));
    }
  }
  const idat = chunk('IDAT', zlib.deflateSync(raw, { level: 9 }));
  const iend = chunk('IEND', Buffer.alloc(0));
  return Buffer.concat([sig, ihdr, idat, iend]);
}

// ── Icon painter ──────────────────────────────────────────────────────
function paintIcon(size) {
  const px   = new Uint8Array(size * size * 4);
  const cx   = size / 2, cy = size / 2;
  const GOLD = 137.508 * Math.PI / 180;
  const PHI  = 1.6180339887;

  function setPixel(x, y, r, g, b, a) {
    x = Math.round(x); y = Math.round(y);
    if (x < 0 || x >= size || y < 0 || y >= size) return;
    const i = (y * size + x) * 4;
    // Alpha composite over existing
    const srcA = a / 255, dstA = px[i+3] / 255;
    const outA = srcA + dstA * (1 - srcA);
    if (outA === 0) return;
    px[i]   = Math.round((r * srcA + px[i]   * dstA * (1 - srcA)) / outA);
    px[i+1] = Math.round((g * srcA + px[i+1] * dstA * (1 - srcA)) / outA);
    px[i+2] = Math.round((b * srcA + px[i+2] * dstA * (1 - srcA)) / outA);
    px[i+3] = Math.round(outA * 255);
  }

  // Anti-aliased circle fill
  function fillCircle(fx, fy, radius, r, g, b, a) {
    const ir = Math.ceil(radius);
    for (let dy = -ir; dy <= ir; dy++) {
      for (let dx = -ir; dx <= ir; dx++) {
        const d = Math.sqrt(dx*dx + dy*dy);
        if (d > radius + 0.7) continue;
        const alpha = d < radius - 0.7 ? a : Math.round(a * (radius + 0.7 - d) / 1.4);
        setPixel(fx + dx, fy + dy, r, g, b, alpha);
      }
    }
  }

  // ── Background: radial gradient ───────────────────────────────────
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const dx = (x - cx) / (size * 0.5);
      const dy = (y - cy * 0.8) / (size * 0.5);
      const d  = Math.sqrt(dx*dx + dy*dy);
      const t  = Math.min(d, 1.0);
      const rv = Math.round(9  + (30 - 9)  * (1 - t));
      const gv = Math.round(9  + (30 - 9)  * (1 - t));
      const bv = Math.round(12 + (38 - 12) * (1 - t));
      setPixel(x, y, rv, gv, bv, 255);
    }
  }

  // ── F₁₁ phyllotaxis ring — 89 particles ───────────────────────────
  const R = size * 0.41;
  for (let n = 1; n <= 89; n++) {
    const theta = n * GOLD;
    const r     = Math.sqrt(n / 89) * R;
    const px_x  = cx + Math.cos(theta) * r;
    const px_y  = cy + Math.sin(theta) * r;

    // Hue → RGB (HSL: s=50%, l=52%)
    const hue = ((n * 137.508 * 0.08) % 360);
    const h6  = hue / 60;
    const c2  = 0.5 * (1 - Math.abs(h6 % 2 - 1));
    let rv=0,gv=0,bv=0;
    if      (h6 < 1) { rv=0.5; gv=c2; bv=0; }
    else if (h6 < 2) { rv=c2;  gv=0.5;bv=0; }
    else if (h6 < 3) { rv=0;   gv=0.5;bv=c2;}
    else if (h6 < 4) { rv=0;   gv=c2; bv=0.5;}
    else if (h6 < 5) { rv=c2;  gv=0;  bv=0.5;}
    else             { rv=0.5; gv=0;  bv=c2; }
    const m  = 0.52 - 0.25;
    rv = Math.round((rv + m) * 255);
    gv = Math.round((gv + m) * 255);
    bv = Math.round((bv + m) * 255);

    const rad = Math.max(0.8, size * 0.007);
    fillCircle(px_x, px_y, rad, rv, gv, bv, 140);
  }

  // ── Outer ring ────────────────────────────────────────────────────
  const ringR = size * 0.44;
  const ringW = size * 0.006;
  const steps = Math.round(Math.PI * 2 * ringR);
  for (let i = 0; i < steps; i++) {
    const angle = (i / steps) * Math.PI * 2;
    const rx = cx + Math.cos(angle) * ringR;
    const ry = cy + Math.sin(angle) * ringR;
    fillCircle(rx, ry, ringW, 176, 112, 48, 80);
  }

  // ── 'M' glyph — drawn as strokes ─────────────────────────────────
  // Simplified M geometry: two diagonals + two verticals
  const mH  = size * 0.36;
  const mW  = size * 0.30;
  const mX  = cx - mW / 2;
  const mY  = cy - mH / 2;
  const sw  = Math.max(1.5, size * 0.028); // stroke width

  function strokeLine(x1, y1, x2, y2, r, g, b, a) {
    const steps2 = Math.ceil(Math.sqrt((x2-x1)**2 + (y2-y1)**2));
    for (let i = 0; i <= steps2; i++) {
      const t = i / steps2;
      const lx = x1 + (x2-x1)*t;
      const ly = y1 + (y2-y1)*t;
      fillCircle(lx, ly, sw/2, r, g, b, a);
    }
  }

  // Glow pass (amber, wider, low alpha)
  const gr=192, gg=128, gb=16, ga=60;
  strokeLine(mX,       mY+mH, mX,       mY,       gr,gg,gb,ga);
  strokeLine(mX,       mY,    cx,        mY+mH*0.5,gr,gg,gb,ga);
  strokeLine(cx,        mY+mH*0.5,mX+mW, mY,       gr,gg,gb,ga);
  strokeLine(mX+mW,    mY,    mX+mW,    mY+mH,    gr,gg,gb,ga);

  // Solid pass (quartz white)
  const qr=228, qg=224, qb=216, qa=230;
  strokeLine(mX,       mY+mH, mX,       mY,       qr,qg,qb,qa);
  strokeLine(mX,       mY,    cx,        mY+mH*0.5,qr,qg,qb,qa);
  strokeLine(cx,        mY+mH*0.5,mX+mW, mY,       qr,qg,qb,qa);
  strokeLine(mX+mW,    mY,    mX+mW,    mY+mH,    qr,qg,qb,qa);

  return px;
}

// ── Generate and save ─────────────────────────────────────────────────
[192, 512].forEach(size => {
  const pixels = paintIcon(size);
  const png    = writePNG(size, pixels);
  const dest   = path.join(__dirname, `icon-${size}.png`);
  fs.writeFileSync(dest, png);
  console.log(`✓  icon-${size}.png  (${(png.length/1024).toFixed(1)} KB)`);
});

console.log('\nDone. Icons written to MIDAS-deploy/');
