import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import "./SignIn.css";

function SignIn() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [formHeader, setFormHeader] = useState("Sign In");

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
    setFormHeader(isSignUp ? "Sign In" : "Sign Up");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (isSignUp) {
      try {
        const response = await axios.post(
          'http://localhost:5000/createAccounts',
          {
            email,
            password,
            name,
            role,
          }
        );
        console.log(response.data);
  
        // Clear form fields
        setEmail("");
        setPassword("");
        setName("");
        setRole("");
  
        // Switch to sign-in form
        setIsSignUp(false);
      } catch (error) {
        console.log(error);
      }
    } else {
      // Handle sign-in form submission
    }
  };

  return (
    <Container fluid className="h-100">
      <Row className="h-100 align-items-center">
        <Col
          md={6}
          className="d-flex align-items-center justify-content-center bg-white"
          style={{ backgroundColor: "#d4d2d2" }}
        >
          <div className="form-box">
            <Form onSubmit={handleSubmit}>
              <h2>{formHeader}</h2>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </Form.Group>

              {isSignUp && (
                <Form.Group controlId="formBasicName">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                </Form.Group>
              )}

              {isSignUp && (
                <Form.Group controlId="formBasicRole">
                  <Form.Label>Role</Form.Label>
                  <Form.Control
                    as="select"
                    value={role}
                    onChange={(event) => setRole(event.target.value)}
                  >
                    <option value="">-- Select Role --</option>
                    <option value="team leader">Team Leader</option>
                    <option value="developer">Developer</option>
                  </Form.Control>
                </Form.Group>
              )}

              <Button variant="primary" type="submit">
                {formHeader}
              </Button>

              {!isSignUp && (
                <Button variant="secondary" onClick={toggleSignUp}>
                  Sign Up
                </Button>
              )}

              {isSignUp && (
                <Button variant="secondary" onClick={toggleSignUp}>
                  Sign In
                </Button>
              )}
            </Form>
          </div>
        </Col>
        <Col md={6} className="d-none d-md-flex bg-secondary align-items-center Image"></Col>
      </Row>
    </Container>
  );
}

export default SignIn;
