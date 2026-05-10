---
name: Connect the Hidden Bonds
description: >
  Heritage puzzle experience centred on the 1886 Union Masonic Temple in
  Kimberley, South Africa. The UI operates in two distinct atmospheric modes —
  a light parchment context for the landing page and puzzle menu, and a near-black
  lodge chamber for the three interactive puzzle screens — sharing one unified
  Masonic visual language throughout.

colors:
  # ── Core palette ────────────────────────────────────
  gold:              "#c9a227"   # Masonic gold — the single dominant accent
  gold-bright:       "#e8c040"   # Hero / hero-accent gold (landing only)
  gold-dim:          "rgba(201,162,39,0.45)"
  gold-subtle:       "rgba(201,162,39,0.12)"
  gold-trace:        "rgba(201,162,39,0.05)"

  crimson:           "#5e0b15"   # Lodge seal / deep crimson
  crimson-mid:       "#8c1f1f"   # Action red
  crimson-dim:       "#6b1515"   # Button gradient terminus
  on-crimson:        "#f5e8c8"   # Cream text on crimson

  # ── Dark surfaces (puzzle / lodge chamber) ──────────
  background-chamber:  "#060402"   # Near-black tessellated floor
  surface-deep:        "#0f0704"   # Deepest dark (modal base)
  surface-mid:         "#1a0f0a"   # Lodge header / section base
  surface-panel:       "#1c1208"   # Puzzle panel high edge
  surface-panel-dim:   "#130b04"   # Puzzle panel low edge
  surface-node:        "#2e1c0c"   # Network node high edge
  surface-node-dim:    "#1c0e06"   # Network node low edge

  # ── Light surfaces (landing / menu / context) ───────
  background-parchment: "#f5f0e8"  # Warm parchment (landing bg)
  surface-cream:        "#ffffff"
  surface-context:      "#f0e4c8"  # Context / how-to sections (light mode)

  # ── Text ────────────────────────────────────────────
  text-parchment:        "#2f1b12"  # Primary text on parchment
  text-warm-brown:       "#654230"  # Secondary text on parchment
  text-cream:            "#f5e8c8"  # Primary text on dark
  text-cream-dim:        "#e8d9c2"  # Secondary text on dark
  text-cream-muted:      "rgba(232,217,194,0.72)"
  text-cream-ghost:      "rgba(232,217,194,0.48)"
  text-gold:             "#c9a227"  # Gold labels and eyebrows
  text-gold-dim:         "rgba(201,162,39,0.65)"

  # ── Semantic ─────────────────────────────────────────
  confirm:   "#1f9e28"   # Bond confirmed / correct placement (green)
  confirm-bg: "rgba(31,158,40,0.1)"
  error:     "#c0281e"   # Wrong placement / lost life (red)
  error-bg:  "rgba(192,40,30,0.06)"
  error-glow: "rgba(192,40,30,0.35)"

  # ── Borders ──────────────────────────────────────────
  border-gold:        "rgba(201,162,39,0.28)"
  border-gold-strong: "rgba(201,162,39,0.5)"
  border-gold-faint:  "rgba(201,162,39,0.1)"
  border-crimson:     "rgba(192,40,30,0.4)"

