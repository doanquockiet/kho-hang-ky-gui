import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Check if terms are agreed to
    if (!formData.agreeToTerms) {
      setError('You must agree to the terms of service');
      return;
    }

    try {
      // Send registration request to the backend
      const response = await axios.post('http://localhost:8080/api/users/register', {
        email: formData.email,
        password: formData.password,
        username: formData.name,
      });

      // Show success message and redirect to login after a short delay
      setSuccessMessage(response.data.message || 'Registration successful!');
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      // Display error message from server or a generic error
      setError(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <section className="vh-100" style={{ backgroundColor: '#eee' }}>
      <Container className="h-100">
        <Row className="d-flex justify-content-center align-items-center h-100">
          <Col lg={12} xl={11}>
            <Card style={{ borderRadius: '25px' }} className="text-black">
              <Card.Body className="p-md-5">
                <Row className="justify-content-center">
                  <Col md={10} lg={6} xl={5} className="order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {successMessage && <Alert variant="success">{successMessage}</Alert>}

                    <Form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                      <Form.Group className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                        <Form.Control
                          type="text"
                          placeholder="Your Name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>

                      <Form.Group className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <Form.Control
                          type="email"
                          placeholder="Your Email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>

                      <Form.Group className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>

                      <Form.Group className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                        <Form.Control
                          type="password"
                          placeholder="Repeat your password"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>

                      <Form.Group className="form-check d-flex justify-content-center mb-5">
                        <Form.Check
                          type="checkbox"
                          name="agreeToTerms"
                          checked={formData.agreeToTerms}
                          onChange={handleChange}
                          className="me-2"
                          required
                        />
                        <Form.Label>
                          I agree to all statements in <a href="#!">Terms of Service</a>
                        </Form.Label>
                      </Form.Group>

                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <Button type="submit" variant="primary" size="lg">
                          Register
                        </Button>
                      </div>
                    </Form>
                  </Col>
                  <Col md={10} lg={6} xl={7} className="d-flex align-items-center order-1 order-lg-2">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                      className="img-fluid"
                      alt="Sample"
                    />
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default RegisterPage;
