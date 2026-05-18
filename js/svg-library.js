/* ─────────────────────────────────────────────────────────────────────────────
   Masonic SVG library — shared visual chrome.
   All paths in monochrome (currentColor) where possible so we can colour
   them with CSS. Two-tone where the spec demands gold + crimson.
   ───────────────────────────────────────────────────────────────────────── */

/* Primary Masonic emblem — Square and Compass with a centred G. */
export const SVG_SQUARE_COMPASS = `
<svg class="svg-square-compass" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <!-- outer circle frame -->
  <circle cx="70" cy="70" r="66" stroke="#c9a227" stroke-width="0.6" opacity="0.35"/>
  <circle cx="70" cy="70" r="60" stroke="#c9a227" stroke-width="0.4" opacity="0.25" stroke-dasharray="2 3"/>
  <!-- carpenter's square (crimson) -->
  <path d="M28 110 L112 110 L112 80" stroke="#8c1f1f" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M28 110 L28 38" stroke="#8c1f1f" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>
  <!-- square tick marks -->
  <line x1="40" y1="106" x2="40" y2="110" stroke="#8c1f1f" stroke-width="1"/>
  <line x1="52" y1="106" x2="52" y2="110" stroke="#8c1f1f" stroke-width="1"/>
  <line x1="64" y1="106" x2="64" y2="110" stroke="#8c1f1f" stroke-width="1"/>
  <line x1="76" y1="106" x2="76" y2="110" stroke="#8c1f1f" stroke-width="1"/>
  <line x1="88" y1="106" x2="88" y2="110" stroke="#8c1f1f" stroke-width="1"/>
  <line x1="100" y1="106" x2="100" y2="110" stroke="#8c1f1f" stroke-width="1"/>
  <line x1="28" y1="98" x2="32" y2="98" stroke="#8c1f1f" stroke-width="1"/>
  <line x1="28" y1="86" x2="32" y2="86" stroke="#8c1f1f" stroke-width="1"/>
  <line x1="28" y1="74" x2="32" y2="74" stroke="#8c1f1f" stroke-width="1"/>
  <line x1="28" y1="62" x2="32" y2="62" stroke="#8c1f1f" stroke-width="1"/>
  <line x1="28" y1="50" x2="32" y2="50" stroke="#8c1f1f" stroke-width="1"/>
  <!-- compass (gold) -->
  <path d="M70 22 L40 104" stroke="#c9a227" stroke-width="3.2" stroke-linecap="round"/>
  <path d="M70 22 L100 104" stroke="#c9a227" stroke-width="3.2" stroke-linecap="round"/>
  <!-- compass legs feet -->
  <circle cx="40" cy="104" r="2.2" fill="#c9a227"/>
  <circle cx="100" cy="104" r="2.2" fill="#c9a227"/>
  <!-- compass arc -->
  <path d="M48 88 Q70 80 92 88" stroke="#c9a227" stroke-width="2" fill="none" stroke-linecap="round"/>
  <!-- compass hinge -->
  <circle cx="70" cy="22" r="4" fill="#c9a227"/>
  <circle cx="70" cy="22" r="2" fill="#0a0502"/>
  <!-- letter G -->
  <text x="70" y="84" text-anchor="middle" font-family="'Playfair Display', serif" font-style="italic" font-size="24" fill="#c9a227" font-weight="700">G</text>
</svg>`;

/* Radiant Delta — All-Seeing Eye inside a triangle with rays. */
export const SVG_RADIANT_DELTA = `
<svg class="svg-radiant-delta" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <!-- rays -->
  <g class="rd-rays" stroke="#c9a227" stroke-width="1" stroke-linecap="round" opacity="0.85">
    <line x1="70" y1="6"  x2="70"  y2="22"/>
    <line x1="70" y1="118" x2="70" y2="134"/>
    <line x1="6"  y1="70" x2="22"  y2="70"/>
    <line x1="118" y1="70" x2="134" y2="70"/>
    <line x1="22" y1="22" x2="34"  y2="34"/>
    <line x1="118" y1="22" x2="106" y2="34"/>
    <line x1="22" y1="118" x2="34"  y2="106"/>
    <line x1="118" y1="118" x2="106" y2="106"/>
    <line x1="46" y1="10" x2="52"  y2="24"/>
    <line x1="94" y1="10" x2="88"  y2="24"/>
    <line x1="10" y1="46" x2="24"  y2="52"/>
    <line x1="130" y1="46" x2="116" y2="52"/>
    <line x1="10" y1="94" x2="24"  y2="88"/>
    <line x1="130" y1="94" x2="116" y2="88"/>
    <line x1="46" y1="130" x2="52" y2="116"/>
    <line x1="94" y1="130" x2="88" y2="116"/>
  </g>
  <!-- triangle -->
  <path d="M70 28 L114 100 L26 100 Z" stroke="#c9a227" stroke-width="2.4" fill="rgba(201,162,39,0.04)" stroke-linejoin="round"/>
  <!-- eye -->
  <path d="M48 76 Q70 60 92 76 Q70 92 48 76 Z" stroke="#c9a227" stroke-width="1.8" fill="#0a0502"/>
  <circle cx="70" cy="76" r="6.5" fill="#c9a227"/>
  <circle cx="70" cy="76" r="2.8" fill="#0a0502"/>
  <circle cx="72" cy="74" r="1" fill="#f5e8c8"/>
</svg>`;

