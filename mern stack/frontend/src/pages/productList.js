import ProductListApiComponent from "./apiComponents/ProductListApiComponent";
import axios from "axios";

// api request for fetching product:
const getProducts = async () => {
  const { data } = await axios.get("/api/products/");
  return data;
};
const productList = () => {
  return <ProductListApiComponent getProducts={getProducts} />;
};

export default productList;
