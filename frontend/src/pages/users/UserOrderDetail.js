import UserOrderDetailsComponent from "./apiComponents/UserOrderDetailsComponent";
import { useSelector } from "react-redux";
import axios from "axios";
// component:
const UserOdersDetails = () => {
  // redux data:
  const userInfo = useSelector((state) => state.userRegisterLogin.userInfo);

  // api for getting user:
  const getUser = async () => {
    const { data } = await axios.get("/api/users/profile/" + userInfo._id);
    return data;
  };

  // api for gettiong order data:
  const getOrderData = async (orderId) => {
    const { data } = await axios.get("/api/orders/user/" + orderId);
    return data;
  };

  return (
    <UserOrderDetailsComponent
      getUser={getUser}
      userInfo={userInfo}
      getOrderData={getOrderData}
    />
  );
};
export default UserOdersDetails;
