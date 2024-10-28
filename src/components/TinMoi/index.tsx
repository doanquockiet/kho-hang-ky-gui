import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './TinMoi.css';

interface Product {
  id: string;
  name: string;
  image: string;
  rating: number;
  quantity: number;
  size: string;
}

const Tinmoi: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/products');
        const filteredProducts = response.data.map((product: any) => ({
          id: product._id,
          name: product.name,
          image: product.image,
          rating: product.rating,
          quantity: product.quantity,
          size: product.size,
        }));
        setProducts(filteredProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Helper function to render star icons based on rating
  const renderStars = (rating: number): JSX.Element[] => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const stars: JSX.Element[] = []; // Specify the type as JSX.Element[]

    for (let i = 0; i < fullStars; i++) {
        stars.push(<i key={i} className="fas fa-star text-warning"></i>);
    }
    if (halfStar) {
        stars.push(<i key="half" className="fas fa-star-half-alt text-warning"></i>);
    }
    return stars;
};


  return (
    <Container className="mt-4">
      <div className="title mb-4">
        <h4>Tin Mới Đăng</h4>
      </div>
      <Row>
        {products.map((product) => (
          <Col md={4} lg={3} className="mb-4" key={product.id}>
            <Card className="h-100 shadow-sm">
              <Link to={`/product/${product.id}`} state={{ product, products }} className="text-decoration-none text-dark">
                <div className="image-product">
                  <Card.Img src={product.image} alt={product.name} />
                </div>
                <Card.Body>
                  <Card.Title className="fs-6">{product.name}</Card.Title>
                  <Card.Text className="text-muted mb-2">
                    {renderStars(product.rating)} {/* Display stars based on rating */}
                  </Card.Text>
                  <Card.Text>
                    <strong>Quantity:</strong> {product.quantity} <br />
                    <strong>Size:</strong> {product.size}
                  </Card.Text>
                </Card.Body>
              </Link>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Tinmoi;
