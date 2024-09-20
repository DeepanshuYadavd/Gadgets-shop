import * as actionType from "../constants/cartConstants";

const CART_INITIAL_STATE = {
  cartItems: [],
  itemsCount: 0,
  cartSubtotal: 0,
};
// This state variable has access of initial state of store.
export const cartReducer = (state = CART_INITIAL_STATE, action) => {
  switch (action.type) {
    case actionType.ADD_TO_CART:
      const productBeingAddedToCart = action.payload;
      const currentState = { ...state };
      const productAlreadyExistInState = state.cartItems.find(
        (x) => x.productId === productBeingAddedToCart.productId
      );
      if (productAlreadyExistInState) {
        currentState.itemsCount = 0;
        currentState.cartSubtotal = 0;
        currentState.cartItems = state.cartItems.map((x) => {
          if (x.productId === productAlreadyExistInState.productId) {
            currentState.itemsCount += Number(productBeingAddedToCart.quantity);
            const sum =
              Number(productBeingAddedToCart.quantity) *
              Number(productBeingAddedToCart.price);
            currentState.cartSubtotal += sum;
          } else {
            currentState.itemsCount += Number(x.quantity);
            const sum = Number(x.quantity) * Number(x.price);
            currentState.cartSubtotal += sum;
          }
          return x.productId === productAlreadyExistInState.productId
            ? productBeingAddedToCart
            : x;
        });
      } else {
        currentState.itemsCount += Number(productBeingAddedToCart.quantity);
        const sum =
          Number(productBeingAddedToCart.quantity) *
          Number(productBeingAddedToCart.price);
        currentState.cartSubtotal += sum;
        currentState.cartItems = [...state.cartItems, productBeingAddedToCart];
      }
      localStorage.setItem("cart", JSON.stringify(currentState));
      return currentState;
    case actionType.REMOVE_FROM_CART:
      const updatedItem = {
        ...state,
        cartItems: state.cartItems.filter(
          (x) => x.productId !== action.payload.productId
        ),
        itemsCount: state.itemsCount - action.payload.quantity,
        cartSubtotal:
          state.cartSubtotal - action.payload.price * action.payload.quantity,
      };
      localStorage.setItem("cart", JSON.stringify(updatedItem));
      return updatedItem;
    default:
      return state;
  }
};

// explaination of cart functionality:
// 1. suppose kro hum kisi product ko dekh rhe hai,and we want to add to cart this product then ye add to cart button kya krega:
// 2.jab hum (add to cart) button pr click krenge tab ik action dispatch hoga or uss action ke andr ik api call hogi jo specific id se product ki detail fetch kregi.
// note:bcz we want to save data in reduxStore thats why deal with action .
// 3.action data ko fetch krke reducer ko dega or reducer is data ko redux store mai save kra dega.
// 4. reducer ke andr hum kuj aisi calculations krenge jis se reduxStore mai or  hmare cart mai accurate data store hoga.
// 5. see above code.
