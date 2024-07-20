import RegisterApiComponent from "./apiComponents/RegisterApiComponent";
import axios from "axios";
import { setReduxUserState } from "../redux/actions/userActions";
import { useDispatch } from "react-redux";
// api for register user:
const registerUserApiRequest = async ({
  firstName,
  lastName,
  email,
  password,
}) => {
  const { data } = await axios.post("/api/users/register", {
    firstName,
    lastName,
    email,
    password,
  });
  if (data.createdUser) {
    sessionStorage.setItem("userInfo", JSON.stringify(data.createdUser));
  }
  return data;
};

const RegisterPage = () => {
  const reduxDispatch = useDispatch();
  return (
    <RegisterApiComponent
      registerUserApiRequest={registerUserApiRequest}
      setReduxUserState={setReduxUserState}
      reduxDispatch={reduxDispatch}
    />
  );
};

export default RegisterPage;
