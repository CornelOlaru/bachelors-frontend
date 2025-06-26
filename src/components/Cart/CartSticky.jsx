import { useContext } from "react";
import { CartContext } from "../../context/cartContext";
import "./cart.css";

const CartSticky = ({ onClick }) => {
  const { cart } = useContext(CartContext);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-sticky-container">

    <button className="cart-sticky" onClick={onClick}>
      <div>
        <span className="cart-sticky-items">{totalItems}</span>
        <span className="cart-sticky-title"> Coșul meu</span>
      </div>
      <span className="cart-sticky-total">{total}.00 lei</span>
    </button>
    </div>
  );
};

export default CartSticky;
