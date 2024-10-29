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
  location: string;
  time: string;
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

      <div className="product-details">
        <Row>
          <Col sm="12" md="6">
            <div className="image-wrapper">
              <CardImg className="card-img" src={product.image} alt={product.name} />
            </div>
          </Col>
          <Col sm="12" md="6">
            <CardBody>
              <CardTitle tag="h2" className="product-title">{product.name}</CardTitle>
              <CardText className="product-description">{product.description || "No description available."}</CardText>
              <div className="rating">
                <Rating allowFraction readonly size={24} initialValue={product.rating} />
                {/* <span>{`${product.rating} ratings`}</span> */}
              </div>
              <CardText><strong>Price:</strong> {product.price} VNĐ</CardText>
              {/* <CardText><strong>Location:</strong> {product.location}</CardText>
              <CardText><strong>Posted:</strong> {product.time}</CardText> */}
              <CardText><strong>Quantity:</strong> {product.quantity}</CardText>
              <CardText><strong>Size:</strong> {product.size}</CardText>

              <div className="button-container">
                <Button color="primary" className="add-to-basket-button" onClick={() => {}}>Add to basket</Button>
                <Button color="secondary" className="back-to-home-button" onClick={() => navigate('/')} style={{ marginLeft: '10px' }}>Back to Home</Button>
              </div>
            </CardBody>
          </Col>
        </Row>
      </div>

      <Footer />
    </div>
  );
};

export default DetailPage;
