"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import axios from "axios"
import Header from "../../components/Header"
import Footer from "../../components/Footer/Footer"
import "./CheckoutPage.css"

const CheckoutPage: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const cartItems = location.state?.cartItems || []
  const [paymentMethod, setPaymentMethod] = useState<string>("")
  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    district: "",
    ward: "",
    note: "",
  })
  const [selectedBankCode, setSelectedBankCode] = useState<string>("")

  // State cho dữ liệu địa chỉ
  const [provinces, setProvinces] = useState<any[]>([])
  const [districts, setDistricts] = useState<any[]>([])
  const [wards, setWards] = useState<any[]>([])
  const [loading, setLoading] = useState({
    provinces: false,
    districts: false,
    wards: false,
  })

  // Fetch tỉnh/thành phố khi component được tải
  useEffect(() => {
    const fetchProvinces = async () => {
      setLoading((prev) => ({ ...prev, provinces: true }))
      try {
        const response = await axios.get("https://provinces.open-api.vn/api/p/")
        setProvinces(response.data)
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu tỉnh/thành phố:", error)
      } finally {
        setLoading((prev) => ({ ...prev, provinces: false }))
      }
    }

    fetchProvinces()
  }, [])

  // Fetch quận/huyện khi tỉnh/thành phố thay đổi
  useEffect(() => {
    if (shippingInfo.city) {
      const fetchDistricts = async () => {
        setLoading((prev) => ({ ...prev, districts: true }))
        try {
          const provinceCode = provinces.find((p) => p.name === shippingInfo.city)?.code
          if (provinceCode) {
            const response = await axios.get(`https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`)
            setDistricts(response.data.districts || [])
          }
        } catch (error) {
          console.error("Lỗi khi lấy dữ liệu quận/huyện:", error)
        } finally {
          setLoading((prev) => ({ ...prev, districts: false }))
        }
      }

      fetchDistricts()
      // Reset quận/huyện và phường/xã khi thay đổi tỉnh/thành phố
      setShippingInfo((prev) => ({ ...prev, district: "", ward: "" }))
      setWards([])
    }
  }, [shippingInfo.city, provinces])

  // Fetch phường/xã khi quận/huyện thay đổi
  useEffect(() => {
    if (shippingInfo.district) {
      const fetchWards = async () => {
        setLoading((prev) => ({ ...prev, wards: true }))
        try {
          const districtCode = districts.find((d) => d.name === shippingInfo.district)?.code
          if (districtCode) {
            const response = await axios.get(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`)
            setWards(response.data.wards || [])
          }
        } catch (error) {
          console.error("Lỗi khi lấy dữ liệu phường/xã:", error)
        } finally {
          setLoading((prev) => ({ ...prev, wards: false }))
        }
      }

      fetchWards()
      // Reset phường/xã khi thay đổi quận/huyện
      setShippingInfo((prev) => ({ ...prev, ward: "" }))
    }
  }, [shippingInfo.district, districts])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setShippingInfo({ ...shippingInfo, [name]: value })
  }

  const handlePaymentMethodChange = (method: string) => {
    setPaymentMethod(method)
  }

  // Thêm console.log để kiểm tra trạng thái của form
  const isFormValid = () => {
    const { fullName, email, phone, address, city, district, ward } = shippingInfo

    // Log các giá trị để debug
    console.log("Form validation:", {
      fullName: fullName.trim() ? "✓" : "✗",
      email: email.includes("@") ? "✓" : "✗",
      phone: phone.match(/^\d{10,11}$/) ? "✓" : "✗",
      address: address.trim() ? "✓" : "✗",
      city: city ? "✓" : "✗",
      district: district ? "✓" : "✗",
      ward: ward ? "✓" : "✗",
      paymentMethod: paymentMethod ? "✓" : "✗",
    })

    // Thêm điều kiện kiểm tra riêng lẻ để dễ debug
    const isValid =
      fullName.trim() &&
      email.includes("@") &&
      phone.match(/^\d{10,11}$/) &&
      address.trim() &&
      city &&
      district &&
      ward &&
      paymentMethod

    return isValid
  }

  const calculateTotalPrice = () =>
    cartItems.reduce((total: any, item: any) => total + item.product.price * item.quantity, 0)

  const handleConfirmOrder = async () => {
    const token = localStorage.getItem("token")

    if (!token) {
      alert("Bạn cần đăng nhập trước khi tiếp tục.")
      navigate("/login") // Điều hướng đến trang đăng nhập
      return
    }

    if (!isFormValid()) {
      alert("Vui lòng hoàn thành tất cả các thông tin bắt buộc.")
      return
    }

    const totalAmount = calculateTotalPrice()

    if (paymentMethod === "VNPay") {
      try {
        const orderId = `${Date.now()}` // Unique order ID
        const orderDescription = "Thanh toán đơn hàng tại cửa hàng"

        const payload = {
          orderId,
          amount: totalAmount, // Không cần nhân thêm 100, backend đã xử lý
          orderDescription,
          shippingInfo,
          ...(selectedBankCode && { bankCode: selectedBankCode }),
          language: "vn",
        }

        console.log("Payload gửi đến backend (VNPay):", payload)

        const response = await axios.post(
          "https://be-exe-cho-do-cu.onrender.com/api/payment/create_payment_url",
          payload,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        )

        if (response.data.paymentUrl) {
          console.log("VNPay URL:", response.data.paymentUrl)
          // Chuyển hướng đến VNPay
          window.location.href = response.data.paymentUrl
        } else {
          alert("Không thể tạo đường dẫn thanh toán. Vui lòng thử lại.")
        }
      } catch (error: any) {
        console.error("[VNPay ERROR]:", error.response || error.message)
        const errorMessage = error.response?.data?.message || "Có lỗi xảy ra khi tạo thanh toán. Vui lòng thử lại!"
        alert(errorMessage)
      }
    } else if (paymentMethod === "COD") {
      try {
        const payload = {
          cartItems: cartItems.map((item: any) => ({
            productId: item.product._id || item.product.id,
            quantity: item.quantity,
          })),
          shippingInfo,
          totalAmount,
        }

        console.log("Payload gửi đến backend (COD):", payload)

        const response = await axios.post("https://be-exe-cho-do-cu.onrender.com/api/checkout", payload, {
          headers: { Authorization: `Bearer ${token}` },
        })

        if (response.status === 200) {
          alert("Đơn hàng của bạn đã được xác nhận!")
          navigate("/") // Điều hướng về trang chính

          // Gửi sự kiện để cập nhật giỏ hàng trên Header
          const event = new CustomEvent("updateCartCount", { detail: 0 })
          window.dispatchEvent(event)
        }
      } catch (error: any) {
        console.error("[COD ERROR]:", error.response || error.message)
        const errorMessage = error.response?.data?.message || "Có lỗi xảy ra khi xử lý đơn hàng. Vui lòng thử lại!"
        alert(errorMessage)
      }
    } else {
      alert("Vui lòng chọn phương thức thanh toán.")
    }
  }

  return (
    <div>
      <Header />
      <div className="checkout-container">
        <div className="order-summary">
          <h2>Tóm tắt đơn hàng</h2>
          <ul>
            {cartItems.map((item: any, index: number) => (
              <li key={index} className="summary-item">
                <img src={item.product.images[0] || "/placeholder.svg"} alt={item.product.name} />
                <div>
                  <p className="product-name">{item.product.name}</p>
                  <p>Số lượng: {item.quantity}</p>
                  <p>Giá: {Number.parseInt(item.product.price).toLocaleString()} VND</p>
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

            {/* Dropdown chọn Tỉnh/Thành phố */}
            <div className="select-container">
              <select
                name="city"
                value={shippingInfo.city}
                onChange={handleInputChange}
                required
                className="address-select"
                disabled={loading.provinces}
              >
                <option value="">Chọn Tỉnh/ Thành phố</option>
                {provinces.map((province) => (
                  <option key={province.code} value={province.name}>
                    {province.name}
                  </option>
                ))}
              </select>
              {loading.provinces && <div className="loading-spinner"></div>}
            </div>

            {/* Dropdown chọn Quận/Huyện */}
            <div className="select-container">
              <select
                name="district"
                value={shippingInfo.district}
                onChange={handleInputChange}
                required
                disabled={!shippingInfo.city || loading.districts}
                className="address-select"
              >
                <option value="">Chọn Quận/ Huyện</option>
                {districts.map((district) => (
                  <option key={district.code} value={district.name}>
                    {district.name}
                  </option>
                ))}
              </select>
              {loading.districts && <div className="loading-spinner"></div>}
            </div>

            {/* Dropdown chọn Phường/Xã */}
            <div className="select-container">
              <select
                name="ward"
                value={shippingInfo.ward}
                onChange={handleInputChange}
                required
                disabled={!shippingInfo.district || loading.wards}
                className="address-select"
              >
                <option value="">Chọn Phường/ Xã</option>
                {wards.map((ward) => (
                  <option key={ward.code} value={ward.name}>
                    {ward.name}
                  </option>
                ))}
              </select>
              {loading.wards && <div className="loading-spinner"></div>}
            </div>

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
              <input type="radio" name="paymentMethod" value="COD" onChange={() => handlePaymentMethodChange("COD")} />
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
        <div className="validation-status">
          {!isFormValid() && (
            <div className="validation-message">Vui lòng điền đầy đủ thông tin để tiếp tục thanh toán</div>
          )}
        </div>
        <button className="btn btn-primary" onClick={handleConfirmOrder} disabled={!isFormValid()}>
          Xác nhận thanh toán
        </button>
      </div>
      <Footer />
    </div>
  )
}

export default CheckoutPage

