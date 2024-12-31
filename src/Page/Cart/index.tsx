import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../components/Header";
import Footer from "../../components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import "./CartPage.css";
import DeleteIcon from "@mui/icons-material/Delete";

interface CartItem {
  product: {
    id?: string;
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
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch cart items
  const fetchCart = async () => {
    setLoading(true);
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
        updateHeaderCartCount([]);
      }
    } catch (error) {
      console.error("[FETCH CART ERROR]:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Remove an item from the cart
  const handleRemoveItem = async (productId: string) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `http://localhost:8080/api/cart/remove/${productId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        fetchCart();
      }
    } catch (error) {
      console.error("[REMOVE ITEM ERROR]:", error);
    }
  };

  // Select an item
  const handleSelectItem = (productId: string, isSelected: boolean) => {
    if (isSelected) {
      setSelectedItems((prev) => [...prev, productId]);
    } else {
      setSelectedItems((prev) => prev.filter((id) => id !== productId));
    }
  };

  // Select or deselect all items
  const handleSelectAll = (isSelected: boolean) => {
    if (isSelected) {
      const allItemIds = cartItems.map((item) => item.product._id || item.product.id);
      setSelectedItems(allItemIds);
    } else {
      setSelectedItems([]);
    }
  };

  // Handle checkout
  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      alert("Vui lòng chọn ít nhất một sản phẩm để thanh toán.");
      return;
    }

    const selectedCartItems = cartItems.filter((item) =>
      selectedItems.includes(item.product._id || item.product.id)
    );

    navigate("/checkout", { state: { cartItems: selectedCartItems } });
  };

  // Update the cart count in the header
  const updateHeaderCartCount = (items: CartItem[]) => {
    const totalItems = items.reduce((total, item) => total + item.quantity, 0);
    const event = new CustomEvent("updateCartCount", { detail: totalItems });
    window.dispatchEvent(event);
  };

  const isAllSelected = cartItems.length > 0 && selectedItems.length === cartItems.length;

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
          <>
            <div className="select-all">
              <input
                type="checkbox"
                checked={isAllSelected}
                onChange={(e) => handleSelectAll(e.target.checked)}
              />
              <label>Chọn tất cả</label>
            </div>

            <ul>
              {cartItems.map((item, index) => (
                <li key={index}>
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.product._id || item.product.id)}
                    onChange={(e) =>
                      handleSelectItem(item.product._id || item.product.id, e.target.checked)
                    }
                  />
                  <img src={item.product.images[0]} alt={item.product.name} />
                  <div>
                    <h3>{item.product.name}</h3>
                    <p>Giá: {parseInt(item.product.price).toLocaleString()} VNĐ</p>
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
                      }
                    }}
                  >
                    <DeleteIcon />
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
        <div className="cart-actions">
          <button
            className="btn btn-primary"
            onClick={handleCheckout}
            disabled={selectedItems.length === 0}
          >
            Thanh toán
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
