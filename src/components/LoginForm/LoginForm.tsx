import  {  useState } from "react";
import styled from "styled-components";
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

import { useNavigate } from "react-router-dom";
import {
  FaLockOpen,
  FaEye,
  FaEyeSlash,
  FaUser,
  FaLock,
  FaEnvelope,
  FaHome,
  FaPhoneAlt,
} from "react-icons/fa";
import * as Components from "./LoginForm";
import "./LoginForm.css";



// Container: Thành phần chứa toàn bộ form đăng nhập và đăng ký
export const Container = styled.div`
  background-color: #fff; /* Màu nền trắng */
  border-radius: 10px; /* Bo góc 10px */
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22); /* Hiệu ứng đổ bóng */
  position: relative; /* Đặt vị trí tương đối */
  width: 890px; /* Chiều rộng 890px */
  max-width: 100%; /* Chiều rộng tối đa 100% */
  min-height: 590px; /* Chiều cao tối thiểu 590px */
`;

// SignUpContainer: Thành phần chứa form đăng ký
export const SignUpContainer = styled.div<SignInProps>`
  position: absolute; /* Đặt vị trí tuyệt đối */
  top: 0; /* Vị trí trên cùng */
  height: 100%; /* Chiều cao 100% */
  transition: all 0.6s ease-in-out; /* Hiệu ứng chuyển đổi */
  left: 0; /* Căn trái */
  width: 50%; /* Chiều rộng 50% */
  opacity: 0; /* Độ mờ ban đầu là 0 */
  z-index: 1; /* Độ ưu tiên z-index */
  ${(props) =>
    props.signinIn !== true
      ? `
   transform: translateX(100%); /* Dịch chuyển theo trục X */
   opacity: 1; /* Độ mờ 1 */
   z-index: 5; /* Độ ưu tiên z-index 5 */
 `
      : null}
`;

// SignInContainer: Thành phần chứa form đăng nhập
export const SignInContainer = styled.div<SignInProps>`
  position: absolute; /* Đặt vị trí tuyệt đối */
  top: 0; /* Vị trí trên cùng */
  height: 100%; /* Chiều cao 100% */
  transition: all 0.6s ease-in-out; /* Hiệu ứng chuyển đổi */
  left: 0; /* Căn trái */
  width: 50%; /* Chiều rộng 50% */
  z-index: 2; /* Độ ưu tiên z-index */
  ${(props) =>
    props.signinIn !== true ? `transform: translateX(100%);` : null} /* Kiểm tra trạng thái đăng nhập */
`;

// Form: Thành phần chứa form đăng ký và đăng nhập
export const Form = styled.form`
  background-color: #ffffff; /* Màu nền trắng */
  display: flex; /* Sử dụng Flexbox */
  align-items: center; /* Căn giữa theo chiều dọc */
  justify-content: center; /* Căn giữa theo chiều ngang */
  flex-direction: column; /* Sắp xếp theo cột */
  padding: 0 50px; /* Khoảng đệm */
  height: 100%; /* Chiều cao 100% */
  text-align: center; /* Căn giữa chữ */
`;

// Title: Thành phần tiêu đề
export const Title = styled.h1`
  font-weight: bold; /* Độ đậm chữ */
  margin: 0; /* Không có khoảng cách */
`;

// InputWrapper: Thành phần bao bọc các ô nhập liệu
export const InputWrapper = styled.div`
  position: relative; /* Đặt vị trí tương đối */
  width: 100%; /* Chiều rộng 100% */
`;

// IconWrapper: Thành phần bao bọc các biểu tượng
export const IconWrapper = styled.div`
  position: absolute; /* Đặt vị trí tuyệt đối */
  top: 50%; /* Vị trí 50% từ trên xuống */
  left: 10px; /* Căn trái 10px */
  transform: translateY(-50%); /* Dịch chuyển theo trục Y */
  pointer-events: none; /* Không cho phép tương tác chuột */
`;

