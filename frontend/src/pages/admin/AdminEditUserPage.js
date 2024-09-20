import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
const AdminEditUserPage = () => {
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
          <Link to="/admin/user" className="btn btn-info my-3">
            Go back
          </Link>
        </Col>
        <Col md={7}>
          <h1>Edit user</h1>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                required
                name="firstName"
                type="text"
                defaultValue="deepanshu"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                required
                name="lastName"
                type="text"
                defaultValue="yadav"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                name="email"
                type="email"
                defaultValue="test@gmail.com"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicIsAdmin">
              <Form.Check
                required
                name="isadmin"
                type="checkbox"
                label="IsAdmin"
              />
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
export default AdminEditUserPage;
