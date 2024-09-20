import React from "react";
import { Row, Col, Table, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import AdminLinksComponent from "../../../components/admin/AdminLinksComponent";
import { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { logOut } from "../../../redux/actions/userActions";
// component :
const AdminUserPageComponent = ({ fetchUsers, deleteUser }) => {
  const [users, setUsers] = useState([]);
  const [userDeleted, setuserDeleted] = useState(false);
  // const dispatch = useDispatch();
  // delete handler
  const deleteHandler = async (userId) => {
    if (window.confirm("are you sure")) {
      const data = await deleteUser(userId);
      if (data === "user deleted") {
        setuserDeleted(!userDeleted);
      }
    }
  };

  // use effect() hook:
  useEffect(() => {
    const abortControl = new AbortController();
    fetchUsers(abortControl)
      .then((res) => setUsers(res))
      .catch((err) => {
        // note that:abort ki vje se req cancel hogi hi hogi or vo ik error throw krega hi krega is liye is error ko hum show ni krayenge,hum dusra error show krenge jo backend se ayega in case of error occur
        // kyunki hume sirf page leave krte smay req abort krni hai ,isse jo error throw hoga us se hume kuj lena dena ni hai
        err.name === "AxiosError" && console.log(err.response.data.message);
        // dispatch(logOut());
      });

    return () => abortControl.abort();
    // ik bar user ka data lane ke baad signal abort ho jayega or jb hum page leave krenge to vo signal abort hi rahega.
    // jb hum dobara page pr ayenge to fetchUsers function invoked hoga and data again fetch kiya jayega database se or fr abort ho jayega.
  }, [userDeleted]);

  return (
    <Row className="m-5">
      <Col md={2}>
        <AdminLinksComponent />
      </Col>
      <Col md={10}>
        <h1>User list</h1>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Is Admin</th>
              <th>Edit/Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={user._id}>
                <td>{idx + 1}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>
                  {user.isAdmin ? (
                    <i className="bi bi-check-lg text-success"></i>
                  ) : (
                    <i className="bi bi-x-lg text-danger"></i>
                  )}
                </td>
                <td>
                  <LinkContainer to="/admin/edit-user">
                    <Button className="btn-sm">
                      <i className="bi bi-pencil-square"></i>
                    </Button>
                  </LinkContainer>
                  {" / "}
                  <Button
                    className="btn-sm"
                    variant="danger"
                    onClick={() => deleteHandler(user._id)}
                  >
                    <i className="bi bi-archive-fill"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};

export default AdminUserPageComponent;
