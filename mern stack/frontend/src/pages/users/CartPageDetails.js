import CartPageDetailsComponent from "./apiComponents/CartPageDetailsComponent";
import { useSelector } from "react-redux";
const CartPageDetails = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartSubtotal = useSelector((state) => state.cart.cartSubtotal);
  const itemsCount = useSelector((state) => state.cart.itemsCount);
  return (
    <CartPageDetailsComponent
      cartItems={cartItems}
      cartSubtotal={cartSubtotal}
      itemsCount={itemsCount}
    />
  );
};

export default CartPageDetails;
