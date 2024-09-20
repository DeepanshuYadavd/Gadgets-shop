import {
  Container,
  Row,
  Col,
  Form,
  Button,
  CloseButton,
  Table,
  Alert,
  Image,
} from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
const AdminEditProductPage = () => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };
  return (
    <Container>
      <Row className="mt-5 justify-content-md-center">
        <Col md={2}>
          <Link to="/admin/products" className="btn btn-info my-3">
            Go back
          </Link>
        </Col>
        <Col md={7}>
          <h1>Edit product</h1>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                name="name"
                type="text"
                defaultValue="panasonic"
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="examplleForm.ControlTextarea1"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control
                required
                name="description"
                as="textarea"
                rows={3}
                defaultValue="Product description"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCount">
              <Form.Label>Count in stock</Form.Label>
              <Form.Control
                required
                name="count"
                type="number"
                defaultValue="2"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                required
                name="price"
                type="text"
                defaultValue="$210"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCategory">
              <Form.Label>Category</Form.Label>

              <Form.Select
                aria-label="Default select example"
                required
                name="category"
              >
                <option>Choose category</option>
                <option value="1">Laptops</option>
                <option value="2">TV</option>
                <option value="3">Games</option>
              </Form.Select>
            </Form.Group>
            <Row className="mt-5">
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicAttribute">
                  <Form.Label>Choose attribute and set value</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    required
                    name="attrKey"
                  >
                    <option>Choose attribute</option>
                    <option value="red">colors</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group
                  className="mb-3"
                  controlId="formBasicAttributeValue"
                >
                  <Form.Label>Attribute value</Form.Label>

                  <Form.Select
                    aria-label="Default select example"
                    required
                    name="attrKey"
                  >
                    <option>Choose attribute value</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Table hover>
                <thead>
                  <tr>
                    <th>Attribute</th>
                    <th>Value</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>attr key</td>
                    <td>attr value</td>
                    <td>
                      <CloseButton />
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicNewAttribute">
                  <Form.Label>Create new attribute</Form.Label>
                  <Form.Control
                    disabled={false}
                    placeholder="first choose or create category"
                    type="text"
                    name="newAttrValue"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                {" "}
                <Form.Group
                  className="mb-3"
                  controlId="formBasicNewAttributeValue"
                >
                  <Form.Label>Attribute Value</Form.Label>
                  <Form.Control
                    disabled={false}
                    placeholder="first choose or create category"
                    type="text"
                    name="newAttrValue"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Alert variant="primary">
              After typing attribute key and value press enter on one of the
              field
            </Alert>
            <Form.Group className="mb-3 mt-3" controlId="formFileMultiple">
              <Form.Label>Images</Form.Label>
              <Row>
                <Col xs={3} style={{ position: "relative" }}>
                  <Image src="../images/cards/monitors-category.png" fluid />
                  <i
                    style={{
                      cursor: "pointer",
                      position: "absolute",
                      zIndex: "2",
                      top: "0",
                      transform: "scale(2.1)",
                    }}
                    className="bi bi-x text-white"
                  ></i>
                </Col>
                <Col xs={3} style={{ position: "relative" }}>
                  <Image src="../images/cards/monitors-category.png" fluid />
                  <i
                    style={{
                      cursor: "pointer",
                      position: "absolute",
                      zIndex: "2",
                      top: "0",
                      transform: "scale(2.1)",
                    }}
                    className="bi bi-x text-white"
                  ></i>
                </Col>
              </Row>
              <Form.Control required type="file" multiple />
            </Form.Group>
            <Button variant="primary" type="submit">
           Update
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
export default AdminEditProductPage;
