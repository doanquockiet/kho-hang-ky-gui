import React from "react";
import { Link } from "react-router-dom";

const FailedPage: React.FC = () => {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Thanh toán thất bại!</h1>
      <p>Đã xảy ra lỗi trong quá trình thanh toán. Vui lòng thử lại.</p>
      <Link to="/" style={{ textDecoration: "none", color: "white" }}>
        <button style={{ padding: "10px 20px", background: "#dc3545", border: "none", color: "#fff", borderRadius: "5px" }}>
          Quay về trang chủ
        </button>
      </Link>
    </div>
  );
};

export default FailedPage;
