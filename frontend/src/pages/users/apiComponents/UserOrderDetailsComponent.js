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

// this page is for after placed order to check  my order details:
const UserOrderDetailsComponent = ({ getUser, userInfo, getOrderData }) => {
  // hooks:
  const [user, setUser] = useState({});
  const [isDelivered, setIsDelivered] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isPaid, setIsPaid] = useState(false);
  const [cartSubtotal, setCartSubtotal] = useState(0);
  const [orderButtonMsg, setOrderButtonMsg] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const { id } = useParams();
  useEffect(() => {
    getUser()
      .then((res) => setUser(res))
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo._id]);

  useEffect(() => {
    getOrderData(id)
      .then((res) => {
        res.isDelivered
          ? setIsDelivered(res.deliveredAt)
          : setIsDelivered(false);
        setPaymentMethod(res.paymentMethod);
        res.isPaid ? setIsPaid(res.paidAt) : setIsPaid(false);
        setCartSubtotal(res.orderTotal.cartSubtotal);
        setCartItems(res.cartItems);

        // handle order button message:
        if (res.isPaid) {
          setOrderButtonMsg("Your order is finished");
          setButtonDisabled(true);
        } else {
          if (res.paymentMethod === "pp") {
            setOrderButtonMsg("pay for your order");
          } else if (res.paymentMethod === "cod") {
            setButtonDisabled(true);
            setOrderButtonMsg("your order is placed(cod)");
          }
        }
        console.log(res);
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
              {userInfo.firstName + " " + userInfo.lastName}
              <br />
              <b>Address:</b>
              {user.address +
                " " +
                user.city +
                ", " +
                user.state +
                ", " +
                user.country +
                ", " +
                user.zipCode}
              <br />
              <b>phone no.:</b>
              {user.phoneNumber}
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
                {isDelivered ? (
                  <>Delivered at {isDelivered}</>
                ) : (
                  "not delivered"
                )}
              </Alert>
            </Col>
            <Col md={6}>
              {" "}
              <Alert className="mt-4" variant={isPaid ? "success" : "danger"}>
                {isPaid ? <>Paid at {isPaid}</> : "not paid"}
              </Alert>
            </Col>
          </Row>
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
              Items price (after tax):
              <span className="fw-bold">₹{cartSubtotal}</span>
            </ListGroup.Item>
            <ListGroup.Item>
              Shipping:<span className="fw-bold">included</span>
            </ListGroup.Item>
            <ListGroup.Item>
              Tax:<span className="fw-bold">included</span>
            </ListGroup.Item>
            <ListGroup.Item className="text-danger">
              Total Price:<span className="fw-bold">₹{cartSubtotal}</span>
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="d-grid gap-2">
                <Button
                  size="lg"
                  variant="danger"
                  type="button"
                  disabled={buttonDisabled}
                >
                  {orderButtonMsg}
                </Button>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default UserOrderDetailsComponent;
