import { Routes, Route, Navigate } from "react-router-dom";
import { StoreProvider } from "./store";
import { AuthProvider } from "./auth/AuthProvider";
import RoleGuard from "./auth/RoleGuard";
import AdminLayout from "./layouts/AdminLayout";
import ShopLayout from "./layouts/ShopLayout";
import UserLayout from "./layouts/UserLayout";
import VendorLayout from "./layouts/VendorLayout";
import StaffLayout from "./layouts/StaffLayout";
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
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import UserHome from "./pages/user/Home";
import UserOrders from "./pages/user/Orders";
import UserWishlist from "./pages/user/Wishlist";
import VendorDashboard from "./pages/vendor/Dashboard";
import VendorProducts from "./pages/vendor/Products";
import VendorSales from "./pages/vendor/Sales";
import StaffPanel from "./pages/staff/Panel";
import StaffPOS from "./pages/staff/POS";
import StaffOrders from "./pages/staff/Orders";

export default function App() {
  return (
    <AuthProvider>
      <StoreProvider>
        <Routes>
          {/* Public storefront */}
          <Route path="/" element={<ShopLayout />}>
            <Route index element={<Home />} />
            <Route path="product/:id" element={<ProductPage />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="order/:id" element={<OrderSuccess />} />
          </Route>

          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Admin — requires admin role */}
          <Route element={<RoleGuard allow={["admin"]} />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="customers" element={<AdminCustomers />} />
              <Route path="analytics" element={<AdminAnalytics />} />
              <Route path="marketing" element={<AdminMarketing />} />
              <Route path="settings" element={<AdminSettings />} />
              <Route path="pos" element={<AdminPOS />} />
              <Route path="inventory" element={<AdminInventory />} />
            </Route>
          </Route>

          {/* User */}
          <Route element={<RoleGuard allow={["user", "admin"]} />}>
            <Route path="/user" element={<UserLayout />}>
              <Route index element={<Navigate to="/user/home" replace />} />
              <Route path="home" element={<UserHome />} />
              <Route path="orders" element={<UserOrders />} />
              <Route path="wishlist" element={<UserWishlist />} />
            </Route>
          </Route>

          {/* Vendor */}
          <Route element={<RoleGuard allow={["vendor", "admin"]} />}>
            <Route path="/vendor" element={<VendorLayout />}>
              <Route index element={<Navigate to="/vendor/dashboard" replace />} />
              <Route path="dashboard" element={<VendorDashboard />} />
              <Route path="products" element={<VendorProducts />} />
              <Route path="sales" element={<VendorSales />} />
            </Route>
          </Route>

          {/* Staff */}
          <Route element={<RoleGuard allow={["staff", "admin"]} />}>
            <Route path="/staff" element={<StaffLayout />}>
              <Route index element={<Navigate to="/staff/panel" replace />} />
              <Route path="panel" element={<StaffPanel />} />
              <Route path="pos" element={<StaffPOS />} />
              <Route path="orders" element={<StaffOrders />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </StoreProvider>
    </AuthProvider>
  );
}
