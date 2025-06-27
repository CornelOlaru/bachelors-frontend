import { RiDeleteBin6Line } from "react-icons/ri";
//Component reused in the cart for each product
const CartItem = ({ item, onRemove, onQuantityChange }) => {
  return (
    <div className="cart-item">
      <div className="item-details">
        <h3>
          {item.quantity} x {item.name}
        </h3>
        <div className="item-quantity">
          <button onClick={() => onQuantityChange(item._id, -1)}>-</button>
          <span>{item.quantity}</span>
          <button onClick={() => onQuantityChange(item._id, 1)}>+</button>
        </div>
      </div>
      <div className="item-price">
        <p>{item.price * item.quantity} lei</p>
        <button
          className="remove-button"
          onClick={() => onRemove(item._id)}
        >
          <RiDeleteBin6Line style={{ color: "#32105c", fontSize: "20px" }} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;