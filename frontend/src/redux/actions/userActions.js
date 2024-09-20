import axios from "axios";
import { LOGIN_USER, LOG_OUT } from "../constants/userConstant";
// action for user to store its data in redux:
export const setReduxUserState = (userCreated) => (dispatch) => {
  dispatch({
    type: LOGIN_USER,
    payload: userCreated,
  });
};
export const logOut = () => (dispatch) => {
  axios.get("/api/logout");
  localStorage.removeItem("userInfo");
  sessionStorage.removeItem("userInfo");
  localStorage.removeItem("cart");
  document.location.href = "/login";
  dispatch({
    type: LOG_OUT,
  });
};