typography:
  # ── Playfair Display — ceremony and gravitas ─────────
  display:
    fontFamily: "Playfair Display, serif"
    fontSize: "clamp(3rem, 9vw, 6rem)"
    fontWeight: "700"
    lineHeight: 1.05
    letterSpacing: "-0.02em"

  headline-lg:
    fontFamily: "Playfair Display, serif"
    fontSize: "clamp(1.3rem, 4vw, 1.75rem)"
    fontWeight: "700"
    lineHeight: 1.2
    letterSpacing: "0.03em"

  headline-md:
    fontFamily: "Playfair Display, serif"
    fontSize: "clamp(1.1rem, 2.8vw, 1.5rem)"
    fontWeight: "700"
    lineHeight: 1.25
    letterSpacing: "0.05em"

  headline-sm:
    fontFamily: "Playfair Display, serif"
    fontSize: "1.15rem"
    fontWeight: "700"
    lineHeight: 1.3
    letterSpacing: "0.05em"

  stat:
    fontFamily: "Playfair Display, serif"
    fontSize: "1.9rem"
    fontWeight: "700"
    lineHeight: 1.0

  # ── Inter — clarity and precision ────────────────────
  body-lg:
    fontFamily: "Inter, sans-serif"
    fontSize: "0.93rem"
    fontWeight: "400"
    lineHeight: 1.7
    fontStyle: "italic"   # puzzle descriptions carry an italic ritual quality

  body-md:
    fontFamily: "Inter, sans-serif"
    fontSize: "0.88rem"
    fontWeight: "400"
    lineHeight: 1.65

  body-sm:
    fontFamily: "Inter, sans-serif"
    fontSize: "0.84rem"
    fontWeight: "400"
    lineHeight: 1.5

  label-lg:
    fontFamily: "Inter, sans-serif"
    fontSize: "0.72rem"
    fontWeight: "700"
    lineHeight: 1.0
    letterSpacing: "0.08em"
    textTransform: "uppercase"

  label-md:
    fontFamily: "Inter, sans-serif"
    fontSize: "0.65rem"
    fontWeight: "700"
    lineHeight: 1.0
    letterSpacing: "0.15em"
    textTransform: "uppercase"

  label-sm:
    fontFamily: "Inter, sans-serif"
    fontSize: "0.6rem"
    fontWeight: "700"
    lineHeight: 1.0
    letterSpacing: "0.25em"
    textTransform: "uppercase"

  eyebrow:
    fontFamily: "Inter, sans-serif"
    fontSize: "0.72rem"
    fontWeight: "600"
    lineHeight: 1.0
    letterSpacing: "3.5px"
    textTransform: "uppercase"

rounded:
  xs:      "4px"
  sm:      "6px"
  DEFAULT: "8px"
  md:      "10px"
  lg:      "12px"
  xl:      "14px"
  2xl:     "16px"
  3xl:     "20px"
  accent:  "0 8px 8px 0"   # one-sided: left-bordered accent panels
  full:    "9999px"

spacing:
  base:    "8px"
  xs:      "4px"
  sm:      "10px"
  md:      "14px"
  lg:      "20px"
  xl:      "28px"           # primary horizontal gutter (puzzle screens)
  2xl:     "32px"
  3xl:     "40px"
  section: "18px"           # masonic-section-rule vertical padding
  panel-gap: "10px"         # gap between pieces within a panel

elevation:
  # Chamber panels float with deep directional shadow + gold inset highlight
  panel: >
    0 8px 36px rgba(0,0,0,0.7),
    inset 0 1px 0 rgba(201,162,39,0.09),
    inset 0 0 80px rgba(0,0,0,0.4)

  # Sticky header casts a dominant downward shadow
  header: >
    0 6px 32px rgba(0,0,0,0.7)

  # Pieces hover state lifts with a gold ring
  piece-hover: >
    0 12px 32px rgba(0,0,0,0.75),
    0 0 0 1px rgba(201,162,39,0.5)

  # Network nodes float with a gold inner highlight
  node: >
    0 4px 20px rgba(0,0,0,0.65),
    inset 0 1px 0 rgba(201,162,39,0.08)

  # Full-screen overlays (modals, game-over, clue popup)
  modal: >
    0 28px 80px rgba(0,0,0,0.85),
    0 0 60px rgba(201,162,39,0.06)

  modal-error: >
    0 28px 80px rgba(0,0,0,0.85),
    0 0 60px rgba(192,40,30,0.08)

  # Compact feedback bar
  feedback: >
    0 4px 20px rgba(0,0,0,0.5)

  # Crimson action button
  button-crimson: >
    0 6px 24px rgba(140,31,31,0.5)

  button-crimson-hover: >
    0 10px 36px rgba(140,31,31,0.65)

motion:
  fast:       "0.2s cubic-bezier(0.4, 0, 0.2, 1)"
  standard:   "0.3s cubic-bezier(0.4, 0, 0.2, 1)"
  enter:      "0.5s cubic-bezier(0.4, 0, 0.2, 1)"   # page/panel entrance
  dramatic:   "0.6s cubic-bezier(0.16, 1, 0.3, 1)"  # hero title
  spring:     "back.out(1.7)"                         # GSAP spring (modal pop)
  spring-sm:  "back.out(2.5)"                         # GSAP spring (heart restore)
  gold-pulse: "2.4s ease-in-out infinite"             # correct slot ambient glow
  shimmer:    "0.5s ease"                             # button shine sweep

