import React from "react";
import { Row, Col, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import AdminLinksComponent from "../../../components/admin/AdminLinksComponent";

import { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { logOut } from "../../../redux/actions/userActions";
const AdminOrderPageComponents = ({ fetchOrders }) => {
  const [orders, setOrders] = useState([]);
  // const dispatch = useDispatch();
  useEffect(() => {
    fetchOrders()
      .then((res) => {
        setOrders(res);
      })
      .catch((er) => {
        setOrders(er);
        // dispatch(logOut());
      });
  }, []);
  return orders.response ? (
    <div
      className="border-2 border-black p-4 text-center"
      style={{
        maxWidth: "50%",
        display: "flex",
        margin: "auto",
        color: "red",
        fontSize: "2rem",
      }}
    >
      {orders.response.data}
    </div>
  ) : (
    <Row className="m-5">
      <Col md={2}>
        <AdminLinksComponent />
      </Col>
      <Col md={10}>
        <h1>Orders</h1>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>user</th>
              <th>Date</th>
              <th>Total</th>
              <th>Delivered</th>
              <th>Payment method</th>
              <th>Oder details</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((item, idx) => (
              <tr key={item._id}>
                <td>{idx + 1}</td>
                <td>
                  {item.user === null
                    ? " "
                    : item.user.firstName + " " + item.user.lastName}
                </td>
                <td>{item.createdAt.substring(0, 10)}</td>
                <td>{item.orderTotal.cartSubtotal}</td>
                <td>
                  {item.isDelivered ? (
                    <i className="bi bi-check-lg text-success"></i>
                  ) : (
                    <i className="bi bi-x-lg text-danger"></i>
                  )}
                </td>
                <td>{item.paymentMethod}</td>
                <td>
                  <Link to={`/admin/order-details/${item._id}`}>
                    {" "}
                    go to order
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};

export default AdminOrderPageComponents;
