import AdminUserPageComponent from "./apiComponent/AdminUserPageComponent";
import axios from "axios";
// admin get users:
const fetchUsers = async (abortControl) => {
  const { data } = await axios.get("/api/users/", {
    signal: abortControl.signal,
  });
  return data;
};
//admin delete users:
const deleteUser = async (userId) => {
  const { data } = await axios.delete(`/api/users/${userId}`);
  return data;
};

const AdminUserPage = () => {
  return (
    <AdminUserPageComponent fetchUsers={fetchUsers} deleteUser={deleteUser} />
  );
};
export default AdminUserPage;
