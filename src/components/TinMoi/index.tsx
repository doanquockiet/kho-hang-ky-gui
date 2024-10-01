import { Container, Row, Col } from 'react-bootstrap';
import productImage from '../../assets/sanpham/sanpham2.svg';
import './TinMoi.css';

const Tinmoi = () => {
  const products = [
    { id: 1, name: 'Sản phẩm 1', price: '1.000.000đ', location: 'Vĩnh Long', time: '24 Giờ Trước' },
    { id: 2, name: 'Sản phẩm 2', price: '2.000.000đ', location: 'Cần Thơ', time: '12 Giờ Trước' },
    { id: 3, name: 'Sản phẩm 3', price: '3.000.000đ', location: 'Hồ Chí Minh', time: '1 Giờ Trước' },
    { id: 4, name: 'Sản phẩm 4', price: '4.000.000đ', location: 'Hà Nội', time: '3 Giờ Trước' },
    { id: 5, name: 'Sản phẩm 5', price: '5.000.000đ', location: 'Đà Nẵng', time: '6 Giờ Trước' },
    { id: 6, name: 'Sản phẩm 6', price: '6.000.000đ', location: 'Huế', time: '2 Giờ Trước' },
    { id: 8, name: 'Sản phẩm 7', price: '8.000.000đ', location: 'Huế', time: '2 Giờ Trước' },
    { id: 9, name: 'Sản phẩm 8', price: '6.000.000đ', location: 'Huế', time: '2 Giờ Trước' },
    { id: 10, name: 'Sản phẩm 9', price: '9.000.000đ', location: 'Huế', time: '2 Giờ Trước' },
    { id: 11, name: 'Sản phẩm 10', price: '6.000.000đ', location: 'Huế', time: '2 Giờ Trước' },
    { id: 12, name: 'Sản phẩm 11', price: '6.000.000đ', location: 'Huế', time: '2 Giờ Trước' },
    { id: 13, name: 'Sản phẩm 12', price: '3.000.000đ', location: 'Huế', time: '2 Giờ Trước' },
    { id: 14, name: 'Sản phẩm 13', price: '7.000.000đ', location: 'Huế', time: '2 Giờ Trước' },
  ];

  return (
    <Container className='mt-4'>
      <div className="title">
        <h4>Tin Mới Đăng</h4>
      </div>
      <Row>
        {products.map((product, index) => (
          <Col md={2} key={index} className="mb-4 wrap-product">
            <a href="#">
              <div className="product-item">
                <div className="image-product">
                  <img src={productImage} alt={product.name} />
                </div>
                <div className="infor-product">
                  <p>{product.name}</p>
                  
                  <span className="price-product">{product.price}</span>
                </div>
                <div className="address">
                  <div className="time-update">
                    <p>{product.time}</p>
                  </div>
                  <div className="address-update">
                    <p>{product.location}</p>
                  </div>
                </div>
              </div>
            </a>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Tinmoi;
