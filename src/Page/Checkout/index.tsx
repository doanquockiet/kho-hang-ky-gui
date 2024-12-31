import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../components/Header";
import Footer from "../../components/Footer/Footer";
import "./CheckoutPage.css";

const CheckoutPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const cartItems = location.state?.cartItems || [];
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    district: "",
    ward: "",
    note: "",
  });
  const [selectedBankCode, setSelectedBankCode] = useState<string>("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setShippingInfo({ ...shippingInfo, [name]: value });
  };

  const handlePaymentMethodChange = (method: string) => {
    setPaymentMethod(method);
  };

  const isFormValid = () => {
    const { fullName, email, phone, address, city, district, ward } = shippingInfo;
    return (
      fullName.trim() &&
      email.includes("@") &&
      phone.match(/^\d{10,11}$/) &&
      address.trim() &&
      city &&
      district &&
      ward &&
      paymentMethod
    );
  };

  const calculateTotalPrice = () =>
    cartItems.reduce((total, item: any) => total + item.product.price * item.quantity, 0);

  const handleConfirmOrder = async () => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      alert("Bạn cần đăng nhập trước khi tiếp tục.");
      navigate("/login"); // Điều hướng đến trang đăng nhập
      return;
    }
  
    if (!isFormValid()) {
      alert("Vui lòng hoàn thành tất cả các thông tin bắt buộc.");
      return;
    }
  
    const totalAmount = calculateTotalPrice();
  
    if (paymentMethod === "VNPay") {
      try {
        const orderId = `${Date.now()}`; // Unique order ID
        const orderDescription = "Thanh toán đơn hàng tại cửa hàng";
  
        const payload = {
          orderId,
          amount: totalAmount, // Không cần nhân thêm 100, backend đã xử lý
          orderDescription,
          shippingInfo,
          ...(selectedBankCode && { bankCode: selectedBankCode }),
          language: "vn",
        };
  
        console.log("Payload gửi đến backend (VNPay):", payload);
  
        const response = await axios.post(
          "http://localhost:8080/api/payment/create_payment_url",
          payload,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
  
        if (response.data.paymentUrl) {
          console.log("VNPay URL:", response.data.paymentUrl);
          // Chuyển hướng đến VNPay
          window.location.href = response.data.paymentUrl;
        } else {
          alert("Không thể tạo đường dẫn thanh toán. Vui lòng thử lại.");
        }
      } catch (error) {
        console.error("[VNPay ERROR]:", error.response || error.message);
        const errorMessage =
          error.response?.data?.message || "Có lỗi xảy ra khi tạo thanh toán. Vui lòng thử lại!";
        alert(errorMessage);
      }
    } else if (paymentMethod === "COD") {
      try {
        const payload = {
          cartItems: cartItems.map((item) => ({
            productId: item.product._id || item.product.id,
            quantity: item.quantity,
          })),
          shippingInfo,
          totalAmount,
        };
  
        console.log("Payload gửi đến backend (COD):", payload);
  
        const response = await axios.post("http://localhost:8080/api/checkout", payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        if (response.status === 200) {
          alert("Đơn hàng của bạn đã được xác nhận!");
          navigate("/"); // Điều hướng về trang chính
  
          // Gửi sự kiện để cập nhật giỏ hàng trên Header
          const event = new CustomEvent("updateCartCount", { detail: 0 });
          window.dispatchEvent(event);
        }
      } catch (error) {
        console.error("[COD ERROR]:", error.response || error.message);
        const errorMessage =
          error.response?.data?.message || "Có lỗi xảy ra khi xử lý đơn hàng. Vui lòng thử lại!";
        alert(errorMessage);
      }
    } else {
      alert("Vui lòng chọn phương thức thanh toán.");
    }
  };
  
  
  
  return (
    <div>
      <Header />
      <div className="checkout-container">
        <div className="order-summary">
          <h2>Tóm tắt đơn hàng</h2>
          <ul>
            {cartItems.map((item: any, index: number) => (
              <li key={index} className="summary-item">
                <img src={item.product.images[0]} alt={item.product.name} />
                <div>
                  <p className="product-name">{item.product.name}</p>
                  <p>Số lượng: {item.quantity}</p>
                  <p>Giá: {parseInt(item.product.price).toLocaleString()} VND</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="summary-total">
            <p>Tạm tính: {calculateTotalPrice().toLocaleString()} VND</p>
            <p>Phí vận chuyển: 0 VND</p>
            <p>
              <strong>Tổng cộng: {calculateTotalPrice().toLocaleString()} VND</strong>
            </p>
          </div>
        </div>

        <div className="shipping-info">
          <h2>Thông tin giao hàng</h2>
          <form>
            <input
              type="text"
              placeholder="Họ và Tên"
              name="fullName"
              value={shippingInfo.fullName}
              onChange={handleInputChange}
              required
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={shippingInfo.email}
              onChange={handleInputChange}
              required
            />
            <input
              type="tel"
              placeholder="Số điện thoại"
              name="phone"
              value={shippingInfo.phone}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              placeholder="Địa chỉ"
              name="address"
              value={shippingInfo.address}
              onChange={handleInputChange}
              required
            />
            <select name="city" value={shippingInfo.city} onChange={handleInputChange} required>
              <option value="">Chọn Tỉnh/ Thành phố</option>
              <option value="Hà Nội">Hà Nội</option>
              <option value="TP Hồ Chí Minh">TP Hồ Chí Minh</option>
              <option value="Đà Nẵng">Đà Nẵng</option>
            </select>
            <select name="district" value={shippingInfo.district} onChange={handleInputChange} required>
              <option value="">Chọn Quận/ Huyện</option>
              <option value="Quận 1">Quận 1</option>
              <option value="Quận 2">Quận 2</option>
              <option value="Quận 3">Quận 3</option>
            </select>
            <select name="ward" value={shippingInfo.ward} onChange={handleInputChange} required>
              <option value="">Chọn Phường/ Xã</option>
              <option value="Phường A">Phường A</option>
              <option value="Phường B">Phường B</option>
              <option value="Phường C">Phường C</option>
            </select>
            <textarea
              placeholder="Ghi chú (Không bắt buộc)"
              name="note"
              value={shippingInfo.note}
              onChange={handleInputChange}
            />
          </form>
        </div>

        <div className="payment-method">
          <h2>Chọn phương thức thanh toán</h2>
          <div className="payment-options">
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="COD"
                onChange={() => handlePaymentMethodChange("COD")}
              />
              Thanh toán khi nhận hàng (COD)
            </label>
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="VNPay"
                onChange={() => handlePaymentMethodChange("VNPay")}
              />
              Thanh toán qua VNPay
            </label>
          </div>
         
        </div>
      </div>

      <div className="checkout-footer">
        <button
          className="btn btn-primary"
          onClick={handleConfirmOrder}
          disabled={!isFormValid()}
        >
          Xác nhận thanh toán
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
