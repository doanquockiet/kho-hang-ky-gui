// ResetPassword.tsx

import React, { useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import "./LoginForm.css";

// -----------------------------
// Styled Components
// -----------------------------

// Container: Holds the entire UI of the Reset Password page
const Container = styled.div`
  background: #f6f5f7; /* Background color */
  display: flex; /* Use Flexbox */
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  flex-direction: column; /* Stack elements vertically */
  font-family: "Montserrat", sans-serif; /* Font family */
  background: url("../../assets/8.jpg") no-repeat; /* Background image without repeat */
  background-size: cover; /* Cover the entire container */
  background-position: center; /* Center the background image */
  height: 100vh; /* Full viewport height */
`;

// Card: Contains the main content of the form
const Card = styled.div`
  background: #ffffff; /* White background */
  border-radius: 12px; /* Rounded corners */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); /* Shadow effect */
  padding: 40px; /* Inner padding */
  max-width: 500px; /* Maximum width */
  width: 100%; /* Full width */
  text-align: center; /* Center text */
`;

// Title: Heading of the form
const Title = styled.h2`
  margin-bottom: 20px; /* Bottom margin */
  font-size: 24px; /* Font size */
  color: #333; /* Text color */
`;

// InputGroup: Wrapper for input fields and their icons
const InputGroup = styled.div`
  position: relative; /* Relative positioning for the icon */
  margin-bottom: 20px; /* Bottom margin */
`;

// InputIcon: Holds the icon inside the input field
const InputIcon = styled.div`
  position: absolute; /* Absolute positioning */
  top: 50%; /* Vertically center */
  left: 15px; /* Left padding */
  transform: translateY(-50%); /* Adjust for vertical centering */
  color: #888; /* Icon color */
`;

// Input: Styled input field
const Input = styled.input`
  width: 100%; /* Full width */
  padding: 12px 15px 12px 40px; /* Padding with space for the icon */
  border-radius: 8px; /* Rounded corners */
  border: 1px solid #ddd; /* Border color */
  background-color: #f9f9f9; /* Background color */
  font-size: 16px; /* Font size */
  outline: none; /* Remove default outline */

  &:focus {
    border-color: #555; /* Border color on focus */
  }
`;

// Button: Styled submit button
const Button = styled.button`
  width: 100%; /* Full width */
  padding: 15px; /* Padding */
  border-radius: 8px; /* Rounded corners */
  border: none; /* No border */
  background-color: #ff4b2b; /* Background color */
  color: #fff; /* Text color */
  font-size: 16px; /* Font size */
  cursor: pointer; /* Pointer cursor on hover */
  transition: background-color 0.3s ease; /* Transition effect */

  &:hover {
    background-color: #e64327; /* Darker background on hover */
  }

  &:disabled {
    background-color: #ccc; /* Disabled background color */
    cursor: not-allowed; /* Not-allowed cursor */
  }
`;

// StyledLink: Styled anchor link to navigate back
const StyledLink = styled.a`
  display: block; /* Block display */
  margin-top: 20px; /* Top margin */
  font-size: 14px; /* Font size */
  color: #555; /* Text color */
  text-decoration: none; /* No underline */

  &:hover {
    text-decoration: underline; /* Underline on hover */
  }
`;

// ErrorMessage: Displays error messages
const ErrorMessage = styled.p`
  color: #e74c3c; /* Red color */
  font-size: 14px; /* Font size */
  margin-top: 10px; /* Top margin */
`;

// -----------------------------
// Type Definitions
// -----------------------------

// Define the possible states for the form
type Status = "idle" | "submit" | "success" | "fail";

// -----------------------------
// ResetPassword Component
// -----------------------------

const ResetPassword: React.FC = () => {
  // State variables with type annotations
  const [phone, setPhone] = useState<string>(""); // Phone number
  const [status, setStatus] = useState<Status>("idle"); // Form submission status
  const [error, setError] = useState<string | null>(null); // Error message
  const [disableSend, setDisableSend] = useState<boolean>(false); // Disable send button
  const navigate = useNavigate(); // Navigation hook

  // Function to send reset link to the server
  const sendResetLink = async (phone: string): Promise<string> => {
    try {
      const fullPhoneNumber = `+84${phone}`;
      const response = await fetch("http://localhost:8080/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone: fullPhoneNumber }),
      });

      if (!response.ok) {
        // Attempt to parse JSON error response
        let errorData: unknown;
        try {
          errorData = await response.json();
        } catch {
          errorData = await response.text();
        }

        // Extract error message
        let errorMessage: string;
        if (typeof errorData === "object" && errorData !== null && "message" in errorData) {
          errorMessage = (errorData as { message: string }).message;
        } else if (typeof errorData === "string") {
          errorMessage = errorData;
        } else {
          errorMessage = "Failed to send reset link";
        }

        console.error("Error Response:", errorMessage);
        throw new Error(errorMessage);
      }

      const data = await response.json();
      return data.message || "Reset link sent successfully";
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error:", error.message);
        throw new Error(error.message || "An unexpected error occurred");
      } else {
        console.error("Unexpected error:", error);
        throw new Error("An unexpected error occurred");
      }
    }
  };

  // Handler for form submission
  const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submit");
    setError(null); // Reset previous errors

    try {
      const successMessage = await sendResetLink(phone);
      setStatus("success");
      alert(successMessage);

      setDisableSend(true); // Disable send button
      setTimeout(() => {
        setDisableSend(false); // Re-enable after 5 seconds
      }, 5000);
    } catch (err: unknown) {
      setStatus("fail");

      if (err instanceof Error) {
        setError(err.message);
        alert(err.message);
      } else {
        setError("Password reset failed to send");
        alert("Password reset failed to send");
      }

      setPhone(""); // Clear phone input
    }
  };

  // Handler for phone input change
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, ""); // Remove non-digit characters
    if (input.length <= 9) {
      setPhone(input);
    }
  };

  return (
    <Container>
      <Card>
        <Title>Forgot Password</Title>
        <form onSubmit={handleForgotPassword}>
          <InputGroup>
            <InputIcon>
              <FaPhoneAlt />
            </InputIcon>
            <Input
              type="tel"
              pattern="\d{9}"
              title="Phone Number format is 9 digits after +84"
              placeholder="+84 Phone number"
              value={phone}
              onChange={handlePhoneChange}
              required
            />
          </InputGroup>
          <Button disabled={status === "submit" || disableSend} type="submit">
            {status === "submit" ? "Sending..." : "Send Reset Phone"}
          </Button>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <StyledLink href="#" onClick={() => navigate("/login")}>
            Back to Sign In
          </StyledLink>
        </form>
      </Card>
    </Container>
  );
};

export default ResetPassword;
