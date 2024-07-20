import React, { useEffect, useState } from "react";

import { ListGroup, Row, Col, Container, Button } from "react-bootstrap";
import SortOptionComponent from "../../components/SortOptionComponent";
import ProductForListComponents from "../../components/ProductForListComponents";
import PaginationComponent from "../../components/PaginationComponent";
import PriceFilterComponent from "../../components/filterQueryResultOptions/PriceFilterComponent";
import RatingFilterComponent from "../../components/filterQueryResultOptions/RatingFilterComponent";
import CategoryFilterComponent from "../../components/filterQueryResultOptions/CategoryFilterComponent";
import AttributeFilterComponent from "../../components/filterQueryResultOptions/AttributeFilterComponent";

// components:
const ProductListApiComponent = ({ getProducts }) => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts()
      .then((res) => {
        setProducts(res.product);
        // console.log(res.product);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <Container fluid>
      {/* {console.log(products)} */}
      <Row>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item className="mt-2">
              <SortOptionComponent />
            </ListGroup.Item>
            <ListGroup.Item>
              Filter: <br />
              <PriceFilterComponent />
            </ListGroup.Item>
            <ListGroup.Item>
              <RatingFilterComponent />
            </ListGroup.Item>
            <ListGroup.Item>
              <CategoryFilterComponent />
            </ListGroup.Item>
            <ListGroup.Item>
              <AttributeFilterComponent />
            </ListGroup.Item>
            <ListGroup.Item>
              <Button variant="primary">Filter</Button>
              <Button variant="danger">Reset</Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={9}>
          {products.map((product, idx) => (
            <ProductForListComponents
              key={product._id}
              images={product.images}
              name={product.name}
              description={product.description}
              price={product.price}
              rating={product.rating}
              reviewsNumber={product.reviewsNumber}
              productId={product._id}
            />
          ))}
          <PaginationComponent />
        </Col>
      </Row>
    </Container>
  );
};

export default ProductListApiComponent;
