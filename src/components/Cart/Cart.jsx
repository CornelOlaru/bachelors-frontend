/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/cartContext";
import { RiDeleteBin6Line } from "react-icons/ri";
import { saveOrder } from "../../services/apiService";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import PaymentModal from "../../pages/paymentModal/PaymentModal";
import "./cart.css";
import { IoClose } from "react-icons/io5";
import Modal from "../modal/Modal";
import CartItem from "./CartItem";
import OrderedItemList from "./OrderedItemList";

const Cart = ({ onRequestClose }) => {

  const navigate = useNavigate();
  const { cart, updateCartItem, removeFromCart, clearCart } =
    useContext(CartContext);
  const [orderDetails, setOrderDetails] = useState(null);
  const { tableId } = useParams();
  const sessionId = localStorage.getItem("sessionId");
  const [userId, setUserId] = useState(null);
  const [tab, setTabs] = useState("selected");
  const [orderedItems, setOrderedItems] = useState([]);
  const [showPayment, setShowPayment] = useState(false);
  const apiUrl = import.meta.env.VITE_DEV_API_BASE_URL;

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserId(decoded?.id);
        console.log("UserID: ", userId);
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

  const cartTotalPrice = cart.reduce(
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
      totalPrice: cartTotalPrice,
      ...(userId && { userId }),
    };
    try {
      console.log(order);
      console.log(userId);
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
        const response = await fetch(
          `${apiUrl}/api/orders/search?table=${tableId}&sessionId=${sessionId}`
        );
        const data = await response.json();
        console.log("this is the ordered object", data);
        setOrderedItems(data.orders || []);
        console.log("this is the ordered items", orderedItems);
      } catch (error) {
        console.error({ message: "Failed to fetch orders", error });
        setOrderedItems([]);
      }
    };
    fetchOrderedItems();
  }, [tab, tableId, sessionId]);

  const handlePaymentConfirm = async ({ method, cardDetails }) => {
    try {
      let body = {
        table: tableId,
        sessionId,
        status: "paid",
        paymentMethod: method,
      };

      if (method === "card" && cardDetails) {
        body.cardDetails = cardDetails; // include name, number, cvc
      }

      // Ex: orderId vine din props/context/state
      await fetch(`${apiUrl}/api/orders/checkout`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      // Feedback de succes, închide modalul, update UI, etc
      alert("Comanda a fost închisă cu succes. Dacă dorești să comanzi din nou, te rugăm să reîncarci pagina sau să scanezi din nou codul QR.");
      localStorage.removeItem("sessionId");
      setShowPayment(false);
      onRequestClose();
      navigate("/")
      // (ex: setShowPaymentModal(false); setPaymentMethod(""); etc)
    } catch (err) {
      // Feedback de eroare
      alert("Eroare la plată. Încearcă din nou.");
    }
  };
  const totalQty = orderedItems.reduce(
    (sum, order) =>
      sum +
      (order.items ? order.items.reduce((s, item) => s + item.quantity, 0) : 0),
    0
  );

  const totalPrice = orderedItems.reduce(
    (sum, order) =>
      sum +
      (order.totalPrice ||
        (order.items
          ? order.items.reduce((s, item) => s + item.price * item.quantity, 0)
          : 0)),
    0
  );
  return (
    <>
      <Modal.Title>
        <h2>My cart</h2>
        <div className="cart-tabs">
          <button onClick={() => setTabs("selected")}>Selected</button>
          <button onClick={() => setTabs("ordered")}>Ordered</button>
        </div>
      </Modal.Title>
      <Modal.Body>
        {tab === "selected" && (
          <>
            <div className="page-container">
              <div className="content-wrapper cart-content">
                <div className="cart-items">
                  {cart?.length > 0 ? (
                    cart.map((item) => (
                      <CartItem
                        key={item._id}
                        item={item}
                        onRemove={handleRemove}
                        onQuantityChange={handleQuantityChange}
                      />
                    ))
                  ) : (
                    <div className="empty-cart-message">Coșul este gol.</div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
        {tab === "ordered" && (
          <div className="ordered-list">
            {orderedItems && orderedItems.length > 0 ? (
              <OrderedItemList
                orders={orderedItems}
                onConfirm={handlePaymentConfirm} // funcția ta existentă
              />
            ) : (
              <div className="empty-ordered">Nu ai comenzi plasate.</div>
            )}
          </div>
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
                  <div>{cartTotalPrice} lei</div>
                </div>
              </div>
            </div>
          </div>
        )}
        {tab === "ordered" && (
          <div className="cart-footer-sticky">
            <div id="dineInPlaceOrder" className="cart-footer">
              <div
                className="checkout-button"
                tabIndex={0}
                role="button"
                onClick={() => setShowPayment(true)}
              >
                <div className="cart-qty">{totalQty}</div>
                <div className="flex-grow-1">Checkout / Închide nota</div>
                <div className="ordered-total">{totalPrice} lei</div>
              </div>
            </div>
          </div>
        )}
        <PaymentModal
          isOpen={showPayment}
          onRequestClose={() => setShowPayment(false)}
          onConfirm={handlePaymentConfirm}
          total={totalPrice}
        />
      </Modal.Footer>
    </>
  );
};

export default Cart;
