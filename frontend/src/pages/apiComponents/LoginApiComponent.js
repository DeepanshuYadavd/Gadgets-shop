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
import { Link, useNavigate } from "react-router-dom";
const LoginApiComponent = ({
  loginUserAPiRequest,
  setReduxUserState,
  reduxDispatch,
}) => {
  const [validated, setValidated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginUserResponseState, setLoginUserResponseSate] = useState({
    success: "",
    error: "",
    loading: false,
  });
  // const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const form = e.currentTarget.elements;
    const email = form.email.value;
    const password = form.password.value;
    const doNotLogout = form.doNotLogout.checked;
    if (e.currentTarget.checkValidity() === true && email && password) {
      setLoginUserResponseSate({ loading: true });
      loginUserAPiRequest({ email, password, doNotLogout })
        .then((res) => {
          // console.log(res);
          setLoginUserResponseSate({
            success: res.message,
            error: "",
            loading: false,
          });
          if (
            res.message === "logged in Successfully" &&
            !res.loggedUser.isAdmin
          ) {
            window.location.href = "/user";
          } else {
            window.location.href = "/admin/orders";
          }

          // store response to redux:
          if (res.loggedUser) {
            reduxDispatch(setReduxUserState(res.loggedUser));
          }
        })
        .catch((err) =>
          setLoginUserResponseSate({
            error: err.response.data,
          })
        );
    }

    setValidated(true);
  };
  return (
    <Container>
      <Row className="mt-5 justify-content-md-center">
        <Col md={6}>
          <h1>login</h1>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
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
                />
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
            <Form.Group className="mb-3" controlId="FormBasicCheckbox">
              <InputGroup hasValidation>
                <Form.Check
                  name="doNotLogout"
                  type="checkbox"
                  label="Do not logout"
                />
              </InputGroup>
            </Form.Group>
            <Row className="pb-2">
              <Col>
                don't have an account?
                <Link to="/register">register now</Link>
              </Col>
            </Row>
            <Button type="submit" className="mb-2" variant="primary">
              {loginUserResponseState &&
              loginUserResponseState.loading === true ? (
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
                (loginUserResponseState &&
                  loginUserResponseState.error === "wrong credential") ||
                loginUserResponseState.success === "logged in Successfully"
              }
              variant={
                loginUserResponseState.error === "wrong credential"
                  ? "danger"
                  : "success"
              }
              className="mb-2"
            >
              {loginUserResponseState.error === "wrong credential"
                ? "wrong credential"
                : "logged in Successfully"}
            </Alert>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
export default LoginApiComponent;
