import React from "react";
import { Container, Row, Col } from "react-bootstrap";
const footerComponent = () => {
  return (
    <footer className=" w-[100%]">
      <Container fluid>
        <Row>
          <Col className="text-white bg-dark text-center py-4 mt-2">
            copyright &copy; reserved by Deepanshu yadav
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default footerComponent;