effects:
  # Mosaic background tessellation (puzzle screens)
  tessellation-pattern: >
    linear-gradient(45deg,  rgba(201,162,39,0.05) 25%, transparent 25%),
    linear-gradient(-45deg, rgba(201,162,39,0.05) 25%, transparent 25%),
    linear-gradient(45deg,  transparent 75%, rgba(201,162,39,0.05) 75%),
    linear-gradient(-45deg, transparent 75%, rgba(201,162,39,0.05) 75%)
  tessellation-size: "40px 40px"

  # Atmospheric vignette overlay (puzzle screens)
  vignette: >
    radial-gradient(ellipse 80% 60% at 50% 0%,
      rgba(201,162,39,0.04) 0%,
      transparent 55%),
    radial-gradient(ellipse at 50% 50%,
      transparent 20%,
      rgba(0,0,0,0.45) 100%)

  # Gold dot grid inside the network canvas
  network-dot-grid: >
    radial-gradient(circle, rgba(201,162,39,0.18) 1px, transparent 1px)
  network-dot-size: "30px 30px"

  # Double-border framing technique on key panels
  double-border-outer-offset: "5px"   # puzzle panels
  double-border-modal-offset: "8px"   # modals & overlays

  # Frosted glass on overlay backdrops
  modal-backdrop: "blur(6px)"
  gameover-backdrop: "blur(8px)"

  # Text glow on puzzle title
  title-glow: >
    0 0 40px rgba(201,162,39,0.2),
    0 2px 8px rgba(0,0,0,0.9)

  # Film grain on hero photograph
  hero-grain-opacity: "0.7"
  hero-grain-base-opacity: "0.04"

