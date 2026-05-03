# Nectar Grocery

A responsive grocery shopping app built with React, TypeScript, and Tailwind CSS. Supports mobile and desktop layouts with full cart, favourites, order flow, and filter functionality.

---

## Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| React | 19 | UI framework |
| TypeScript | 6 | Type safety |
| Vite | 8 | Dev server & bundler |
| Tailwind CSS | 4 | Styling |
| React Router DOM | 7 | Client-side routing |
| Zustand | 5 | Global state management |
| Lucide React | 1 | Icons |

---

## Prerequisites

- *Node.js* v18 or higher
- *npm* v9 or higher

Check your versions:

bash
node -v
npm -v


---

## Getting Started

### 1. Clone the repository

bash
git clone <repository-url>
cd nectar-grocery


### 2. Install dependencies

bash
npm install


### 3. Start the development server

bash
npm run dev


The app will be available at *http://localhost:5173*

---

## Available Scripts

| Script | Command | Description |
|---|---|---|
| Dev server | npm run dev | Start local development server with HMR |
| Build | npm run build | Type-check and build for production |
| Preview | npm run preview | Preview the production build locally |
| Lint | npm run lint | Run ESLint across the project |

---

## Project Structure


nectar-grocery/
├── public/
├── src/
│   ├── assets/              # Images and SVGs
│   ├── components/
│   │   ├── common/
│   │   │   ├── BottomNav.tsx      # Mobile bottom navigation
│   │   │   └── SkeletonCard.tsx   # Loading skeleton
│   │   └── layout/
│   │       └── AppLayout.tsx      # Desktop header + sidebar + mobile nav wrapper
│   ├── data/
│   │   └── products.ts            # Static product catalogue
│   ├── pages/
│   │   ├── SplashScreen.tsx
│   │   ├── Onboarding.tsx
│   │   ├── AuthPage.tsx
│   │   ├── Login.tsx
│   │   ├── PhoneNumber.tsx
│   │   ├── OTPVerification.tsx
│   │   ├── LocationSelect.tsx
│   │   ├── Home.tsx
│   │   ├── Explore.tsx
│   │   ├── Search.tsx
│   │   ├── Filters.tsx
│   │   ├── CategoryProducts.tsx
│   │   ├── ProductDetail.tsx
│   │   ├── Cart.tsx
│   │   ├── Checkout.tsx
│   │   ├── Favorites.tsx
│   │   ├── Account.tsx
│   │   ├── OrderSuccess.tsx
│   │   └── OrderError.tsx
│   ├── stores/
│   │   ├── authStore.ts           # Auth state (login, phone, location)
│   │   ├── cartStore.ts           # Cart items and totals
│   │   ├── favoriteStore.ts       # Saved favourite products
│   │   ├── filterStore.ts         # Category and brand filters
│   │   ├── orderStore.ts          # Order placement and history
│   │   └── productStore.ts        # Product loading state
│   ├── types/
│   │   └── index.ts               # Shared TypeScript types and enums
│   ├── App.tsx                    # Route definitions
│   └── main.tsx                   # App entry point
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts


---

## App Routes

| Path | Page | Auth Required |
|---|---|---|
| / | Splash Screen | No |
| /onboarding | Onboarding slides | No |
| /auth | Auth (login/signup) | No |
| /number | Phone number entry | No |
| /otp | OTP verification | No |
| /location | Location select | No |
| /home | Home feed | Yes |
| /explore | Explore categories | Yes |
| /search | Search + filters | Yes |
| /filters | Filter modal | Yes |
| /category/:id | Category products | Yes |
| /product/:id | Product detail | Yes |
| /cart | Shopping cart | Yes |
| /checkout | Checkout | Yes |
| /favorites | Favourite items | Yes |
| /account | Account settings | Yes |
| /order-success | Order confirmed | Yes |
| /order-error | Order failed | Yes |

---

## State Management

All global state is handled by *Zustand* stores:

| Store | Responsibility |
|---|---|
| authStore | User authentication, phone number, location |
| cartStore | Cart items, quantities, total price |
| favoriteStore | Saved / liked products |
| filterStore | Selected category and brand filters |
| orderStore | Place orders, order history |
| productStore | Product loading and caching |

---

## Responsive Design

The app has two distinct layouts driven by Tailwind breakpoints:

- *Mobile* (< lg) — bottom navigation bar, full-screen pages, native device keyboard inputs
- *Desktop* (≥ lg) — fixed top header, left sidebar navigation, multi-column grids

---

## Production Build

bash
npm run build


Output is generated in the dist/ folder. Preview it locally:

bash
npm run preview