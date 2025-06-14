import { useState } from "react";
import "./productModal.css"

const ProductModal = ({product, onAddToCart, cart}) => {
    
    const cartItem = cart?.find(item=> item._id === product._id);

    const [quantity, setQuantity] = useState(cartItem ? cartItem.quantity : 1)

    const increaseQty = () => setQuantity(q=> q+1);
    const decreaseQty = () => setQuantity(q=> Math.max(1,q-1));

    const handleAdd = () => {
        onAddToCart(product, quantity)
    }

  return (
    <div className="product-modal">
        <div className="product-modal-content">

      <img src={product.imageUrl} alt={product.name} className="product-modal-img" />
      <h3 className="product-modal-title">{product.name}</h3>
      <div className="product-modal-weight">{product.weight}g</div>
      <div className="product-modal-desc">{product.description}</div>
      <div className="product-modal-price">{product.price} lei</div>
        </div>
         <div className="product-modal-quantity">
                    <button onClick={decreaseQty}>-</button>
                    <span>{quantity}</span>
                    <button onClick={increaseQty}>+</button>
                  </div>
      <button className="product-modal-add" onClick={handleAdd}>
        Adaugă în coș
      </button>
    </div>
  )}

export default ProductModal
