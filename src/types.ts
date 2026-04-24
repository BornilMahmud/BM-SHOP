export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  sales: number;
  image: string;
  status: "active" | "draft" | "archived";
  createdAt: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  qty: number;
  price: number;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  codFee: number;
  total: number;
  status: OrderStatus;
  payment: "cod" | "card" | "bkash" | "nagad";
  createdAt: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  orders: number;
  spent: number;
  city: string;
  joinedAt: string;
  segment: "new" | "regular" | "vip";
}

export interface CartItem {
  productId: string;
  qty: number;
}

export interface SalesPoint {
  label: string;
  revenue: number;
  orders: number;
}
