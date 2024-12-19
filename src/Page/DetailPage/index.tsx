import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import { Row, Col, CardImg, CardBody, CardTitle, CardText, Button } from "reactstrap";
import { Rating } from "react-simple-star-rating";
import './DetailPage.css';
import Header from "../../components/Header";
import Footer from "../../components/Footer/Footer";

interface Product {
  id: string;
  name: string;
  image: string;
  rating: number;
  quantity: number;
  size: string;
  price: string;
  description: string;
}

const DetailPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { productId } = location.state || {};

  const [product, setProduct] = useState<Product | null>(null);

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
      <li>ÁO SƠ MI</li>
      <li>QUẦN JEANS</li>
      <li>ÁO PHÔNG</li>
      <li>ÁO NI & HOODIE</li>
      <li>QUẦN CARGO</li>
      <li>QUẦN SHORT</li>
      <li>KHUYẾN MẠI</li>
      <li>PHỤ KIỆN</li>
      <li>POLO</li>
      <li>NEW</li>
      <li>TANK TOP</li>
    </ul>
  </div>

  {/* Ảnh sản phẩm - Phóng to */}
  <div className="image-wrapper">
    <img className="card-img" src={product.image} alt={product.name} />
  </div>

  {/* Thông tin sản phẩm - Bên phải */}
  <div className="product-info-form">
    <h2 className="product-title">{product.name}</h2>
    <div className="rating mb-2">
      <Rating allowFraction readonly size={24} initialValue={product.rating} />
    </div>
    <p className="product-price-form">{product.price} VNĐ</p>
    <p className="product-description-form">{product.description}</p>
    <p><strong>Số lượng:</strong> {product.quantity}</p>
    <p><strong>Size:</strong> {product.size}</p>
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
