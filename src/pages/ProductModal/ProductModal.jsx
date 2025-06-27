import { useState } from "react";
import "./productModal.css";
import Modal from "../../components/modal/Modal";

const ProductModal = ({ product, onAddToCart, cart }) => {
  const cartItem = cart?.find((item) => item._id === product._id);

  const [quantity, setQuantity] = useState(cartItem ? cartItem.quantity : 1);

  const increaseQty = () => setQuantity((q) => q + 1);
  const decreaseQty = () => setQuantity((q) => Math.max(1, q - 1));

  const handleAdd = () => {
    onAddToCart(product, quantity);
  };

  return (
    <>
      <Modal.Title>
        <img
          src={product.imageUrl}
          alt={product.name}
          className="product-modal-img"
        />
      </Modal.Title>
      <Modal.Body>
        <h3 className="product-modal-title">{product.name}</h3>
        <div className="product-modal-weight">{product.weight}g</div>
        <div className="product-modal-desc">{product.description}</div>

        <div className="product-modal-quantity">
          <button onClick={decreaseQty}>-</button>
          <span>{quantity}</span>
          <button onClick={increaseQty}>+</button>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button className="product-modal-add" onClick={handleAdd}>
          <span>{quantity}</span>
          <span>Adaugă în coș</span>
          <span>{product.price * quantity}.00 lei</span>
        </button>
      </Modal.Footer>
    </>
  );
};

export default ProductModal;
