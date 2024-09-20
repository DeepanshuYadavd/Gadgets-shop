import * as actionType from "../constants/cartConstants";
import axios from "axios";
// Add to cart action:
export const addToCart = (productId, quantity) => async (dispatch) => {
  const { data } = await axios.get("/api/products/get-one/" + productId);
  // console.log(data);
  dispatch({
    type: actionType.ADD_TO_CART,
    payload: {
      productId: data._id,
      name: data.name,
      price: data.price,
      image: data.images[0] ?? null,
      count: data.count,
      quantity,
    },
  });
};

// remove from cart action:
export const removeFromCart = (productId, quantity, price) => (dispatch) => {
  dispatch({
    type: actionType.REMOVE_FROM_CART,
    payload: { productId: productId, quantity: quantity, price: price },
  });
};

// jab hum addToCart function ko call krenge ye function hme ik dusra function return krega i.e.(dispatch)=>{dispatch({some actions})}   (it is must that function return other function whose argument is dispatch)

// redux-thunk(middleware) iss returned function ko execute krega by sending a dipatch (argument) or jb iss function ke andr ka dispatch() function call hoga to uske andr ka object jayega redux store mai fr vha se ye object jayega reducer ke action mai or reducer, action ke basis pr, state ko update krega.
