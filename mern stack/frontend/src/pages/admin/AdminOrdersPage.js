import AdminOrderPageComponents from "./apiComponent/AdminOrderPageComponents";
import axios from "axios";
// admin get orders:
const fetchOrders = async () => {
  const {data} = await axios.get("/api/orders/admin");
  return data;
};
const AdminOrdersPage = () => {
  return <AdminOrderPageComponents fetchOrders={fetchOrders} />;
};
export default AdminOrdersPage;
