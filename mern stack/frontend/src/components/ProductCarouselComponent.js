import React from "react";
import { LinkContainer } from "react-router-bootstrap";
// import { Carousel } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
const ProductCarouselComponent = () => {
  const cursorP = {
    cursor: "grab",
    color: "yellow",
  };

  return (
    <Carousel data-bs-theme="dark">
      <Carousel.Item interval={1500}>
        <img
          className="d-block w-100"
          style={{ height: "300px", objectFit: "cover" }}
          src="/images/carousel/carousel-1.png"
          alt="First slide"
        />
        <Carousel.Caption>
          <LinkContainer style={cursorP} to="/product-details">
            <h3>Bestseller in Laptops Category</h3>
          </LinkContainer>

          <p className="text-white">
            Dell Inspiron 15 3000 Laptop, 155.6 inch HD
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={1500}>
        <img
          className="d-block w-100"
          style={{ height: "300px", objectFit: "cover" }}
          src="/images/carousel/carousel-2.png"
          alt="Second slide"
        />
        <Carousel.Caption>
          <LinkContainer style={cursorP} to="/product-details">
            <h3>Bestseller in Books Category</h3>
          </LinkContainer>
          <p className="text-white">
            World of Eric Carle, Hear Bear Roar 30-Button Animal Sound Book
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={1500}>
        <img
          className="d-block w-100"
          style={{ height: "300px", objectFit: "cover" }}
          src="/images/carousel/carousel-3.png"
          alt="Third slide"
        />
        <Carousel.Caption>
          <LinkContainer style={cursorP} to="/product-details">
            <h3>Bestseller in Cameras Category</h3>
          </LinkContainer>
          <p className="text-white">
            4KCamcorder Video Camera 60FPS 48mb Vlogging Camera for youtube wifi
            16X digital camera
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default ProductCarouselComponent;
