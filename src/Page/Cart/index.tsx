import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../components/Header";
import Footer from "../../components/Footer/Footer";
import "./CartPage.css";
import DeleteIcon from "@mui/icons-material/Delete";

interface CartItem {
  product: {
    id?: string; // Optional for flexibility
    _id?: string;
    name: string;
    price: string;
    images: string[];
    size: string;
    category: string;
  };
  quantity: number;
}

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8080/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.items) {
        setCartItems(response.data.items);
        updateHeaderCartCount(response.data.items);
      } else {
        setCartItems([]);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleRemoveItem = async (productId: string) => {
    console.log(`[REMOVE ITEM] Start removing product with ID: ${productId}`);

    try {
      const token = localStorage.getItem("token");

      const response = await axios.delete(`http://localhost:8080/api/cart/remove/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });


      if (response.status === 200) {
        await fetchCart();
      }
    } catch (error) {
    }
  };

  const updateHeaderCartCount = (items: CartItem[]) => {
    const totalItems = items.reduce((total, item) => total + item.quantity, 0);
    const event = new CustomEvent("updateCartCount", { detail: totalItems });
    window.dispatchEvent(event);
  };

  if (loading) {
    return <p>Loading cart...</p>;
  }

  return (
    <div>
      <Header />
      <div className="cart-page">
        <h2>Giỏ Hàng</h2>
        {cartItems.length === 0 ? (
          <p>Giỏ hàng của bạn đang trống.</p>
        ) : (
          <ul>
            {cartItems.map((item, index) => (
              <li key={index}>
                <img src={item.product.images[0]} alt={item.product.name} />
                <div>
                  <h3>{item.product.name}</h3>
                  <p>Giá: {item.product.price} VNĐ</p>
                  <p>Số lượng: {item.quantity}</p>
                  <p>Size: {item.product.size}</p>
                  <p>Loại: {item.product.category}</p>
                </div>
                <button
                  className="delete-button"
                  onClick={() => {
                    const productId = item.product.id || item.product._id;
                    if (productId) {
                      handleRemoveItem(productId);
                    } else {
                    }
                  }}
                >
                  <DeleteIcon />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
