# On Sixth Restaurant — Digital Transformation

> **Benoni's premier dining destination** — a complete ground-up website rebuild targeting Lighthouse 98+, with an interactive digital menu, WhatsApp booking, and a heritage-driven design system.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org)
[![Deployed on Cloudflare](https://img.shields.io/badge/Deploy-Cloudflare%20Pages-orange?logo=cloudflare)](https://pages.cloudflare.com)

---

## 🎯 Project Goals

| Before | After |
|---|---|
| Lighthouse Performance: 71/100 | Target: **98+** |
| Static PDF menu | **Interactive filterable digital menu** |
| Broken Google Maps API | **Custom dark-theme map embed** |
| No online booking | **Multi-step WhatsApp booking** |
| 6.7s Speed Index | Target: **< 1.2s** |
| 2021 copyright | **Live open/close status** |

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript 5 |
| Styling | Vanilla CSS + CSS Custom Properties |
| Animations | Framer Motion + CSS keyframes |
| Maps | Google Maps embed (dark-themed) |
| Icons | Lucide React |
| Package Manager | npm |
| Deployment | Cloudflare Pages |

---

## 🎨 Design System

**Colour Palette:**
- `#121316` — Rich Obsidian (Primary BG)
- `#1C1E24` — Deep Slate (Card BG)
- `#D4AF37` — Brushed Gold (Accent / CTA)
- `#C97A56` — Terracotta (Oven Fire / Warm Hover)
- `#F5F5F0` — Warm Cream (Typography)

**Typography:**
- **Headings:** Playfair Display (700 italic) — Heritage elegance
- **Display:** Cinzel Decorative — Awards, accolades
- **Body / UI:** Plus Jakarta Sans — Crisp, contemporary

**Adaptive Ambience:**
- **12:00–17:00 SAST:** Daytime mode (brighter)
- **17:00+:** Candlelight night mode (deeper obsidian, amber gold)

---

## 📁 Project Structure

```
on-sixth-website/
├── app/
│   ├── layout.tsx              # Root layout + SEO metadata
│   ├── page.tsx                # Home page
│   ├── menu/page.tsx           # Interactive Digital Menu
│   ├── experience/page.tsx     # Heritage & Open Kitchen
│   ├── reservations/page.tsx   # Table Booking
│   └── contact/page.tsx        # Contact & Map
├── components/
│   ├── layout/                 # Navbar, Footer
│   ├── home/                   # ReviewsCarousel, etc.
│   ├── menu/                   # MenuPageClient (filters, dish grid)
│   ├── reservations/           # Multi-step booking form
│   └── ui/                     # DayNightController, OpenStatusBadge, ScrollReveal
├── lib/
│   ├── menu-data.ts            # Full structured menu (TypeScript)
│   ├── schema.ts               # JSON-LD structured data
│   └── time-utils.ts           # SAST open/closed, WhatsApp URL builder
└── styles/
    ├── design-system.css       # Brand tokens, resets, base
    ├── components.css          # Buttons, cards, badges, forms
    ├── animations.css          # Keyframes, scroll-reveals
    └── globals.css             # Page-level overrides
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- npm 9+

### Local Development

```bash
git clone https://github.com/Mr-S-U-D-O/onsixth-restaurant-redesign.git
cd onsixth-restaurant-redesign
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

---

## 🌐 Deployment (Cloudflare Pages)

1. Connect repo to [Cloudflare Pages](https://pages.cloudflare.com)
2. Set build command: `npm run build`
3. Set output directory: `.next`
4. Enable **Next.js** preset in Cloudflare Pages settings
5. Add environment variables (see `.env.example`)

---

## ⚙️ Environment Variables

Create `.env.local` from `.env.example`:

```bash
cp .env.example .env.local
```

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_MAPBOX_TOKEN` | Mapbox GL JS public token (optional — map uses iframe currently) |
| `NEXT_PUBLIC_SITE_URL` | Production URL for og: meta tags |

---

## 📋 Pages

| Route | Page | Description |
|---|---|---|
| `/` | Home | Hero, awards strip, culinary trifecta, kitchen theatre, heritage teaser, reviews |
| `/menu` | Digital Menu | Filterable dish grid, dietary toggles, dish modal with chef notes |
| `/experience` | Our Story | Mining heritage, open kitchen philosophy, interactive timeline |
| `/reservations` | Book a Table | Multi-step form → WhatsApp booking confirmation |
| `/contact` | Find Us | Map, hours, live open/closed badge, one-tap directions |

---

## ♿ Accessibility

- WCAG 2.1 AA compliant colour contrast ratios
- Skip-to-content link on all pages
- Keyboard navigable interactive components
- ARIA labels on all icons and interactive elements
- `prefers-reduced-motion` respected

---

## 📊 Target Lighthouse Scores

| Metric | Current | Target |
|---|---|---|
| Performance | 71 | 98+ |
| Accessibility | 97 | 98+ |
| Best Practices | 96 | 100 |
| SEO | 85 | 97+ |
| LCP | 3.0s | < 2.5s |
| CLS | Unknown | < 0.1 |

---

## 🏆 Awards & Recognition

- 🏆 Best Upmarket Restaurant — Best of Ekurhuleni
- 💍 Best Romantic Restaurant — Best of Ekurhuleni  
- 🏡 Best Neighbourhood Eatery — Best of Ekurhuleni
- ⭐ 4.8/5 across 1,200+ reviews

---

## 📄 License

Private — © 2026 On Sixth Restaurant, Northmead, Benoni. All rights reserved.