components:
  # ── Puzzle header (sticky top bar) ───────────────────
  puzzle-header:
    background: "linear-gradient(180deg, #1c1008 0%, #120a04 100%)"
    borderBottom: "1px solid rgba(201,162,39,0.28)"
    borderShadow: "0 1px 0 rgba(201,162,39,0.07)"
    boxShadow: "{elevation.header}"
    padding: "14px 28px 16px"
    position: "sticky"
    zIndex: 10
    titleTextColor: "{colors.text-cream}"
    titleTypography: "{typography.headline-md}"
    titleEffect: "{effects.title-glow}"
    stepTypography: "{typography.label-sm}"
    stepColor: "{colors.text-gold-dim}"

  # Ornate centre rule between puzzle-step and h1
  header-rule-line:
    lineWidth: "28px"
    lineColor: "rgba(201,162,39,0.5)"
    diamondColor: "rgba(201,162,39,0.55)"
    diamondSize: "0.42rem"

  # ── Back / navigation button ─────────────────────────
  back-btn:
    background: "transparent"
    border: "1px solid rgba(255,255,255,0.1)"
    textColor: "rgba(255,255,255,0.52)"
    borderRadius: "{rounded.sm}"
    typography: "{typography.body-md}"
    padding: "8px 16px"

  # ── Hint button (header right) ───────────────────────
  clue-header-btn:
    background: "transparent"
    border: "1px solid rgba(201,162,39,0.38)"
    textColor: "rgba(201,162,39,0.75)"
    borderRadius: "4px"
    typography: "{typography.label-sm}"
    padding: "5px 13px"
    hoverBackground: "rgba(201,162,39,0.1)"
    hoverBorderColor: "{colors.gold}"
    hoverGlow: "0 0 16px rgba(201,162,39,0.15)"

  # ── Health bar ───────────────────────────────────────
  heart-active:
    color: "#c0281e"
    filter: "drop-shadow(0 0 6px rgba(192,40,30,0.6))"
    fontSize: "1.25rem"
  heart-lost:
    color: "rgba(255,255,255,0.15)"

  # ── Puzzle intro bar ─────────────────────────────────
  puzzle-intro:
    background: "linear-gradient(180deg, #180e06 0%, #0e0804 100%)"
    borderBottom: "1px solid rgba(201,162,39,0.1)"
    padding: "22px 32px 18px"
    tagTypography: "{typography.label-sm}"
    tagColor: "{colors.text-gold-dim}"
    descTypography: "{typography.body-lg}"
    descColor: "{colors.text-cream-muted}"

  # ── How-to-play notice ───────────────────────────────
  how-to-play:
    background: "rgba(201,162,39,0.03)"
    border: "1px solid rgba(201,162,39,0.14)"
    borderLeft: "2px solid rgba(201,162,39,0.5)"
    borderRadius: "{rounded.accent}"
    margin: "0 28px"
    padding: "16px 22px"
    titleTypography: "{typography.label-sm}"
    titleColor: "{colors.text-gold-dim}"
    stepTypography: "{typography.body-sm}"
    stepColor: "{colors.text-cream-muted}"

  # ── Masonic section rule (ceremonial divider) ────────
  masonic-section-rule:
    padding: "18px 28px"
    lineGradient: "linear-gradient(to right, transparent, rgba(201,162,39,0.3), transparent)"
    dotColor: "rgba(201,162,39,0.45)"
    dotSize: "5px"           # rotated 45 deg diamond
    innerLineWidth: "22px"
    innerLineColor: "rgba(201,162,39,0.35)"

  # ── Col labels (Fragments / Sanctuary / Symbols / Meanings) ──
  col-label:
    typography: "{typography.label-sm}"
    color: "rgba(201,162,39,0.6)"
    ruleColor: "rgba(201,162,39,0.35)"  # fading gradient lines either side
    treatment: "full-width rule with centered text"

  # ── Puzzle panels (source and target zones) ──────────
  puzzle-panel-source:
    background: "linear-gradient(160deg, #1c1208 0%, #130b04 100%)"
    border: "1px solid rgba(201,162,39,0.22)"
    outline: "1px solid rgba(201,162,39,0.08)"
    outlineOffset: "5px"
    borderRadius: "{rounded.lg}"
    padding: "14px"
    gap: "{spacing.panel-gap}"
    boxShadow: "{elevation.panel}"

  puzzle-panel-target:
    background: "linear-gradient(160deg, #180e04 0%, #100804 100%)"
    border: "1px solid rgba(201,162,39,0.18)"
    outline: "1px solid rgba(201,162,39,0.06)"
    outlineOffset: "5px"
    borderRadius: "{rounded.lg}"
    padding: "14px"
    gap: "{spacing.panel-gap}"
    boxShadow: "{elevation.panel}"

  # ── Puzzle pieces (image tiles) ──────────────────────
  puzzle-piece:
    border: "1px solid rgba(201,162,39,0.3)"
    borderRadius: "{rounded.md}"
    minHeight: "112px"
    boxShadow: "0 4px 16px rgba(0,0,0,0.6)"
    overlayGradient: "linear-gradient(to bottom, transparent 35%, rgba(0,0,0,0.72))"
    labelTypography: "{typography.label-md}"
    labelColor: "#ffffff"
    labelShadow: "0 1px 8px rgba(0,0,0,1), 0 0 20px rgba(0,0,0,0.9)"
    hoverTransform: "translateY(-4px) scale(1.025)"
    hoverBorder: "1px solid #c9a227"
    hoverBoxShadow: "{elevation.piece-hover}"

  # ── Symbol pieces (SVG icons, Puzzle 2) ──────────────
  symbol-piece:
    background: "linear-gradient(160deg, #241608 0%, #180e04 100%)"
    border: "1px solid rgba(201,162,39,0.28)"
    borderRadius: "{rounded.md}"
    svgSize: "52px"
    labelTypography: "{typography.label-lg}"
    labelColor: "rgba(232,217,194,0.78)"
    hoverGlow: "0 0 30px rgba(201,162,39,0.08)"

  # ── Drop slots ───────────────────────────────────────
  drop-slot-empty:
    border: "1px dashed rgba(201,162,39,0.28)"
    background: "rgba(201,162,39,0.025)"
    borderRadius: "{rounded.md}"
    minHeight: "112px"
    watermark: "'◆' at 2.5rem, rgba(201,162,39,0.05)"
    labelTypography: "{typography.label-md}"
    labelColor: "rgba(201,162,39,0.42)"
    labelStyle: "italic"

  drop-slot-hover:
    border: "1px solid rgba(45,123,94,0.7)"
    background: "rgba(45,123,94,0.1)"
    transform: "scale(1.025)"
    boxShadow: "0 0 0 2px rgba(45,123,94,0.2)"

  drop-slot-correct:
    border: "2px solid rgba(201,162,39,0.65)"
    background: "rgba(201,162,39,0.06)"
    boxShadow: >
      0 0 0 3px rgba(201,162,39,0.12),
      0 0 24px rgba(201,162,39,0.12),
      inset 0 0 20px rgba(201,162,39,0.04)
    animation: "gold-pulse 2.4s ease-in-out infinite"

  drop-slot-wrong:
    border: "2px solid rgba(192,40,30,0.6)"
    background: "rgba(192,40,30,0.06)"
    boxShadow: >
      0 0 0 3px rgba(192,40,30,0.15),
      0 0 20px rgba(192,40,30,0.12)

  # ── Feedback bar (bottom of puzzle) ──────────────────
  feedback-bar:
    background: "linear-gradient(135deg, #160e05 0%, #0e0803 100%)"
    border: "1px solid rgba(201,162,39,0.16)"
    borderTop: "2px solid rgba(201,162,39,0.3)"
    borderRadius: "{rounded.DEFAULT}"
    margin: "24px 28px 32px"
    padding: "16px 22px"
    boxShadow: "{elevation.feedback}"
    typography: "{typography.body-md}"
    textColor: "{colors.text-cream-muted}"
    iconColor: "rgba(201,162,39,0.6)"
    iconCharacter: "◆"

  # ── Network canvas (Puzzle 3) ─────────────────────────
  network-canvas:
    background: "#0d0804"
    dotGrid: "{effects.network-dot-grid}"
    dotSize: "{effects.network-dot-size}"
    border: "1px solid rgba(201,162,39,0.2)"
    outline: "1px solid rgba(201,162,39,0.06)"
    outlineOffset: "6px"
    borderRadius: "{rounded.xl}"
    height: "480px"
    boxShadow: >
      0 8px 40px rgba(0,0,0,0.75),
      inset 0 1px 0 rgba(201,162,39,0.07),
      inset 0 0 100px rgba(0,0,0,0.5)
    watermark: "'✦' at 6rem, rgba(201,162,39,0.04)"

  network-node:
    background: "linear-gradient(160deg, #2e1c0c 0%, #1c0e06 100%)"
    border: "1px solid rgba(201,162,39,0.38)"
    borderRadius: "{rounded.DEFAULT}"
    minWidth: "116px"
    padding: "11px 16px"
    typography: "{typography.label-lg}"
    textColor: "{colors.text-cream-dim}"
    boxShadow: "{elevation.node}"
    transform: "translate(-50%, -50%)"  # absolute positioned, centred on coordinates

  network-node-hover:
    borderColor: "rgba(201,162,39,0.75)"
    glow: "0 0 24px rgba(201,162,39,0.18)"
    transform: "translate(-50%, -50%) scale(1.04)"

  network-node-selected:
    background: "linear-gradient(160deg, #102010, #0a1608)"
    borderColor: "rgba(31,141,38,0.8)"
    glow: "0 0 28px rgba(31,141,38,0.3)"
    transform: "translate(-50%, -50%) scale(1.06)"

  network-node-bonded:
    background: "linear-gradient(160deg, #2a1a04, #1a1004)"
    borderColor: "rgba(201,162,39,0.65)"
    glow: "0 0 16px rgba(201,162,39,0.1)"

  network-line-correct:
    stroke: "#b28d5a"
    strokeWidth: "2.5px"
    animation: "draw from offset 0 (GSAP strokeDashoffset)"

  network-line-wrong:
    stroke: "#8b2020"
    strokeDasharray: "6 5"
    animation: "fade to opacity 0 over 1.4s then remove"

  # ── Primary action button (crimson) ──────────────────
  button-primary:
    background: "linear-gradient(135deg, #8c1f1f 0%, #6b1515 100%)"
    textColor: "#f5e8c8"
    borderRadius: "{rounded.sm}"
    padding: "13px 32px"
    typography: "{typography.label-lg}"
    boxShadow: "{elevation.button-crimson}"
    hoverBackground: "linear-gradient(135deg, #a02525 0%, #7b1f1f 100%)"
    hoverTransform: "translateY(-2px)"
    hoverBoxShadow: "{elevation.button-crimson-hover}"
    shimmerOverlay: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)"

  # ── Completion modal ──────────────────────────────────
  completion-modal:
    backdropBackground: "rgba(3,1,0,0.9)"
    backdropBlur: "{effects.modal-backdrop}"
    cardBackground: "linear-gradient(160deg, #1c1008 0%, #0f0704 100%)"
    cardBorder: "1px solid rgba(201,162,39,0.3)"
    cardBorderTop: "2px solid rgba(201,162,39,0.5)"
    cardOutline: "1px solid rgba(201,162,39,0.06)"
    cardOutlineOffset: "{effects.double-border-modal-offset}"
    cardBorderRadius: "{rounded.2xl}"
    cardBoxShadow: "{elevation.modal}"
    maxWidth: "540px"
    solvedBadgeTypography: "{typography.label-sm}"
    solvedBadgeColor: "rgba(201,162,39,0.7)"
    solvedBadgeLetterSpacing: "4px"
    titleTypography: "{typography.headline-lg}"
    titleColor: "{colors.text-cream}"
    bodyTypography: "{typography.body-md}"
    bodyStyle: "italic"
    bodyColor: "{colors.text-cream-muted}"

  # ── Game over overlay ────────────────────────────────
  game-over-card:
    backdropBlur: "{effects.gameover-backdrop}"
    cardBackground: "linear-gradient(160deg, #1c1008 0%, #0f0704 100%)"
    cardBorderTop: "2px solid rgba(192,40,30,0.5)"
    cardBorderRadius: "{rounded.2xl}"
    cardBoxShadow: "{elevation.modal-error}"
    iconColor: "rgba(192,40,30,0.35)"
    iconSize: "2.8rem"
    titleTypography: "{typography.headline-md}"
    titleColor: "{colors.text-cream}"
    bodyStyle: "italic"
    bodyColor: "{colors.text-cream-ghost}"

  # ── Clue popup ───────────────────────────────────────
  clue-popup:
    backdropBackground: "rgba(3,1,0,0.92)"
    backdropBlur: "{effects.modal-backdrop}"
    cardBackground: "linear-gradient(160deg, #1c1008 0%, #0f0704 100%)"
    cardBorderTop: "2px solid rgba(201,162,39,0.5)"
    cardOutlineOffset: "{effects.double-border-modal-offset}"
    cardBorderRadius: "{rounded.2xl}"
    maxWidth: "500px"
    labelTypography: "{typography.label-sm}"
    labelColor: "rgba(201,162,39,0.6)"
    bodyBackground: "rgba(201,162,39,0.04)"
    bodyBorderLeft: "2px solid rgba(201,162,39,0.5)"

  # ── Landing page — cinematic hero ────────────────────
  landing-hero:
    photograph: "PT-Masonic_Temple-1888.jpg"
    overlay: >
      linear-gradient(to bottom,
        rgba(10,5,2,0.72) 0%,
        rgba(10,5,2,0.58) 40%,
        rgba(10,5,2,0.85) 100%)
    grain: "fractalNoise SVG filter at 0.04 opacity, 0.7 layer opacity"
    backgroundAttachment: "fixed"
    titleTypography: "{typography.display}"
    titleColor: "#ffffff"
    accentColor: "{colors.gold-bright}"
    taglineTypography: "{typography.body-lg}"
    taglineColor: "rgba(255,255,255,0.72)"

  landing-cta:
    background: "linear-gradient(135deg, #ff6f00 0%, #e65c00 100%)"
    textColor: "#ffffff"
    borderRadius: "16px"
    boxShadow: "0 8px 32px rgba(255,111,0,0.45)"
    typography: "{typography.label-lg}"
    padding: "18px 36px"
    letterSpacing: "1.5px"

  # ── Puzzle menu cards ────────────────────────────────
  menu-card:
    background: "linear-gradient(135deg, #1a0f0a 0%, #0f0906 100%)"
    border: "1px solid rgba(201,162,39,0.22)"
    borderRadius: "20px"
    padding: "28px 26px 24px"
    textColor: "{colors.text-cream}"
    completeBorder: "1px solid rgba(201,162,39,0.4)"
    lockedOpacity: "0.45"

  progress-track:
    height: "6px"
    background: "rgba(201,162,39,0.14)"
    borderRadius: "{rounded.full}"
    fillColor: "#c9a227"
    fillGradient: "linear-gradient(to right, #a07a1a, #c9a227)"

  # ── Context / history section (landing page) ─────────
  context-section:
    background: "#f0e4c8"
    patternOverlay: >
      linear-gradient(45deg, rgba(201,162,39,0.04) 25%, transparent 25%),
      linear-gradient(-45deg, rgba(201,162,39,0.04) 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, rgba(201,162,39,0.04) 75%),
      linear-gradient(-45deg, transparent 75%, rgba(201,162,39,0.04) 75%)
    patternSize: "32px 32px"
    headingTypography: "{typography.headline-lg}"
    headingColor: "{colors.crimson}"
    bodyTypography: "{typography.body-lg}"
    bodyColor: "{colors.text-warm-brown}"

  context-block:
    background: "#ffffff"
    border: "1px solid rgba(201,162,39,0.2)"
    borderRadius: "16px"
    padding: "28px"
    iconSize: "60px"

  # ── Reflection / completion screen ───────────────────
  bond-card:
    background: "linear-gradient(135deg, #1a0f0a 0%, #0f0906 100%)"
    border: "1px solid rgba(201,162,39,0.22)"
    borderRadius: "16px"
    titleTypography: "{typography.headline-sm}"
    bodyTypography: "{typography.body-md}"
