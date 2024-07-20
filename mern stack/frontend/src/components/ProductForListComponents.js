import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Rating } from "react-simple-star-rating";
const ProductForListComponents = ({
  images,
  name,
  description,
  price,
  rating,
  reviewsNumber,
  productId,
}) => {
  return (
    <Card style={{ marginTop: "30px", marginBottom: "50px" }}>
      <Row>
        <Col lg={5}>
          <Card.Img
            variant="top"
            src={`/images/cards${images[0] ? images[0].path : ""}`}
          />
          {/* yha pr index 0 isliye rkha hai kyunki humme ik product ki ik hi image chaiye ik product ke andr us product ki multiple images hongi usme se pehli leli baki product detail mai dikha denge */}
        </Col>
        <Col lg={7}>
          <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Card.Text>{description}</Card.Text>
            <Card.Text>
              <Rating
                readonly
                size={20}
                initialValue={rating}
                SVGstyle={{ display: "inline" }}
              />{" "}
              {reviewsNumber}
            </Card.Text>
            <Card.Text className="h4">
              ₹{price}{" "}
              <LinkContainer to={`/product-details/${productId}`}>
                <Button variant="danger">See Product</Button>
              </LinkContainer>
            </Card.Text>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
};

export default ProductForListComponents;
