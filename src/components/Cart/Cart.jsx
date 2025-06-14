/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import "./cart.css";
import { CartContext } from "../../context/cartContext";
import { RiDeleteBin6Line } from "react-icons/ri";
import { saveOrder } from "../../services/apiService";
import { useParams } from "react-router-dom";
import  {jwtDecode}  from "jwt-decode";

const Cart = ({ onRequestClose }) => {
  const { cart, updateCartItem, removeFromCart, clearCart } = useContext(CartContext);
    const [orderDetails, setOrderDetails] = useState(null)
    const {tableId} = useParams();
    const sessionId = localStorage.getItem("sessionId");
  const [userId, setUserId] = useState(null);

const token = localStorage.getItem("token");

useEffect(() => {
  if (token) {
    try {
      const decoded = jwtDecode(token);
      setUserId(decoded?.userId);
    } catch (error) {
      setUserId(null);
      console.error(error)
    }
  }
}, [token]);
  const handleQuantityChange = (productId, delta) => {
    const item = cart.find((item) => item._id === productId);
    if (!item) return;
    const newQty = Math.max(1, item.quantity + delta);
    updateCartItem(productId, newQty);
  };

  const handleRemove = (productId) => {
    removeFromCart(productId);
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);


  const sendOrder = async () => {
    
if (!sessionId || !tableId) {
    console.error("Session ID or Table ID is missing");
    return;
  }
if (!cart || cart.length === 0) {
    console.error("Cart is empty, cannot fetch order details");
    return;
  }
  


  const items = cart.map(item => ({
    product: item._id,
    name: item.name,
    quantity: item.quantity,
    price: item.price
  }));
  
  //Obiectul de trimis
  const order = {
    table:tableId,
    sessionId,
    items,
    totalPrice,
    ...(userId && { userId }),
    
  };
  try {
      console.log(order)
      const response = await saveOrder(order);

      alert("Order sent successfully!")
      clearCart();
      if (response && response.data) {
          setOrderDetails(response.data);
        } else {
            console.error("Failed to fetch order details");
        }
      } catch (error) {
        console.error("Error at sendOrder:", error);
      }
    };




  if (cart.length === 0) {
    return (
      <>
        <div className="page-container">
          <div className="navbar-spacing"></div>
          <div className="content-wrapper empty-cart">
            <h2>My cart</h2>
            <p>Cart is empty</p>
            <button onClick={() => onRequestClose()}>Continue Browsing</button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="page-container">
        <div className="content-wrapper cart-content">
          <h2>My cart</h2>
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item._id} className="cart-item">
                <div className="item-details">
                  <h3>
                    {item.quantity} x {item.name}
                  </h3>
                  <div className="item-quantity">
                    <button onClick={() => handleQuantityChange(item._id, -1)}>
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleQuantityChange(item._id, 1)}>
                      +
                    </button>
                  </div>
                </div>
                <div className="item-price">
                  <p>{totalPrice} lei</p>
                  <button
                    className="remove-button"
                    onClick={() => handleRemove(item._id)}
                  >
                    <RiDeleteBin6Line
                      style={{ color: "#32105c", fontSize: "20px" }}
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>

<hr />
      <div id="dineInPlaceOrder" className="cart-footer" onClick= {()=> sendOrder()}>
       
            <div>
            <div className="checkout-button" tabIndex={0} role="button">
              <div className="cart-qty">{cart.reduce((sum,item)=> sum + item.quantity, 0)}</div>
              <div className="flex-grow-1">Trimite comanda</div>
              <div>{totalPrice} lei</div>
            </div>
          </div>
        
      </div>
        </div>
    </>
  );
};

export default Cart;
