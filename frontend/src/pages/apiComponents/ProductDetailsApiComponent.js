import React from "react";
import {
  Container,
  Row,
  Col,
  Image,
  ListGroup,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import AddedToCartMessageComponent from "../../components/AddedToCartMessageComponent";
import { Rating } from "react-simple-star-rating";
import { useState } from "react";
import { useParams } from "react-router-dom";
const ProductDetailsApiComponent = ({
  addToCartReduxAction,
  reduxDispatch,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [showCartMessage, setShowCartMessage] = useState(false);
  const { id } = useParams();
  // add to cart habdler:
  const addToCartHandler = () => {
    reduxDispatch(addToCartReduxAction(id, quantity));
    setShowCartMessage(true);
  };
  return (
    <Container className="pt-4">
      <AddedToCartMessageComponent
        showCartMessage={showCartMessage}
        setShowCartMessage={setShowCartMessage}
      />
      <Row>
        <Col md={4}>
          <Image fluid src="../images/cards/images/games-category.png" />
          <Image fluid src="../images/cards/images/monitors-category.png" />
          <Image fluid src=" ../images/cards/images/tablets-category.png" />
          <Image fluid src="../images/cards/images/games-category.png" />
        </Col>
        <Col md={8}>
          {/* details */}
          <Row>
            <Col md={8}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h1>Product Name </h1>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    readonly
                    size={20}
                    initialValue={4}
                    SVGstyle={{ display: "inline" }}
                  />{" "}
                  (1)
                </ListGroup.Item>
                <ListGroup.Item>
                  Price : <span className="fw-bold">$399</span>
                </ListGroup.Item>
                <ListGroup.Item>
                  this is the detail description for product. this is the detail
                  description for product. this is the detail description for
                  product. this is the detail description for product. this is
                  the detail description for product. this is the detail
                  description for product.
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={4}>
              <ListGroup variant="flush">
                <ListGroup.Item>Status: in stock</ListGroup.Item>
                <ListGroup.Item>
                  {" "}
                  Price : <span className="fw-bold">$399</span>
                </ListGroup.Item>
              </ListGroup>
              Quantity:
              <Form.Select
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                size="lg"
                aria-label="Default select example"
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </Form.Select>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Button onClick={addToCartHandler} variant="danger">
                    Add to cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          {/* reviews */}
          <Row>
            <Col className="mt-5">
              <h5>REVIEWS:</h5>
              <ListGroup variant="flush">
                {Array.from({ length: 10 }).map((item, idx) => (
                  <ListGroup.Item key={idx}>
                    deepanshu <br />
                    <Rating
                      readonly
                      size={15}
                      initialValue={4}
                      SVGstyle={{ display: "inline" }}
                    />
                    <br />
                    16.03.2024
                    <br />
                    ksdj,hgfal.shdglk.sdhgnsdrhgiod kaisuhfoiaewsfk
                    akisluhfanwliesfo oiehfaiowuef iosadkhfaio kiuergbvuierh
                    iveurghviuervbhuierv iulgerdfvrbv osekidrhgyioelrng
                    uivrebuifhvburebvguiehr uivhgbieur
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
          </Row>
          <hr />
          send review form:
          <Alert variant="danger">Login first to write a review</Alert>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Write a Review:</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>

            <Form.Select aria-label="Default select example">
              <option>Your Rating:</option>
              <option value="5">5 (very good)</option>
              <option value="4">4 (good)</option>
              <option value="3">3 (average)</option>
              <option value="2">2 (poor)</option>
              <option value="1">1 (awful)</option>
            </Form.Select>
            <Button className="mb-3 mt-3" variant="primary">
              submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetailsApiComponent;
