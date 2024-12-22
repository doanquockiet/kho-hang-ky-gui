import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, Form, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './TinMoi.css';

interface Product {
  id: string;
  name: string;
  images: string[]; // Updated to handle multiple images
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
          images: product.images, // Handle multiple images
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
      updatedProducts = updatedProducts.filter((product) => product.category === filterCategory);
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
        <h4>Tin Mới Đăng</h4>
      </div>

      {/* Bộ lọc và sắp xếp */}
      <Row className="mb-4">
        <Col xs={6} md={3}>
          <Form.Select value={filterCategory} onChange={handleFilterChange}>
            <option value="">Tất cả</option>
            <option value="áo khoác">Áo khoác</option>
            <option value="áo thun">Áo thun</option>
            <option value="quần jeans">Quần jeans</option>
            <option value="quần âu">Quần Âu</option>
            <option value="quần short">Quần Short</option>
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
        {filteredProducts.map((product) => (
          <Col xs={12} md={4} lg={3} className="mb-4" key={product.id}>
            <div className="product-card shadow-sm">
              <Link to={`/product/${product.id}`} className="image-product" state={{ productId: product.id }}>
                <img src={product.images[0]} alt={product.name} />
              </Link>

              <div className="product-hover-content">
                <Button
                  variant="dark"
                  size="sm"
                  className="me-2"
                  onClick={() => handleShowQuickView(product)}
                >
                  Xem nhanh
                </Button>
                <Link to={`/product/${product.id}`}>
                  <Button variant="primary" size="sm">Mua ngay</Button>
                </Link>
              </div>
              <div className="product-info text-center mt-2">
                <h6 className="product-name">{product.name}</h6>
                <p className="product-price">{formatPrice(product.price)}</p>
              </div>
            </div>
          </Col>
        ))}
      </Row>

      {/* Modal chi tiết sản phẩm */}
      <Modal show={showModal} onHide={handleCloseModal} animation size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{selectedProduct?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          {selectedProduct?.images.map((image, index) => (
            <Link to={`/product/${selectedProduct?.id}`} key={index}>
              <img
                src={image}
                alt={`${selectedProduct?.name} ${index + 1}`}
                className="img-fluid mb-2"
                style={{ width: '100%' }}
              />
            </Link>
          ))}
          <p><strong>Giá:</strong> {formatPrice(selectedProduct?.price || 0)}</p>
          <p><strong>Size:</strong> {selectedProduct?.size}</p>
          <p><strong>Số lượng:</strong> {selectedProduct?.quantity}</p>
          <p><strong>Mô tả:</strong> {selectedProduct?.description}</p>
          <Link to={`/product/${selectedProduct?.id}`}>
            <Button variant="dark" className="w-100">Thêm vào giỏ</Button>
          </Link>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default TinMoi;
