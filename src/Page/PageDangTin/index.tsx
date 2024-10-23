import React, { useState } from 'react'
import axios from 'axios';
import { Form, Button, Col, Row } from 'react-bootstrap';
import Header from '../../components/Header';
const PageDangtin = () => {
    const [productData, setProductData] = useState({
        type: '',        // Empty string for type
        size: '',        // Empty string for size
        quantity: '',    // Empty string for quantity
        image: '',       // Image file will be uploaded
        uploader: '6710af10bb08007b7fc13ec1', // Fixed uploader ID
        rating: '',      // Empty string for rating
        description: ''  // Empty string for description
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProductData({
            ...productData,
            [name]: value
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('type', productData.type);
        formData.append('size', productData.size);
        formData.append('quantity', String(productData.quantity)); // Convert quantity to string
        formData.append('uploader', productData.uploader); // Fixed uploader ID
        formData.append('rating', String(productData.rating)); // Convert rating to string
        formData.append('description', productData.description);
        formData.append('image', productData.image);  

        try {
            const response = await axios.post('http://localhost:5000/api/products/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            console.log(response.data);
            alert('Product added successfully!');
            // Reset form after successful submission
            setProductData({
                type: '',
                size: '',
                quantity: '',
                image: '',
                uploader: '6710af10bb08007b7fc13ec1', // Reset to fixed uploader ID
                rating: '',
                description: '',
            });
        } catch (error) {
            console.error(error);
            alert('Error adding product.');
        }
    };

    return (
        <>
        <Header/>
       <div className="container">
         <Form onSubmit={handleSubmit} encType="multipart/form-data">
            <Row>
                <Col>
                    <Form.Group controlId="type">
                        <Form.Label>Type</Form.Label>
                        <Form.Control
                            type="text"
                            name="type"
                            value={productData.type}
                            onChange={handleChange}
                            placeholder="Enter product type"
                            required
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="size">
                        <Form.Label>Size</Form.Label>
                        <Form.Control
                            type="text"
                            name="size"
                            value={productData.size}
                            onChange={handleChange}
                            placeholder="Enter product size"
                            required
                        />
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Form.Group controlId="quantity">
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control
                            type="number"
                            name="quantity"
                            value={productData.quantity}
                            onChange={handleChange}
                            placeholder="Enter quantity"
                            required
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="rating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                            type="number"
                            name="rating"
                            step="0.1"
                            max="5"
                            value={productData.rating}
                            onChange={handleChange}
                            placeholder="Enter rating (0-5)"
                            required
                        />
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Form.Group controlId="image">
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                            type="file"
                            name="image"
                           
                            accept="image/*"
                            required
                        />
                    </Form.Group>
                </Col>
            </Row>

            <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                    as="textarea"
                    name="description"
                    value={productData.description}
                    onChange={handleChange}
                    placeholder="Enter product description"
                    rows={3}
                    required
                />
            </Form.Group>

            <Button variant="primary" type="submit">
                Add Product
            </Button>
        </Form>
       </div>
       </>
    );
};

export default PageDangtin
