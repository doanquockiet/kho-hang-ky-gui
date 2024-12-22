import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import axios from 'axios';
import './DetailPage.css';
import Header from "../../components/Header";
import Footer from "../../components/Footer/Footer";

interface Product {
  id: string;
  name: string;
  images: string[]; // Mảng hình ảnh
  rating: number;
  quantity: number;
  size: string;
  price: string;
  description: string;
  details: string; // Thông tin chi tiết sản phẩm
  category: string;
}

const DetailPage: React.FC = () => {
  const location = useLocation();
  const { productId } = location.state || {};
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // Quản lý hình ảnh lớn

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

  if (!product) {
    return <p>Loading product details...</p>;
  }

  return (
    <div>
      <Header />

      <div className="product-details-form">
        {/* List Category - Bên trái */}
        <div className="category-menu">
          <ul className="category-list">
            <li>ÁO KHOÁC</li>
            <li>ÁO THUN</li>
            <li>QUẦN JEANS</li>
            <li>QUẦN ÂU</li>
            <li>QUẦN SHORT</li>
          </ul>
        </div>

        {/* Ảnh sản phẩm */}
        <div className="image-wrapper">
          <div className="thumbnail-list">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="thumbnail-img"
                onClick={() => setSelectedImage(image)} // Đổi hình lớn khi nhấn vào thumbnail
              />
            ))}
          </div>

          <div className="main-image">
            <img src={selectedImage || product.images[0]} alt="Main" className="main-img" />
          </div>
        </div>

        {/* Thông tin sản phẩm */}
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
            <button className="btn btn-secondary w-100">Thử Ngay Tại Store</button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DetailPage;
