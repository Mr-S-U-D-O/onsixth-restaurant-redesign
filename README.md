# On Sixth Restaurant — Official Website

> **Benoni's premier dining destination** — a full-stack Next.js website featuring an interactive digital menu, WhatsApp table booking, Google-rich structured data, and a heritage-driven design system. Production-ready.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org)
[![License](https://img.shields.io/badge/License-Private-red)](./LICENSE)

---

## 🏆 Awards

- **Best Upmarket Restaurant** — Best of Ekurhuleni Readers' Choice
- **Best Romantic Restaurant** — Best of Ekurhuleni Readers' Choice
- **Best Neighbourhood Restaurant** — Best of Ekurhuleni Readers' Choice
- ⭐ **4.8/5** across 1,200+ reviews

---

## 🎯 What's Included

| Feature | Description |
|---|---|
| Interactive Menu | Filterable dish grid with hover image previews, dietary toggles, and chef's notes modals |
| WhatsApp Booking | Multi-step reservation form → pre-filled WhatsApp message |
| SEO & Rich Data | JSON-LD (Restaurant + Menu + Breadcrumb schemas), sitemap.xml, robots.txt |
| AI-Visibility | Geo meta tags, OpenGraph, Twitter Cards, canonical URLs on all pages |
| Accessibility | WCAG 2.1 AA, skip-to-content, ARIA labels, keyboard nav, focus traps |
| Performance | AVIF/WebP images, long-term cache headers, font preload, compressed static assets |
| Live Status | Real-time open/closed badge based on SAST business hours |
| Chatbot | Intelligent on-site assistant for FAQs, menu queries, and bookings |

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Vanilla CSS + CSS Custom Properties |
| Animations | Framer Motion + CSS keyframes |
| Maps | Google Maps embed (greyscale) |
| Icons | Lucide React |
| Fonts | Outfit + Plus Jakarta Sans (Google Fonts) |
| Package Manager | npm |
| Deployment | Cloudflare Pages (recommended) |

---

## 🎨 Design System

**Colour Palette:**
- `#111111` — Rich Obsidian (Primary)
- `#FCFCFC` — Warm Cream (Text & BG)
- `#27B5B5` — Teal (Accent / Highlights)
- `#D4AF37` — Brushed Gold (CTA hover)

**Typography:**
- **Display/Headings:** Outfit
- **Body / UI:** Plus Jakarta Sans

---

## 📁 Project Structure

```
onsixth-restaurant-redesign/
├── app/
│   ├── layout.tsx              # Root layout + SEO metadata + JSON-LD
│   ├── page.tsx                # Home page
│   ├── sitemap.ts              # Auto-generated sitemap.xml
│   ├── menu/page.tsx           # Interactive Digital Menu
│   ├── experience/page.tsx     # Heritage & Open Kitchen
│   ├── reservations/page.tsx   # Table Booking (WhatsApp)
│   └── contact/page.tsx        # Contact & Map
├── components/
│   ├── layout/                 # Navbar, Footer
│   ├── home/                   # ReviewsCarousel, etc.
│   ├── menu/                   # MenuPageClient (hover previews, filters, modals)
│   ├── reservations/           # Multi-step booking form
│   └── ui/                     # FloatingWidget (chatbot), ScrollReveal, Preloader
├── lib/
│   ├── chatbot/                # Chatbot intelligence and response logic
│   ├── menu-data.ts            # Full structured menu with images (TypeScript)
│   ├── schema.ts               # JSON-LD structured data builders
│   └── time-utils.ts           # SAST open/closed, WhatsApp URL builder
├── public/
│   ├── dishes/                 # AI-generated dish photography
│   ├── robots.txt              # Search engine crawl rules
│   └── favicon-logo.png        # Brand logo favicon
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
| `NEXT_PUBLIC_SITE_URL` | Production URL for og: meta tags |

---

## 📋 Pages

| Route | Page | Description |
|---|---|---|
| `/` | Home | Hero video, awards strip, culinary trifecta, open kitchen, heritage teaser, reviews carousel |
| `/menu` | Digital Menu | Filterable dish grid, hover image previews, dietary toggles, dish modal with chef notes |
| `/experience` | Our Story | Mining heritage, open kitchen philosophy, interactive timeline |
| `/reservations` | Book a Table | Multi-step form → WhatsApp booking confirmation |
| `/contact` | Find Us | Map, hours, live open/closed badge, one-tap directions |

---

## 🔍 SEO & AI Visibility

- **JSON-LD Schemas**: Restaurant, Menu, BreadcrumbList
- **sitemap.xml**: Auto-generated via `app/sitemap.ts`
- **robots.txt**: Allows all crawlers
- **Canonical URLs**: Defined on all pages
- **Geo Meta Tags**: region, placename, coordinates
- **OpenGraph + Twitter Cards**: On all pages
- **Google Business Profile**: Integrate via GBP dashboard

---

## ♿ Accessibility

- WCAG 2.1 AA compliant colour contrast
- Skip-to-content link on all pages
- Keyboard-navigable interactive components (focus traps in modals)
- ARIA labels on all icons and interactive elements
- `prefers-reduced-motion` respected
- `role` and `aria-*` on all form controls

---

## 📊 Lighthouse Targets

| Metric | Target |
|---|---|
| Performance | 95+ |
| Accessibility | 98+ |
| Best Practices | 100 |
| SEO | 100 |
| LCP | < 2.5s |
| CLS | < 0.1 |
| TTFB | < 200ms |

---

## 📄 License

Private — © 2026 On Sixth Restaurant, Northmead, Benoni. All rights reserved.
