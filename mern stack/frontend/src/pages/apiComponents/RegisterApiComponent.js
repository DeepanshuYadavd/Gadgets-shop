import React from "react";
import {
  Container,
  Row,
  Col,
  Form,
  InputGroup,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
// component:
const RegisterApiComponent = ({
  registerUserApiRequest,
  setReduxUserState,
  reduxDispatch,
}) => {
  const [validated, setValidated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [registerUserState, setRegisterUserState] = useState({
    success: "",
    error: "",
    loading: false,
  });
  // both password should match:
  const onChange = () => {
    const password = document.querySelector("input[name=password]");
    const ConfirmPassword = document.querySelector(
      "input[name=ConfirmPassword]"
    );
    if (password.value === ConfirmPassword.value) {
      setPasswordMatch(true);
    } else {
      setPasswordMatch(false);
    }
  };

  // form submit :
  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setRegisterUserState({ success: "", error: " ", loading: true });
    const form = e.currentTarget;
    const formElement = e.currentTarget.elements;
    const firstName = formElement.firstName.value;
    const lastName = formElement.lastName.value;
    const email = formElement.email.value;
    const password = formElement.password.value;

    if (
      form.checkValidity() === true &&
      firstName &&
      lastName &&
      email &&
      password
    ) {
      registerUserApiRequest({ firstName, lastName, email, password })
        .then((res) => {
          if (res.message === "user created") {
            setRegisterUserState({
              success: res.message,
              error: "",
              loading: false,
            });
            reduxDispatch(setReduxUserState(res.createdUser));
            window.location.href = "/user";
          }
        })
        .catch((err) => {
          setRegisterUserState({ error: err.response.data });
          console.log(err.response.data);
        });
    }

    setValidated(true);
  };

  return (
    <Container>
      <Row className="mt-5 justify-content-md-center">
        <Col md={6}>
          <h1>Register</h1>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="FormBasicFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter Your first Name"
                name="firstName"
              />
              <Form.Control.Feedback type="invalid">
                please enter your first name
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="FormBasicSecondName">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter your last name"
                name="lastName"
              />
              <Form.Control.Feedback type="invalid">
                please enter your last name
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="FormBasicEmail">
              <Form.Label>Email address</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  required
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="email"
                />
                <Form.Control.Feedback type="invalid">
                  enter valid email address
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3" controlId="FormBasicPassword">
              <Form.Label>Password</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  required
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  // minLength={6}
                  onChange={onChange}
                  // isInvalid={!passwordMatch}
                />
                <Form.Control.Feedback type="invalid">
                  please enter valid password
                </Form.Control.Feedback>
                {showPassword ? (
                  <i
                    className="bi bi-eye-slash-fill"
                    style={{
                      fontSize: "1.5rem",
                      position: "absolute",
                      right: "1rem",
                      zIndex: "5",
                    }}
                    onClick={() => setShowPassword(false)}
                  ></i>
                ) : (
                  <i
                    className="bi bi-eye-fill"
                    style={{
                      fontSize: "1.5rem",
                      position: "absolute",
                      right: "1rem",
                      zIndex: "5",
                    }}
                    onClick={() => setShowPassword(true)}
                  ></i>
                )}
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3" controlId="FormBasicPasswordRepeat">
              <Form.Label>Confirm Password</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  required
                  name="ConfirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  // minLength={6}
                  onChange={onChange}
                  isInvalid={!passwordMatch}
                />
                <Form.Control.Feedback type="invalid">
                  Both password should be match
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Row className="pb-2">
              <Col>
                Already have an account?
                <Link to="/login">login</Link>
              </Col>
            </Row>
            <Button type="submit" className="mb-2">
              {registerUserState && registerUserState.loading ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : (
                ""
              )}{" "}
              Submit
            </Button>
            <Alert
              show={
                registerUserState.success || registerUserState.error
                  ? true
                  : false
              }
              variant={registerUserState.error ? "danger" : "info"}
              className="mb-2"
            >
              {registerUserState.error
                ? registerUserState.error
                : registerUserState.success}
            </Alert>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterApiComponent;
