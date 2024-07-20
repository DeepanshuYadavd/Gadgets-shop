import React from "react";
import { Container, Row, Col, Alert, ListGroup, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import CartItemComponent from "../../components/CartItemComponent";
import { addToCart } from "../../redux/actions/cartActions";
import { removeFromCart } from "../../redux/actions/cartActions";
const CartPageComponent = ({ cartItems, cartSubtotal, reduxDispatch }) => {
  // update quantity on cart page:
  const changeQuantity = (productId, quantity) => {
    reduxDispatch(addToCart(productId, quantity));
  };
  // delete item from cart:
  const removeFromCartHandler = (productId, quantity, price) => {
    if (window.confirm("Are you sure?")) {
      reduxDispatch(removeFromCart(productId, quantity, price));
    }
  };
  return (
    <Container fluid>
      {/* {console.log(cartItems)} */}
      <Row>
        <Col md={8}>
          {cartItems.length !== 0 ? (
            <>
              <h1>Shopping Cart:</h1>
              {/* cart items component */}
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
            </>
          ) : (
            <Alert
              variant="info"
              style={{
                textAlign: "center",
                fontSize: "2rem",
                width: "75%",
                margin: "auto",
              }}
            >
              Your Cart is Empty
            </Alert>
          )}
        </Col>
        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>Subtotal of products:</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              Price : <span className="fw-bold">₹{cartSubtotal}/- only</span>
            </ListGroup.Item>
            <ListGroup.Item>
              <LinkContainer to="/user/cart">
                <Button disabled={cartSubtotal === 0} type="button">
                  Proceed to checkout
                </Button>
              </LinkContainer>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default CartPageComponent;
