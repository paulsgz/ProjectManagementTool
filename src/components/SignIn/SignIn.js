import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import signIn from "../../images/signIn.png";
import logo from "../../images/logo.png";
import "./SignIn.css";

function SignIn() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [formHeader, setFormHeader] = useState("Sign In");

  const navigate = useNavigate();

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
    setFormHeader(isSignUp ? "Sign In" : "Sign Up");
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await axios.post(
        isSignUp ? 'http://localhost:5000/createAccounts' : 'http://localhost:5000/login',
        {
          email,
          password,
          name,
          role,
        }
      );

      // Pass the user data to the App component
    // Store the user data in session storage
    sessionStorage.setItem('user', JSON.stringify(response.data));

    // Redirect to the App component
    navigate("/app");
  
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container className="h-100 signIn">
      <Row className="h-100 align-items-center">
      
        <Col
          md={6}
          className="d-flex align-items-center justify-content-center leftPage"
          style={{
            backgroundColor: "#eff0f1",
            borderRadius: "5px",
            boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.5)",
            padding: "1.5rem",
            maxWidth: "600px",
            margin: "0 auto",
            minWidth: "300px",
          }}
        >
           <Col xs={12} className="header">
              <img src = {logo} className="img-fluid"/>
              <h2 className="welcomeTo">Welcome to your <br />Project Management Tool</h2>
           </Col>
          <div className="formBox">
          <Form onSubmit={handleSubmit} style={{ width: "100%" }} className="signUpForm">
            <h1 style={{ marginBottom: "30px" } }>{formHeader}</h1>
            <Form.Group controlId="formBasicEmail" className="FormGroup">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="FormControl"
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="FormGroup">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="FormControl"
              />
            </Form.Group>

            {isSignUp && (
              <Form.Group controlId="formBasicName" className="FormGroup">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="FormControl"
                />
              </Form.Group>
            )}

            {isSignUp && (
              <Form.Group controlId="formBasicRole" className="FormGroup">
                <Form.Label>Role</Form.Label>
                <Form.Control
                  as="select"
                  value={role}
                  onChange={(event) => setRole(event.target.value)}
                  className="FormControl"
                >
                  <option value="">-- Select Role --</option>
                  <option value="team leader">Team Leader</option>
                  <option value="developer">Developer</option>
                </Form.Control>
              </Form.Group>
            )}

            <Button variant="primary" type="submit" className="Button primaryButton">
              {formHeader}
            </Button>

            {!isSignUp && (
              <Button variant="light" onClick={toggleSignUp} className="Button secondaryButton">
                Join now
              </Button>
            )}

            {isSignUp && (
              <Button variant="light" onClick={toggleSignUp} className="Button secondaryButton">
                Sign In
              </Button>
            )}

          </Form>
          </div>
        </Col>
        <Col md={6} className="d-none d-md-flex bg-secondary">
          <img src ={signIn} className="img-fluid" alt="Responsive image"/>
        </Col>
      </Row>
    </Container>
  );

}

export default SignIn;
