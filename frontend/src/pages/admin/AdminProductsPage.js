import AdminProductPageComponent from "./apiComponent/AdminProductPageComponent";
import axios from "axios";
// admin gets products:
const getProducts = async (abortcontrol) => {
  const { data } = await axios.get("/api/products/admin", {
    signal: abortcontrol.signal,
  });
  return data;
};
// admin delete product:
const deleteProduct = async (userid) => {
  const {data} = await axios.delete(`/api/products/admin/${userid}`);
  return data;
};
const AdminProductsPage = () => {
  return (
    <AdminProductPageComponent
      getProducts={getProducts}
      deleteProduct={deleteProduct}
    />
  );
};
export default AdminProductsPage;