---

## Brand Identity

**Connect the Hidden Bonds** is a heritage education experience. Its visual language draws directly from Masonic lodge architecture and ritual objects — the compass, the square, the tessellated pavement, the candlelit chamber — translating these into a digital UI that feels discovered rather than designed. The mood is ceremonial, secret, and gravely beautiful.

The product name is never decorative; it means something. Every piece of visual chrome — dividers, borders, labels, watermarks — earns its place by reinforcing the sense that the user is an initiate entering a coded world.

---

## Two-Mode Design System

The interface operates in two distinct atmospheric registers that share the same accent palette.

### Light Mode — Parchment & Daylight
Used on the **landing page** and **puzzle menu**. Background is warm parchment (`#f5f0e8`), text is dark walnut (`#2f1b12`), and gold appears as a structural accent rather than the dominant colour. It reads like an aged historical document or lodge notice board — dignified and readable.

### Dark Mode — Lodge Chamber
Used on all three **puzzle screens** and the **reflection screen**. Background is near-black (`#060402`) overlaid with a subtle repeating diamond tessellation (the Masonic mosaic pavement, rendered at 5% opacity). A fixed radial vignette pseudo-element creates the impression of candlelight falling from above, with edges fading into absolute darkness. Content panels float inside this darkness as lit chambers.

