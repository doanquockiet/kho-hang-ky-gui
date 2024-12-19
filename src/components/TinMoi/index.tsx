import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Form, Modal } from 'react-bootstrap';
import './TinMoi.css';
import { Link } from 'react-router-dom';

interface Product {
  id: string;
  name: string;
  image: string;
  rating: number;
  quantity: number;
  size: string;
  price: number;
  category: string;
  description: string;
}

const TinMoi: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [filterCategory, setFilterCategory] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('asc');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch products from API
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
          category: product.category,
          description: product.description,
        }));
        setProducts(fetchedProducts);
        setFilteredProducts(fetchedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  // Format price as currency
  const formatPrice = (price: number) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

  // Render stars based on rating
  const renderStars = (rating: number | undefined): JSX.Element[] => {
    if (!rating) return [];
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


  // Handle category filter
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterCategory(e.target.value);
  };

  // Handle sorting
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value);
  };

  // Apply filter and sorting
  useEffect(() => {
    let updatedProducts = [...products];

    // Filter products
    if (filterCategory) {
      updatedProducts = updatedProducts.filter(product => product.category === filterCategory);
    }

    // Sort products
    updatedProducts.sort((a, b) =>
      sortOrder === 'asc' ? a.price - b.price : b.price - a.price
    );

    setFilteredProducts(updatedProducts);
  }, [filterCategory, sortOrder, products]);

  // Open Modal
  const handleShowQuickView = (product: Product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  // Close Modal
  const handleCloseModal = () => {
    setSelectedProduct(null);
    setShowModal(false);
  };

  return (
    <Container className="mt-4">
      <div className="title mb-4 text-center">
        <h4>Sản Phẩm Mới</h4>
      </div>

      {/* Bộ lọc và sắp xếp */}
      <Row className="mb-4">
        <Col xs={6} md={3}>
          <Form.Select value={filterCategory} onChange={handleFilterChange}>
            <option value="">Tất cả</option>
            <option value="áo khoác">Áo khoác</option>
            <option value="áo thun">Áo thun</option>
            <option value="quần jeans">Quần jeans</option>
          </Form.Select>
        </Col>
        <Col xs={6} md={3}>
          <Form.Select value={sortOrder} onChange={handleSortChange}>
            <option value="asc">Giá: Thấp đến Cao</option>
            <option value="desc">Giá: Cao đến Thấp</option>
          </Form.Select>
        </Col>
      </Row>

      {/* Danh sách sản phẩm */}
      <Row>
        {filteredProducts.map(product => (
          <Col xs={12} md={4} lg={3} className="mb-4" key={product.id}>
            <div className="product-card shadow-sm">
              {/* Hình sản phẩm bấm sẽ chuyển đến detail */}
              <Link to={`/product/${product.id}`} state={{ productId: product.id }} className="text-decoration-none">
                <div className="image-product">
                  <img src={product.image} alt={product.name} />
                </div>
              </Link>
              {/* Nút hover */}
              <div className="product-hover-content">
                <Button
                  variant="dark"
                  size="sm"
                  className="me-2"
                  onClick={(e) => {
                    e.preventDefault(); // Chặn Link bên trên
                    handleShowQuickView(product);
                  }}
                >
                  Xem nhanh
                </Button>
                <Button as={Link} to={`/product/${product.id}`} variant="primary" size="sm">
                  Mua ngay
                </Button>
              </div>
              {/* Thông tin sản phẩm */}
              <div className="product-info text-center mt-2">
                <h6 className="product-name">{product.name}</h6>
                <p className="product-price">{formatPrice(product.price)}</p>
              </div>
            </div>
          </Col>
        ))}
      </Row>
      <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
        <Modal.Header closeButton className="border-0">
          <Modal.Title className="fs-7">{selectedProduct?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            {/* Cột ảnh sản phẩm */}
            <Col md={6} className="d-flex justify-content-center align-items-center">
              <img
                src={selectedProduct?.image}
                alt={selectedProduct?.name}
                className="img-fluid w-100"
                style={{ maxHeight: '400px', objectFit: 'cover' }}
              />
            </Col>

            {/* Cột thông tin sản phẩm */}
            <Col md={6} className="d-flex flex-column justify-content-center">
              {/* Hiển thị rating sao nằm ngang */}
              <div className="d-flex align-items-center mb-3">
                {renderStars(selectedProduct?.rating)}
              </div>
              <h4 className="mb-3">{selectedProduct?.description}</h4>
              <p className="mb-2">
                <strong>Giá:</strong> {formatPrice(selectedProduct?.price || 0)}
              </p>
              <p className="mb-2">
                <strong>Size:</strong> {selectedProduct?.size}
              </p>
              <p className="mb-2">
                <strong>Số lượng:</strong> {selectedProduct?.quantity}
              </p>
              <Button variant="dark" className="w-100 py-2 md-4">
                Thêm vào giỏ hàng
              </Button>
            </Col>

          </Row>
        </Modal.Body>
      </Modal>


    </Container>
  );
};

export default TinMoi;
