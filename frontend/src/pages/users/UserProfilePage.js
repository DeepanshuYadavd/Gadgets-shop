import ProfilePageComponent from "./apiComponents/ProfilePageComponent";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setReduxUserState } from "../../redux/actions/userActions";
// update user profile:
const updateProfileApiRequest = async ({
  firstName,
  lastName,
  phoneNumber,
  address,
  country,
  zipCode,
  city,
  state,
  password,
}) => {
  const { data } = await axios.put("/api/users/profile", {
    firstName,
    lastName,
    phoneNumber,
    address,
    country,
    zipCode,
    city,
    state,
    password,
  });
  return data;
};
// get user profile data:
const fetchUser = async (userId) => {
  const { data } = await axios.get(`/api/users/profile/${userId}`);
  return data;
};

const UserProfilePage = () => {
  const reduxDispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userRegisterLogin);
  return (
    <ProfilePageComponent
      updateProfileApiRequest={updateProfileApiRequest}
      fetchUser={fetchUser}
      userInfo={userInfo}
      reduxDispatch={reduxDispatch}
      setReduxUserState={setReduxUserState}
    />
  );
};

export default UserProfilePage;
