import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, Form, Modal } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './TinMoi.css';

interface Product {
  id: string;
  name: string;
  images: string[];
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
  const navigate = useNavigate();

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/products');
        const fetchedProducts = response.data.map((product: any) => ({
          id: product._id,
          name: product.name,
          images: product.images,
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

    if (filterCategory) {
      updatedProducts = updatedProducts.filter((product) => product.category === filterCategory);
    }

    updatedProducts.sort((a, b) =>
      sortOrder === 'asc' ? a.price - b.price : b.price - a.price
    );

    setFilteredProducts(updatedProducts);
  }, [filterCategory, sortOrder, products]);

  // Add product to cart
  const addToCart = async (productId: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:8080/api/cart/add',
        { productId, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('Add to cart response:', response.data);

      // Dispatch a custom event to update the cart count
      const updatedCount = response.data.cart.items.reduce((total: number, item: any) => total + item.quantity, 0);
      const event = new CustomEvent('updateCartCount', { detail: updatedCount });
      window.dispatchEvent(event);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  // Handle "Mua Ngay"
  const handleBuyNow = async (productId: string) => {
    await addToCart(productId); // Add product to cart
    navigate('/cart'); // Redirect to Cart page
  };

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
      {/* Filter and Sorting */}
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

      {/* Product List */}
      <Row>
        {filteredProducts.map((product) => (
          <Col xs={12} md={4} lg={2} className="mb-4" key={product.id}>
            <div className="product-card shadow-sm">
              <Link
                to={`/product/${product.id}`}
                className="image-product"
                state={{ productId: product.id }}
                style={{ pointerEvents: product.quantity === 0 ? 'none' : 'auto' }}
              >
                <img
                  src={product.images[0]}
                  alt={product.name}
                  style={{
                    filter: product.quantity === 0 ? 'grayscale(100%)' : 'none',
                  }}
                />
              </Link>

              {product.quantity === 0 && (
                <div className="sold-out-overlay">
                  <span>Sold Out</span>
                </div>
              )}

              <div className="product-hover-content">
                <Button
                  variant="dark"
                  size="sm"
                  onClick={() => handleShowQuickView(product)}
                  disabled={product.quantity === 0}
                >
                  Xem nhanh
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleBuyNow(product.id)}
                  disabled={product.quantity === 0}
                >
                  Mua ngay
                </Button>
              </div>
              <div className="product-info text-center mt-2">
                <h6 className="product-name">{product.name}</h6>
                <p className="product-price">{formatPrice(product.price)}</p>
              </div>
            </div>
          </Col>
        ))}
      </Row>

      {/* Quick View Modal */}
      <Modal show={showModal} onHide={handleCloseModal} animation size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{selectedProduct?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="product-details-modal">
          <div className="product-image-modal text-center mb-3">
            {selectedProduct?.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${selectedProduct?.name} ${index + 1}`}
                className="img-fluid mb-2"
                style={{ maxHeight: '300px', objectFit: 'contain' }}
              />
            ))}
          </div>
          <div className="product-details">
            <p>
              <strong>Giá:</strong> {formatPrice(selectedProduct?.price || 0)}
            </p>
            <p>
              <strong>Size:</strong> {selectedProduct?.size}
            </p>
            <p>
              <strong>Mô tả:</strong> {selectedProduct?.description}
            </p>
          </div>
          <Button
            variant="dark"
            className="w-100"
            onClick={() => addToCart(selectedProduct?.id || '')}
            disabled={selectedProduct?.quantity === 0}
          >
            {selectedProduct?.quantity === 0 ? 'Sold Out' : 'Thêm vào giỏ'}
          </Button>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default TinMoi;