// Input: Thành phần ô nhập liệu
export const Input = styled.input`
  background-color: #eee; /* Màu nền */
  border: none; /* Không có đường viền */
  padding: 12px 15px 12px 35px; /* Khoảng đệm */
  margin: 8px 0; /* Khoảng cách trên và dưới */
  width: 100%; /* Chiều rộng 100% */
`;

// EyeIcon: Thành phần biểu tượng mắt
export const EyeIcon = styled.div`
  position: absolute; /* Đặt vị trí tuyệt đối */
  top: 50%; /* Vị trí 50% từ trên xuống */
  right: 10px; /* Căn phải 10px */
  transform: translateY(-50%); /* Dịch chuyển theo trục Y */
  cursor: pointer; /* Con trỏ chuột */
  pointer-events: all; /* Cho phép tương tác chuột */
`;

// Button: Thành phần nút bấm
export const Button = styled.button`
  border-radius: 20px; /* Bo góc */
  border: 1px solid #ff4b2b; /* Đường viền */
  background-color: #ff4b2b; /* Màu nền */
  color: #ffffff; /* Màu chữ */
  font-size: 12px; /* Kích thước chữ */
  font-weight: bold; /* Độ đậm chữ */
  padding: 12px 45px; /* Khoảng đệm */
  letter-spacing: 1px; /* Khoảng cách giữa các chữ */
  text-transform: uppercase; /* Viết hoa tất cả các chữ */
  transition: transform 80ms ease-in; /* Hiệu ứng chuyển đổi */
  &:active {
    transform: scale(0.95); /* Thu nhỏ khi bấm */
  }
  &:focus {
    outline: none; /* Bỏ viền khi focus */
  }
`;

// GhostButton: Thành phần nút bấm không nền
export const GhostButton = styled(Button)`
  background-color: transparent; /* Nền trong suốt */
  border-color: #ffffff; /* Màu viền trắng */
`;

// Anchor: Thành phần liên kết
export const Anchor = styled.a`
  color: #333; /* Màu chữ */
  font-size: 14px; /* Kích thước chữ */
  text-decoration: none; /* Bỏ gạch chân */
  margin: 15px 0; /* Khoảng cách trên và dưới */
`;

// OverlayContainer: Thành phần chứa lớp phủ
export const OverlayContainer = styled.div<SignInProps>`
  position: absolute; /* Đặt vị trí tuyệt đối */
  top: 0; /* Vị trí trên cùng */
  left: 50%; /* Vị trí bên trái */
  width: 50%; /* Chiều rộng 50% */
  height: 100%; /* Chiều cao 100% */
  overflow: hidden; /* Ẩn phần thừa */
  transition: transform 0.6s ease-in-out; /* Hiệu ứng chuyển đổi */
  z-index: 100; /* Độ ưu tiên z-index */
  ${(props) =>
    props.signinIn !== true ? `transform: translateX(-100%);` : null} /* Kiểm tra trạng thái đăng nhập */
`;

// Overlay: Thành phần lớp phủ
export const Overlay = styled.div<SignInProps>`
  background: #ff416c; /* Màu nền */
  background: -webkit-linear-gradient(to right, #ff4b2b, #ff416c); /* Hiệu ứng gradient */
  background: linear-gradient(to right, #ff4b2b, #ff416c); /* Hiệu ứng gradient */
  background-repeat: no-repeat; /* Không lặp lại nền */
  background-size: cover; /* Kích thước nền bao phủ */
  background-position: 0 0; /* Vị trí nền */
  color: #ffffff; /* Màu chữ */
  position: relative; /* Đặt vị trí tương đối */
  left: -100%; /* Vị trí bên trái */
  height: 100%; /* Chiều cao 100% */
  width: 200%; /* Chiều rộng 200% */
  transform: translateX(0); /* Dịch chuyển theo trục X */
  transition: transform 0.6s ease-in-out; /* Hiệu ứng chuyển đổi */
  ${(props) => (props.signinIn !== true ? `transform: translateX(50%);` : null)} /* Kiểm tra trạng thái đăng nhập */
`;

