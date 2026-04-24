import AdminOrders from "../admin/Orders";

// Staff and admin share the same order-fulfilment view.
export default function StaffOrders() {
  return <AdminOrders />;
}
