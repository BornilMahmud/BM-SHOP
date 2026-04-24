import { Routes, Route, Navigate } from "react-router-dom";
import { StoreProvider } from "./store";
import AdminLayout from "./layouts/AdminLayout";
import ShopLayout from "./layouts/ShopLayout";
import Dashboard from "./pages/admin/Dashboard";
import AdminProducts from "./pages/admin/Products";
import AdminOrders from "./pages/admin/Orders";
import AdminCustomers from "./pages/admin/Customers";
import AdminAnalytics from "./pages/admin/Analytics";
import AdminMarketing from "./pages/admin/Marketing";
import AdminSettings from "./pages/admin/Settings";
import AdminPOS from "./pages/admin/POS";
import AdminInventory from "./pages/admin/Inventory";
import Home from "./pages/shop/Home";
import ProductPage from "./pages/shop/Product";
import Cart from "./pages/shop/Cart";
import Checkout from "./pages/shop/Checkout";
import OrderSuccess from "./pages/shop/OrderSuccess";

export default function App() {
  return (
    <StoreProvider>
      <Routes>
        <Route path="/" element={<ShopLayout />}>
          <Route index element={<Home />} />
          <Route path="product/:id" element={<ProductPage />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="order/:id" element={<OrderSuccess />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="customers" element={<AdminCustomers />} />
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="marketing" element={<AdminMarketing />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="pos" element={<AdminPOS />} />
          <Route path="inventory" element={<AdminInventory />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </StoreProvider>
  );
}