// OverlayPanel: Thành phần bảng lớp phủ
export const OverlayPanel = styled.div`
  position: absolute; /* Đặt vị trí tuyệt đối */
  display: flex; /* Sử dụng Flexbox */
  align-items: center; /* Căn giữa theo chiều dọc */
  justify-content: center; /* Căn giữa theo chiều ngang */
  flex-direction: column; /* Sắp xếp theo cột */
  padding: 0 40px; /* Khoảng đệm */
  text-align: center; /* Căn giữa chữ */
  top: 0; /* Vị trí trên cùng */
  height: 100%; /* Chiều cao 100% */
  width: 50%; /* Chiều rộng 50% */
  transform: translateX(0); /* Dịch chuyển theo trục X */
  transition: transform 0.6s ease-in-out; /* Hiệu ứng chuyển đổi */
`;

// LeftOverlayPanel: Thành phần bảng lớp phủ bên trái
export const LeftOverlayPanel = styled(OverlayPanel)<SignInProps>`
  transform: translateX(-20%); /* Dịch chuyển theo trục X */
  ${(props) => (props.signinIn !== true ? `transform: translateX(0);` : null)} /* Kiểm tra trạng thái đăng nhập */
`;

// RightOverlayPanel: Thành phần bảng lớp phủ bên phải
export const RightOverlayPanel = styled(OverlayPanel)<SignInProps>`
  right: 0; /* Căn phải */
  transform: translateX(0); /* Dịch chuyển theo trục X */
  ${(props) => (props.signinIn !== true ? `transform: translateX(20%);` : null)} /* Kiểm tra trạng thái đăng nhập */
`;

// Paragraph: Thành phần đoạn văn
export const Paragraph = styled.p`
  font-size: 14px; /* Kích thước chữ */
  font-weight: 100; /* Độ đậm chữ */
  line-height: 20px; /* Chiều cao dòng */
  letter-spacing: 0.5px; /* Khoảng cách giữa các chữ */
  margin: 20px 0 30px; /* Khoảng cách trên, dưới */
`;

// Component LoginForm chứa logic đăng ký và đăng nhập

