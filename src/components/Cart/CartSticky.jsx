import { useContext } from "react";
import { CartContext } from "../../context/cartContext";
import "./cart.css"

const CartSticky = ({ onClick }) => {
  const { cart } = useContext(CartContext);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

   // nu afișezi bara dacă nu ai produse

  return (
    

    <button className="cart-sticky" onClick={onClick}>
      <span className="cart-sticky-items">{totalItems} produse</span>
      <span className="cart-sticky-total">{total} lei</span>
      <span className="cart-sticky-arrow">&#8594;</span>
    </button>
  );
};

export default CartSticky;