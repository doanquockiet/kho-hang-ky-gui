import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import axios from 'axios';
import './DetailPage.css';
import Header from "../../components/Header";
import Footer from "../../components/Footer/Footer";

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

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    if (productId) {
      fetchProductDetails();
    }
  }, [productId]);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  if (!product) {
    return <p>Loading product details...</p>;
  }

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
          <p className="product-price-form">{product.price} VNĐ</p>
          <p>{product.description}</p>
          <p><strong>Số lượng:</strong> {product.quantity}</p>
          <p><strong>Size:</strong> {product.size}</p>
          <p><strong>Thông tin chi tiết:</strong> {product.details}</p>
          <p><strong>Danh mục:</strong> {product.category}</p>
          <div className="button-container">
            <button className="btn w-100 mb-2">Mua Ngay</button>
            <button className="btn btn-secondary w-100" onClick={toggleModal}>
              Thử Ngay Tại Store
            </button>
          </div>
        </div>
      </div>

     {/* Modal Implementation */}
{showModal && (
  <div className="modal-overlay" onClick={toggleModal}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <button className="modal-close" onClick={toggleModal}>×</button>
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
      {/* Google Map Embed */}
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.6748404915954!2d105.76842637599045!3d10.038051490086224!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a08807d6908933%3A0x69e7f5c665b9e6fd!2zNjAwIE5ndXnhu4VuIFbEg24gQ-G7ryBOw7NpIMSQw6BpLCBBbiBCw6xuaCwgQsOsbmggVGh14buBLCBD4bqvbiBUaOG7mWM!5e0!3m2!1sen!2s!4v1690000000000!5m2!1sen!2s"
        width="100%"
        height="300"
        style={{ border: 0, borderRadius: "8px" }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  </div>
)}

      <Footer />
    </div>
  );
};

export default DetailPage;
