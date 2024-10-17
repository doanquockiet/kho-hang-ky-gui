import { useLocation, useNavigate } from "react-router-dom";
import { Row, Col, CardImg, CardBody, CardTitle, CardText, Button } from "reactstrap";
import { Rating } from "react-simple-star-rating";
import { Link } from 'react-router-dom';
import './DetailPage.css';
import Header from "../../components/Header";

import Footer from "../../components/Footer/Footer";
// import '../../components/TinMoi/TinMoi.css'; // Import CSS của TinMoi để sử dụng cho giao diện gợi ý

// Định nghĩa kiểu dữ liệu cho sản phẩm
interface Product {
  id: number;
  name: string;
  price: string;
  location: string;
  time: string;
  image: string;
  description?: string; // Mô tả sản phẩm có thể không có
}

const DetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Kiểm tra xem `location.state` có tồn tại không và cung cấp giá trị mặc định
  const { product, products }: { product?: Product; products?: Product[] } = location.state || {};

  // Log sản phẩm và sản phẩm gợi ý để kiểm tra
  console.log(product, 'Product');
  console.log(products, 'Products Array');

  // Nếu không có product, hiển thị thông báo lỗi
  if (!product) {
    return <p>Product not found.</p>;
  }

  // Lọc các sản phẩm có ID lớn hơn sản phẩm hiện tại
  const greaterProducts = (products || []).filter(p => p.id > product.id);

  // Nếu số sản phẩm lớn hơn không đủ 6, lấy thêm các sản phẩm từ đầu (ID nhỏ hơn ID sản phẩm hiện tại)
  const additionalProductsNeeded = 6 - greaterProducts.length;
  const loopedProducts = (products || []).filter(p => p.id <= product.id).slice(0, additionalProductsNeeded);

  // Hợp nhất hai mảng lại để tạo danh sách sản phẩm gợi ý
  const suggestedProducts = [...greaterProducts, ...loopedProducts].slice(0, 6); // Đảm bảo chỉ lấy tối đa 6 sản phẩm

  return (
    <div>
      <Header/>
      
      {/* Hiển thị chi tiết sản phẩm */}
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
                <Rating allowFraction readonly size={24} initialValue={4.5} />
                <span>{`4 ratings`}</span>
              </div>
              <CardText><strong>Price: {product.price} VNĐ</strong></CardText>
              <CardText><strong>Location: {product.location}</strong></CardText>
              <CardText><strong>Posted: {product.time}</strong></CardText>

              <div className="button-container">
                <Button color="primary" className="add-to-basket-button" onClick={() => {}}>Add to basket</Button>
                <Button color="secondary" className="back-to-home-button" onClick={() => navigate('/')} style={{ marginLeft: '10px' }}>Back to Home</Button>
              </div>
            </CardBody>
          </Col>
        </Row>
      </div>

      {/* Hiển thị 6 sản phẩm gợi ý */}
      <div className="suggested-products mt-5">
        <h4>Sản phẩm gợi ý</h4>
        <Row>
          {suggestedProducts.map((suggestedProduct: Product) => (
            <Col md={2} key={suggestedProduct.id} className="mb-4 wrap-product">
              <Link to={`/product/${suggestedProduct.id}`} state={{ product: suggestedProduct, products }}>
                <div className="product-item">
                  <div className="image-product">
                    <img src={suggestedProduct.image} alt={suggestedProduct.name} />
                  </div>
                  <div className="infor-product">
                    <p>{suggestedProduct.name}</p>
                    <span className="price-product">{suggestedProduct.price} VNĐ</span>
                  </div>
                  <div className="address">
                    <div className="time-update">
                      <p>{suggestedProduct.time}</p>
                    </div>
                    <div className="address-update">
                      <p>{suggestedProduct.location}</p>
                    </div>
                  </div>
                </div>
              </Link>
            </Col>
          ))}
        </Row>
      </div>
      <Footer/>
    </div>
  );
};

export default DetailPage;