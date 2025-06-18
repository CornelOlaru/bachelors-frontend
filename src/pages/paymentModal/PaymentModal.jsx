import Modal from "../../components/modal/Modal";
import "./paymentModal.css"

import { useState } from "react";

const PaymentModal = ({ isOpen, onRequestClose, onConfirm, total }) => {
 
  const [method, setMethod] = useState("");
  const [cardDetails, setCardDetails] = useState({ fullName: "", cardNumber: "", cvc: "" });

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setCardDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (method === "card") {
      // Validare minimă
      if (!cardDetails.fullName || !cardDetails.cardNumber || !cardDetails.cvc) {
        alert("Completează toate câmpurile!");
        return;
      }
      onConfirm({ method, cardDetails });
    } else {
      onConfirm({ method });
      
    }
    onRequestClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-bg">
      <div className="modal-content">
        <button className="modal-close" onClick={onRequestClose}>×</button>
        <Modal.Title>

        <h3>Plată comandă {total}.00 lei</h3>
        </Modal.Title>
        <Modal.Body>

       
        {!method && (
          <>
            <button className="payment-btn" onClick={() => setMethod("cash")}>Cash</button>
            <button className="payment-btn" onClick={() => setMethod("card")}>Card</button>
          </>
        )}
        {method === "cash" && (
          <div style={{ marginTop: 20 }}>
            <p>A waiter is on the way to assist you.</p>
            <button className="confirm-btn" onClick={handleSubmit}>Confirmă și închide nota</button>
          </div>
        )}
        {method === "card" && (
          <form onSubmit={handleSubmit} style={{ marginTop: 20 }}>
            <input
              type="text"
              name="fullName"
              placeholder="Nume pe card"
              value={cardDetails.fullName}
              onChange={handleCardChange}
              required
            />
            <input
              type="number"
              name="cardNumber"
              placeholder="Număr card"
              value={cardDetails.cardNumber}
              onChange={handleCardChange}
              required
            />
            <input
              type="number"
              name="cvc"
              placeholder="CVC"
              value={cardDetails.cvc}
              onChange={handleCardChange}
              required
            />
            <button className="confirm-btn" type="submit">Plătește</button>
          </form>
        )} 
        </Modal.Body>
      </div>
    </div>
  );
};

export default PaymentModal;

