import React from "react";
import {
  Container,
  Row,
  Col,
  Alert,
  Form,
  ListGroup,
  Button,
} from "react-bootstrap";
import CartItemComponent from "../../../components/CartItemComponent";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { logOut } from "../../../redux/actions/userActions";
const AdminOrderDetailComp = ({
  fetchOrderDetails,
  updateOrderToDelivered,
}) => {
  const { id } = useParams();
  const [userDetails, setuserDetails] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isPaid, setIsPaid] = useState(false);
  const [isDelivered, setIsdelivered] = useState(false);
  const [subTotal, setsubTotal] = useState(0);
  const [buttonDisabled, setbuttonDisabled] = useState(false);
  const [buttonMessage, setbuttonMessage] = useState("Mark as delivered");
  const [cartItems, setCartItems] = useState([]);

  // const dispatch = useDispatch();
  useEffect(() => {
    fetchOrderDetails(id)
      .then((order) => {
        console.log(order);
        setuserDetails(order.user);
        setPaymentMethod(order.paymentMethod);
        order.isDelivered
          ? setIsdelivered(order.DeliveredAt.substring(1, 10))
          : setIsdelivered(false);
        order.isPaid ? setIsPaid(order.paidAt) : setIsPaid(false);
        setsubTotal(order.orderTotal.cartSubtotal);
        if (order.isDelivered) {
          setbuttonDisabled(true);
          setbuttonMessage("Order is finished");
        }
        setCartItems(order.cartItems);
      })
      .catch((err) =>
        console.log(
          err.response.data.message
            ? err.response.data.message
            : err.response.data
        )
        // dispatch(logOut())
      );
  }, [isDelivered, id]);

  return (
    <Container fluid>
      <Row className="mt-4">
        <h1>Order Details</h1>
        <Col md={8}>
          <br />
          <Row>
            <Col md={6}>
              <h2>Shipping</h2>
              <b>Name:</b>
              {userDetails === null
                ? " "
                : userDetails.firstName + " " + userDetails.lastName}
              <br />
              <b>Address:</b>
              {userDetails === null
                ? " "
                : userDetails.address +
                  userDetails.city +
                  userDetails.state +
                  userDetails.zipCode +
                  userDetails.country}
              <br />
              <b>phone no.:</b>
              {userDetails === null ? " " : userDetails.phoneNumber}
              <br />
            </Col>
            <Col md={6}>
              <h2>Payment Method</h2>
              <Form.Select value={paymentMethod} disabled={true}>
                <option value="pp">paypal</option>
                <option value="cod">
                  cash on delivery(delivery may be delayed)
                </option>
              </Form.Select>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Alert
                className="mt-4"
                variant={isDelivered ? "success" : "danger"}
              >
                {isDelivered
                  ? "Delivered at " + isDelivered
                  : "not delivered yet"}
              </Alert>
            </Col>
            <Col md={6}>
              {" "}
              <Alert className="mt-4" variant={isPaid ? "success" : "danger"}>
                {isPaid ? "paid at " + isPaid : "not paid yet"}
              </Alert>
            </Col>
          </Row>

          {/* order items  */}
          <h2>Order Items</h2>
          <ListGroup variant="flush">
            {cartItems.map((item, idx) => (
              <CartItemComponent key={idx} item={item} orderCreated={true} />
            ))}
          </ListGroup>
        </Col>
        <Col md={4}>
          <ListGroup>
            <ListGroup.Item>
              <h3>Order Summery</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              Items price (after tax):{" "}
              <span className="fw-bold">₹{subTotal}</span>
            </ListGroup.Item>
            <ListGroup.Item>
              Shipping:<span className="fw-bold">included</span>
            </ListGroup.Item>
            <ListGroup.Item>
              Tax:<span className="fw-bold">included</span>
            </ListGroup.Item>
            <ListGroup.Item className="text-danger">
              Total Price: <span className="fw-bold">₹{subTotal}</span>
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="d-grid gap-2">
                <Button
                  onClick={() => {
                    updateOrderToDelivered(id).then((res) => {
                      if (res) {
                        setIsdelivered(true);
                      }
                    });
                  }}
                  size="lg"
                  variant="danger"
                  type="button"
                  disabled={buttonDisabled}
                >
                  {buttonMessage}
                </Button>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminOrderDetailComp;
