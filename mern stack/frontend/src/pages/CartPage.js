import CartPageComponent from "./apiComponents/CartPageComponent";
import { useDispatch, useSelector } from "react-redux";
const CartPage = () => {
  const reduxDispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartSubtotal = useSelector((state) => state.cart.cartSubtotal);
  return (
    <CartPageComponent
      cartItems={cartItems}
      cartSubtotal={cartSubtotal}
      reduxDispatch={reduxDispatch}
    />
  );
};

export default CartPage;
