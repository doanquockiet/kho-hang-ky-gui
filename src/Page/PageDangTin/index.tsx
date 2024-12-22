import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, CircularProgress, Grid, Typography, Box, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

interface ProductData {
  name: string;
  price: number;
  category: string;
  description: string;
  images: string[];
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
  const [images, setImages] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const token = localStorage.getItem('token');

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setImages((prevImages) => [...prevImages, ...files]);
    }
  };

  const uploadImages = (): Promise<void> => {
    return new Promise(async (resolve, reject) => {
      if (images.length === 0) {
        reject(new Error('No images selected.'));
        return;
      }

      try {
        const uploadedUrls = [];
        for (const image of images) {
          const formData = new FormData();
          formData.append('file', image);
          formData.append("upload_preset", "ChoDoCU");
          formData.append("cloud_name", "dkojewwdy");

          const response = await axios.post('https://api.cloudinary.com/v1_1/dkojewwdy/image/upload', formData);
          uploadedUrls.push(response.data.secure_url);
        }
        setImageUrls(uploadedUrls);
        resolve();
      } catch (error) {
        console.error('Error uploading images:', error);
        setUploadError('Error uploading images to Cloudinary.');
        reject(error);
      }
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);
    setUploadError(null);

    if (imageUrls.length === 0 && images.length > 0) {
      try {
        await uploadImages();
      } catch (error) {
        setIsSubmitting(false);
        return;
      }
    }

    const productData: ProductData = {
      name,
      price: parseFloat(price),
      category,
      description,
      images: imageUrls,
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
      resetForm();
      setTimeout(() => navigate('/'), 2000);
    } catch (error) {
      console.error('Error adding product:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setName('');
    setPrice('');
    setCategory('áo khoác');
    setDescription('');
    setRating('');
    setQuantity(1);
    setSize('');
    setImages([]);
    setImageUrls([]);
  };

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', marginTop: 5, padding: 3, boxShadow: 3 }}>
      <Typography variant="h4" gutterBottom align="center">Thêm sản phẩm mới</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Tên sản phẩm"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Giá"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              type="number"
              inputProps={{
                min: 0,
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>Loại</InputLabel>
              <Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                label="Loại"
              >
                <MenuItem value="áo khoác">Áo khoác</MenuItem>
                <MenuItem value="áo thun">Áo thun</MenuItem>
                <MenuItem value="quần jeans">Quần jeans</MenuItem>
                <MenuItem value="quần âu">Quần âu</MenuItem>
                <MenuItem value="quần short">Quần short</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Mô tả"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              multiline
              rows={4}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Đánh giá"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              required
              type="number"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Số lượng"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              required
              type="number"
              inputProps={{
                min: 1,
              }}
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <FormControl fullWidth required>
              <InputLabel>Size</InputLabel>
              <Select
                value={size}
                onChange={(e) => setSize(e.target.value)}
                label="Size"
              >
                <MenuItem value="S">S</MenuItem>
                <MenuItem value="M">M</MenuItem>
                <MenuItem value="L">L</MenuItem>
                <MenuItem value="XL">XL</MenuItem>
                <MenuItem value="XXL">XXL</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Button variant="contained" component="label" fullWidth>
              Chọn hình ảnh
              <input
                type="file"
                hidden
                multiple
                onChange={handleImageChange}
                required
              />
            </Button>
          </Grid>

          {uploadError && <Grid item xs={12}><Typography color="error">{uploadError}</Typography></Grid>}
          {successMessage && <Grid item xs={12}><Typography color="success">{successMessage}</Typography></Grid>}

          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Đang thêm sản phẩm..." : "Thêm sản phẩm"}
            </Button>
          </Grid>
        </Grid>
      </form>

      {imageUrls.length > 0 && (
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Typography variant="h6">Hình ảnh đã tải lên:</Typography>
          <Grid container spacing={2}>
            {imageUrls.map((url, index) => (
              <Grid item xs={4} key={index}>
                <img src={url} alt={`Product ${index + 1}`} style={{ width: '100%' }} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default AddProductForm;