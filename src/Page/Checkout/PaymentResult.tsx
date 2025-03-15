import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const PaymentResult: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [status, setStatus] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const fetchPaymentResult = async () => {
      try {
        const queryParams = new URLSearchParams(location.search);
        console.log("[DEBUG] Query Params:", queryParams.toString());
  
        const response = await axios.get(
          `https://be-exe-cho-do-cu.onrender.com/api/payment/vnpay_return?${queryParams.toString()}`
        );
  
        console.log("[DEBUG] Response từ backend:", response.data);
  
        if (response.data.status === "success") {
          setStatus("success");
          setMessage(response.data.message);
        } else {
          setStatus("failed");
          setMessage(response.data.message);
        }
      } catch (error) {
        console.error("[DEBUG] Lỗi khi fetch kết quả thanh toán:", error);
        setStatus("error");
        setMessage("Đã xảy ra lỗi khi xử lý kết quả thanh toán.");
      }
    };
  
    fetchPaymentResult();
  }, [location]);
  

  return (
    <div>
      <h1>Kết quả thanh toán</h1>
      <p style={{ color: status === "success" ? "green" : "red" }}>{message}</p>
      <button onClick={() => navigate("/")}>Quay về trang chủ</button>
    </div>
  );
};

export default PaymentResult;
