import React from "react";
import { Link } from "react-router-dom";

const SuccessPage: React.FC = () => {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Thanh toán thành công!</h1>
      <p>Cảm ơn bạn đã mua hàng tại cửa hàng của chúng tôi.</p>
      <Link to="/" style={{ textDecoration: "none", color: "white" }}>
        <button style={{ padding: "10px 20px", background: "#007bff", border: "none", color: "#fff", borderRadius: "5px" }}>
          Quay về trang chủ
        </button>
      </Link>
    </div>
  );
};

export default SuccessPage;
