# 🛒 BM SHOP

Full-scale eCommerce + POS + ERP + CRM + Analytics platform with an **offline AI assistant** — built from the BM SHOP PRD.

Elegant dark theme · glassmorphism · purple-blue gradient · animated charts · zero backend dependencies for the MVP.

## ✨ What's inside

### 🧑‍💼 Admin Suite (`/admin`)
- **Dashboard** — revenue, orders, live visitors, top products, recent orders, revenue/orders charts
- **Products** — searchable catalog, category filters, status chips
- **Orders** — status filters, payment method, totals
- **Customers** — segmentation (new / regular / VIP), spend tracking
- **Analytics** — revenue trend, category breakdown, customer segment pie
- **Marketing** — coupons + campaigns
- **Inventory / ERP** — low stock, suppliers, expenses
- **POS** — barcode search, cart, VAT, receipt issuance
- **Settings** — shipping (130 BDT default), COD fee (+20 BDT), bKash / Nagad / Card toggles

### 🛍️ Customer Storefront (`/`)
- Home with hero, trending, category-filtered product grid
- Product page with related products
- Cart, Checkout (COD / bKash / Card), Order confirmation

### 🧠 BM Smart Assistant (offline, no API)
Rule-based intent matcher at `src/ai/intents.ts`. Understands:
- `today sales`, `top product`, `low stock`, `pending orders`
- `top customers`, `revenue this week`
- Navigation commands: `open orders`, `show products`, `open pos`, …

It matches keywords to intents, runs a local data query, and formats the response (with tables and suggested follow-ups). It can also auto-navigate you around the app.

## 🧱 Tech stack

- **React 19** + **TypeScript** + **Vite**
- **Tailwind CSS** (custom design tokens in `tailwind.config.js`)
- **React Router** for routing
- **Recharts** for charts
- **Lucide** for icons
- In-memory mock data layer at `src/data/mock.ts` — swap for Supabase / Node+Express later

## 🚀 Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build
npm run lint
```

Open **`/admin`** for the admin suite. Click **Ask BM** (floating button or topbar) to talk to the offline assistant.

## 🗂️ Project structure

```
src/
├── ai/intents.ts          # Offline BM Smart Assistant (intent matcher)
├── components/            # Sidebar, Topbar, AIAssistant, Logo
├── data/mock.ts           # Products, customers, orders, sales series
├── layouts/               # AdminLayout, ShopLayout
├── pages/admin/           # Dashboard, Products, Orders, Customers, Analytics,
│                          # Marketing, Inventory, POS, Settings
├── pages/shop/            # Home, Product, Cart, Checkout, OrderSuccess
├── store.tsx              # Cart provider
├── store-ctx.ts           # Store context
├── use-store.ts           # useStore hook
├── types.ts               # Shared types
├── App.tsx                # Router
└── main.tsx               # Entry
```

## 📅 Roadmap (from the PRD, deferred to later phases)

- Real backend (Supabase or Node.js + Express + MySQL/Postgres)
- JWT auth + role-based access
- Vendor panel
- Loyalty / CRM automation
- Payment gateway integration (SSLCommerz / bKash API)
- Expanded AI knowledge base + `ai_logs` persistence

## 📝 License

Private — BornilMahmud.
