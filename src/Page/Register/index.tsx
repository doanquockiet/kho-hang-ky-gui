"use client"

import { useState } from "react"
import { Container, Row, Col, Form, Button, Alert, Spinner } from "react-bootstrap"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import "./register-page.css"

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  })
  const [error, setError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  // URL API Render
  const API_URL = "https://be-exe-cho-do-cu.onrender.com/api/users/register"

  // Handle input changes
  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  // Handle form submission
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setError("")
    setSuccessMessage("")
    setLoading(true)

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Mật khẩu không khớp")
      setLoading(false)
      return
    }

    // Check if terms are agreed to
    if (!formData.agreeToTerms) {
      setError("Bạn cần đồng ý với điều khoản dịch vụ")
      setLoading(false)
      return
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
        },
      )

      // Show success message and redirect to login after a short delay
      setSuccessMessage(response.data.message || "Đăng ký thành công!")
      setTimeout(() => navigate("/login"), 2000)
    } catch (error: any) {
      // Xử lý lỗi cụ thể từ backend hoặc lỗi mạng
      if (error.response) {
        setError(error.response.data.message || "Lỗi đăng ký")
      } else if (error.request) {
        setError("Không thể kết nối đến server. Vui lòng thử lại!")
      } else {
        setError("Đã xảy ra lỗi không xác định")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="register-page">
      <Container>
        <div className="register-card">
          <div className="register-header">
            <h1>Tạo tài khoản mới</h1>
            <p>Đăng ký để trải nghiệm dịch vụ của chúng tôi</p>
          </div>

          {error && (
            <Alert variant="danger" className="register-alert">
              {error}
            </Alert>
          )}
          {successMessage && (
            <Alert variant="success" className="register-alert">
              {successMessage}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Row>
              <Col xs={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Họ và Tên</Form.Label>
                  <div className="input-with-icon">
                    <i className="bi bi-person-fill"></i>
                    <Form.Control
                      type="text"
                      placeholder="Nhập tên của bạn"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </Form.Group>
              </Col>

              <Col xs={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <div className="input-with-icon">
                    <i className="bi bi-envelope-fill"></i>
                    <Form.Control
                      type="email"
                      placeholder="Nhập email của bạn"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </Form.Group>
              </Col>

              <Col xs={12} md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Mật khẩu</Form.Label>
                  <div className="input-with-icon">
                    <i className="bi bi-lock-fill"></i>
                    <Form.Control
                      type="password"
                      placeholder="Nhập mật khẩu"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </Form.Group>
              </Col>

              <Col xs={12} md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Xác nhận mật khẩu</Form.Label>
                  <div className="input-with-icon">
                    <i className="bi bi-lock-fill"></i>
                    <Form.Control
                      type="password"
                      placeholder="Nhập lại mật khẩu"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </Form.Group>
              </Col>

              <Col xs={12}>
                <Form.Group className="mb-4 terms-checkbox">
                  <Form.Check
                    type="checkbox"
                    id="terms-checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                    required
                  />
                  <Form.Label htmlFor="terms-checkbox">
                    Tôi đồng ý với <a href="#!">Điều khoản Dịch vụ</a> và <a href="#!">Chính sách Bảo mật</a>
                  </Form.Label>
                </Form.Group>
              </Col>

              <Col xs={12}>
                <Button type="submit" className="register-button" disabled={loading}>
                  {loading ? (
                    <>
                      <Spinner animation="border" size="sm" />
                      <span className="ms-2">Đang xử lý...</span>
                    </>
                  ) : (
                    "Đăng ký ngay"
                  )}
                </Button>
              </Col>
            </Row>
          </Form>

          <div className="register-footer">
            <p>
              Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
            </p>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default RegisterPage

