/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/cartContext";
import { RiDeleteBin6Line } from "react-icons/ri";
import { saveOrder } from "../../services/apiService";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import PaymentModal from "../../pages/paymentModal/PaymentModal";
import "./cart.css";
import { IoClose } from "react-icons/io5";
import Modal from "../modal/Modal";

const Cart = ({ onRequestClose }) => {
  const { cart, updateCartItem, removeFromCart, clearCart } =
    useContext(CartContext);
  const [orderDetails, setOrderDetails] = useState(null);
  const { tableId } = useParams();
  const sessionId = localStorage.getItem("sessionId");
  const [userId, setUserId] = useState(null);
  const [tab, setTabs] = useState("selected");
  const [orderedItems, setOrderedItems] = useState([])
  const [showPayment, setShowPayment] = useState(false);
  const apiUrl = import.meta.env.VITE_DEV_API_BASE_URL;

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserId(decoded?.id);
        console.log("UserID: ", userId)
      } catch (error) {
        setUserId(null);
        console.error(error);
      }
    }
  }, [token, userId]);

  const handleQuantityChange = (productId, delta) => {
    const item = cart.find((item) => item._id === productId);
    if (!item) return;
    const newQty = Math.max(1, item.quantity + delta);
    updateCartItem(productId, newQty);
  };

  const handleRemove = (productId) => {
    removeFromCart(productId);
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const sendOrder = async () => {
    if (!sessionId || !tableId) {
      console.error("Session ID or Table ID is missing");
      return;
    }
    if (!cart || cart.length === 0) {
      console.error("Cart is empty, cannot fetch order details");
      return;
    }

    const items = cart.map((item) => ({
      product: item._id,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
    }));

    //Obiectul de trimis
    const order = {
      table: tableId,
      sessionId,
      items,
      totalPrice,
      ...(userId && { userId }),
    };
    try {
      console.log(order);
      console.log(userId)
      const response = await saveOrder(order);

      alert("Order sent successfully!");
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
useEffect(() => {
    const fetchOrderedItems = async () => {
        if (!tableId || !sessionId || tab !== "ordered") return;
    try {
        const response = await fetch(`${apiUrl}/api/orders/search?table=${tableId}&sessionId=${sessionId}`)
        const data = await response.json();
        console.log("this is the ordered object",data);
        setOrderedItems(data.orders || []);
        console.log("this is the ordered items",orderedItems);

    } catch (error) {
        console.error({message: "Failed to fetch orders", error})
         setOrderedItems([]);
    }
}
fetchOrderedItems();
}, [tab, tableId, sessionId])




const handlePaymentConfirm = async ({ method, cardDetails }) => {
  try {
    let body = {
      table: tableId,
      sessionId,
      status: "paid",
      paymentMethod: method
    };

    if (method === "card" && cardDetails) {
      body.cardDetails = cardDetails; // include name, number, cvc
    }

    // Ex: orderId vine din props/context/state
    await fetch(`${apiUrl}/api/orders/checkout`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    // Feedback de succes, închide modalul, update UI, etc
    alert("Plata efectuată!");
    setShowPayment(false);
    onRequestClose();
    // (ex: setShowPaymentModal(false); setPaymentMethod(""); etc)
  } catch (err) {
    // Feedback de eroare
    alert("Eroare la plată. Încearcă din nou.");
  }
};
  return (
      <>
      

  <Modal.Title>

          <h2>My cart</h2>
      <div className="cart-tabs">
    <button onClick={()=> setTabs("selected")}>Selected</button>
    <button onClick={()=> setTabs("ordered")}>Ordered</button>
</div>
  </Modal.Title>
<Modal.Body>


 {tab === "selected" && (
  <>
    <div className="page-container">
      <div className="content-wrapper cart-content">
        <div className="cart-items">
          {cart && cart.length > 0 ? (
            cart.map((item) => (
              <div key={item._id} className="cart-item">
                <div className="item-details">
                  <h3>
                    {item.quantity} x {item.name}
                  </h3>
                  <div className="item-quantity">
                    <button onClick={() => handleQuantityChange(item._id, -1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleQuantityChange(item._id, 1)}>+</button>
                  </div>
                </div>
                <div className="item-price">
                  <p>{item.price * item.quantity} lei</p>
                  <button
                    className="remove-button"
                    onClick={() => handleRemove(item._id)}
                  >
                    <RiDeleteBin6Line style={{ color: "#32105c", fontSize: "20px" }} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-cart-message">Coșul este gol.</div>
          )}
        </div>
      </div>
    </div>
    
  </>
)}
</Modal.Body>
<Modal.Footer>

{tab === "selected" && cart && (
  <div>
        <div
          id="dineInPlaceOrder"
          className="cart-footer"
          onClick={() => sendOrder()}
          >
          <div>
            <div className="checkout-button" tabIndex={0} role="button">
              <div className="cart-qty">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </div>
              <div className="flex-grow-1">Trimite comanda</div>
              <div>{totalPrice} lei</div>
            </div>
          </div>
        </div>
      </div>
    )}
    </Modal.Footer>

{tab === "ordered" && (
  
  
  <div className="ordered-list">
    

    {orderedItems && orderedItems.length > 0 ? (
      <>
        {orderedItems.map((order) => (
    <Modal.Body>
          <div key={order._id} className="ordered-order">
            <div className="ordered-header">
              <span>Total: {order.totalPrice || (order.items && order.items.reduce((sum, item) => sum + item.price * item.quantity, 0))} lei</span>
            </div>
            <div className="ordered-products">
              {order.items && order.items.length > 0 ? (
                order.items.map((prod, idx) => (
                  <div key={idx} className="ordered-item">
                    <div className="ordered-info">
                      <span className="ordered-name">{prod.product?.name || prod.name}</span>
                      <span className="ordered-qty">x{prod.quantity}</span>
                    </div>
                    <div className="ordered-price">
                      {prod.price * prod.quantity} lei
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-ordered">Fără produse în comandă.</div>
              )}
            </div>
          </div>
          </Modal.Body>
        ))}
        
        {/* Sticky Checkout button for ALL ordered items */}
        <Modal.Footer>
        <div style={{ position: "sticky", bottom: 0, left: 0, right: 0, background: "#fff", zIndex: 9, marginTop: 20 }}>
          <hr />
          <div
            id="dineInPlaceOrder"
            className="cart-footer"
            onClick={() => {/* handleCheckoutOrdered() sau open payment modal etc */}}
          >
            <div>
              <div className="checkout-button" tabIndex={0} role="button">
                <div className="cart-qty">
                  {orderedItems.reduce((sum, order) =>
                    sum + (order.items ? order.items.reduce((s, item) => s + item.quantity, 0) : 0), 0)
                  }
                </div>
                <div className="flex-grow-1" onClick={()=> setShowPayment(true)}>Checkout / Închide nota</div>
                <div className="ordered-total">
                  {orderedItems
                    .reduce(
                      (sum, order) =>
                        sum +
                        (order.totalPrice ||
                          (order.items
                            ? order.items.reduce((s, item) => s + item.price * item.quantity, 0)
                            : 0)),
                      0
                    )} lei
                </div>
              </div>
            </div>
          </div>
        </div>
        </Modal.Footer>
       
  <PaymentModal
    isOpen={showPayment}
    onRequestClose={() => setShowPayment(false)}
    onConfirm={handlePaymentConfirm}
    
  />

      </>
    ) : (
      <div className="empty-ordered">Nu ai comenzi plasate.</div>
    )}
  </div>
)}

    </>
  );
};

export default Cart;
