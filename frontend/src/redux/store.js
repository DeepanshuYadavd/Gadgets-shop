import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import { thunk } from "redux-thunk";
import { cartReducer } from "./reducers/cartReducers";
import { userRegisterLoginReducer } from "./reducers/userReducers";
const reducer = combineReducers({
  cart: cartReducer,
  userRegisterLogin: userRegisterLoginReducer,
});

const middleware = [thunk];

// user info fetch from  local storage :
const userInfoInLocalstorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : sessionStorage.getItem("userInfo")
  ? JSON.parse(sessionStorage.getItem("userInfo"))
  : {};

// cartInfo fetch from local storage:
const cartInfoInLocalStorage = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [], itemsCount: 0, cartSubtotal: 0 };

// initial state for redux store:
const initialSate = {
  cart: cartInfoInLocalStorage,
  userRegisterLogin: {
    userInfo: userInfoInLocalstorage,
  },
};

// store
const store = createStore(
  reducer,
  initialSate,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
