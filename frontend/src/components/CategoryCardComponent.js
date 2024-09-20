import React from "react";
import { Card, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
const CategoryCardComponent = ({ c, i }) => {
  const images = [
    "/images/cards/games-category.png",
    "/images/cards/monitors-category.png",
    "/images/cards/tablets-category.png",
    "/images/cards/games-category.png",
    "/images/cards/monitors-category.png",
    "/images/cards/tablets-category.png",
    "/images/cards/monitors-category.png",
    "/images/cards/tablets-category.png",
  ];

  return (
    <Card>
      <Card.Img crossOrigin="anonymous" variant="top" src={images[i]} />
      <Card.Body>
        <Card.Title>{c}</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <LinkContainer to="/product-list">
          <Button variant="primary">Go to the Category</Button>
        </LinkContainer>
      </Card.Body>
    </Card>
  );
};

export default CategoryCardComponent;
