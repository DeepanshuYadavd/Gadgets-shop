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
import { useState, useEffect } from "react";

// component:
const ProfilePageComponent = ({
  updateProfileApiRequest,
  fetchUser,
  userInfo,
  reduxDispatch,
  setReduxUserState,
}) => {
  const [validated, setValidated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [updateProfileResponse, setUpdateProfileResponse] = useState({
    success: "",
    error: "",
  });
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [user, setUser] = useState({});
  // fetch profile data:
  useEffect(() => {
    userInfo
      ? fetchUser(userInfo._id)
          .then((res) => {
            setUser(res);
          })
          .catch((err) => {
            console.log(err);
          })
      : null;
  }, []);
  // both password should same:
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
  // form submit to update profile:
  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const form = e.currentTarget;
    const formElements = e.currentTarget.elements;

    // values of each input:
    const firstName = formElements.firstName.value;
    const lastName = formElements.lastName.value;
    const phoneNumber = formElements.phoneNumber.value;
    const address = formElements.address.value;
    const country = formElements.country.value;
    const zipCode = formElements.zipCode.value;
    const city = formElements.city.value;
    const state = formElements.state.value;
    const password = formElements.password.value;

    if (
      form.checkValidity() === true &&
      formElements.password.value === formElements.ConfirmPassword.value
    ) {
      updateProfileApiRequest({
        firstName,
        lastName,
        phoneNumber,
        address,
        country,
        zipCode,
        city,
        state,
        password,
      })
        .then((res) => {
          if (res.success) {
            setUpdateProfileResponse({ success: res.success, error: "" });
            reduxDispatch(setReduxUserState(res.updatedUser));
            sessionStorage.setItem("userInfo", JSON.stringify(res.updatedUser));
          }
        })
        .catch((err) => {
          setUpdateProfileResponse({ error: err.response.data });
        });
    }

    setValidated(true);
  };

  return (
    <Container>
      <Row className="mt-5 justify-content-md-center">
        <Col md={6}>
          <h1>USER PROFILE</h1>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="FormBasicFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                required
                type="text"
                defaultValue={user.firstName}
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
                defaultValue={user.lastName}
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
                  disabled
                  value={
                    user.email +
                    "  (if you want to change the email,remove account and create new one with  new email address)"
                  }
                />
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3" controlId="FormBasicPhone">
              <Form.Label>Phone Number</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="text"
                  placeholder="Enter your phone number"
                  defaultValue={user.phoneNumber}
                  name="phoneNumber"
                />
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3" controlId="FormBasicAddress">
              <Form.Label>Address</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="text"
                  placeholder="Enter your street name and house number"
                  defaultValue={user.address}
                  name="address"
                />
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3" controlId="FormBasicCountry">
              <Form.Label>Country</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="text"
                  placeholder="Enter your country"
                  defaultValue={user.country}
                  name="country"
                />
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3" controlId="FormBasicZip">
              <Form.Label>Zip code</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="text"
                  placeholder="Enter your zip code"
                  defaultValue={user.zipCode}
                  name="zipCode"
                />
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3" controlId="FormBasicCity">
              <Form.Label>City</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="text"
                  placeholder="Enter your city"
                  defaultValue={user.city}
                  name="city"
                />
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3" controlId="FormBasicState">
              <Form.Label>State</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="text"
                  placeholder="Enter your state"
                  defaultValue={user.state}
                  name="state"
                />
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
                  onChange={onChange}
                  isInvalid={!passwordMatch}
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
                  onChange={onChange}
                  isInvalid={!passwordMatch}
                />
                <Form.Control.Feedback type="invalid">
                  Both password should be match
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Button variant="primary" type="submit" className="mb-2">
              Submit
            </Button>
            <Alert
              show={
                (updateProfileResponse && updateProfileResponse.success) ||
                updateProfileResponse.error
                  ? true
                  : false
              }
              variant={updateProfileResponse.error ? "danger" : "info"}
              className="mb-2"
            >
              {updateProfileResponse.error
                ? updateProfileResponse.error
                : updateProfileResponse.success}
            </Alert>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePageComponent;
