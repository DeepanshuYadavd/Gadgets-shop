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
import { useNavigate } from "react-router-dom";

// component:
const CartPageDetailsComponent = ({
  cartItems,
  cartSubtotal,
  itemsCount,
  addToCart,
  removeFromCart,
  reduxDispatch,
  userInfo,
  getUser,
  postOrder,
}) => {
  // hooks:
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [user, setUser] = useState({});
  const [AddressMsg, setAddressMsg] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("pp");
  // navigate:
  const navigate = useNavigate();
  // dispatch action for chnage quantity:
  const changeQuantity = (productID, quantity) => {
    reduxDispatch(addToCart(productID, quantity));
  };

  // dispatch action for remove from cart:
  const removeFromCartHandler = (productId, quantity, price) => {
    if (window.confirm("Are you sure?")) {
      reduxDispatch(removeFromCart(productId, quantity, price));
    }
  };

  // fetch user data to show in this page:
  useEffect(() => {
    getUser()
      .then((res) => {
        if (
          !(
            res.address &&
            res.city &&
            res.country &&
            res.state &&
            res.zipCode &&
            res.phoneNumber
          )
        ) {
          setButtonDisabled(true);
          setAddressMsg(
            ".In order to make order, fill out your profile with correct address, city etc."
          );
        } else {
          setUser(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo._id]);

  // order handler who save the order in database:
  const orderHandler = () => {
    const orderData = {
      orderTotal: {
        itemsCount: itemsCount,
        cartSubtotal: cartSubtotal,
      },
      cartItems: cartItems.map((item) => {
        return {
          productID: item.productID,
          name: item.name,
          price: item.price,
          image: { path: item.image ? item.image.path ?? null : null },
          quantity: item.quantity,
          count: item.count,
        };
      }),
      paymentMethod: paymentMethod,
    };
    postOrder(orderData)
      .then((res) => {
        // it should navigate to
        if (res) {
          navigate("/user/order-details/" + res._id);
        }
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const paymentHandler = (e) => {
    setPaymentMethod(e.target.value);
  };
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
              <Form.Select onChange={paymentHandler}>
                <option value="pp">paypal</option>
                <option value="cod">
                  cash on delivery(delivery may be delayed)
                </option>
              </Form.Select>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Alert className="mt-4" variant="danger">
                not delivered yet {AddressMsg}
              </Alert>
            </Col>
            <Col md={6}>
              {" "}
              <Alert className="mt-4" variant="danger">
                not paid yet
              </Alert>
            </Col>
          </Row>
          <h2>Order Items</h2>
          <ListGroup variant="flush">
            {cartItems.map((item, idx) => (
              <CartItemComponent
                key={idx}
                item={item}
                changeQuantity={changeQuantity}
                removeFromCartHandler={removeFromCartHandler}
              />
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
                  onClick={orderHandler}
                >
                  ORDER NOW
                </Button>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default CartPageDetailsComponent;
