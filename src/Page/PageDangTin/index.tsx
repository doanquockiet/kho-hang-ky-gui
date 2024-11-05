import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../config/firebase';

// Define the types for the form fields
interface ProductData {
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
  rating: number;
  quantity: number;
  size: string;
}

const AddProductForm: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<string>(''); 
  const [category, setCategory] = useState<string>('áo khoác'); // Default option
  const [description, setDescription] = useState<string>('');
  const [rating, setRating] = useState<string>(''); 
  const [quantity, setQuantity] = useState<number>(0);
  const [size, setSize] = useState<string>(''); 
  const [image, setImage] = useState<File | null>(null); 
  const [imageUrl, setImageUrl] = useState<string>(''); 
  const [progress, setProgress] = useState<number>(0); 
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false); 
  const [uploadError, setUploadError] = useState<string | null>(null); 
  const [successMessage, setSuccessMessage] = useState<string | null>(null); 

  const token = localStorage.getItem('token');

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const uploadImage = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (!image) {
        reject(new Error('No image selected.'));
        return;
      }

      const fileName = `${Date.now()}_${image.name}`;
      const storageRef = ref(storage, `images/${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
        },
        (error) => {
          console.error('Error uploading image:', error);
          setUploadError('Error uploading image.');
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((url) => {
              setImageUrl(url);
              resolve();
            })
            .catch((error) => {
              console.error('Error getting download URL:', error);
              setUploadError('Error getting image URL.');
              reject(error);
            });
        }
      );
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (isSubmitting) {
      return; 
    }

    setIsSubmitting(true);
    setUploadError(null); 

    if (!imageUrl && image) {
      try {
        await uploadImage();
      } catch (error) {
        console.error('Error uploading image:', error);
        setIsSubmitting(false); 
        return;
      }
    }

    const productData: ProductData = {
      name,
      price: parseFloat(price), 
      category,
      description,
      image: imageUrl, 
      rating: parseFloat(rating), 
      quantity,
      size,
    };

    try {
      const response = await axios.post('http://localhost:8080/api/products', productData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      setSuccessMessage('Sản phẩm đã được thêm thành công!');
      
      console.log("check response", response);
      
      setName('');
      setPrice('');
      setCategory('áo khoác'); // Reset to default option
      setDescription('');
      setRating('');
      setQuantity(1);
      setSize('');
      setImage(null);
      setImageUrl('');
      setProgress(0);

      // Redirect to the home page after a delay
      setTimeout(() => {
        navigate('/'); // Redirect to home page
      }, 2000); // Adjust the delay as needed
    } catch (error) {
      console.error('Error adding product:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Thêm sản phẩm mới</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Tên sản phẩm:</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Giá:</label>
          <input
            type="text" 
            className="form-control"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Loại:</label>
          <select
            className="form-control"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="áo khoác">Áo khoác</option>
            <option value="áo thun">Áo thun</option>
            <option value="quần jeans">Quần jeans</option>
            <option value="quần âu">Quần âu</option>
            <option value="quần short">Quần short</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Mô tả:</label>
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Đánh giá:</label>
          <input
            type="text" 
            className="form-control"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Số lượng:</label>
          <input
            type="number"
            className="form-control"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Size:</label>
          <input
            type="text"
            className="form-control"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Hình ảnh:</label>
          <input
            type="file"
            className="form-control"
            onChange={handleImageChange}
            required
          />
        </div>

        {progress > 0 && (
          <div className="mb-3">
            <div className="progress">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: `${progress}%` }}
              >
                Uploading image: {progress}%
              </div>
            </div>
          </div>
        )}

        {uploadError && <p className="text-danger">{uploadError}</p>}
        {successMessage && <p className="text-success">{successMessage}</p>}

        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? "Adding Product..." : "Add Product"}
        </button>
      </form>

      {imageUrl && (
        <div className="mt-4">
          <h3>Uploaded Image:</h3>
          <img src={imageUrl} alt="Product" className="img-thumbnail" style={{ width: "200px" }} />
        </div>
      )}
    </div>
  );
};

export default AddProductForm;
