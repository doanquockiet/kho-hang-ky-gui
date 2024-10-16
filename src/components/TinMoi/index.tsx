import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './TinMoi.css';
import ao1 from '../../assets/sanpham/ao1.jpg'
import ao2 from '../../assets/sanpham/ao2.jpg'
import ao3 from '../../assets/sanpham/ao3.jpg'
import ao4 from '../../assets/sanpham/ao4.jpg'
import ao5 from '../../assets/sanpham/clmgiz.jpg'
import quan1 from '../../assets/sanpham/quan1.jpg'
import quan2 from '../../assets/sanpham/quan2.jpg'

const Tinmoi = () => {
  const products = [
    { id: 1, name: 'Sản phẩm 1', price: '100,000', location: 'Vĩnh Long', time: '24 Giờ Trước',image: ao1 },
    { id: 2, name: 'Sản phẩm 2', price: '100,000', location: 'Cần Thơ', time: '12 Giờ Trước',image: ao2 },
    { id: 3, name: 'Sản phẩm 3', price: '100,000', location: 'Hồ Chí Minh', time: '1 Giờ Trước',image: ao3 },
    { id: 4, name: 'Sản phẩm 4', price: '100,000', location: 'Hà Nội', time: '3 Giờ Trước',image: ao4 },
    { id: 5, name: 'Sản phẩm 5', price: '100,000', location: 'Đà Nẵng', time: '6 Giờ Trước',image: ao5 },
    { id: 6, name: 'Sản phẩm 6', price: '100,000', location: 'Huế', time: '2 Giờ Trước',image: quan1 },
    { id: 8, name: 'Sản phẩm 7', price: '100,000', location: 'Huế', time: '2 Giờ Trước',image: quan2 },
    { id: 9, name: 'Sản phẩm 8', price: '100,000', location: 'Huế', time: '2 Giờ Trước',image: ao1 },
    { id: 10, name: 'Sản phẩm 9', price: '100,000', location: 'Huế', time: '2 Giờ Trước',image: ao4 },
    { id: 11, name: 'Sản phẩm 10', price: '100,000', location: 'Huế', time: '2 Giờ Trước',image: ao1 },
    { id: 12, name: 'Sản phẩm 11', price: '100,000', location: 'Huế', time: '2 Giờ Trước',image: ao1 },
    { id: 13, name: 'Sản phẩm 12', price: '100,000', location: 'Huế', time: '2 Giờ Trước',image: ao1 },
    { id: 14, name: 'Sản phẩm 13', price: '100,000', location: 'Huế', time: '2 Giờ Trước',image: ao1 },
  ];

  return (
    <Container className='mt-4'>
      <div className="title">
        <h4>Tin Mới Đăng</h4>
      </div>
      <Row>
        {products.map((product) => (
          <Col md={2} key={product.id} className="mb-4 wrap-product">
            <Link to={`/product/${product.id}`} state={{ product, products }}> {/* Truyền cả sản phẩm và danh sách sản phẩm */}
              <div className="product-item">
                <div className="image-product">
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="infor-product">
                  <p>{product.name}</p>
                  <span className="price-product">{product.price} VNĐ</span>
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
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Tinmoi;