import CartPageDetailsComponent from "./apiComponents/CartPageDetailsComponent";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/actions/cartActions";
import axios from "axios";

// component:
const CartPageDetails = () => {
  // data from redux:
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartSubtotal = useSelector((state) => state.cart.cartSubtotal);
  const itemsCount = useSelector((state) => state.cart.itemsCount);
  const userInfo = useSelector((state) => state.userRegisterLogin.userInfo);
  const reduxDispatch = useDispatch();

  // api hit gor getting user profile:
  const getUser = async () => {
    const { data } = await axios.get("/api/users/profile/" + userInfo._id);
    return data;
  };

  // api hit for posting order data:
  const postOrder = async (orderData) => {
    const { data } = await axios.post("/api/orders/", { ...orderData });
    return data;
  };
  return (
    <CartPageDetailsComponent
      cartItems={cartItems}
      cartSubtotal={cartSubtotal}
      itemsCount={itemsCount}
      addToCart={addToCart}
      removeFromCart={removeFromCart}
      reduxDispatch={reduxDispatch}
      userInfo={userInfo}
      getUser={getUser}
      postOrder={postOrder}
    />
  );
};

export default CartPageDetails;
