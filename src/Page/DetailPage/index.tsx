import { useLocation, useNavigate } from "react-router-dom"; // Import useNavigate
import {
  Row,
  Col,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import { Rating } from "react-simple-star-rating";

import './DetailPage.css';

const DetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Create a navigate function
  const { product } = location.state || {};

  if (!product) {
    return <p>Product not found.</p>;
  }

  const quantityOptions = Array.from(Array(10).keys());


  return (
    <div className="product-details">
      <Row>
        <Col sm="12" md="6">
          <div className="image-wrapper">
            <CardImg
              className="card-img"
              src={product.image}
              alt={product.name}
            />
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
            <CardSubtitle className="product-price"><strong>Price: {product.price} VNĐ</strong></CardSubtitle>
            <CardSubtitle style={{fontSize: '20px'}}>  {`Location: `}<strong>{product.location}</strong></CardSubtitle>
            <CardSubtitle style={{fontSize: '20px'}}>{`Posted: `}<strong>{product.time}</strong></CardSubtitle>
            <div>
              <CardSubtitle style={{fontSize: '20px'}}>Sizes:</CardSubtitle>
              <div className="sizes">
                
              </div>
            </div>
            <div>
              <CardSubtitle></CardSubtitle>
              <div className="colours">
                
              </div>
              <FormGroup className="quantity">
                <Label for="quantitySelect">Selected Quantity</Label>
                <Input
                  type="select"
                  name="quantity"
                  id="quantitySelect"
                  
                >
                  {quantityOptions.map((number) => (
                    <option key={number} value={number + 1}>
                      {number + 1}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </div>
            <div className="button-container">
              <Button
                color="primary"
                className="add-to-basket-button"
                onClick={() => {
               
                }}
                style={{ flex: 1 }} // Make button take up available space
              >
                Add to basket
              </Button>
              <Button
                color="secondary"
                className="back-to-home-button"
                onClick={() => navigate('/')} // Navigate to home on click
                style={{ flex: 1, marginLeft: '10px' }} // Make button take up available space
              >
                Back to Home
              </Button>
            </div>
          </CardBody>
        </Col>
      </Row>
    </div>
  );
};

export default DetailPage;