---

## Colour

Gold (`#c9a227`) is the single sacred accent — used sparingly and purposefully. It appears on borders, eyebrow labels, decorative dividers, the header hint button, the feedback icon, and node badges. Overusing it would dilute its authority; every gold element signals something meaningful.

Deep crimson (`#5e0b15`, `#8c1f1f`) functions as the action colour — buttons, tags, and error states. It evokes the lodge seal and the velvet of Masonic regalia. It is never used decoratively.

Cream text (`#f5e8c8`, `rgba(232,217,194,0.72)`) replaces white throughout the dark mode. Pure white would feel clinical; this off-cream reads like candlelit paper or aged ivory.

Semantic colours are deliberately weak on saturation to avoid disrupting the gold-dominant hierarchy:
- **Correct placement** uses a gold glow (not green) as the primary signal, with a slow `gold-pulse` animation
- **Wrong placement** uses a crimson flash that fades, never persists

---

## Typography

Two typefaces. No others.

**Playfair Display** (serif, 700) carries ceremonial weight. It appears on every heading, puzzle title, modal title, and the stat numbers in the hero. Its high-contrast strokes and bracketed serifs echo engraved inscription. Letter-spacing is added (`0.03em–0.05em`) on headline sizes to emphasise its formal character.

**Inter** (sans-serif) handles all operational text — descriptions, instructions, labels, button copy. It is never heavy for body text (400 weight); hierarchy is achieved through size and opacity, not weight escalation.

