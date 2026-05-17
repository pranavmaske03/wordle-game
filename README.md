# Wordle Quest

A polished Wordle-inspired game built with React. Guess the 5-letter word within six attempts!

---

## Features

- 📅 **Daily Mode** — Same word for everyone, resets at midnight
- 🎲 **Random Mode** — Unlimited play, new word every game
- ⌨️ **On-Screen Keyboard** — Color-coded hints as you play
- 📊 **Stats & Streaks** — Track win %, streaks, guess distribution
- 📤 **Share Results** — Classic emoji grid, one tap to copy
- 🌓 **Dark / Light Theme** — Toggle anytime via settings
- 🎨 **Color Blind Mode** — High contrast orange & blue
- 📱 **PWA** — Install on any device, works fully offline

---

## How to Play

Guess the **5-letter word** in **6 attempts**.

After each guess, tiles change color:
- 🟩 **Green** — Correct letter, correct position
- 🟨 **Yellow** — Correct letter, wrong position
- ⬛ **Gray** — Letter not in the word

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | React 19 |
| Build Tool | Vite 6 |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion |
| PWA | vite-plugin-pwa |
| Word Data | Local JSON (offline, no API) |
| Storage | localStorage (no backend) |
| Deployment | Vercel + Netlify |

---

## Installation

### 1. Clone the repository
```bash
git clone https://github.com/pranavmaske03/wordle-game.git
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start development server
```bash
npm run dev
```

---

## Requirements

- Node.js v18 or higher
- npm v9 or higher
- No internet connection required — fully offline after install

---

## Contributing

Contributions are welcome! Fork the repo and submit a pull request.