/* Two pillars — Jachin & Boaz with capitals, bases and globe finials. */
export const SVG_PILLARS = `
<svg class="svg-pillars" viewBox="0 0 120 160" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <!-- left pillar (J) -->
  <g>
    <circle cx="30" cy="14" r="8" stroke="#c9a227" stroke-width="1.6" fill="rgba(201,162,39,0.08)"/>
    <path d="M22 22 L38 22 L42 32 L18 32 Z" stroke="#c9a227" stroke-width="1.6" fill="none"/>
    <rect x="22" y="32" width="16" height="100" stroke="#c9a227" stroke-width="1.6" fill="none"/>
    <line x1="26" y1="38" x2="26" y2="128" stroke="#c9a227" stroke-width="0.6"/>
    <line x1="30" y1="38" x2="30" y2="128" stroke="#c9a227" stroke-width="0.6"/>
    <line x1="34" y1="38" x2="34" y2="128" stroke="#c9a227" stroke-width="0.6"/>
    <path d="M16 132 L44 132 L46 144 L14 144 Z" stroke="#c9a227" stroke-width="1.6" fill="none"/>
    <text x="30" y="80" text-anchor="middle" font-family="'Playfair Display', serif" font-style="italic" font-size="12" fill="#8c1f1f" opacity="0.55">J</text>
  </g>
  <!-- right pillar (B) -->
  <g>
    <circle cx="90" cy="14" r="8" stroke="#c9a227" stroke-width="1.6" fill="rgba(201,162,39,0.08)"/>
    <path d="M82 22 L98 22 L102 32 L78 32 Z" stroke="#c9a227" stroke-width="1.6" fill="none"/>
    <rect x="82" y="32" width="16" height="100" stroke="#c9a227" stroke-width="1.6" fill="none"/>
    <line x1="86" y1="38" x2="86" y2="128" stroke="#c9a227" stroke-width="0.6"/>
    <line x1="90" y1="38" x2="90" y2="128" stroke="#c9a227" stroke-width="0.6"/>
    <line x1="94" y1="38" x2="94" y2="128" stroke="#c9a227" stroke-width="0.6"/>
    <path d="M76 132 L104 132 L106 144 L74 144 Z" stroke="#c9a227" stroke-width="1.6" fill="none"/>
    <text x="90" y="80" text-anchor="middle" font-family="'Playfair Display', serif" font-style="italic" font-size="12" fill="#8c1f1f" opacity="0.55">B</text>
  </g>
</svg>`;

/* Hourglass inside a compass arc — for "Timeless Cycles". */
export const SVG_HOURGLASS_COMPASS = `
<svg class="svg-hourglass" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="M14 60 A46 46 0 0 1 106 60" stroke="#c9a227" stroke-width="1.6" fill="none" stroke-linecap="round"/>
  <line x1="14" y1="60" x2="14" y2="66" stroke="#c9a227" stroke-width="1.6" stroke-linecap="round"/>
  <line x1="106" y1="60" x2="106" y2="66" stroke="#c9a227" stroke-width="1.6" stroke-linecap="round"/>
  <line x1="40" y1="44" x2="80" y2="44" stroke="#c9a227" stroke-width="2.4" stroke-linecap="round"/>
  <line x1="40" y1="100" x2="80" y2="100" stroke="#c9a227" stroke-width="2.4" stroke-linecap="round"/>
  <path d="M44 44 L60 72 L76 44" stroke="#c9a227" stroke-width="1.8" fill="rgba(201,162,39,0.12)" stroke-linejoin="round"/>
  <path d="M44 100 L60 72 L76 100" stroke="#c9a227" stroke-width="1.8" fill="rgba(140,31,31,0.18)" stroke-linejoin="round"/>
  <circle cx="60" cy="72" r="1.8" fill="#c9a227"/>
</svg>`;

/* Compass-arc divider — single wide gold arc. width:auto, scales to container. */
export const SVG_COMPASS_DIVIDER = `
<svg class="svg-compass-divider" viewBox="0 0 600 40" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <line x1="0" y1="20" x2="240" y2="20" stroke="#c9a227" stroke-width="0.6" opacity="0.55"/>
  <path d="M260 20 L298 6 L300 4 L302 6 L340 20" stroke="#c9a227" stroke-width="1" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="300" cy="4" r="2" fill="#c9a227"/>
  <path d="M275 20 Q300 14 325 20" stroke="#c9a227" stroke-width="0.8" fill="none"/>
  <line x1="360" y1="20" x2="600" y2="20" stroke="#c9a227" stroke-width="0.6" opacity="0.55"/>
</svg>`;

/* Tessellated floor (B/W diamonds) — repeating SVG. Use as background. */
export const SVG_TESSELLATED_FLOOR = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">
  <defs>
    <pattern id="diamonds" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <rect x="0" y="0" width="20" height="20" fill="#f5e8c8"/>
      <rect x="20" y="20" width="20" height="20" fill="#f5e8c8"/>
      <rect x="20" y="0" width="20" height="20" fill="#0a0502"/>
      <rect x="0" y="20" width="20" height="20" fill="#0a0502"/>
    </pattern>
  </defs>
  <rect width="80" height="80" fill="url(#diamonds)"/>