// Define interfaces for user data
interface UserInfo {
  sub?: string;
  name?: string;
  accountid?: string;
  adminid?: string;
  staffid?: string;
  roleid?: string;
  token?: string;
  message?: string;
}
interface SignInProps {
  signinIn: boolean;
}
const LoginForm: React.FC = () => {
  // State variables with type annotations
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [confirmpassword, setConfirmpassword] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [status, setStatus] = useState<string>("enter");
  const [error, setError] = useState<string | null>(null);
  const [signIn, toggle] = useState<boolean>(true);
  const [showpassword, setShowpassword] = useState<boolean>(false);
  const [showConfirmpassword, setShowConfirmpassword] = useState<boolean>(false);


  const navigate = useNavigate();

  // Handler for Sign Up
  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Trim inputs
    const trimmedFirstname = firstname.trim();
    const trimmedLastname = lastname.trim();
    const trimmedAddress = address.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    const trimmedConfirmpassword = confirmpassword.trim();

    // Validate inputs
    if (
      !trimmedFirstname ||
      !trimmedLastname ||
      !trimmedAddress ||
      !phone ||
      !trimmedEmail ||
      !trimmedPassword ||
      !trimmedConfirmpassword
    ) {
      setError("All fields are required and must not be whitespace only!");
      alert("All fields are required and must not be whitespace only!");
      return;
    }

    if (trimmedPassword !== trimmedConfirmpassword) {
      setError("Passwords do not match!");
      alert("Passwords do not match!");
      return;
    }

    if (
      trimmedFirstname.length < 3 ||
      trimmedFirstname.length > 50 ||
      trimmedLastname.length < 3 ||
      trimmedLastname.length > 50 ||
      trimmedAddress.length < 3 ||
      trimmedAddress.length > 50
    ) {
      setError(
        "Firstname, Lastname, and Address must be between 3 and 50 characters long!"
      );
      alert(
        "Firstname, Lastname, and Address must be between 3 and 50 characters long!"
      );
      return;
    }

    const accountname = `${trimmedFirstname} ${trimmedLastname}`;

    setStatus("submit");
    try {
      const item = {
        accountname,
        password: trimmedPassword,
        email: trimmedEmail,
        phone: `+84${phone}`,
        address: trimmedAddress,
      };

      const result = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(item),
      });

      if (!result.ok) {
        const errorMessage = await result.text();
        throw new Error(
          errorMessage || "Please check again. Phone number or email already exists"
        );
      }

      alert("Account successfully created. OTP sent to your phone number.");

      // Reset form fields
      setFirstname("");
      setLastname("");
      setAddress("");
      setEmail("");
      setError("");
      setStatus("");

  

     
    } catch (err) {
      if (err instanceof Error) {
        setStatus("fail");
        setError(err.message);
        alert(err.message);
      } else {
        setStatus("fail");
        setError("An unknown error occurred.");
        alert("An unknown error occurred.");
      }
    }
  };

  // Validate no whitespace in password
  const validateNoWhitespace = (str: string): boolean => {
    return /^[a-zA-Z0-9]*$/.test(str);
  };

  // Handle password change
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (validateNoWhitespace(value)) {
      setPassword(value);
    }
  };

  // Handle confirm password change
  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (validateNoWhitespace(value)) {
      setConfirmpassword(value);
    }
  };

  // Validate email
  const validateEmail = (email: string): boolean => {
    const emailParts = email.split("@");
    if (emailParts.length !== 2) {
      return false;
    }
    const username = emailParts[0];
    const domain = emailParts[1];
    const specialCharRegex = /^[A-Za-z0-9]+$/;
    return (
      username.length > 8 &&
      specialCharRegex.test(username) &&
      domain === "gmail.com"
    );
  };

  // Handle email change
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setEmail(value);
  };

  // Handle email blur
  const handleEmailBlur = () => {
    if (!validateEmail(email)) {
      alert(
        "Email must have more than 10 characters before the '@' and cannot contain special characters. It should end with 'gmail.com'."
      );
      setEmail("");
    }
  };

  // Handler for Sign In
  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const fullPhoneNumber = `+84${phone}`;

    if (!phone || !password) {
      setError("Phone and Password are required!");
      alert("Phone and Password are required!");
      return;
    }

    // Check existing user
    const existingUserJSON = localStorage.getItem("user-info");
    const existingUser: UserInfo | null = existingUserJSON ? JSON.parse(existingUserJSON) : null;
    if (existingUser) {
      redirectToRoleBasedPage(existingUser);
      return;
    }

    setStatus("submit");
    setError("");

    try {
      const response = await fetch(`http://localhost:8080/api/auth/loginAll`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ phone: fullPhoneNumber, password }),
        credentials: "include",
      });

      if (response.ok) {
        const data: UserInfo = await response.json();
        console.log("Response Data:", data);

        if (data) {
          localStorage.setItem("user-info", JSON.stringify(data));
          localStorage.setItem("loginMethod", "account");
          if (data.token) {
            localStorage.setItem("token", data.token);
          }
          if (data.accountid) {
            localStorage.setItem("accountid", data.accountid);
          }
          if (data.adminid) {
            localStorage.setItem("adminid", data.adminid);
          }
          if (data.staffid) {
            localStorage.setItem("staffid", data.staffid);
          }
          if (data.roleid) {
            localStorage.setItem("roleid", data.roleid);
          }

          redirectToRoleBasedPage(data);
        } else {
          console.error("No data received from the server.");
          alert("An unknown error occurred.");
        }
      } else {
        const errorData = await response.json();
        console.error("Error Data:", errorData);
        alert(errorData.error || "An unknown error occurred.");
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
      alert("An unknown error occurred.");
    } finally {
      setStatus("");
      setPhone("");
      setPassword("");
    }
  };

  // Redirect based on user role
  const redirectToRoleBasedPage = (userInfo: UserInfo): void => {
    if (userInfo.message?.includes("Admin")) {
      navigate("/adminpage/productlist");
    } else if (userInfo.message?.includes("Staff")) {
      navigate("/orderstaff/menu");
    } else if (userInfo.message?.includes("Chef")) {
      navigate("/chefmanage/orderChef");
    } else {
      navigate("/ordercustomer");
    }
  };

  // Validate name
  const validateName = (name: string): boolean => {
    const re = /^[A-Za-z]+$/;
    return re.test(name);
  };

  // Handle first name change
  const handleFirstnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const trimmedValue = value.trimStart();
    const trailingSpaces = value.length - value.trimEnd().length;
    if (trimmedValue === "" || (validateName(trimmedValue) && trailingSpaces <= 2)) {
      setFirstname(value);
    }
  };

  // Handle last name change
  const handleLastnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const trimmedValue = value.trimStart();
    const trailingSpaces = value.length - value.trimEnd().length;
    if (trimmedValue === "" || trailingSpaces <= 2) {
      setLastname(value);
    }
  };

  // Handle address change
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const trimmedValue = value.trimStart();
    const trailingSpaces = value.length - value.trimEnd().length;
    if (trimmedValue === "" || trailingSpaces <= 2) {
      setAddress(value);
    }
  };

  // Handle phone change
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, "");
    if (input.length <= 9) {
      setPhone(input);
    }
  };



  return (
    <div className="font">
      <Components.Container>
        <Components.SignUpContainer signinIn={signIn}>
          <Components.Form onSubmit={handleSignUp}>
            <Components.Title>Registration</Components.Title>
            <InputWrapper>
              <IconWrapper>
                <FaUser />
              </IconWrapper>
              <Input
                type="text"
                placeholder="First name"
                defaultValue={firstname}
                onChange={handleFirstnameChange}
                readOnly 
                maxLength={30}
                minLength={3}
              />
            </InputWrapper>
            <InputWrapper>
              <IconWrapper>
                <FaUser />
              </IconWrapper>
              <Input
                type="text"
                placeholder="Last Name"
                defaultValue={lastname}
                onChange={handleLastnameChange}
                readOnly 
                maxLength={30}
                minLength={3}
              />
            </InputWrapper>
            <InputWrapper>
              <IconWrapper>
                <FaHome />
              </IconWrapper>
              <Input
                type="text"
                placeholder="Address"
                defaultValue={address}
                onChange={handleAddressChange}
                readOnly 
                maxLength={120}
                minLength={3}
              />
            </InputWrapper>
            <InputWrapper className="phone-container">
              <IconWrapper className="phone-icon">
                <FaPhoneAlt />
              </IconWrapper>
              <div className="phone-code">+84</div>
              <Input
                type="tel"
                pattern="\d{9}"
                title="Phone Number format is 9 digits after +84"
                placeholder="xxx-xxx-xxx"
                defaultValue={phone}
                onChange={handlePhoneChange}
                readOnly 
                style={{
                  flex: "1",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  padding: "8px",
                  margin: "0",
                }}
              />
            </InputWrapper>
            <InputWrapper>
              <IconWrapper>
                <FaEnvelope />
              </IconWrapper>
              <Input
                type="email"
                pattern=".+@gmail\.com"
                placeholder="abc@gmail.com"
                defaultValue={email}
                onChange={handleEmailChange}
                onBlur={handleEmailBlur}
                readOnly 
              />
            </InputWrapper>
            <InputWrapper>
              <IconWrapper>
                <FaLockOpen />
              </IconWrapper>
              <Input
                type={showpassword ? "text" : "password"}
                placeholder="Password"
                defaultValue={password}
                onChange={handlePasswordChange}
                readOnly 
                maxLength={30}
                minLength={8}
              />
              <EyeIcon onClick={() => setShowpassword(!showpassword)}>
                {showpassword ? <FaEyeSlash /> : <FaEye />}
              </EyeIcon>
            </InputWrapper>
            <InputWrapper>
              <IconWrapper>
                <FaLock />
              </IconWrapper>
              <Input
                type={showConfirmpassword ? "text" : "password"}
                placeholder="Confirm Password"
                defaultValue={confirmpassword}
                onChange={handleConfirmPasswordChange}
                readOnly 
              />
              <EyeIcon
                onClick={() => setShowConfirmpassword(!showConfirmpassword)}
              >
                {showConfirmpassword ? <FaEyeSlash /> : <FaEye />}
              </EyeIcon>
            </InputWrapper>
            <Components.Button disabled={status === "submit"} type="submit">
              Sign Up
            </Components.Button>
          </Components.Form>
        </Components.SignUpContainer>
        <Components.SignInContainer signinIn={signIn}>
          <Components.Form onSubmit={handleSignIn}>
            <Components.Title>Sign in</Components.Title>
            <InputWrapper className="phone-container">
              <IconWrapper className="phone-icon">
                <FaPhoneAlt />
              </IconWrapper>
              <div className="phone-code">+84</div>
              <Input
                type="tel"
                pattern="\d{9}"
                title="Phone Number format is 9 digits after +84"
                placeholder="xxx-xxx-xxx"
                defaultValue={phone}
                onChange={handlePhoneChange}
                readOnly 
                style={{
                  flex: "1",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  padding: "8px",
                  margin: "0",
                }}
              />
            </InputWrapper>
            <InputWrapper>
              <IconWrapper>
                <FaLock />
              </IconWrapper>
              <Input
                type={showpassword ? "text" : "password"}
                placeholder="Password"
                defaultValue={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value.trim())
                }
                readOnly 
              />
              <EyeIcon onClick={() => setShowpassword(!showpassword)}>
                {showpassword ? <FaEyeSlash /> : <FaEye />}
              </EyeIcon>
            </InputWrapper>
            <Components.Anchor href="/reset-password">
              Forgot your password?
            </Components.Anchor>
            <Components.Button disabled={status === "submit"} type="submit">
              Sign In
            </Components.Button>
            {error && <p className="error">{error}</p>}
            <p className="or">--or--</p>
            <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
  <GoogleLogin
    onSuccess={credentialResponse => {
      console.log(credentialResponse);
    }}
    onError={() => {
      console.log('Login Failed');
    }}
  />
</GoogleOAuthProvider>
          </Components.Form>
        </Components.SignInContainer>
        <Components.OverlayContainer signinIn={signIn}>
          <Components.Overlay signinIn={signIn}>
            <Components.LeftOverlayPanel signinIn={signIn}>
              <Components.Title>Welcome Back!</Components.Title>
              <Components.Paragraph>
                To keep connected with us please login with your personal info
              </Components.Paragraph>
              <Components.GhostButton onClick={() => toggle(true)}>
                Sign In
              </Components.GhostButton>
            </Components.LeftOverlayPanel>
            <Components.RightOverlayPanel signinIn={signIn}>
              <Components.Title>Hello, Friend!</Components.Title>
              <Components.Paragraph>
                Enter Your personal details and start journey with us
              </Components.Paragraph>
              <Components.GhostButton onClick={() => toggle(false)}>
                Sign Up
              </Components.GhostButton>
            </Components.RightOverlayPanel>
          </Components.Overlay>
        </Components.OverlayContainer>
      </Components.Container>
    </div>
  );
};

export default LoginForm;



