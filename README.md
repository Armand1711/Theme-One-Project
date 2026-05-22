<div align="center">

# Connect the Hidden Bonds

### An Interactive Heritage Puzzle Experience

*Uncover the secret bonds that built a city out of stone. Explore the echoes of the past within the stone walls of The Groot-Loge.*

<br/>

![App Overview](Mockups/Mockup%20Group.png)

<br/>

[![Live Site](https://img.shields.io/badge/🔗%20Live%20Site-GitHub%20Pages-222?style=for-the-badge)](https://armand1711.github.io/Theme-One-Project/)
[![Watch the Walkthrough](https://img.shields.io/badge/▶%20Watch%20Walkthrough-Google%20Drive-crimson?style=for-the-badge)](https://drive.google.com/file/d/1Yl6N5JXyW0muq4pEa43pT5_WLkRzzwCy/view?usp=sharing)

</div>

---

## Overview

The **Union Masonic Temple** at 126–128 Du Toitspan Road, Kimberley, was built in 1886 by seven Masonic lodges from English, Scottish, and Netherlandic constitutions — immigrant communities from across the world who arrived during the diamond rush. In a city of ~50,000 people, men from Australia, England, the USA, Scotland, the Netherlands, and Germany set aside national difference and pooled their debenture subscriptions to raise a shared home.

This application places the player in the role of an investigator uncovering those hidden bonds one enigma at a time. The tone is deliberately mysterious and archival — a secret society document vault, not a classroom.

---

## Screenshots

<table>
  <tr>
    <td align="center">
      <img src="Mockups/Mockup%203.png" alt="Landing Screen" width="300"/>
      <br/><sub><b>Landing Screen</b></sub>
    </td>
    <td align="center">
      <img src="Mockups/Mockup%205.png" alt="The Lodge — Enigma Menu" width="300"/>
      <br/><sub><b>The Lodge — Enigma Menu</b></sub>
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="Mockups/Mockup%202.png" alt="Enigma I — Shattered Sanctuary" width="300"/>
      <br/><sub><b>Enigma I — Shattered Sanctuary</b></sub>
    </td>
    <td align="center">
      <img src="Mockups/Mockup%204.png" alt="Enigma III — Web of Whispers" width="300"/>
      <br/><sub><b>Enigma III — Web of Whispers</b></sub>
    </td>
  </tr>
  <tr>
    <td align="center" colspan="2">
      <img src="Mockups/Mockup%201.png" alt="Secret Archives" width="300"/>
      <br/><sub><b>Secret Archives — Intelligence Dossier</b></sub>
    </td>
  </tr>
</table>

---

## Features

- **Player Login & Progress Sync** — Players register with a name and email. Progress is saved to a live database and restored on every return visit.
- **Secret Archives** — A classified intelligence dossier unlocks per puzzle. Research text is redacted on first visit; players click to unseal each item before attempting the enigma. Revealed intel persists across sessions.
- **Three Progressive Enigmas** — Each builds on the previous, escalating from spatial reasoning to symbolic interpretation to relational network mapping.
- **Health System** — Three lives per puzzle represented as candle flames. Losing a life triggers a flame-extinguish animation and a full-screen crimson flash. Correct streaks restore a life.
- **Submit Seal** — Enigma I requires the player to explicitly confirm their completed arrangement before the result is revealed.
- **Completion Modals** — Each solved puzzle unlocks a narrative reveal and passes a clue into the next enigma.
- **Reflection Screen** — A final screen synthesises the investigator's journey after all three enigmas are solved.
- **Fully Animated** — GSAP 3.12.5 drives all screen transitions, entrance sequences, interactive feedback, and modal reveals.

---

## The Three Enigmas

### Enigma I — Shattered Sanctuary
A photograph of the temple (circa 1888) has been fragmented into six pieces. Drag each fragment from the left panel into the correct slot on the right grid. The image edges guide placement. Solving reveals the physical reality of the shared building.

### Enigma II — The Symbol Cipher
Four Masonic symbols — the clasped hand, the chain, the arched bridge, and the lit candle — must be matched to their historical meanings. Each meaning reflects a real principle that bound the immigrant brotherhood together.

### Enigma III — Web of Whispers
Five nodes represent the Union Temple, the English Craft Lodges, the Diamond Traders, the Dutch Brethren, and the Scottish Chapter. Draw six lines connecting the pairs with documented historical bonds. Wrong connections cost a life.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Structure | HTML5 (single `index.html`) |
| Styling | CSS3 with custom properties, no framework |
| Logic | Vanilla ES6+ modules, no bundler |
| Animation | GSAP 3.12.5 via CDN |
| Database | Firebase Firestore (player profiles & progress) |
| Authentication | Firebase Auth (email/password) |
| Fonts | Playfair Display (serif headings), Inter (body) via Google Fonts |
| Icons | Material Symbols Outlined via Google Fonts |

No build step. No dependencies to install. Runs directly from the filesystem with any static server.

---

## Running Locally

A static HTTP server is required because the app uses ES modules (`type="module"`).

**Python (recommended):**
```bash
cd Theme-One-Project
python -m http.server 8000
```
Then open `http://localhost:8000` in your browser.

**Node (alternative):**
```bash
npx serve .
```

**VS Code:** Install the *Live Server* extension, right-click `index.html` → *Open with Live Server*.

> Opening `index.html` directly as a `file://` URL will not work due to CORS restrictions on ES module imports.

---

## File Structure

```
Theme-One-Project/
├── index.html                  # Single entry point
├── css/
│   ├── landing.css             # Global CSS variables, landing, menu, archives, reflection
│   └── puzzle1.css             # All three puzzle screen styles
├── js/
│   ├── main.js                 # App entry point, screen orchestration, state
│   ├── firebase.js             # Firebase Auth + Firestore — login, register, progress sync
│   ├── loginScreen.js          # Auth UI — register / sign-in screen
│   ├── landing.js              # Landing screen
│   ├── puzzleMenu.js           # Enigma selection menu
│   ├── menu.js                 # Menu utilities
│   ├── secret_archives.js      # Intelligence dossier — classified intel per puzzle
│   ├── puzzle1.js              # Enigma I: Shattered Sanctuary (drag-drop jigsaw)
│   ├── puzzle2.js              # Enigma II: Symbol Cipher (drag-match)
│   ├── puzzle3.js              # Enigma III: Web of Whispers (node-connection network)
│   ├── reflection.js           # Final reflection screen
│   ├── immersion.js            # Atmosphere utilities
│   └── svg-library.js          # All inline SVGs (wax seals, flames, compass marks)
└── assets/
    ├── PT-Masonic_Temple-1888.jpg
    ├── PT-Masonic_Temple-1888-Interior-02.jpg
    ├── PT-Masonic_Temple-1888-Interior stained glass.jpg
    ├── PT-Masonic_Temple-1900 hospital.jpg
    ├── Floor plan masonic.jpg
    └── Old masonic members photo.jpg
```

---

## Historical Context

| Year | Event |
|---|---|
| 1872 | Cosmopolitan Lodge No. 1574 warranted; 39 candidates initiated within weeks |
| 1877 | Cecil John Rhodes becomes a Freemason at Oxford |
| 1886 | Union Lodge votes to build a shared temple; first foundation stone laid 18 December |
| 1888 | Formal foundation stone ceremony presided over by Lord Rosmead |
| 1889 | Temple dedicated and opened, 15 August |
| 1899–1900 | Temple commandeered as a fever hospital during the Siege of Kimberley |
| 1990 | Declared a National Monument |

The seven founding lodges spanned three national constitutions (English, Scottish, Netherlandic), reflecting a diamond-field population drawn from Australia, England, the USA, Scotland, the Netherlands, and Germany. The Temple sat directly opposite the Jewish Synagogue on Du Toitspan Road — a physical symbol of the coexistence that defined Kimberley.

---

## Design Principles

- **Mysterious, not instructional.** Players "unveil" and "decipher" — the interface never uses words like "learn" or "complete".
- **Archival aesthetic.** Dark parchment palette (`#0a0502` background, `#f5e8c8` ink, `#c9a227` gold), aged paper textures, wax seal motifs, candlelight metaphors.
- **Progressive disclosure.** The Secret Archives must be consulted before each puzzle unlocks. Research is gated behind redaction — players must actively choose to reveal each intelligence item.
- **No framework bloat.** Every animation, transition, and interaction is hand-authored. The entire application ships as static files.

---

## Author

Armand — Theme One Project, 2025
