import AdminOrderDetailComp from "./apiComponent/AdminOrderDetailComp";
import axios from "axios";

const fetchOrderDetails = async (id) => {
  const { data } = await axios.get(`/api/orders/user/${id}`);
  return data;
};

const updateOrderToDelivered = async (id) => {
  const { data } = await axios.put(`/api/orders/delivered/${id}`);
  if (data) {
    return data;
  }
};
const AdminOrderDetailPage = () => {
  return (
    <AdminOrderDetailComp
      fetchOrderDetails={fetchOrderDetails}
      updateOrderToDelivered={updateOrderToDelivered}
    />
  );
};
export default AdminOrderDetailPage;
