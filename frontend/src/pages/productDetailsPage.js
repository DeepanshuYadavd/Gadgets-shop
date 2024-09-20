import ProductDetailsApiComponent from "./apiComponents/ProductDetailsApiComponent";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/actions/cartActions";
// component:
const productDetailsPage = () => {
  const dispatch = useDispatch();
  return (
    <ProductDetailsApiComponent
      addToCartReduxAction={addToCart}
      reduxDispatch={dispatch}
    />
  );
};

export default productDetailsPage;
