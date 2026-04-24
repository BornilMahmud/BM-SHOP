import type {
  Customer,
  Order,
  OrderStatus,
  Product,
  SalesPoint,
} from "../types";

const PRODUCT_IMAGES = [
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
  "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400",
  "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400",
  "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
  "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400",
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
  "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400",
  "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400",
  "https://images.unsplash.com/photo-1593998066526-65fcab3021a2?w=400",
  "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
];

const CATEGORIES = [
  "Electronics",
  "Fashion",
  "Home",
  "Beauty",
  "Sports",
  "Toys",
  "Books",
  "Grocery",
];

const FIRST = [
  "Rahim",
  "Karim",
  "Jamal",
  "Sadia",
  "Nusrat",
  "Tanvir",
  "Arif",
  "Mitu",
  "Samin",
  "Rafi",
  "Zara",
  "Nabila",
  "Hasan",
  "Afia",
  "Omar",
  "Tania",
];
const LAST = [
  "Ahmed",
  "Khan",
  "Hossain",
  "Islam",
  "Rahman",
  "Chowdhury",
  "Mahmud",
  "Siddique",
  "Akter",
  "Sultana",
];
const CITIES = [
  "Dhaka",
  "Chattogram",
  "Sylhet",
  "Khulna",
  "Rajshahi",
  "Barishal",
  "Rangpur",
];

const PRODUCT_NAMES = [
  "Wireless Earbuds Pro",
  "Smart Fitness Watch",
  "Cotton T-Shirt",
  "Running Shoes",
  "Leather Wallet",
  "Bluetooth Speaker",
  "Gaming Mouse",
  "Mechanical Keyboard",
  "LED Desk Lamp",
  "Ceramic Coffee Mug",
  "Yoga Mat Premium",
  "Skincare Serum",
  "Matte Lipstick Set",
  "Travel Backpack 30L",
  "Stainless Water Bottle",
  "Noise Cancelling Headphones",
  "Mini Drone",
  "Portable Power Bank",
  "Dumbbell Set 10kg",
  "Football Official",
  "Novel: Midnight Road",
  "Cookbook: Desi Kitchen",
  "Organic Green Tea",
  "Rice 5kg Premium",
  "Denim Jacket",
  "Silk Saree Classic",
  "Casual Sneakers",
  "Baby Toy Car",
  "Building Blocks 200pc",
  "Bedsheet Cotton King",
  "Table Fan 16\"",
  "Air Fryer 5L",
];

function pad(n: number, w: number) {
  return String(n).padStart(w, "0");
}

export function rand(seed: number) {
  // Deterministic PRNG
  let s = seed | 0;
  return () => {
    s = (s * 1664525 + 1013904223) | 0;
    return ((s >>> 0) % 10000) / 10000;
  };
}

export function generateProducts(): Product[] {
  const r = rand(7);
  return PRODUCT_NAMES.map((name, i) => ({
    id: `PRD-${pad(i + 1, 4)}`,
    name,
    sku: `SKU-${pad(i + 1, 5)}`,
    category: CATEGORIES[Math.floor(r() * CATEGORIES.length)],
    price: Math.round(100 + r() * 4900),
    stock: Math.floor(r() * 120),
    sales: Math.floor(r() * 500),
    image: PRODUCT_IMAGES[i % PRODUCT_IMAGES.length],
    status: r() > 0.1 ? "active" : r() > 0.5 ? "draft" : "archived",
    createdAt: new Date(Date.now() - i * 86_400_000).toISOString(),
  }));
}

export function generateCustomers(products: Product[]): Customer[] {
  const r = rand(21);
  const out: Customer[] = [];
  for (let i = 0; i < 48; i++) {
    const first = FIRST[Math.floor(r() * FIRST.length)];
    const last = LAST[Math.floor(r() * LAST.length)];
    const orders = Math.floor(r() * 18);
    const avg = 500 + r() * 3500;
    const segment: Customer["segment"] =
      orders > 10 ? "vip" : orders > 3 ? "regular" : "new";
    out.push({
      id: `CUS-${pad(i + 1, 4)}`,
      name: `${first} ${last}`,
      email: `${first.toLowerCase()}.${last.toLowerCase()}@mail.com`,
      phone: `+8801${Math.floor(300_000_000 + r() * 600_000_000)}`,
      orders,
      spent: Math.round(orders * avg),
      city: CITIES[Math.floor(r() * CITIES.length)],
      joinedAt: new Date(
        Date.now() - Math.floor(r() * 365) * 86_400_000
      ).toISOString(),
      segment,
    });
  }
  // keep products referenced for stable types
  void products;
  return out;
}

const STATUSES: OrderStatus[] = [
  "pending",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

export function generateOrders(
  products: Product[],
  customers: Customer[]
): Order[] {
  const r = rand(55);
  const out: Order[] = [];
  for (let i = 0; i < 64; i++) {
    const c = customers[Math.floor(r() * customers.length)];
    const count = 1 + Math.floor(r() * 3);
    const items = Array.from({ length: count }, () => {
      const p = products[Math.floor(r() * products.length)];
      const qty = 1 + Math.floor(r() * 3);
      return {
        productId: p.id,
        name: p.name,
        qty,
        price: p.price,
      };
    });
    const subtotal = items.reduce((s, it) => s + it.qty * it.price, 0);
    const shipping = 130;
    const payment: Order["payment"] =
      r() > 0.5 ? "cod" : r() > 0.5 ? "bkash" : r() > 0.5 ? "card" : "nagad";
    const codFee = payment === "cod" ? 20 : 0;
    const total = subtotal + shipping + codFee;
    const daysAgo = Math.floor(r() * 30);
    out.push({
      id: `ORD-${pad(1000 + i, 5)}`,
      customerId: c.id,
      customerName: c.name,
      items,
      subtotal,
      shipping,
      codFee,
      total,
      status: STATUSES[Math.floor(r() * STATUSES.length)],
      payment,
      createdAt: new Date(Date.now() - daysAgo * 86_400_000).toISOString(),
    });
  }
  return out.sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function buildSalesSeries(orders: Order[]): SalesPoint[] {
  const days = 14;
  const bucket = new Map<string, { revenue: number; orders: number }>();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(Date.now() - i * 86_400_000);
    const key = d.toISOString().slice(5, 10);
    bucket.set(key, { revenue: 0, orders: 0 });
  }
  for (const o of orders) {
    const key = o.createdAt.slice(5, 10);
    const b = bucket.get(key);
    if (b && o.status !== "cancelled") {
      b.revenue += o.total;
      b.orders += 1;
    }
  }
  return Array.from(bucket.entries()).map(([label, v]) => ({
    label,
    revenue: v.revenue,
    orders: v.orders,
  }));
}

// Singleton in-memory store
export const products: Product[] = generateProducts();
export const customers: Customer[] = generateCustomers(products);
export const orders: Order[] = generateOrders(products, customers);
export const salesSeries: SalesPoint[] = buildSalesSeries(orders);
