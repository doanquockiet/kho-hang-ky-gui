import React, { useState, ChangeEvent, FormEvent } from 'react';
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
  // Form state
  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [category, setCategory] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [rating, setRating] = useState<number>(0); 
  const [quantity, setQuantity] = useState<number>(0);
  const [size, setSize] = useState<string>(''); 
  const [image, setImage] = useState<File | null>(null); 
  const [imageUrl, setImageUrl] = useState<string>(''); 
  const [progress, setProgress] = useState<number>(0); 
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false); 
  const [uploadError, setUploadError] = useState<string | null>(null); 

        const token = localStorage.getItem('token'); // Ensure user is logged in and token is available
        console.log("check tokent ==>? ", token);
  // Handle image file selection
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  // Upload the image to Firebase and get the URL
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
              console.log('Image uploaded successfully. URL:', url);
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

  // Submit the form data, including the image URL, to the backend API
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (isSubmitting) {
      return; // Prevent double submission
    }

    setIsSubmitting(true);
    setUploadError(null); // Reset error

    // Upload the image if it's not yet uploaded
    if (!imageUrl && image) {
      try {
        await uploadImage();
      } catch (error) {
        console.error('Error uploading image:', error);
        setIsSubmitting(false); // Reset submission flag if image upload fails
        return;
      }
    }

    // Prepare the product data to send to the backend
    const productData: ProductData = {
      name,
      price: Number(price),
      category,
      description,
      image: imageUrl, // Ensure image URL is present before calling the backend
      rating,
      quantity,
      size,
    };

    try {

      
      // Send the product data to the backend API with the Authorization header
      const response = await axios.post('http://localhost:8080/api/products', productData, {
        headers: {
          Authorization: `Bearer ${token}`, // Add the token to the Authorization header
          'Content-Type': 'application/json',
        },
      });

      console.log('Product added successfully', response.data);

      // Reset the form after successful submission
      setName('');
      setPrice(0);
      setCategory('');
      setDescription('');
      setRating(0);
      setQuantity(0);
      setSize('');
      setImage(null);
      setImageUrl('');
      setProgress(0);
    } catch (error) {
      console.error('Error adding product:', error);
    } finally {
      // Reset submission flag once done
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mt-5">
  <h1 className="mb-4">Add New Product</h1>
  <form onSubmit={handleSubmit}>
    <div className="mb-3">
      <label className="form-label">Product Name:</label>
      <input
        type="text"
        className="form-control"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
    </div>

    <div className="mb-3">
      <label className="form-label">Price:</label>
      <input
        type="number"
        className="form-control"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
        required
      />
    </div>

    <div className="mb-3">
      <label className="form-label">Category:</label>
      <input
        type="text"
        className="form-control"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      />
    </div>

    <div className="mb-3">
      <label className="form-label">Description:</label>
      <textarea
        className="form-control"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
    </div>

    <div className="mb-3">
      <label className="form-label">Rating:</label>
      <input
        type="number"
        className="form-control"
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        required
      />
    </div>

    <div className="mb-3">
      <label className="form-label">Quantity:</label>
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
      <label className="form-label">Product Image:</label>
      <input
        type="file"
      multiple        
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
