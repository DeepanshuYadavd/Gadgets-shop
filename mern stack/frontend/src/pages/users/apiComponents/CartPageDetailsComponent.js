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
const CartPageDetailsComponent = ({ cartItems, cartSubtotal, itemsCount }) => {
  return (
    <Container fluid>
      <Row className="mt-4">
        <h1>Order Details</h1>
        <Col md={8}>
          <br />
          <Row>
            <Col md={6}>
              <h2>Shipping</h2>
              <b>Name:</b>Deepanshu
              <br />
              <b>Address:</b>302 ram nagar jrc punjab
              <br />
              <b>phone no.:</b>9501620228
              <br />
            </Col>
            <Col md={6}>
              <h2>Payment Method</h2>
              <Form.Select>
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
                Not Delivered.In order to make order, fill out your profile with
                correct address, city etc.
              </Alert>
            </Col>
            <Col md={6}>
              {" "}
              <Alert className="mt-4" variant="success">
                not paid yet
              </Alert>
            </Col>
          </Row>
          <h2>Order Items</h2>
          <ListGroup variant="flush">
            {cartItems.map((item, idx) => (
              <CartItemComponent key={idx} item={item} />
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
                  disabled={cartSubtotal === 0}
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
