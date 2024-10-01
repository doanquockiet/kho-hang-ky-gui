import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

// Định nghĩa các thành phần styled-component cho giao diện người dùng

// Container: Thành phần chứa toàn bộ giao diện của trang đăng nhập/đăng ký
const Container = styled.div`
  background: #f6f5f7; /* Màu nền */
  display: flex; /* Sử dụng Flexbox */
  justify-content: center; /* Căn giữa theo chiều ngang */
  align-items: center; /* Căn giữa theo chiều dọc */
  flex-direction: column; /* Sắp xếp các phần tử theo cột */
  font-family: "Montserrat", sans-serif; /* Font chữ Montserrat */
  background: url("../../assets/8.jpg") no-repeat; /* Ảnh nền không lặp lại */
  background-size: cover; /* Ảnh nền bao phủ toàn bộ container */
  background-position: center; /* Căn giữa ảnh nền */
  height: 100vh; /* Chiều cao 100% chiều cao viewport */
`;

// Card: Thành phần chứa các nội dung chính của form đăng nhập/đăng ký
const Card = styled.div`
  background: #ffffff; /* Màu nền trắng */
  border-radius: 12px; /* Bo góc 12px */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); /* Hiệu ứng đổ bóng */
  padding: 40px; /* Khoảng đệm bên trong 40px */
  max-width: 400px; /* Chiều rộng tối đa 400px */
  width: 100%; /* Chiều rộng 100% */
  text-align: center; /* Căn giữa nội dung */
`;

// Title: Thành phần tiêu đề
const Title = styled.h2`
  margin-bottom: 20px; /* Khoảng cách dưới 20px */
  font-size: 24px; /* Kích thước chữ 24px */
  color: #333; /* Màu chữ */
`;

// InputGroup: Thành phần bao bọc các ô nhập liệu
const InputGroup = styled.div`
  position: relative; /* Đặt vị trí tương đối */
  margin-bottom: 20px; /* Khoảng cách dưới 20px */
`;

// Input: Thành phần ô nhập liệu
const Input = styled.input`
  width: 100%; /* Chiều rộng 100% */
  padding: 12px 15px; /* Khoảng đệm 12px trên dưới, 15px trái phải */
  border-radius: 8px; /* Bo góc 8px */
  border: 1px solid #ddd; /* Đường viền màu xám nhạt */
  background-color: #f9f9f9; /* Màu nền */
  font-size: 16px; /* Kích thước chữ 16px */
  outline: none; /* Bỏ viền khi focus */
  text-align: center; /* Căn giữa chữ */
  letter-spacing: 5px; /* Khoảng cách giữa các chữ cái 5px */

  &:focus {
    border-color: #555; /* Đổi màu viền khi focus */
  }
`;

// Button: Thành phần nút bấm
const Button = styled.button`
  width: 100%; /* Chiều rộng 100% */
  padding: 15px; /* Khoảng đệm 15px */
  border-radius: 8px; /* Bo góc 8px */
  border: none; /* Không có đường viền */
  background-color: #ff4b2b; /* Màu nền đỏ */
  color: #fff; /* Màu chữ trắng */
  font-size: 16px; /* Kích thước chữ 16px */
  cursor: pointer; /* Con trỏ chuột dạng bàn tay */
  transition: background-color 0.3s ease; /* Hiệu ứng chuyển đổi màu nền */

  &:hover {
    background-color: #e64327; /* Đổi màu nền khi hover */
  }

  &:disabled {
    background-color: #ccc; /* Màu nền khi bị disable */
    cursor: not-allowed; /* Con trỏ chuột không cho phép */
  }
`;

// ErrorMessage: Thành phần hiển thị thông báo lỗi
const ErrorMessage = styled.p`
  color: #e74c3c; /* Màu chữ đỏ */
  font-size: 14px; /* Kích thước chữ 14px */
  margin-top: 10px; /* Khoảng cách trên 10px */
`;

// Xác định kiểu cho trạng thái "status"
type Status = "idle" | "submit" | "success" | "fail";

// Component xác minh OTP
const OtpVerification: React.FC = () => {
  const [otp, setOtp] = useState<string>(""); // State lưu mã OTP
  const [status, setStatus] = useState<Status>("idle"); // State lưu trạng thái xử lý
  const [error, setError] = useState<string | null>(null); // State lưu lỗi
  const navigate = useNavigate(); // Hook để điều hướng

  // Hàm xử lý xác minh OTP
  const handleVerifyOtp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Kiểm tra định dạng OTP
    if (!/^\d{6}$/.test(otp)) {
      alert("Invalid OTP format. Please enter a 6-digit number.");
      return;
    }

    setStatus("submit"); // Đặt trạng thái xử lý là submit
    try {
      // Gửi yêu cầu xác minh OTP đến server
      const response = await fetch("http://localhost:8080/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otp }), // Đảm bảo 'otp' được định nghĩa chính xác
      });

      // Xử lý phản hồi từ server
      if (response.ok) {
        setStatus("success");
        alert("OTP verified successfully");

        setOtp("");
        navigate("/login"); // Điều hướng về trang đăng nhập
      } else {
        const errorMessage = await response.text();
        setOtp("");
        setStatus("fail");
        setError(errorMessage || "OTP verification failed. Please check your OTP.");
        alert(errorMessage || "OTP verification failed. Please check your OTP.");
      }
    } catch (error) {
      console.error("Network error:", error);
      setStatus("fail");
      setError("Network error. Please try again.");
      alert("Network error. Please try again.");
    }
  };

  return (
    <Container>
      <Card>
        <Title>Verify OTP</Title>
        <form onSubmit={handleVerifyOtp}>
          <InputGroup>
            <Input
              type="text"
              pattern="\d{6}"
              title="Enter 6-digit OTP"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </InputGroup>
          <Button type="submit" disabled={status === "submit"}>
            Verify OTP
          </Button>
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </form>
      </Card>
    </Container>
  );
};

export default OtpVerification;
