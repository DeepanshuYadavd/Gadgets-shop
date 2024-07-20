import React from "react";
import { Row, Col, ListGroup, Image, Form, Button } from "react-bootstrap";
const CartItemComponent = ({
  item,
  orderCreated = false,
  changeQuantity = false,
  removeFromCartHandler,
}) => {
  return (
    <>
      <ListGroup.Item>
        <Row>
          <Col md={2}>
            <Image
              crossOrigin="anonymous"
              src={
                item.image ? "/images/cards" + item.image.path ?? null : null
              }
            />
          </Col>
          <Col md={2}>{item.name}</Col>
          <Col md={2}>
            <span className="fw-bold">₹{item.price}</span>
          </Col>
          <Col md={3}>
            <Form.Select
              onChange={
                changeQuantity
                  ? (e) => {
                      changeQuantity(item.productId, e.target.value);
                    }
                  : undefined
              }
              disabled={orderCreated}
              value={item.quantity}
            >
              {[...Array(item.count).keys()].map((x) => (
                <option key={x + 1} value={x + 1}>
                  {x + 1}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col md={3}>
            <Button
              disabled={orderCreated === true}
              type="button"
              variant="secondary"
              onClick={
                removeFromCartHandler
                  ? () =>
                      removeFromCartHandler(
                        item.productId,
                        item.quantity,
                        item.price
                      )
                  : undefined
              }
            >
              <i className="bi bi-trash"></i>
            </Button>
          </Col>
        </Row>
      </ListGroup.Item>
      <br />
    </>
  );
};

export default CartItemComponent;
