import type { Customer, Order, Product } from "../types";

export interface AIIntent {
  id: string;
  label: string;
  keywords: string[]; // lowercase tokens, any match scores
  run: (ctx: AIContext) => AIResult;
}

export interface AIContext {
  products: Product[];
  orders: Order[];
  customers: Customer[];
}

export interface AIResult {
  text: string;
  table?: { headers: string[]; rows: (string | number)[][] };
  navigate?: string;
  suggestions?: string[];
}

function today() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

function isSameDay(iso: string, d: Date) {
  const x = new Date(iso);
  return (
    x.getFullYear() === d.getFullYear() &&
    x.getMonth() === d.getMonth() &&
    x.getDate() === d.getDate()
  );
}

function formatBDT(n: number) {
  return `৳${n.toLocaleString("en-BD")}`;
}

export const INTENTS: AIIntent[] = [
  {
    id: "today_sales",
    label: "Today's sales",
    keywords: [
      "today sales",
      "today revenue",
      "sales today",
      "revenue today",
      "sales",
      "today",
    ],
    run: ({ orders }) => {
      const t = today();
      const todays = orders.filter(
        (o) => isSameDay(o.createdAt, t) && o.status !== "cancelled"
      );
      const total = todays.reduce((s, o) => s + o.total, 0);
      return {
        text: `Today you have ${todays.length} orders totaling ${formatBDT(
          total
        )}.`,
        navigate: "/admin/orders",
      };
    },
  },
  {
    id: "top_product",
    label: "Top selling product",
    keywords: [
      "top product",
      "best seller",
      "best selling",
      "top selling",
      "top selling product",
      "most selling",
      "which product is selling most",
    ],
    run: ({ products }) => {
      const top = [...products].sort((a, b) => b.sales - a.sales).slice(0, 5);
      if (top.length === 0) return { text: "No products found." };
      return {
        text: `Top seller: ${top[0].name} with ${top[0].sales} units.`,
        table: {
          headers: ["Product", "Sales", "Stock"],
          rows: top.map((p) => [p.name, p.sales, p.stock]),
        },
        navigate: "/admin/products",
      };
    },
  },
  {
    id: "low_stock",
    label: "Low stock products",
    keywords: [
      "low stock",
      "out of stock",
      "stock low",
      "restock",
      "inventory low",
    ],
    run: ({ products }) => {
      const low = products
        .filter((p) => p.stock < 15)
        .sort((a, b) => a.stock - b.stock)
        .slice(0, 8);
      if (low.length === 0)
        return { text: "All products have healthy stock levels." };
      return {
        text: `${low.length} products are running low on stock.`,
        table: {
          headers: ["Product", "Stock", "SKU"],
          rows: low.map((p) => [p.name, p.stock, p.sku]),
        },
        navigate: "/admin/products",
      };
    },
  },
  {
    id: "pending_orders",
    label: "Pending orders",
    keywords: ["pending order", "pending orders", "unpaid", "waiting orders"],
    run: ({ orders }) => {
      const pending = orders.filter((o) => o.status === "pending").slice(0, 8);
      return {
        text: `You have ${
          orders.filter((o) => o.status === "pending").length
        } pending orders.`,
        table: {
          headers: ["Order", "Customer", "Total"],
          rows: pending.map((o) => [o.id, o.customerName, formatBDT(o.total)]),
        },
        navigate: "/admin/orders",
      };
    },
  },
  {
    id: "total_customers",
    label: "Total customers",
    keywords: [
      "total customers",
      "customer count",
      "how many customers",
      "customers",
    ],
    run: ({ customers }) => {
      const vip = customers.filter((c) => c.segment === "vip").length;
      return {
        text: `You have ${customers.length} customers (${vip} VIP).`,
        navigate: "/admin/customers",
      };
    },
  },
  {
    id: "top_customers",
    label: "Top customers by spend",
    keywords: [
      "top customer",
      "top customers",
      "vip customers",
      "best customers",
    ],
    run: ({ customers }) => {
      const top = [...customers].sort((a, b) => b.spent - a.spent).slice(0, 5);
      if (top.length === 0) return { text: "No customers found." };
      return {
        text: `Top customer: ${top[0].name} (${formatBDT(top[0].spent)}).`,
        table: {
          headers: ["Customer", "Orders", "Spent"],
          rows: top.map((c) => [c.name, c.orders, formatBDT(c.spent)]),
        },
        navigate: "/admin/customers",
      };
    },
  },
  {
    id: "revenue_week",
    label: "Revenue this week",
    keywords: [
      "week revenue",
      "weekly sales",
      "this week",
      "last 7 days",
      "revenue week",
    ],
    run: ({ orders }) => {
      const cutoff = Date.now() - 7 * 86_400_000;
      const recent = orders.filter(
        (o) =>
          new Date(o.createdAt).getTime() >= cutoff && o.status !== "cancelled"
      );
      const total = recent.reduce((s, o) => s + o.total, 0);
      return {
        text: `Last 7 days: ${recent.length} orders, ${formatBDT(
          total
        )} revenue.`,
        navigate: "/admin/analytics",
      };
    },
  },
  {
    id: "nav_dashboard",
    label: "Go to dashboard",
    keywords: ["open dashboard", "show dashboard", "dashboard"],
    run: () => ({
      text: "Opening dashboard…",
      navigate: "/admin",
    }),
  },
  {
    id: "nav_orders",
    label: "Go to orders",
    keywords: ["open orders", "show orders", "orders page"],
    run: () => ({
      text: "Opening orders…",
      navigate: "/admin/orders",
    }),
  },
  {
    id: "nav_products",
    label: "Go to products",
    keywords: ["open products", "show products", "products page", "inventory"],
    run: () => ({
      text: "Opening products…",
      navigate: "/admin/products",
    }),
  },
  {
    id: "nav_customers",
    label: "Go to customers",
    keywords: ["open customers", "show customers", "customers page"],
    run: () => ({
      text: "Opening customers…",
      navigate: "/admin/customers",
    }),
  },
  {
    id: "nav_analytics",
    label: "Go to analytics",
    keywords: ["open analytics", "show analytics", "analytics page"],
    run: () => ({
      text: "Opening analytics…",
      navigate: "/admin/analytics",
    }),
  },
  {
    id: "nav_pos",
    label: "Open POS",
    keywords: ["open pos", "pos", "point of sale", "cashier"],
    run: () => ({
      text: "Opening POS…",
      navigate: "/admin/pos",
    }),
  },
  {
    id: "help",
    label: "Help",
    keywords: ["help", "what can you do", "commands", "?"],
    run: () => ({
      text: "I can answer about sales, orders, products, customers, and navigate you around.",
      suggestions: [
        "today sales",
        "top product",
        "low stock",
        "pending orders",
        "top customers",
        "open pos",
      ],
    }),
  },
];

export function matchIntent(input: string): AIIntent | null {
  const q = input.toLowerCase().trim();
  if (!q) return null;
  let best: { intent: AIIntent; score: number } | null = null;
  for (const intent of INTENTS) {
    let score = 0;
    for (const kw of intent.keywords) {
      if (q === kw) score += 100;
      else if (q.includes(kw)) score += kw.length;
      else {
        const tokens = kw.split(" ");
        const hits = tokens.filter((t) => q.includes(t)).length;
        if (hits === tokens.length) score += hits * 2;
        else score += hits;
      }
    }
    if (!best || score > best.score) best = { intent, score };
  }
  return best && best.score > 1 ? best.intent : null;
}

export function runAssistant(input: string, ctx: AIContext): AIResult {
  const intent = matchIntent(input);
  if (!intent) {
    return {
      text: "Sorry, I didn't understand. Try one of the suggestions below.",
      suggestions: [
        "today sales",
        "top product",
        "low stock",
        "pending orders",
        "help",
      ],
    };
  }
  return intent.run(ctx);
}