All labels and eyebrow text are **all-caps with wide letter-spacing** (`0.15–0.25em`). This is the primary styling convention for the UI layer — it signals "interface" while the serif handles "content".

Puzzle descriptions are set in *italic body-lg* (Inter 400). The italic quality makes instructions feel like briefings from an unseen archivist rather than UI copy.

---

## Spacing & Layout

The base unit is `8px`. The primary horizontal gutter on puzzle screens is `28px` — wide enough to give the dark background room to breathe between the viewport edge and the content panels.

Puzzle screens use a strict two-column grid for the source/target panel layout, collapsing to single-column at `860px`. The three-fragment override (`.grid-3`) applies a three-column subgrid inside both panels for Puzzle 1's six-piece photo reconstruction.

Vertical rhythm is enforced by the **Masonic Section Rule** — a ceremonial divider that appears between the how-to-play notice and the puzzle grid. It consists of a full-width gradient rule (`rgba(201,162,39,0.3)`) centred on a cluster of two rotated diamond shapes flanking a short line. It acts as a chapter break, dividing instructional context from active play.

---

## Depth & Elevation

Elevation is achieved through darkness and light, not greyscale stepping.

**Panels** (source, target, network canvas): they appear to float inside the chamber via a three-layer shadow — a wide directional shadow (`0 8px 36px rgba(0,0,0,0.7)`), an inset gold highlight on the top edge (`inset 0 1px 0 rgba(201,162,39,0.09)`), and an inset vignette darkening the interior (`inset 0 0 80px rgba(0,0,0,0.4)`).

