import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import './DetailPage.css';
import Header from "../../components/Header";
import Footer from "../../components/Footer/Footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStar as faStarEmpty } from '@fortawesome/free-solid-svg-icons';

interface Product {
  id: string;
  name: string;
  images: string[];
  rating: number;
  quantity: number;
  size: string;
  price: string;
  description: string;
  details: string;
  category: string;
}

const DetailPage: React.FC = () => {
  const location = useLocation();
  const { productId } = location.state || {};
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false); // Modal state
  const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`https://be-exe-cho-do-cu.onrender.com/api/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    if (productId) {
      fetchProductDetails();
    }
  }, [productId]);

  const handleBuyNow = async () => {
    try {
      const token = localStorage.getItem("token"); // Lấy token người dùng
      if (!token) {
        alert("Vui lòng đăng nhập để mua hàng.");
        navigate("/login");
        return;
      }

      await axios.post(
        "https://be-exe-cho-do-cu.onrender.com/api/cart/add",
        { productId, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      navigate("/cart"); // Chuyển đến trang giỏ hàng sau khi thêm thành công
    } catch (error) {
      console.error("Error adding product to cart:", error);
      alert("Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng.");
    }
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating); // Number of full stars
    const emptyStars = 5 - fullStars; // Remaining empty stars

    const stars = [];

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <FontAwesomeIcon key={`full-${i}`} icon={faStar} className="star full-star" />
      );
    }

    // Add empty stars
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <FontAwesomeIcon key={`empty-${i}`} icon={faStarEmpty} className="star empty-star" />
      );
    }

    return stars;
  };

  if (!product) {
    return <p>Loading product details...</p>;
  }

  const formatPrice = (price: any) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

  return (
    <div>
      <Header />

      <div className="product-details-form">
        <div className="category-menu">
          <ul className="category-list">
            <li>ÁO KHOÁC</li>
            <li>ÁO THUN</li>
            <li>QUẦN JEANS</li>
            <li>QUẦN ÂU</li>
            <li>QUẦN SHORT</li>
          </ul>
        </div>

        <div className="image-wrapper">
          <div className="thumbnail-list">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="thumbnail-img"
                onClick={() => setSelectedImage(image)}
              />
            ))}
          </div>

          <div className="main-image">
            <img src={selectedImage || product.images[0]} alt="Main" className="main-img" />
          </div>
        </div>

        <div className="product-info-form">
          <h2 className="product-title">{product.name}</h2>
          <div className="rating-stars">{renderStars(product.rating)}</div>
          <p className="product-price-form">{formatPrice(product.price)} VNĐ</p>
          <p>{product.description}</p>
          <p><strong>Số lượng:</strong> {product.quantity}</p>
          <p><strong>Size:</strong> {product.size}</p>
          <p><strong>Danh mục:</strong> {product.category}</p>
          <div className="button-container">
            <button className="btn w-70 mb-2" onClick={handleBuyNow}>Mua Ngay</button><br />
            <button className="btn btn-secondary w-70" onClick={toggleModal}>
              Thử Ngay Tại Store
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay-1" onClick={toggleModal}>
          <div className="modal-content-1" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-1" onClick={toggleModal}>×</button>
            <h3>Thử Ngay Tại Store</h3>
            <p>
              <a
                href="https://www.google.com/maps/search/?api=1&query=600+Nguyễn+Văn+Cừ+Nối+Dài,+An+Bình,+Bình+Thủy,+Cần+Thơ+900000,+Việt+Nam"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none', color: '#007BFF' }}
              >
                600 Nguyễn Văn Cừ Nối Dài, An Bình, Bình Thủy, Cần Thơ 900000, Việt Nam
              </a>
            </p>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.6748404915954!2d105.76842637599045!3d10.038051490086224!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a08807d6908933%3A0x69e7f5c665b9e6fd!2zNjAwIE5ndXnhu4VuIFbEg24gQ-G7ryBOw7NpIMSQw6BpLCBBbiBCw6xuaCwgQsOsbmggVGh14buBLCBD4bqvbiBUaOG7mWM!5e0!3m2!1sen!2s!4v1690000000000!5m2!1sen!2s"
              width="100%"
              height="300"
              style={{ border: 0, borderRadius: "8px" }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default DetailPage;
