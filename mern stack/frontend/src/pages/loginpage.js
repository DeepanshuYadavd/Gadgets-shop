import LoginApiComponent from "./apiComponents/LoginApiComponent";
import axios from "axios";
import { setReduxUserState } from "../redux/actions/userActions";
import { useDispatch } from "react-redux";
// api hit for login user:
const loginUserAPiRequest = async ({ email, password, doNotLogout }) => {
  const { data } = await axios.post("/api/users/login", {
    email,
    password,
    doNotLogout,
  });
  if (doNotLogout) {
    localStorage.setItem("userInfo", JSON.stringify(data.loggedUser));
  } else {
    sessionStorage.setItem("userInfo", JSON.stringify(data.loggedUser));
  }
  return data;
};
const LoginPage = () => {
  const reduxDispatch = useDispatch();
  return (
    <LoginApiComponent
      loginUserAPiRequest={loginUserAPiRequest}
      setReduxUserState={setReduxUserState}
      reduxDispatch={reduxDispatch}
    />
  );
};

export default LoginPage;