</svg>`;

/* Floor as a data-uri for use in CSS background-image. */
export const TESSELLATED_FLOOR_DATAURI =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(SVG_TESSELLATED_FLOOR);

/* Wax-seal octagon outline with rope edge — used for hero CTA. */
export const SVG_WAX_SEAL = `
<svg class="svg-wax-seal" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <radialGradient id="seal-grad" cx="40%" cy="40%" r="70%">
      <stop offset="0%" stop-color="#a8252a"/>
      <stop offset="60%" stop-color="#7a1418"/>
      <stop offset="100%" stop-color="#4a0810"/>
    </radialGradient>
  </defs>
  <polygon points="80,12 124,32 144,76 124,120 80,140 36,120 16,76 36,32"
           fill="url(#seal-grad)" stroke="#c9a227" stroke-width="2.4"/>
  <polygon points="80,20 118,38 134,76 118,114 80,132 42,114 26,76 42,38"
           fill="none" stroke="#c9a227" stroke-width="0.8" opacity="0.55"/>
  <!-- rope edge (12 evenly spaced dots) -->
  ${Array.from({length: 24}, (_, i) => {
    const a = (i / 24) * Math.PI * 2 - Math.PI/2;
    const x = 80 + Math.cos(a) * 56;
    const y = 80 + Math.sin(a) * 56;
    return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="1.3" fill="#c9a227" opacity="0.6"/>`;
  }).join('')}
  <!-- compass emboss inside -->
  <g opacity="0.95">
    <path d="M80 48 L60 108" stroke="#c9a227" stroke-width="1.8" stroke-linecap="round"/>
    <path d="M80 48 L100 108" stroke="#c9a227" stroke-width="1.8" stroke-linecap="round"/>
    <path d="M64 96 Q80 90 96 96" stroke="#c9a227" stroke-width="1.1" fill="none" stroke-linecap="round"/>
    <path d="M50 108 L110 108 L110 90" stroke="#c9a227" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <circle cx="80" cy="48" r="2.4" fill="#c9a227"/>
    <text x="80" y="92" text-anchor="middle" font-family="'Playfair Display', serif" font-style="italic" font-size="14" fill="#c9a227" font-weight="700">G</text>
  </g>
</svg>`;

/* Decorative capital — for the top of stone-pillar context blocks. */
export const SVG_STONE_CAPITAL = `
<svg class="svg-stone-capital" viewBox="0 0 200 32" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <!-- abacus -->
  <rect x="4" y="2" width="192" height="6" stroke="#c9a227" stroke-width="0.8" fill="rgba(201,162,39,0.06)"/>
  <!-- echinus curve -->
  <path d="M14 8 Q14 18 30 22 L170 22 Q186 18 186 8" stroke="#c9a227" stroke-width="0.8" fill="rgba(201,162,39,0.04)"/>
  <!-- acanthus dots -->
  <circle cx="50" cy="14" r="1.2" fill="#c9a227" opacity="0.55"/>
  <circle cx="100" cy="13" r="1.6" fill="#c9a227" opacity="0.7"/>
  <circle cx="150" cy="14" r="1.2" fill="#c9a227" opacity="0.55"/>
  <!-- center motif -->
  <path d="M94 16 L100 10 L106 16 L100 22 Z" stroke="#c9a227" stroke-width="0.8" fill="rgba(201,162,39,0.15)"/>
  <!-- side dashes -->
  <line x1="20" y1="14" x2="44" y2="14" stroke="#c9a227" stroke-width="0.4" stroke-dasharray="2 3" opacity="0.5"/>
  <line x1="156" y1="14" x2="180" y2="14" stroke="#c9a227" stroke-width="0.4" stroke-dasharray="2 3" opacity="0.5"/>
  <!-- column shaft hint at bottom -->
  <line x1="40" y1="30" x2="160" y2="30" stroke="#c9a227" stroke-width="0.6" opacity="0.5"/>
</svg>`;

/* Decorative base — bottom of stone pillar (mirror of capital). */
export const SVG_STONE_BASE = `
<svg class="svg-stone-base" viewBox="0 0 200 24" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect x="0" y="16" width="200" height="6" stroke="#c9a227" stroke-width="0.8" fill="rgba(201,162,39,0.06)"/>
  <path d="M14 16 Q14 8 30 4 L170 4 Q186 8 186 16" stroke="#c9a227" stroke-width="0.6" fill="rgba(201,162,39,0.03)"/>
  <line x1="40" y1="0" x2="160" y2="0" stroke="#c9a227" stroke-width="0.6" opacity="0.5"/>
</svg>`;

/* Padlock with engraved square on shackle — for locked puzzle cards. */
export const SVG_LOCK = `
<svg class="svg-lock" viewBox="0 0 60 70" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="M16 30 L16 22 Q16 8 30 8 Q44 8 44 22 L44 30" stroke="#c9a227" stroke-width="2" fill="none" stroke-linecap="round"/>
  <path d="M21 30 L21 24 Q21 26 30 26 Q39 26 39 24 L39 30" stroke="#c9a227" stroke-width="0.8" fill="none" opacity="0.45"/>
  <rect x="10" y="30" width="40" height="32" rx="2" stroke="#c9a227" stroke-width="2" fill="rgba(201,162,39,0.06)"/>
  <path d="M20 40 L24 40 L24 44" stroke="#c9a227" stroke-width="1" fill="none"/>
  <path d="M20 40 L20 50 L30 50" stroke="#c9a227" stroke-width="1" fill="none"/>
  <circle cx="30" cy="46" r="3" fill="#c9a227"/>
  <path d="M30 49 L30 55" stroke="#c9a227" stroke-width="2" stroke-linecap="round"/>
</svg>`;

/* Flame for vitality meter. Filled state uses fill-opacity. */
export const SVG_FLAME = (lit = true) => `
<svg class="svg-flame ${lit ? 'flame-lit' : 'flame-out'}" viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="M16 4 C16 4 8 14 8 22 C8 28 11 34 16 34 C21 34 24 28 24 22 C24 18 21 14 19 12 C19 16 17 18 16 18 C16 14 18 10 16 4 Z"
        stroke="#c9a227" stroke-width="1.6" stroke-linejoin="round"
        fill="${lit ? '#c9a227' : 'none'}" fill-opacity="${lit ? 0.85 : 0}"/>
  ${lit ? '<circle cx="16" cy="24" r="2.5" fill="#f5e8c8" opacity="0.9"/>' : '<path d="M10 30 L22 30" stroke="rgba(201,162,39,0.35)" stroke-width="1" stroke-dasharray="2 2"/>'}
</svg>`;

/* Victorian corner flourish — single SVG mirrored four times via CSS rotate. */
export const SVG_CORNER_FLOURISH = `
<svg class="svg-corner" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="M2 2 L18 2" stroke="#c9a227" stroke-width="1" stroke-linecap="round"/>
  <path d="M2 2 L2 18" stroke="#c9a227" stroke-width="1" stroke-linecap="round"/>
  <path d="M2 2 L14 14" stroke="#c9a227" stroke-width="0.6" stroke-linecap="round"/>
  <path d="M6 2 Q10 6 6 10" stroke="#c9a227" stroke-width="0.6" fill="none"/>
  <path d="M2 6 Q6 10 10 6" stroke="#c9a227" stroke-width="0.6" fill="none"/>
  <circle cx="14" cy="14" r="1.4" fill="#c9a227"/>
</svg>`;

/* Stone archway frame — for reflection page. */
export const SVG_STONE_ARCH = `
<svg class="svg-stone-arch" viewBox="0 0 800 900" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <!-- left pillar -->
  <rect x="40" y="180" width="60" height="680" stroke="rgba(201,162,39,0.18)" stroke-width="1" fill="rgba(201,162,39,0.025)"/>
  <rect x="32" y="160" width="76" height="22" stroke="rgba(201,162,39,0.22)" stroke-width="1" fill="none"/>
  <rect x="32" y="858" width="76" height="22" stroke="rgba(201,162,39,0.22)" stroke-width="1" fill="none"/>
  <!-- right pillar -->
  <rect x="700" y="180" width="60" height="680" stroke="rgba(201,162,39,0.18)" stroke-width="1" fill="rgba(201,162,39,0.025)"/>
  <rect x="692" y="160" width="76" height="22" stroke="rgba(201,162,39,0.22)" stroke-width="1" fill="none"/>
  <rect x="692" y="858" width="76" height="22" stroke="rgba(201,162,39,0.22)" stroke-width="1" fill="none"/>
  <!-- arch -->
  <path d="M40 180 Q400 -30 760 180" stroke="rgba(201,162,39,0.22)" stroke-width="1" fill="none"/>
  <path d="M100 180 Q400 30 700 180" stroke="rgba(201,162,39,0.16)" stroke-width="1" fill="none"/>
  <path d="M70 180 Q400 0 730 180" stroke="rgba(201,162,39,0.10)" stroke-width="1" fill="none" stroke-dasharray="2 4"/>
  <!-- keystone -->
  <path d="M380 24 L420 24 L432 60 L368 60 Z" stroke="rgba(201,162,39,0.32)" stroke-width="1" fill="rgba(201,162,39,0.05)"/>
</svg>`;

/* Stone door — game over overlay. */
export const SVG_STONE_DOOR = `
<svg class="svg-stone-door" viewBox="0 0 320 360" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect x="20" y="20" width="280" height="320" rx="4" stroke="#c9a227" stroke-width="1.4" fill="rgba(10,5,2,0.6)"/>
  <rect x="36" y="36" width="248" height="288" stroke="rgba(201,162,39,0.4)" stroke-width="0.8" fill="none"/>
  <path d="M160 36 L160 324" stroke="rgba(201,162,39,0.3)" stroke-width="0.6"/>
  <!-- rivets -->
  ${Array.from({length: 7}, (_, i) => `<circle cx="48" cy="${52 + i * 44}" r="2.2" fill="#c9a227"/>`).join('')}
  ${Array.from({length: 7}, (_, i) => `<circle cx="272" cy="${52 + i * 44}" r="2.2" fill="#c9a227"/>`).join('')}
</svg>`;

/* Hanging wax-seal pendant — Secret Archives link.
   The pendant contains a Radiant Delta. Ribbon hangs from a peg. */
export const SVG_HANGING_PENDANT = `
<svg class="svg-hanging-pendant" viewBox="0 0 240 320" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <!-- ribbon -->
  <path d="M108 6 L120 26 L132 6 Z" fill="#5e0b15"/>
  <path d="M96 14 L120 56 L144 14" stroke="#5e0b15" stroke-width="22" stroke-linecap="round" fill="none"/>
  <path d="M96 14 L120 56 L144 14" stroke="#8c1f1f" stroke-width="18" stroke-linecap="round" fill="none"/>
  <!-- seal disc -->
  <circle cx="120" cy="160" r="92" fill="#5e0b15" stroke="#c9a227" stroke-width="3"/>
  <circle cx="120" cy="160" r="84" fill="none" stroke="#c9a227" stroke-width="0.8" stroke-dasharray="4 3" opacity="0.7"/>
  <!-- text path -->
  <defs>
    <path id="seal-text-path" d="M120 160 m -68 0 a 68 68 0 1 1 136 0 a 68 68 0 1 1 -136 0"/>
  </defs>
  <text font-family="'Inter', sans-serif" font-size="10" fill="#c9a227" letter-spacing="6" font-weight="600">
    <textPath href="#seal-text-path" startOffset="0%">SECRET ARCHIVES · THE LODGE · KIMBERLEY ·  </textPath>
  </text>
  <!-- mini radiant delta inside -->
  <g transform="translate(120 160)">
    <path d="M0 -30 L26 16 L-26 16 Z" stroke="#c9a227" stroke-width="2" fill="rgba(201,162,39,0.08)"/>
    <ellipse cx="0" cy="2" rx="14" ry="6" stroke="#c9a227" stroke-width="1.2" fill="#0a0502"/>
    <circle cx="0" cy="2" r="3" fill="#c9a227"/>
    <g stroke="#c9a227" stroke-width="0.6" opacity="0.7">
      <line x1="-32" y1="22" x2="-40" y2="30"/>
      <line x1="0" y1="-36" x2="0" y2="-44"/>
      <line x1="32" y1="22" x2="40" y2="30"/>
    </g>
  </g>
  <!-- bottom ribbon tails -->
  <path d="M108 248 L78 312 L98 286 Z" fill="#8c1f1f"/>
  <path d="M132 248 L162 312 L142 286 Z" fill="#8c1f1f"/>
</svg>`;

/* Combination-lock dial — Secret Archives header. */
export const SVG_COMBO_LOCK = `
<svg class="svg-combo-lock" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <circle cx="40" cy="40" r="34" stroke="#c9a227" stroke-width="1.6" fill="rgba(10,5,2,0.5)"/>
  <circle cx="40" cy="40" r="28" stroke="#c9a227" stroke-width="0.6" opacity="0.55"/>
  ${Array.from({length: 24}, (_, i) => {
    const a = (i / 24) * Math.PI * 2;
    const x1 = 40 + Math.cos(a) * 28;
    const y1 = 40 + Math.sin(a) * 28;
    const x2 = 40 + Math.cos(a) * 32;
    const y2 = 40 + Math.sin(a) * 32;
    return `<line x1="${x1.toFixed(2)}" y1="${y1.toFixed(2)}" x2="${x2.toFixed(2)}" y2="${y2.toFixed(2)}" stroke="#c9a227" stroke-width="1"/>`;
  }).join('')}
  <circle cx="40" cy="40" r="3" fill="#c9a227"/>
  <line x1="40" y1="40" x2="40" y2="14" stroke="#c9a227" stroke-width="2" stroke-linecap="round"/>
  <line x1="40" y1="40" x2="58" y2="46" stroke="#8c1f1f" stroke-width="1.4" stroke-linecap="round"/>
</svg>`;

/* Calligraphic compass icon (for headers/buttons). */
export const SVG_COMPASS_MARK = `
<svg class="svg-compass-mark" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="M12 3 L6 21" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
  <path d="M12 3 L18 21" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
  <path d="M7 17 Q12 14 17 17" stroke="currentColor" stroke-width="1.2" fill="none" stroke-linecap="round"/>
  <circle cx="12" cy="3" r="1.6" fill="currentColor"/>
</svg>`;

/* Compass-cross + tick: small mark for empty slots. */
export const SVG_SLOT_CROSS = `
<svg class="svg-slot-cross" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <line x1="30" y1="10" x2="30" y2="50" stroke="#c9a227" stroke-width="0.8" opacity="0.5"/>
  <line x1="10" y1="30" x2="50" y2="30" stroke="#c9a227" stroke-width="0.8" opacity="0.5"/>
  <circle cx="30" cy="30" r="14" stroke="#c9a227" stroke-width="0.6" opacity="0.35" fill="none"/>
  <circle cx="30" cy="30" r="8" stroke="#c9a227" stroke-width="0.4" opacity="0.45" fill="none" stroke-dasharray="2 2"/>
</svg>`;

/* Larger Masonic symbol SVGs for Puzzle 2 — engraved on stone tile. */
export const SVG_SYM_CHAIN = `
<svg class="symbol-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="chainShine" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#ecc246"/>
      <stop offset="50%" stop-color="#c9a227"/>
      <stop offset="100%" stop-color="#8a6b1c"/>
    </linearGradient>
  </defs>
  <!-- Five interlocking chain links, woven L→R diagonally -->
  <g stroke="url(#chainShine)" stroke-width="2.6" fill="none" stroke-linecap="round">
    <!-- link 1 — top left, vertical -->
    <ellipse cx="22" cy="26" rx="9" ry="14"/>
    <ellipse cx="22" cy="26" rx="4" ry="9" stroke-width="0.8" opacity="0.55"/>
    <!-- link 2 — horizontal -->
    <ellipse cx="38" cy="36" rx="14" ry="9" transform="rotate(60 38 36)"/>
    <ellipse cx="38" cy="36" rx="9" ry="4" transform="rotate(60 38 36)" stroke-width="0.8" opacity="0.55"/>
    <!-- link 3 — center vertical -->
    <ellipse cx="50" cy="50" rx="9" ry="14"/>
    <ellipse cx="50" cy="50" rx="4" ry="9" stroke-width="0.8" opacity="0.55"/>
    <!-- link 4 — horizontal -->
    <ellipse cx="62" cy="64" rx="14" ry="9" transform="rotate(60 62 64)"/>
    <ellipse cx="62" cy="64" rx="9" ry="4" transform="rotate(60 62 64)" stroke-width="0.8" opacity="0.55"/>
    <!-- link 5 — bottom right -->
    <ellipse cx="78" cy="74" rx="9" ry="14"/>
    <ellipse cx="78" cy="74" rx="4" ry="9" stroke-width="0.8" opacity="0.55"/>
  </g>
  <!-- tiny highlights -->
  <circle cx="20" cy="20" r="0.8" fill="#f5e8c8" opacity="0.7"/>
  <circle cx="48" cy="44" r="0.8" fill="#f5e8c8" opacity="0.7"/>
  <circle cx="76" cy="68" r="0.8" fill="#f5e8c8" opacity="0.7"/>
</svg>`;

export const SVG_SYM_BRIDGE = `
<svg class="symbol-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Roman aqueduct-style bridge, three arches over water -->
  <!-- water reflection lines -->
  <g stroke="#c9a227" stroke-width="0.5" opacity="0.35">
    <line x1="6" y1="92" x2="94" y2="92"/>
    <line x1="12" y1="88" x2="32" y2="88"/>
    <line x1="42" y1="88" x2="58" y2="88"/>
    <line x1="68" y1="88" x2="88" y2="88"/>
  </g>
  <!-- bridge deck (top road) -->
  <line x1="6" y1="32" x2="94" y2="32" stroke="#c9a227" stroke-width="2.6" stroke-linecap="round"/>
  <line x1="6" y1="36" x2="94" y2="36" stroke="#c9a227" stroke-width="0.8" opacity="0.5"/>
  <!-- railings -->
  <line x1="6" y1="26" x2="94" y2="26" stroke="#c9a227" stroke-width="0.6" opacity="0.6"/>
  <line x1="14" y1="26" x2="14" y2="32" stroke="#c9a227" stroke-width="0.5" opacity="0.5"/>
  <line x1="34" y1="26" x2="34" y2="32" stroke="#c9a227" stroke-width="0.5" opacity="0.5"/>
  <line x1="50" y1="26" x2="50" y2="32" stroke="#c9a227" stroke-width="0.5" opacity="0.5"/>
  <line x1="66" y1="26" x2="66" y2="32" stroke="#c9a227" stroke-width="0.5" opacity="0.5"/>
  <line x1="86" y1="26" x2="86" y2="32" stroke="#c9a227" stroke-width="0.5" opacity="0.5"/>
  <!-- three arches -->
  <path d="M10 84 L10 56 Q10 40 28 40 Q46 40 46 56 L46 84"
        stroke="#c9a227" stroke-width="2" fill="rgba(140,31,31,0.06)" stroke-linejoin="round"/>
  <path d="M52 84 L52 56 Q52 40 70 40 Q88 40 88 56 L88 84"
        stroke="#c9a227" stroke-width="2" fill="rgba(140,31,31,0.06)" stroke-linejoin="round"/>
  <!-- center small arch (between two large ones) — pillars only -->
  <rect x="46" y="32" width="6" height="52" stroke="#c9a227" stroke-width="1.4" fill="rgba(201,162,39,0.05)"/>
  <!-- keystone marks -->
  <path d="M26 40 L30 38 L30 42 Z" fill="#c9a227" opacity="0.75"/>
  <path d="M68 40 L72 38 L72 42 Z" fill="#c9a227" opacity="0.75"/>
  <!-- pillar bases -->
  <rect x="8" y="82" width="6" height="3" stroke="#c9a227" stroke-width="0.8" fill="none"/>
  <rect x="44" y="82" width="6" height="3" stroke="#c9a227" stroke-width="0.8" fill="none"/>
  <rect x="50" y="82" width="6" height="3" stroke="#c9a227" stroke-width="0.8" fill="none"/>
  <rect x="86" y="82" width="6" height="3" stroke="#c9a227" stroke-width="0.8" fill="none"/>
  <!-- standard at top -->
  <circle cx="50" cy="20" r="1.6" fill="#c9a227"/>
  <line x1="50" y1="21" x2="50" y2="26" stroke="#c9a227" stroke-width="0.6"/>
</svg>`;

export const SVG_SYM_CANDLE = `
<svg class="symbol-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="flameGrad" cx="50%" cy="60%" r="50%">
      <stop offset="0%" stop-color="#f5e8c8"/>
      <stop offset="40%" stop-color="#ecc246"/>
      <stop offset="100%" stop-color="#c9a227" stop-opacity="0.7"/>
    </radialGradient>
  </defs>
  <!-- outer flame halo -->
  <path d="M50 6 C50 6 38 22 38 36 C38 46 44 54 50 54 C56 54 62 46 62 36 C62 22 50 6 50 6 Z"
        stroke="#c9a227" stroke-width="0.8" fill="rgba(201,162,39,0.12)" opacity="0.6"/>
  <!-- main flame body -->
  <path d="M50 14 C50 14 42 26 42 38 C42 46 45 50 50 50 C55 50 58 46 58 38 C58 26 50 14 50 14 Z"
        stroke="#ecc246" stroke-width="1.4" fill="url(#flameGrad)"/>
  <!-- inner blue/dark core -->
  <path d="M50 30 C50 30 47 36 47 40 C47 44 48 46 50 46 C52 46 53 44 53 40 C53 36 50 30 50 30 Z"
        fill="#5e0b15" opacity="0.6"/>
  <!-- wick -->
  <line x1="50" y1="46" x2="50" y2="56" stroke="#2a1a08" stroke-width="1.5" stroke-linecap="round"/>
  <!-- candle taper with melted wax dripping -->
  <path d="M44 56 L42 64 L42 84 L58 84 L58 64 L56 56 Z"
        stroke="#c9a227" stroke-width="1.8" fill="rgba(245,232,200,0.18)" stroke-linejoin="round"/>
  <!-- wax drip on the side -->
  <path d="M42 66 Q40 70 41 76 Q42 78 43 76 L43 66 Z" fill="rgba(245,232,200,0.32)" stroke="#c9a227" stroke-width="0.6"/>
  <!-- candle horizontal etched rings -->
  <line x1="42" y1="70" x2="58" y2="70" stroke="#c9a227" stroke-width="0.4" opacity="0.5"/>
  <line x1="42" y1="76" x2="58" y2="76" stroke="#c9a227" stroke-width="0.4" opacity="0.5"/>
  <!-- ornate brass holder -->
  <path d="M36 84 L64 84 L60 88 L40 88 Z" stroke="#c9a227" stroke-width="1.5" fill="rgba(201,162,39,0.1)" stroke-linejoin="round"/>
  <rect x="46" y="88" width="8" height="3" stroke="#c9a227" stroke-width="1" fill="rgba(201,162,39,0.1)"/>
  <path d="M32 91 L68 91 L62 96 L38 96 Z" stroke="#c9a227" stroke-width="1.8" fill="rgba(201,162,39,0.12)" stroke-linejoin="round"/>
  <!-- holder decorative ridges -->
  <line x1="40" y1="93" x2="60" y2="93" stroke="#c9a227" stroke-width="0.4" opacity="0.55"/>
</svg>`;

export const SVG_SYM_HANDS = `
<svg class="symbol-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Two clasped hands emerging from ornate cuffs (Masonic-style) -->
  <!-- LEFT cuff -->
  <path d="M4 88 L20 60 L34 70 L22 92 Z"
        stroke="#c9a227" stroke-width="1.6" fill="rgba(140,31,31,0.12)" stroke-linejoin="round"/>
  <!-- cuff decoration -->
  <line x1="6" y1="84" x2="22" y2="88" stroke="#c9a227" stroke-width="0.6" opacity="0.6"/>
  <line x1="10" y1="78" x2="26" y2="82" stroke="#c9a227" stroke-width="0.6" opacity="0.6"/>
  <!-- LEFT forearm -->
  <path d="M20 60 Q26 56 32 54" stroke="#c9a227" stroke-width="2.4" fill="none" stroke-linecap="round"/>
  <!-- RIGHT cuff -->
  <path d="M96 88 L80 60 L66 70 L78 92 Z"
        stroke="#c9a227" stroke-width="1.6" fill="rgba(140,31,31,0.12)" stroke-linejoin="round"/>
  <line x1="94" y1="84" x2="78" y2="88" stroke="#c9a227" stroke-width="0.6" opacity="0.6"/>
  <line x1="90" y1="78" x2="74" y2="82" stroke="#c9a227" stroke-width="0.6" opacity="0.6"/>
  <!-- RIGHT forearm -->
  <path d="M80 60 Q74 56 68 54" stroke="#c9a227" stroke-width="2.4" fill="none" stroke-linecap="round"/>

  <!-- The clasp itself — interlocking hands -->
  <!-- LEFT hand palm -->
  <path d="M32 54 Q28 48 30 42 Q34 38 40 40 L48 44 L48 56 L36 58 Z"
        stroke="#c9a227" stroke-width="1.8" fill="rgba(245,232,200,0.08)" stroke-linejoin="round"/>
  <!-- LEFT fingers detail -->
  <path d="M34 42 L34 36" stroke="#c9a227" stroke-width="0.8" stroke-linecap="round"/>
  <path d="M38 41 L38 34" stroke="#c9a227" stroke-width="0.8" stroke-linecap="round"/>
  <path d="M42 41 L42 34" stroke="#c9a227" stroke-width="0.8" stroke-linecap="round"/>
  <!-- RIGHT hand palm (mirror) -->
  <path d="M68 54 Q72 48 70 42 Q66 38 60 40 L52 44 L52 56 L64 58 Z"
        stroke="#c9a227" stroke-width="1.8" fill="rgba(245,232,200,0.08)" stroke-linejoin="round"/>
  <path d="M66 42 L66 36" stroke="#c9a227" stroke-width="0.8" stroke-linecap="round"/>
  <path d="M62 41 L62 34" stroke="#c9a227" stroke-width="0.8" stroke-linecap="round"/>
  <path d="M58 41 L58 34" stroke="#c9a227" stroke-width="0.8" stroke-linecap="round"/>

  <!-- handshake clasp line -->
  <line x1="36" y1="50" x2="64" y2="50" stroke="#5e0b15" stroke-width="1.2" opacity="0.65"/>
  <!-- thumb gripping bump -->
  <path d="M44 46 Q50 42 56 46" stroke="#c9a227" stroke-width="1" fill="none" stroke-linecap="round"/>

  <!-- All-seeing eye small above (Masonic motif) -->
  <g opacity="0.85" transform="translate(50 18)">
    <path d="M0 -8 L9 5 L-9 5 Z" stroke="#c9a227" stroke-width="1" fill="rgba(201,162,39,0.06)"/>
    <ellipse cy="1" rx="5" ry="2.5" stroke="#c9a227" stroke-width="0.7" fill="#0a0502"/>
    <circle cy="1" r="1.3" fill="#c9a227"/>
    <g stroke="#c9a227" stroke-width="0.4" opacity="0.6">
      <line x1="-13" y1="-2" x2="-16" y2="-4"/>
      <line x1="13" y1="-2" x2="16" y2="-4"/>
      <line x1="0" y1="-12" x2="0" y2="-15"/>
    </g>
  </g>
</svg>`;

/* "Seal Broken" stamp — for completed puzzle cards. */
export const SVG_SEAL_BROKEN = `
<svg class="svg-seal-broken" viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect x="6" y="14" width="108" height="52" rx="2" stroke="#8c1f1f" stroke-width="2" fill="none"/>
  <rect x="10" y="18" width="100" height="44" stroke="#8c1f1f" stroke-width="0.6" fill="none" opacity="0.6"/>
  <text x="60" y="48" text-anchor="middle" font-family="'Playfair Display', serif" font-style="italic" font-weight="700" font-size="18" fill="#8c1f1f" letter-spacing="3">SEALED</text>
</svg>`;

/* Convenience: small "ENGRAVED" rule used as decorative line.
   Sized via CSS height/width on the wrapper. */
export const SVG_ENGRAVED_RULE = `
<svg class="svg-engraved-rule" viewBox="0 0 400 8" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <line x1="0" y1="3" x2="400" y2="3" stroke="#c9a227" stroke-width="0.6" opacity="0.85"/>
  <line x1="0" y1="6" x2="400" y2="6" stroke="#c9a227" stroke-width="0.4" opacity="0.4"/>
</svg>`;

/* ─────────────────────────────────────────────────────────────────────────
   PUZZLE 3 — KIMBERLEY 1886 hand-drawn map background.
   Streets, the Big Hole, key buildings, compass rose, title cartouche.
   Designed to span the canvas under the 5 medallion nodes.
   ───────────────────────────────────────────────────────────────────────── */
export const SVG_KIMBERLEY_MAP = `
<svg class="svg-kimberley-map" viewBox="0 0 800 600" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <filter id="mapPaper">
      <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="2" seed="3"/>
      <feColorMatrix values="0 0 0 0 0.78  0 0 0 0 0.63  0 0 0 0 0.15  0 0 0 0.4 0"/>
    </filter>
  </defs>

  <!-- title cartouche, top-left -->
  <g opacity="0.7">
    <rect x="24" y="20" width="220" height="56" fill="none" stroke="#c9a227" stroke-width="0.8"/>
    <rect x="28" y="24" width="212" height="48" fill="none" stroke="#c9a227" stroke-width="0.4"/>
    <text x="134" y="44" text-anchor="middle" font-family="'Playfair Display', serif" font-style="italic" font-weight="700" font-size="16" fill="#c9a227">Kimberley</text>
    <text x="134" y="62" text-anchor="middle" font-family="'Inter', sans-serif" font-weight="600" font-size="9" letter-spacing="3" fill="#c9a227">DIAMOND FIELDS · 1886</text>
  </g>

  <!-- compass rose, top-right -->
  <g transform="translate(720 70)" opacity="0.65">
    <circle r="38" stroke="#c9a227" stroke-width="0.7" fill="none"/>
    <circle r="30" stroke="#c9a227" stroke-width="0.4" fill="none" stroke-dasharray="2 2"/>
    <path d="M0 -36 L4 0 L0 36 L-4 0 Z" fill="#c9a227" opacity="0.4"/>
    <path d="M-36 0 L0 -4 L36 0 L0 4 Z" fill="#c9a227" opacity="0.25"/>
    <path d="M-26 -26 L-1 -1 L26 -26 L1 1 Z" fill="none" stroke="#c9a227" stroke-width="0.4" opacity="0.4"/>
    <text x="0" y="-44" text-anchor="middle" font-family="'Inter', sans-serif" font-weight="700" font-size="10" fill="#c9a227">N</text>
    <text x="46" y="3" text-anchor="middle" font-family="'Inter', sans-serif" font-weight="600" font-size="8" fill="#c9a227" opacity="0.7">E</text>
    <text x="-46" y="3" text-anchor="middle" font-family="'Inter', sans-serif" font-weight="600" font-size="8" fill="#c9a227" opacity="0.7">W</text>
    <text x="0" y="50" text-anchor="middle" font-family="'Inter', sans-serif" font-weight="600" font-size="8" fill="#c9a227" opacity="0.7">S</text>
    <circle r="2" fill="#c9a227"/>
  </g>

  <!-- streets (hand-drawn wobbly) -->
  <g stroke="#c9a227" stroke-width="0.5" fill="none" opacity="0.32" stroke-linecap="round">
    <path d="M0 250 Q200 245 400 250 T800 252"/>
    <path d="M0 360 Q200 365 400 360 T800 362"/>
    <path d="M100 0 Q104 200 100 400 T98 600"/>
    <path d="M260 0 Q256 200 260 400 T262 600"/>
    <path d="M500 0 Q504 200 500 400 T502 600"/>
    <path d="M680 0 Q676 200 680 400 T682 600"/>
  </g>
  <!-- street labels -->
  <g font-family="'Inter', sans-serif" font-weight="600" font-size="8" letter-spacing="3" fill="#c9a227" opacity="0.5">
    <text x="180" y="246" transform="rotate(-1 180 246)">DUTOITSPAN&nbsp;ROAD</text>
    <text x="430" y="356" transform="rotate(-0.5 430 356)">JONES&nbsp;STREET</text>
    <text x="98" y="120" transform="rotate(-90 98 120)">CURREY&nbsp;ST</text>
    <text x="678" y="180" transform="rotate(-90 678 180)">STOCKDALE&nbsp;ST</text>
  </g>

  <!-- The Big Hole — open-pit mine, lower right -->
  <g transform="translate(560 480)" opacity="0.5">
    <ellipse rx="62" ry="40" stroke="#c9a227" stroke-width="0.8" fill="rgba(140,31,31,0.05)"/>
    <ellipse rx="50" ry="32" stroke="#c9a227" stroke-width="0.5" fill="none" stroke-dasharray="2 2"/>
    <ellipse rx="38" ry="24" stroke="#c9a227" stroke-width="0.4" fill="none" opacity="0.7"/>
    <ellipse rx="22" ry="14" stroke="#c9a227" stroke-width="0.4" fill="none" opacity="0.5"/>
    <ellipse rx="10" ry="6" stroke="#c9a227" stroke-width="0.4" fill="rgba(0,0,0,0.3)"/>
    <text y="-50" text-anchor="middle" font-family="'Playfair Display', serif" font-style="italic" font-weight="700" font-size="11" fill="#c9a227">The Big Hole</text>
    <text y="-38" text-anchor="middle" font-family="'Inter', sans-serif" font-weight="600" font-size="7" letter-spacing="2" fill="#c9a227" opacity="0.75">DE BEERS MINE</text>
  </g>

  <!-- Synagogue marker, bottom-left -->
  <g transform="translate(140 480)" opacity="0.5">
    <polygon points="0,-12 10,0 0,12 -10,0" stroke="#c9a227" stroke-width="0.7" fill="none"/>
    <line x1="-10" y1="0" x2="10" y2="0" stroke="#c9a227" stroke-width="0.5"/>
    <line x1="0" y1="-12" x2="0" y2="12" stroke="#c9a227" stroke-width="0.5"/>
    <text y="30" text-anchor="middle" font-family="'Inter', sans-serif" font-weight="600" font-size="7" letter-spacing="2" fill="#c9a227" opacity="0.75">SYNAGOGUE</text>
  </g>

  <!-- Market square marker, top-left mid -->
  <g transform="translate(340 130)" opacity="0.5">
    <rect x="-14" y="-10" width="28" height="20" stroke="#c9a227" stroke-width="0.6" fill="rgba(201,162,39,0.04)"/>
    <line x1="-14" y1="0" x2="14" y2="0" stroke="#c9a227" stroke-width="0.4"/>
    <line x1="0" y1="-10" x2="0" y2="10" stroke="#c9a227" stroke-width="0.4"/>
    <text y="-18" text-anchor="middle" font-family="'Inter', sans-serif" font-weight="600" font-size="7" letter-spacing="2" fill="#c9a227" opacity="0.75">MARKET SQUARE</text>
  </g>

  <!-- Scale bar, bottom right -->
  <g transform="translate(700 552)" opacity="0.55">
    <line x1="0" y1="0" x2="60" y2="0" stroke="#c9a227" stroke-width="1.2"/>
    <line x1="0" y1="-3" x2="0" y2="3" stroke="#c9a227" stroke-width="1"/>
    <line x1="30" y1="-2" x2="30" y2="2" stroke="#c9a227" stroke-width="0.8"/>
    <line x1="60" y1="-3" x2="60" y2="3" stroke="#c9a227" stroke-width="1"/>
    <text y="-8" font-family="'Inter', sans-serif" font-weight="600" font-size="7" letter-spacing="2" fill="#c9a227">0      500 ft</text>
  </g>

  <!-- Border frame -->
  <rect x="6" y="6" width="788" height="588" stroke="#c9a227" stroke-width="0.6" fill="none" opacity="0.45"/>
  <rect x="14" y="14" width="772" height="572" stroke="#c9a227" stroke-width="0.3" fill="none" opacity="0.35" stroke-dasharray="3 2"/>

  <!-- Paper noise overlay -->
  <rect width="800" height="600" filter="url(#mapPaper)" opacity="0.4"/>
</svg>`;

/* Tiny banner chip for constitution affiliation (EN / SC / NL).
   Used above each network node. */
export const SVG_BANNER_CHIP = (label, color = '#c9a227') => `
<svg class="svg-banner-chip" viewBox="0 0 60 22" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="M2 2 L58 2 L54 11 L58 20 L2 20 L6 11 Z"
        fill="${color}" stroke="#0a0502" stroke-width="0.4"/>
  <text x="30" y="14.5" text-anchor="middle" font-family="'Inter', sans-serif" font-weight="700" font-size="9" letter-spacing="2" fill="#0a0502">${label}</text>
</svg>`;