**Double-border frame**: all panels and modals use a visible `border` paired with a faint `outline` set `5–8px` outside the element. This creates the impression of an ornate gilded frame — a Masonic window into a deeper space.

**Modals and overlays** add `backdrop-filter: blur(6–8px)` and a near-black (`rgba(3,1,0,0.9)`) scrim. They close the chamber completely, focusing the user on the ritual moment.

**The top border accent**: every dark modal and the feedback bar use a `2px` top border at higher gold opacity (`0.5`) compared to the surrounding `1px` border at `0.3` opacity. This simulates a light source striking the top edge of a raised object.

---

## Shapes

Border radii are conservative and consistent. Puzzle pieces and drop slots use `10px` (rounded-md). Panels use `12px` (rounded-lg). Modals and game-over cards use `16px` (rounded-2xl) to feel like framed documents. Buttons use a tight `6px` to feel substantial rather than friendly — these are not soft consumer buttons; they are seals.

The one exception is the `accent` pattern (`0 8px 8px 0`) used on left-bordered notice panels (how-to-play, clue reveal, clue popup body). The flat left edge anchors the gold left border as a structural element, not a decorative one.

---

## Decorative Language

Several recurring motifs carry the Masonic visual language:

**◆ Diamond** (solid, rotated square): appears as the ornamental character in the header-rule-line between the puzzle step and title, as the `.hrl-diamond` micro-decoration. Also used as a watermark fill in empty drop slots (`2.5rem`, `rgba(201,162,39,0.05)`) and as the masonic-section-rule dot elements.

**✦ Four-point star**: used as a faint centre watermark on the network canvas in Puzzle 3 — a compass-rose stand-in visible before connections are drawn.

**Eyebrow dividers**: flanking rule lines appear throughout, expanding outward from a centred symbol. The col-labels in the puzzle layout use this as a full-width treatment — two gradient rules extend in opposite directions from the uppercase label text.

**Tessellated floor**: the repeating 40px diamond grid on puzzle screen backgrounds directly references the black-and-white chequered Masonic pavement. At 5% gold opacity it is barely perceptible on first glance but unmistakable on sustained viewing.

**Vignette candlelight**: the `::before` pseudo-element fixed to all puzzle screens casts an amber radial glow from the top-centre (simulating a lantern above the lodge altar) while a secondary `radial-gradient` darkens the corners. Together they give a physically impossible but emotionally correct sense of being inside a lit chamber at night.

---

## Animation

All entrance animations are orchestrated with GSAP timelines. Headers slide down from `-20px`, content panels rise from `+24px`, and pieces scale in with a spring (`back.out(1.7)`). Stagger values of `0.08–0.15s` prevent simultaneous reveals that would feel mechanical.

**The gold-pulse** (`2.4s ease-in-out infinite`) on correctly placed pieces is the only persistent looping animation on puzzle screens. It replaces the static green border that other puzzle UIs use — here, correct placement doesn't end the moment; it *glows*, as if the piece has been consecrated.

Wrong placements produce a short crimson flash — a dashed red SVG line that fades to opacity 0 over `1.4s` then removes itself. The brevity is intentional: failure is noted, not dwelt upon.

Network node selection uses `scale(1.06)` with a green shadow (`0 0 28px rgba(31,141,38,0.3)`) to signal the drag origin. This echoes a lodge member being recognised before speaking.

---

## Photography

The single photograph in the system — a circa-1888 image of the Union Masonic Temple — is used full-viewport in the landing hero with `background-attachment: fixed` (parallax on supported browsers). A three-stop dark gradient overlay (`0.72 → 0.58 → 0.85` opacity, darkest at the bottom) ensures all headline and button text is legible. A film-grain SVG texture (`fractalNoise`, 4% opacity at 70% layer opacity) unifies the digital UI with the historical source material.
