import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './TinMoi.css';

interface Product {
  id: string;
  name: string;
  image: string;
  rating: number;
  quantity: number;
  size: string;
  price: number;
  category: string; // Added category field
}

const TinMoi: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [filterCategory, setFilterCategory] = useState<string>(''); // State for selected category

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/products');
        const fetchedProducts = response.data.map((product: any) => ({
          id: product._id,
          name: product.name,
          image: product.image,
          rating: product.rating,
          quantity: product.quantity,
          size: product.size,
          price: product.price,
          category: product.category, // Extract category
        }));
        setProducts(fetchedProducts);
        setFilteredProducts(fetchedProducts); // Initially show all products
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Format price as currency
  const formatPrice = (price: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

  // Render stars based on rating
  const renderStars = (rating: number): JSX.Element[] => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const stars: JSX.Element[] = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={i} className="fas fa-star text-warning"></i>);
    }
    if (halfStar) {
      stars.push(<i key="half" className="fas fa-star-half-alt text-warning"></i>);
    }
    return stars;
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterCategory(e.target.value);
  };

  const applyFilter = () => {
    if (filterCategory === '') {
      setFilteredProducts(products); // Show all products if no filter is selected
    } else {
      const filtered = products.filter(product => product.category === filterCategory);
      setFilteredProducts(filtered);
    }
  };

  return (
    <Container className="mt-4">
      <div className="title mb-4">
        <h4>Tin Mới Đăng</h4>
      </div>

      <Row className="mb-4">
        <Col xs={3}>
          <Form.Select value={filterCategory} onChange={handleFilterChange} aria-label="Lọc theo loại">
            <option value="">Tất cả</option>
            <option value="áo khoác">Áo khoác</option>
            <option value="áo thun">Áo thun</option>
            <option value="quần jeans">Quần jeans</option>
            <option value="quần âu">Quần âu</option>
            <option value="quần short">Quần short</option>
          </Form.Select>
        </Col>
        <Col xs={4}>
          <Button variant="primary" onClick={applyFilter}>Lọc sản phẩm</Button>
        </Col>
      </Row>

      <Row>
        {filteredProducts.map((product) => (
          <Col md={6} lg={4} xl={3} className="mb-4" key={product.id}>
            <Card className="h-100 shadow-sm">
              <Link to={`/product/${product.id}`} state={{ productId: product.id }} className="text-decoration-none text-dark">
                <div className="image-product">
                  <Card.Img variant="top" src={product.image} alt={product.name} />
                </div>
                <Card.Body>
                  <Card.Title className="fs-6">{product.name}</Card.Title>
                  <Card.Text className="text-muted mb-2">
                    {renderStars(product.rating)}
                  </Card.Text>
                  <Card.Text>
                    <strong>Price:</strong> {formatPrice(product.price)} <br />
                    <strong>Quality:</strong> {product.quantity} <br />
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

export default TinMoi;
