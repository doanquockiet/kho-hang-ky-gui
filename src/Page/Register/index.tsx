import { useState } from "react";
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // URL API Render
  const API_URL = "https://be-exe-cho-do-cu.onrender.com/api/users/register";

  // Handle input changes
  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setLoading(true);

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Mật khẩu không khớp");
      setLoading(false);
      return;
    }

    // Check if terms are agreed to
    if (!formData.agreeToTerms) {
      setError("Bạn cần đồng ý với điều khoản dịch vụ");
      setLoading(false);
      return;
    }

    try {
      // Send registration request to the backend
      const response = await axios.post(
        API_URL,
        {
          email: formData.email,
          password: formData.password,
          username: formData.name,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Show success message and redirect to login after a short delay
      setSuccessMessage(response.data.message || "Đăng ký thành công!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error: any) {
      // Xử lý lỗi cụ thể từ backend hoặc lỗi mạng
      if (error.response) {
        setError(error.response.data.message || "Lỗi đăng ký");
      } else if (error.request) {
        setError("Không thể kết nối đến server. Vui lòng thử lại!");
      } else {
        setError("Đã xảy ra lỗi không xác định");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="vh-100" style={{ backgroundColor: "#eee" }}>
      <Container className="h-100">
        <Row className="d-flex justify-content-center align-items-center h-100">
          <Col lg={12} xl={11}>
            <Card style={{ borderRadius: "25px" }} className="text-black">
              <Card.Body className="p-md-5">
                <Row className="justify-content-center">
                  <Col md={10} lg={6} xl={5} className="order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Đăng ký</p>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {successMessage && <Alert variant="success">{successMessage}</Alert>}

                    <Form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                      <Form.Group className="mb-4">
                        <Form.Label>Họ và Tên</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Nhập tên của bạn"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>

                      <Form.Group className="mb-4">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Nhập email của bạn"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>

                      <Form.Group className="mb-4">
                        <Form.Label>Mật khẩu</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Nhập mật khẩu"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>

                      <Form.Group className="mb-4">
                        <Form.Label>Nhập lại mật khẩu</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Nhập lại mật khẩu"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>

                      <Form.Group className="mb-4 form-check">
                        <Form.Check
                          type="checkbox"
                          name="agreeToTerms"
                          checked={formData.agreeToTerms}
                          onChange={handleChange}
                          required
                        />
                        <Form.Label className="ms-2">
                          Tôi đồng ý với <a href="#!">Điều khoản Dịch vụ</a>
                        </Form.Label>
                      </Form.Group>

                      <div className="d-flex justify-content-center">
                        <Button type="submit" variant="primary" size="lg" disabled={loading}>
                          {loading ? <Spinner animation="border" size="sm" /> : "Đăng ký"}
                        </Button>
                      </div>
                    </Form>
                  </Col>
                  <Col md={10} lg={6} xl={7} className="d-flex align-items-center order-1 order-lg-2">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                      className="img-fluid"
                      alt="Hình minh họa"
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
